import { fail, json, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async ({ locals, request }) => {
        const formData = await request.formData();
        const data = Object.fromEntries([...formData]);

        try {
            await locals.pb.collection('users').authWithPassword(data.email.toString(), data.password.toString());
        } catch (error:any) {
            console.log("PB Error: ", error.response.data);
            return {
                error: true,
                message: error.response.message,
                data: {
                    username: data.username,
                    email: data.email,
                },
            };
        }

        throw redirect(303, '/');
    },
};