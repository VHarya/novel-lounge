import { MT_SERVER_KEY, PB_SUPERUSER_EMAIL, PB_SUPERUSER_PASSWORD } from '$env/static/private';
import type { Transaction } from '$lib/models/transaction';
import type { RequestHandler } from './$types';

import { sha512 } from 'js-sha512';

export const POST: RequestHandler = async ({ locals, request }) => {
    const body = await request.json();
    console.log(body);
    
    const hash = sha512(`${body.order_id}${body.status_code}${body.gross_amount}${MT_SERVER_KEY}`);
    
    if (body.signature_key !== hash) {
        return new Response("signature_key doesn't match.", { status: 400 });
    }
    
    // Temporary to process transaction
    await locals.pb.collection('_superusers').authWithPassword(PB_SUPERUSER_EMAIL, PB_SUPERUSER_PASSWORD);
    
    const transaction = await locals.pb.collection('transactions').update<Transaction>(body.order_id, {
        status: body.transaction_status,
    }, {
        expand: 'user'
    });

    if (body.transaction_status === 'settlement') {
        const balance = await locals.pb.collection('balances').getOne(transaction.expand.user.balance);
        await locals.pb.collection('balances').update(balance.id, { coins: balance.coins + transaction.coins });
    }
    
    await locals.pb.authStore.clear();

    return new Response();
};