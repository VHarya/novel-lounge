import type { Category } from '$lib/models/category';
import type { Novel } from '$lib/models/novel';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, url }) => {
    let form;
    
    const paramTitle = url.searchParams.get('title');
    const paramCategories = url.searchParams.get('categories');
    const paramRelease = url.searchParams.get('release-date');
    const paramSort = url.searchParams.get('sort');

    const categories = await locals.pb.collection('categories').getFullList<Category>();
    
    let novels;
    const novelSort = paramSort === 'oldest' ? 'created' : '-created';
    if (!paramTitle && !paramCategories && !paramRelease) {
        novels = await locals.pb.collection('novels').getList<Novel>(1, 15, {
            sort: novelSort,
            expand: 'author',
        });
    } else {
        let filter = '';
        if (paramTitle) filter = `title ~ '${paramTitle}' `;
        if (paramRelease) filter += `${filter ? '&& ' : ''}created ~ '${paramRelease}' `;
        if (paramCategories) {
            const categoryFilter = paramCategories.split(',').map((category) => `categories.id ?= '${category}'`).join(' && ');
            filter += `${filter ? '&& ' : ''}(${categoryFilter})`;
        }

        novels = await locals.pb.collection('novels').getList<Novel>(1, 15, {
            filter: filter,
            sort: novelSort,
            expand: 'author',
        });
    }

    form = {
        title: paramTitle,
        categories: paramCategories?.split(','),
        releaseDate: paramRelease,
        sort: paramSort,
    }

    return { categories, novels, form };
}) satisfies PageServerLoad;
