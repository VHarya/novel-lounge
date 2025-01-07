import type { Chapter } from '$lib/models/chapter';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ locals, params }) => {
    const novelId = params.novelId;
    const chapters = await locals.pb.collection('chapters').getList<Chapter>(1, 1, {
        filter: `novel.id = '${novelId}'`,
        sort: `-chapter`
    });
    
    let latestChapter = 0;
    if (chapters.totalItems > 0) {
        latestChapter = chapters.items[0].chapter;
    }

    return { latestChapter };
}) satisfies PageServerLoad;


export const actions: Actions = {
    create: async ({ locals, request, params }) => {
        const novelId = params.novelId;

        const formData = await request.formData();

        const chapter = (formData.get('chapter') || 0) as number;
        const title = formData.get('title') as string;
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
            const newChapter = await locals.pb.collection('chapters').create({
                chapter: chapter,
                title: title,
                novel: novelId,
                price: priced ? 10 : 0,
            });

            await locals.pb.collection('chaptersContent').create({
                chapter: newChapter.id,
                content: content,
            });

            const today = new Date().toISOString();
            await locals.pb.collection('novels').update(novelId, {
                lastChapterUpdate: today.replace('T', ' '),
            });
        } catch (error) {
            console.log(error);
            return {
                error: true,
                message: 'An error occured when trying to save data.',
                data: { chapter, title, content, priced },
            };
        }

        redirect(303, `/novels/${novelId}`);
    }
};
