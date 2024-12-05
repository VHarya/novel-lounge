import { pb } from '$lib/utils/pocketbase';
import { fail, json, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async ({ request }) => {
        const data = await request.formData();

        const email = data.get('email');
        const password = data.get('password');
        
        if (!email || !password) {
            return fail(400, {
                data: { email },
                message: "Email harus lengkap!",
                success: false,
            });
        }
        
        try {
            await pb.collection('users').authWithPassword(email!.toString(), password!.toString());
        } catch (error:any) {
            return fail(error.code, {
                data: { email },
                message: error.message,
                success: false,
            })
        }

        return {
            data: null,
            message: null,
            success: true,
        };
    },
};