import { PB_FILES_URL } from '$env/static/private';
import type { Chapter } from '$lib/models/chapter';
import type { Novel } from '$lib/models/novel';
import type { PageServerLoad } from './$types';


export const load = (async ({ locals, params, url }) => {
    const novelId = params.id;
    const sort = url.searchParams.get('sort') || 'newest';
    const page = parseInt(url.searchParams.get('page') || '1');

    const novel = await locals.pb.collection('novels').getOne<Novel>(novelId, {
        expand: 'author'
    });

    if (novel.cover) {
        novel.cover = `${PB_FILES_URL}/novels/${novel.id}/${novel.cover}`;
    }

    const chapters = await locals.pb.collection('chapters').getList<Chapter>(page, 20, {
        filter: `novel.id = '${novelId}'`,
        sort: sort === 'newest' ? '-chapter' : 'chapter',
    });

    const ownedChapters = await locals.pb.collection('ownedChapters').getList(1, 2, {
        filter: `chapter.novel.id = '${novel.id}' && user = '${locals.user.id}'`,
        sort: '-chapter'
    });

    return {
        userId: locals.user,
        novel: novel,
        chapters: {
            ...chapters,
            items: chapters.items.map((chapter) => {
                for (const ownedChapter of ownedChapters.items) {
                    if (chapter.id === ownedChapter.chapter) {
                        chapter.isOwned = true;
                        return chapter;
                    }
    
                    chapter.isOwned = false;
                }
                return chapter;
            }),
        },
    };
}) satisfies PageServerLoad;