import { PB_FILES_URL } from '$env/static/private';
import type { Chapter } from '$lib/models/chapter';
import type { Novel } from '$lib/models/novel';
import type { PageServerLoad } from './$types';


export const load = (async ({ locals, params, url }) => {
    const novelId = params.id;
    const sort = url.searchParams.get('sort') || 'newest';
    const page = parseInt(url.searchParams.get('page') || '1');
    let bookmark;

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

    if (locals.user) {
        bookmark = await locals.pb.collection('bookmarks').getList(1, 1, {
            filter: `novel = '${novelId}' && user = '${locals.user.id}'`
        });

        const ownedChapters = await locals.pb.collection('ownedChapters').getFullList({
            filter: `chapter.novel.id = '${novel.id}' && user = '${locals.user.id}'`,
            sort: '-chapter'
        });

        chapters.items = chapters.items.map((chapter) => {
            for (const ownedChapter of ownedChapters) {
                if (chapter.id === ownedChapter.chapter) {
                    chapter.isOwned = true;
                    return chapter;
                }

                chapter.isOwned = false;
            }
            return chapter;
        });
    }

    return {
        userId: locals.user,
        novel: novel,
        chapters: chapters,
        bookmark: bookmark ? bookmark.items[0] : null,
    };
}) satisfies PageServerLoad;