import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals, request }) => {
    const requestData = await request.json();
    const chapter = requestData.chapter;

    let balance = {id: '', coins: 0};

    try {
        balance = await locals.pb.collection('balances').getFirstListItem(`user = '${locals.user.id}'`);
    } catch (err) {
        const body = { message: `Could not retrieve balance.` }
        const option = { status: 500 }

        return json(body, option);
    }

    if (balance.coins < chapter.price) {
        const body = { message: `Not enough balance` }
        const option = { status: 400 }
        
        return json(body, option);
    }

    await locals.pb.collection('balances').update(balance.id, {
        coins: balance.coins - chapter.price,
    });

    await locals.pb.collection('ownedChapters').create({
        user: locals.user.id,
        chapter: chapter.id,
    });
    
    return new Response();
};