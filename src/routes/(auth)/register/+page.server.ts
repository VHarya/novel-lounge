import { pb } from '$lib/utils/pocketbase';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async ({ request }) => {
        const form = await request.formData();

        const username = form.get('username');
        const firstName = form.get('firstName');
        const lastName = form.get('lastName');
        const email = form.get('email');
        const password = form.get('password');
        const confirmPassword = form.get('confirmPassword');

        let missingFields = false;
        let passwordTooShort = false;
        let confirmPasswordWrong = false;

        if (!username || !firstName || !lastName || !email || !password || !confirmPassword) {
            return fail(400, {
                data: { username, firstName, lastName, email },
                message: "Semua field harus di isi!",
                success: false,
            });
        }
        if (password!.toString().length < 8) {
            return fail(400, {
                data: { username, firstName, lastName, email },
                message: "Kata Sandi minimal memiliki 8 karakter",
                success: false,
            });
        }
        if (confirmPassword !== password) {
            return fail(400, {
                data: { username, firstName, lastName, email },
                message: "Konfirmasi Kata Sandi berbeda dari Kata Sandi",
                success: false,
            });
        }

        try {
            const data = {
                username: username!.toString(),
                firstName: firstName!.toString(),
                lastName: lastName!.toString(),
                email: email!.toString(),
                emailVisibility: false,
                verified: false,
                password: password!.toString(),
                passwordConfirm: confirmPassword!.toString()
            }
    
            const record = await pb.collection('users').create(data);
        } catch (error:any) {
            return fail(error.code, {
                data: { username, firstName, lastName, email },
                message: error.message,
                success: false,
            });
        }

        return {
            data: null,
            message: null,
            success: true,
        };
    },
};