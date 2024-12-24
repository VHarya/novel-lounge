import type { Chapter } from '$lib/models/chapter';
import type { ChapterContent } from '$lib/models/chapterContent';
import type { Actions, PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ locals, params }) => {
    const novelId = params.novelId;
    const chapterId = params.id;

    const chapters = await locals.pb.collection('chapters').getList<Chapter>(1, 1, {
        filter: `novel.id = '${novelId}'`,
        sort: `-chapter`
    });

    const chapter = await locals.pb.collection('chapters').getOne<Chapter>(chapterId);
    const chapterContent = await locals.pb.collection('chaptersContent').getFirstListItem<ChapterContent>(`chapter = '${chapterId}'`);
    
    let latestChapter = 0;
    if (chapters.totalItems > 0) {
        latestChapter = chapters.items[0].chapter;
    }

    return { 
        latestChapter,
        chapter: {
            ...chapter,
            contentId: chapterContent.id,
            content: chapterContent.content,
        },
    };
}) satisfies PageServerLoad;


export const actions: Actions = {
    edit: async ({ locals, request, params }) => {
        const novelId = params.novelId;
        const chapterId = params.id;

        const formData = await request.formData();

        const chapter = (formData.get('chapter') || 0) as number;
        const title = formData.get('title') as string;
        const contentId = formData.get('content_id') as string;
        const content = formData.get('content') as string;
        const priced = (formData.get('paid_chapter') || true) as boolean;

        if (!chapter) {
            return {
                error: true,
                message: 'Chapter cannot be empty',
                data: { chapter, title, content, priced },
            };
        }

        if (!content) {
            return {
                error: true,
                message: 'Content cannot be empty',
                data: { chapter, title, content, priced },
            };
        }

        const chapterWithNumber = await locals.pb.collection('chapters').getList(1, 1, {
            filter: `chapter = '${chapter}' && novel.id = '${novelId}'`,
        });

        if (chapterWithNumber.totalItems > 0) {
            return {
                error: true,
                message: 'Chapter already exists',
                data: { chapter, title, content, priced },
            };
        }


        try {
            await locals.pb.collection('chapters').update(chapterId, {
                chapter: chapter,
                title: title,
                novel: novelId,
                price: priced ? 10 : 0,
            });

            await locals.pb.collection('chaptersContent').update(contentId, {
                content: content,
            });
        } catch (error) {
            console.log(JSON.stringify(error));
            return {
                error: true,
                message: 'An error occured when trying to save data.',
                data: { chapter, title, content, priced },
            };
        }

        redirect(303, `/novel/${novelId}`);
    }
};
