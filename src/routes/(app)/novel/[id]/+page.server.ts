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
        filter: `novel = '${novelId}'`,
        sort: sort === 'newest' ? '-volumeNumber,-chapterNumber' : 'volumeNumber,chapterNumber',
    });

    return {
        novel: novel,
        chapters: chapters
    };
}) satisfies PageServerLoad;