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
                    firstName: data.firstName,
                    lastName: data.lastName,
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
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                },
            }
        }

        try {
            const newUser = await locals.pb.collection('users').create(data);

            await locals.pb.collection('balances').create({
                user: newUser.id,
                coins: 100,
            });

            locals.pb.authStore.clear();
        } catch (error:any) {
            console.log("PB Error: ", JSON.stringify(error));
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