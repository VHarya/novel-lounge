import type { PageServerLoad } from './$types';
import type { Novel } from '$lib/models/novel';
import type { Chapter } from '$lib/models/chapter';
import { convertFilenameToFileURL, serializeNonPOJOs } from '$lib/utils';
import { PB_FILES_URL } from '$env/static/private';

export const load = (async ({ locals }) => {
    const novelNewChapter = await locals.pb.collection('novels').getList<Novel>(1, 9, {
        filter: 'lastChapterUpdate != null',
        sort: '-lastChapterUpdate',
        expand: 'author,categories'
    });
    
    novelNewChapter.items.map((novel) => {
        if (novel.cover) {
            novel.cover = convertFilenameToFileURL(PB_FILES_URL, 'novels', novel.id, novel.cover);
        }
    });

    const newestNovels = await locals.pb.collection('novels').getList<Novel>(1, 10, {
        sort: '-created',
        expand: 'author',
    });

    newestNovels.items.map((novel) => {
        if (novel.cover) {
            novel.cover = convertFilenameToFileURL(PB_FILES_URL, 'novels', novel.id, novel.cover);
        }
    });

    let chapterUpdates:any = [];
    for (const novel of novelNewChapter.items) {
        try {
            const chapters = await locals.pb.collection('chapters').getList<Chapter>(1, 2, {
                sort: '-chapter',
                filter: `novel='${novel.id}'`
            });

            let data:any;

            if (locals.user) {
                const ownedChapters = await locals.pb.collection('ownedChapters').getList(1, 2, {
                    filter: `chapter.novel.id = '${novel.id}' && user = '${locals.user.id}'`,
                    sort: '-chapter'
                });
                
                data = {
                    ...novel,
                    chapters: chapters.items.map((chapter) => {
                        for (const ownedChapter of ownedChapters.items) {
                            if (chapter.id === ownedChapter.chapter) {
                                chapter.isOwned = true;
                                return chapter;
                            }

                            chapter.isOwned = false;
                        }
                        return chapter;
                    }),
                };
            }
            else {
                data = {
                    ...novel,
                    chapters: chapters.items,
                };
            }

            chapterUpdates.push(data);
        } catch (error:any) {
            console.log(`error ${JSON.stringify(error)}`);
        }
    }

    const newChapters = serializeNonPOJOs(chapterUpdates);
    const newNovels = serializeNonPOJOs(newestNovels.items);
    return { newChapters, newNovels };
}) satisfies PageServerLoad;
