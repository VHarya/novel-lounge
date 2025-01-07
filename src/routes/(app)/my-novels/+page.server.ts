import type { Novel } from '$lib/models/novel';
import type { Category } from '$lib/models/category';
import type { Actions, PageServerLoad } from './$types';
import { PB_FILES_URL } from '$env/static/private';
import { error, redirect } from '@sveltejs/kit';

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

export const actions: Actions = {
    delete: async ({ locals, request }) => {
        const formData = await request.formData();
        const novelId = formData.get('novel-id') as string;

        try {
            if (!novelId) {
                throw error(400, 'Cannot recieve novel id.');
            }

            await locals.pb.collection('delete').delete(novelId!);
        } catch (error:any) {
            return {
                error: true,
                message: error.message || "Something went wrong when saving the data. Check input values."
            }
        }

        redirect(303, '/my-novels');
    }
};