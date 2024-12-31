import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals, request }) => {
    const requestData = await request.json();
    const chapter = requestData.chapter;

    let wallet = {id: '', coins: 0};

    try {
        wallet = await locals.pb.collection('wallet').getFirstListItem(`user = '${locals.user.id}'`);
    } catch (err) {
        const body = { message: `Could not retrieve wallet of user (${locals.user.id})` }
        const option = { status: 500 }

        return json(body, option);
    }

    if (wallet.coins < chapter.price) {
        const body = { message: `Not enough coins in wallet` }
        const option = { status: 400 }
        
        return json(body, option);
    }

    await locals.pb.collection('wallet').update(wallet.id, {
        coins: wallet.coins - chapter.price,
    });

    await locals.pb.collection('ownedChapters').create({
        user: locals.user.id,
        chapter: chapter.id,
    });
    
    return new Response();
};