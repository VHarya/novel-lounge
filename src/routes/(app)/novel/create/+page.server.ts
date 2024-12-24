import type { Category } from '$lib/models/category';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { toast } from 'svelte-sonner';

export const load = (async ({ locals }) => {
    const categories = await locals.pb.collection('categories').getFullList<Category>({
        sort: "name"
    });
    return { categories };
}) satisfies PageServerLoad;

export const actions: Actions = {
    create: async ({ locals, request }) => {
        const formData = await request.formData();
        
        let title = formData.get('title') as string;
        let categories = formData.getAll('category[]') as string[];
        let synopsis = formData.get('synopsis') as string;
        let cover = formData.get('cover') as File;

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

                await locals.pb.collection('novels').create({
                    title: title,
                    author: locals.user.id,
                    categories: categories,
                    synopsis: synopsis,
                    cover: cover,
                });
            } else {
                await locals.pb.collection('novels').create({
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
                message: "Something went wrong when saving data.",
                data: { title, categories, synopsis },
            }
        }

        redirect(303, '/my-novels');
    }
};