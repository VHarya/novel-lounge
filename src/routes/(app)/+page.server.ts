import type { PageServerLoad } from './$types';
import type { Novel } from '$lib/models/novel';
import type { Chapter } from '$lib/models/chapter';
import { serializeNonPOJOs } from '$lib/utils';
import { PB_FILES_URL } from '$env/static/private';
import type { ListResult } from 'pocketbase';

export const load = (async ({ locals }) => {
    const novelNewChapter = await locals.pb.collection('novels').getList<Novel>(1, 9, {
        filter: 'lastChapterUpdate != null',
        sort: '-lastChapterUpdate',
        expand: 'author,categories'
    });
    
    const newestNovels = await locals.pb.collection('novels').getList<Novel>(1, 10, {
        sort: '-created',
        expand: 'author',
    });

    convertFilenameToURL(novelNewChapter);
    convertFilenameToURL(newestNovels);

    let chapterUpdates:any = [];
    for (const novel of novelNewChapter.items) {
        try {
            const chapters = await locals.pb.collection('chapters').getList<Chapter>(1, 2, {
                sort: '-created',
                filter: `novel='${novel.id}'`
            });

            const data = {
                ...novel,
                chapters: chapters.items
            };

            chapterUpdates.push(data);
        } catch (error:any) {
            console.log(error.response.message);
        }
    }

    const newChapters = serializeNonPOJOs(chapterUpdates);
    const newNovels = serializeNonPOJOs(newestNovels.items);
    return { newChapters, newNovels };
}) satisfies PageServerLoad;


function convertFilenameToURL(novels:ListResult<Novel>): ListResult<Novel> {
    // Convert filename to URL dunno why PB doesn't just send the File's URL
    novels.items.map((novel) => {
        if (!novel.cover) {
            return novel.cover;
        }

        novel.cover = `${PB_FILES_URL}/novels/${novel.id}/${novel.cover}`;
    });
    
    return novels;
}