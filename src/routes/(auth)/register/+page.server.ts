import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
    register: async ({ locals, request }) => {
        const formData = await request.formData();
        const data = Object.fromEntries([...formData]);

        if (data.password.toString().length < 5) {
            return {
                error: true,
                message: "Password needs at least 5 characters!",
                data: {
                    username: data.username,
                    email: data.email,
                },
            }
        }

        if (data.password !== data.passwordConfirm) {
            return {
                error: true,
                message: "Confirm password doesn't match!",
                data: {
                    username: data.username,
                    email: data.email,
                },
            }
        }

        try {
            await locals.pb.collection('users').create(data);
            locals.pb.authStore.clear();
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

        throw redirect(303, '/login');
    },
};