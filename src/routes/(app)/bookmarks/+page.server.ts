import { PB_FILES_URL } from '$env/static/private';
import type { PageServerLoad } from './$types';
import type { Category } from '$lib/models/category';
import { convertFilenameToFileURL } from '$lib/utils';

export const load = (async ({ locals, url }) => {
    const paramTitle = url.searchParams.get('title');
    const paramCategories = url.searchParams.get('categories');
    const paramRelease = url.searchParams.get('release-date');
    const paramSort = url.searchParams.get('sort');

    const categories = await locals.pb.collection('categories').getFullList<Category>();
    
    let bookmarks;
    let filter = '';
    
    if (paramTitle) {
        filter = `novel.title ~ '${paramTitle}' `;
    }
    if (paramRelease) {
        filter += `${filter ? '&&' : ''} novel.created ~ '${paramRelease}' `;
    }
    if (paramCategories) {
        const categoryFilter = paramCategories.split(',').map((category) => `novel.categories.id ?= '${category}'`).join(' && ');
        filter += `${filter ? '&&' : ''} (${categoryFilter})`;
    }

    bookmarks = await locals.pb.collection('bookmarks').getList(1, 15, {
        filter: filter,
        sort: paramSort === 'oldest' ? 'created' : '-created',
        expand: 'novel',
    });

    if (bookmarks.totalItems > 0) {
        bookmarks.items = bookmarks.items.map((bookmark) => {
            let novel = bookmark.expand?.novel;
    
            if (novel.cover) {
                bookmark.expand!.novel.cover = convertFilenameToFileURL(PB_FILES_URL, 'novels', novel.id, novel.cover);
            }
            else {
                bookmark.expand!.novel.cover = null;
            }

            return bookmark;
        });
    }

    return {
        categories,
        bookmarks,
        paramData: {
            paramTitle,
            paramCategories: paramCategories ? paramCategories.split(',') : [],
            paramRelease,
            paramSort,
        },
    };
}) satisfies PageServerLoad;