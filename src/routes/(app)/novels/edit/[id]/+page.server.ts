import { PB_FILES_URL } from '$env/static/private';
import type { Category } from '$lib/models/category';
import type { Novel } from '$lib/models/novel';
import { convertFilenameToFileURL } from '$lib/utils';
import type { Actions, PageServerLoad } from './$types';

import { redirect } from '@sveltejs/kit';
import { toast } from 'svelte-sonner';

export const load = (async ({ locals, params }) => {
    const novelId = params.id;

    const initNovel = await locals.pb.collection('novels').getOne<Novel>(novelId);
    if (initNovel.cover) {
        initNovel.cover = convertFilenameToFileURL(PB_FILES_URL, 'novels', initNovel.id, initNovel.cover);
    }

    const categories = await locals.pb.collection('categories').getFullList<Category>({
        sort: "name"
    });

    return { initNovel, categories };
}) satisfies PageServerLoad;

export const actions: Actions = {
    edit: async ({ locals, request, params }) => {
        const novelId = params.id;

        const formData = await request.formData();
        
        let title = formData.get('title') as string;
        let categories = formData.getAll('category[]') as string[];
        let synopsis = formData.get('synopsis') as string;
        let cover = formData.get('cover') as File;

        console.log(`cover: ${cover}`);

        if (title === '') {
            return {
                error: true,
                message: "Title cannot be empty!",
                data: { title, categories, synopsis },
            }
        }

        if (categories.length <= 0) {
            return {
                error: true,
                message: "Choose at least one category!",
                data: { title, categories, synopsis },
            }
        }

        try {
            if (cover) {
                const coverFileExt = cover.name.split('.').pop();
                cover = new File([cover], `${title}.${coverFileExt}`, { type: cover.type });
                console.log(cover);

                await locals.pb.collection('novels').update(novelId, {
                    title: title,
                    author: locals.user.id,
                    categories: categories,
                    synopsis: synopsis,
                    cover: cover,
                });
            } else {
                await locals.pb.collection('novels').update(novelId, {
                    title: title,
                    author: locals.user.id,
                    categories: categories,
                    synopsis: synopsis,
                });
            }
        } catch (err:any) {
            console.log(JSON.stringify(err, Object.getOwnPropertyNames(err)));

            return {
                error: true,
                message: "Something went wrong when saving the data. Check input values.",
                data: { title, categories, synopsis },
            }
        }

        redirect(303, '/my-novels');
    }
};