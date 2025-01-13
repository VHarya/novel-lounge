import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals, request }) => {
    const data = await request.json();

    try {
        await locals.pb.collection('bookmarks').create({
            novel: data['novel_id'],
            user: locals.user.id,
        });
    } catch (error:any) {
        const responseBody = {
            error: true,
            message: "Something went wrong when trying to add bookmark!",
        }
        
        return new Response(JSON.stringify(responseBody), { status: 500 });
    }

    const responseBody = {
        error: false,
        message: "Bookmarked Successfully!"
    }

    return new Response(JSON.stringify(responseBody), { status: 200 });
};