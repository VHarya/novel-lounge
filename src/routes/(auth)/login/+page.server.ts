import { pb } from '$lib/utils/pocketbase';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async ({ request }) => {
        const data = await request.formData();

        const email = data.get('email');
        const password = data.get('password');

        let verificationSuccess = false;
        if (email && password) {
            verificationSuccess = true;
        }
        
        if (!verificationSuccess) {
            return fail(400, { email, missing: true })
        }
        
        pb.collection('users').authWithPassword(email!.toString(), password!.toString());

        redirect(300, '/');
    },
};