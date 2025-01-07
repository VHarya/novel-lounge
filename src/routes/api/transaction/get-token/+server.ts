import { MT_SERVER_KEY } from '$env/static/private';
import { PUBLIC_MT_CLIENT_KEY } from '$env/static/public';

import type { RequestHandler } from './$types';

import { json } from '@sveltejs/kit';
import Midtrans from 'midtrans-client';

export const POST: RequestHandler = async ({ locals, request }) => {
    let snap = new Midtrans.Snap({
        isProduction: false,
        serverKey: MT_SERVER_KEY,
        clientKey: PUBLIC_MT_CLIENT_KEY
    })

    const data = await request.json();

    const transaction = await locals.pb.collection('transactions').create({
        user: locals.user.id,
        coins: data.coins,
        price: data.price,
        status: "pending",
    })

    let parameter = {
        transaction_details: {
            order_id: transaction.id,
            gross_amount: transaction.price, 
        },
        item_details: {
            price: transaction.price,
            quantity: 1,
            name: `Novel Lounge ${transaction.coins} Coin`,
        },
        customer_details: {
            first_name: locals.user.firstName,
            last_name: locals.user.lastName,
            email: locals.user.email,
        },
    }

    const snapTransaction = await snap.createTransactionToken(parameter)

    await locals.pb.collection('transactions').update(transaction.id, { snapToken: snapTransaction });
    
    return json({
        message: "Successfully got transaction token!",
        token: snapTransaction,
    })
};