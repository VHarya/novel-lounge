import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals, request }) => {
    const data = await request.json();

    try {
        await locals.pb.collection('bookmarks').delete(data['bookmark_id']);
    } catch (error:any) {
        const responseBody = {
            error: true,
            message: "Something went wrong when trying to delete bookmark!",
        }
        
        return new Response(JSON.stringify(responseBody), { status: 500 });
    }

    const responseBody = {
        error: false,
        message: "Bookmark has been deleted!"
    }

    return new Response(JSON.stringify(responseBody), { status: 200 });
};