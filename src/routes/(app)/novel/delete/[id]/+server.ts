import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals, params }) => {
    try {
        const novelId = params.id;
        await locals.pb.collection('novels').delete(novelId);
    } catch (error:any) {
        console.log(error);
        error(error.code, error.message);
    }

    throw redirect(303, '/my-novels');
};