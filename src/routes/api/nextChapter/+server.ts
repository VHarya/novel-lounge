import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals, url }) => {
    const currentChapter = Number(url.searchParams.get('chapterNumber'));
    const currentVolume = Number(url.searchParams.get)
    return new Response();
};