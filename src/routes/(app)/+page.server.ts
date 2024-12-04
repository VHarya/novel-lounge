import { pb } from '$lib/utils/pocketbase';

import type { PageServerLoad } from './$types';
import type { Novel } from '$lib/models/novel';
import type { Chapter } from '$lib/models/chapter';

export const load = (async ({ url }) => {
    let currentPage = parseInt(url.searchParams.get('page') ?? '1');

    const novelNewestChapter = await pb.collection('novels').getList<Novel>(1, 9, {
        filter: 'lastChapterUpdate != null',
        sort: '-lastChapterUpdate',
        expand: 'author,categories'
    });
    
    const newestNovels = await pb.collection('novels').getList<Novel>(1, 10, {
        sort: '-created',
        expand: 'author',
    });

    let chapterUpdates:any = [];
    for (const novel of novelNewestChapter.items) {
        try {
            const chapters = await pb.collection('chapters').getList<Chapter>(1, 2, {
                sort: '-created',
                filter: `novel='${novel.id}'`
            });

            const data = {
                ...novel,
                chapters: chapters.items
            };

            chapterUpdates.push(data);
        } catch (error) {
            // chapterUpdates = { errorMessage: error };
            console.error(error);
        }
    }

    const newChapters = JSON.parse(JSON.stringify(chapterUpdates));
    const newNovels = JSON.parse(JSON.stringify(newestNovels.items));
    return { newChapters, newNovels };
}) satisfies PageServerLoad;