import type { PageServerLoad } from './$types';
import type { ChapterContent } from '$lib/models/chapterContent';
import type { Chapter } from '$lib/models/chapter';
import type { Novel } from '$lib/models/novel';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ locals, params }) => {
    const chapterId = params.id;

    const chapter = await locals.pb.collection('chapters').getOne<Chapter>(chapterId, { expand: "novel" });
    
    if (chapter.price > 0) {
        await locals.pb
            .collection('ownedChapters')
            .getFirstListItem(`user.id = '${locals.user.id}' && chapter.id = '${chapter.id}'`)
            .catch((err) => {
                redirect(303, `/chapters/confirm/${chapter.id}`);
            });
    }

    const chapterContent = await locals.pb.collection('chaptersContent').getFirstListItem<ChapterContent>(`chapter='${chapterId}'`);

    const nextChapter = await locals.pb.collection('chapters').getFirstListItem<Chapter>(`chapter = ${chapter.chapter+1}`)
        .catch((e) => {
            if (e.status == 404) {
                return null;
            }
        });
    const previousChapter = await locals.pb.collection('chapters').getFirstListItem<Chapter>(`chapter = ${chapter.chapter-1}`)
        .catch((e) => {
            if (e.status == 404) {
                return null;
            }
        });

    return {
        chapter,
        chapterContent,
        novel: chapter.expand.novel as Novel,
        nextChapter,
        previousChapter,
    };
}) satisfies PageServerLoad;