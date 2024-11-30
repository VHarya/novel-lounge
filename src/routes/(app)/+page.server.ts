import { pb } from '$lib/utils/pocketbase';

import type { PageServerLoad } from './$types';
import type { Novel } from '$lib/models/novel';
import type { Chapter } from '$lib/models/chapter';

const perPage = 9;

export const load = (async ({ url }) => {
    let response:any = [];
    let currentPage = parseInt(url.searchParams.get('page') ?? '1');

    const novelsNewestChapter = await pb.collection('novels').getList<Novel>(currentPage, perPage, {
        filter: 'lastChapterUpdate != null',
        sort: '-lastChapterUpdate',
        expand: 'author,categories'
    });
    
    const newestNovels = await pb.collection('novels').getList<Novel>(1, 10)

    for (const novel of novelsNewestChapter.items) {
        try {
            // const chapter = await pb.collection('chapters').getFirstListItem<Chapter>(`novel='${novel.id}'`, { sort: '-created' });
            const chapters = await pb.collection('chapters').getList<Chapter>(1, 2, {
                sort: '-created',
                filter: `novel='${novel.id}'`
            });

            const data = {
                ...novel,
                chapters: chapters.items
            };

            response.push(data);
        } catch (error) {
            // response = { errorMessage: error };
            console.error(error);
        }
    }

    const newReleases = JSON.parse(JSON.stringify(response));
    return { newReleases: newReleases };
}) satisfies PageServerLoad;