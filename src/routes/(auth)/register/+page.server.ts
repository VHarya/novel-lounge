import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
    register: async ({ locals, request }) => {
        const formData = await request.formData();
        const data = {
            username: formData.get('username') as string,
            firstName: formData.get('firstName') as string,
            lastName: formData.get('lastName') as string,
            email: formData.get('email') as string,
            password: formData.get('password') as string,
            passwordConfirm: formData.get('passwordConfirm') as string,
        };

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
            const user = await locals.pb.collection('users').create(data);

            const balance = await locals.pb.collection('balances').create({
                user: user.id,
                coins: 100,
            });

            const userLogin = await locals.pb.collection('users').authWithPassword(data.email, data.password);

            await locals.pb.collection('users').update(userLogin.record.id, {
                username: user.username,
                balance: balance.id,
            });

            locals.pb.authStore.clear();
        } catch (error:any) {
            console.log("Register PB Error: ", JSON.stringify(error));
            return {
                error: true,
                message: "An error occured when trying to register",
                data: {
                    username: data.username,
                    email: data.email,
                },
            };
        }

        redirect(303, '/login');
    },
};