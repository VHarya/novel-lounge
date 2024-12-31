import { PB_FILES_URL } from '$env/static/private';
import type { Chapter } from '$lib/models/chapter';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, params }) => {
    const chapterId = params.id;

    const chapter = await locals.pb.collection('chapters').getOne<Chapter>(chapterId, { expand: 'novel' });
    const novelCover = chapter.expand.novel.cover;
    
    return { chapter, novelCover: novelCover ? `${PB_FILES_URL}/${novelCover}` : '' };
}) satisfies PageServerLoad;