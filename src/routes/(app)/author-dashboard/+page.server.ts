import type { Novel } from '$lib/models/novel';
import type { Category } from '$lib/models/category';
import type { PageServerLoad } from './$types';
import { PB_FILES_URL } from '$env/static/private';

export const load = (async ({ locals }) => {
    const novels = await locals.pb.collection('novels').getList<Novel>(1, 10, {
        filter: `author='${locals.user.id}'`,
        expand: 'author',
    });

    // Convert filename to URL dunno why PB doesn't just send the File's URL
    novels.items.map((novel) => {
        if (!novel.cover) {
            return novel.cover;
        }

        novel.cover = `${PB_FILES_URL}/novels/${novel.id}/${novel.cover}`;
    });

    const categories = await locals.pb.collection('categories').getFullList<Category>();

    return { novels, categories };
}) satisfies PageServerLoad;