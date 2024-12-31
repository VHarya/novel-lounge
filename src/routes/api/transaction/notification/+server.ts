import { MT_SERVER_KEY, PB_SUPERUSER_EMAIL, PB_SUPERUSER_PASSWORD } from '$env/static/private';
import type { RequestHandler } from './$types';

import { sha512 } from 'js-sha512';

export const POST: RequestHandler = async ({ locals, request }) => {
    const body = await request.json();
    console.log("NOTIFICATION !!!!!!!!!!!!!!!!!!!!");

    if (body.transaction_status === 'pending') {
        return new Response();
    }
    
    const hash = sha512(`${body.order_id}${body.status_code}${body.gross_amount}${MT_SERVER_KEY}`);

    if (body.signature_key !== hash) {
        return new Response("signature_key doesn't match.", { status: 400 });
    }

    await locals.pb.collection('_superusers').authWithPassword(PB_SUPERUSER_EMAIL, PB_SUPERUSER_PASSWORD);
    await locals.pb.collection('transactions').update(body.order_id, {
        status: body.transaction_status,
    });
    await locals.pb.authStore.clear();

    return new Response();
};