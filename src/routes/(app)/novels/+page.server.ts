import type { PageServerLoad } from './$types';

import type { Category } from '$lib/models/category';
import type { Novel } from '$lib/models/novel';
import { convertFilenameToFileURL } from '$lib/utils';
import { PB_FILES_URL } from '$env/static/private';

export const load = (async ({ locals, url }) => {
    const paramTitle = url.searchParams.get('title');
    const paramCategories = url.searchParams.get('categories');
    const paramRelease = url.searchParams.get('release-date');
    const paramSort = url.searchParams.get('sort');

    const categories = await locals.pb.collection('categories').getFullList<Category>();
    
    let novels;
    const novelSort = paramSort === 'oldest' ? 'created' : '-created';
    
    let filter = '';
        
    if (paramTitle) {
        filter = `title ~ '${paramTitle}' `;
    }
    if (paramRelease) {
        filter += `${filter ? '&& ' : ''}created ~ '${paramRelease}' `;
    }
    if (paramCategories) {
        const categoryFilter = paramCategories.split(',').map((category) => `categories.id ?= '${category}'`).join(' && ');
        filter += `${filter ? '&& ' : ''}(${categoryFilter})`;
    }

    novels = await locals.pb.collection('novels').getList<Novel>(1, 15, {
        filter: filter,
        sort: novelSort,
        expand: 'author',
    });

    novels.items = novels.items.map((novel) => {
        if (novel.cover) {
            novel.cover = convertFilenameToFileURL(PB_FILES_URL, 'novels', novel.id, novel.cover);
        }
        else {
            novel.cover = null
        }

        return novel;
    });

    return {
        categories,
        novels,
        paramData: {
            paramTitle,
            paramCategories: paramCategories ? paramCategories.split(',') : [],
            paramRelease,
            paramSort
        },
    };
}) satisfies PageServerLoad;
