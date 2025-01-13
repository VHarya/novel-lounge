import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
    return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
    update: async ({ locals, request, params }) => {
        const formData = await request.formData();

        const username = formData.get('username') as string;
        const firstName = formData.get('first_name') as string;
        const lastName = formData.get('last_name') as string;
        const email = formData.get('email') as string;

        if (!username) {
            return {
                error: true,
                message: "Username can't be empty",
                data: { username, firstName, lastName, email },
            }
        }
        
        try {
            await locals.pb.collection('users').update(params.id, {
                username,
                firstName,
                lastName,
                email,
            });
        } catch (error:any) {
            console.log('Try-Catch Error Message');
            console.log(error);
            return {
                error: true,
                message: "An error occured when trying to save data",
                data: { username, firstName, lastName, email },
            }
        }

        return redirect(303, `/user/${params.id}`);
    }
};
