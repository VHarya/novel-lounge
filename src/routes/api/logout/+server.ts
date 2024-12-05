import { currentUser, pb } from '$lib/utils/pocketbase';
import { json, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async () => {
    pb.authStore.clear();
    currentUser.set(null);
    return json({ success: true });
};