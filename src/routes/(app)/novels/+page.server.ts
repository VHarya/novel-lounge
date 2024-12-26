import type { Category } from '$lib/models/category';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
    const categories = await locals.pb.collection('categories').getFullList<Category>();
    return { categories };
}) satisfies PageServerLoad;

export const actions: Actions = {
    filter: () => {
        // 
    }
};
