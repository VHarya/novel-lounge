import type { PageServerLoad } from './$types';
import type { ChapterContent } from '$lib/models/chapterContent';
import type { Chapter } from '$lib/models/chapter';

export const load = (async ({ locals, params }) => {
    const chapterId = params.id;
    const chapter = await locals.pb.collection('chapters').getOne<Chapter>(chapterId);
    // const nextChapter = await locals.pb.collection('chapters').getFirstListItem<Chapter>("");
    const chapterContent = await locals.pb.collection('chaptersContent').getFirstListItem<ChapterContent>(`chapter='${chapterId}'`);

    return { chapter, chapterContent };
}) satisfies PageServerLoad;