import { json, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals }) => {
    locals.pb.authStore.clear();
    return redirect(303, '/');
};