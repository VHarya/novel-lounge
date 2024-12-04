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
            missingFields = true;
        }
        if (password!.toString().length < 8) {
            passwordTooShort = true;
        }
        if (password !== confirmPassword) {
            confirmPasswordWrong = true
        }
        if (missingFields || passwordTooShort || confirmPasswordWrong) {
            return fail(400, { username, firstName, lastName, email, errors: { missingFields, passwordTooShort, confirmPasswordWrong } });
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
        } catch (error) {
            console.log(error);
            return fail(500, { username, firstName, lastName, email, errors: { missingFields, passwordTooShort, confirmPasswordWrong } });
        }

        // return redirect(300, '/login?new=true');
        return { success: true };
    },
};