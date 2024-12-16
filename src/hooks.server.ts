import PocketBase from 'pocketbase';
import { redirect, type Handle } from '@sveltejs/kit';
import { PB_URL, PB_FILES_URL } from '$env/static/private';

export const handle: Handle = async ({ event, resolve }) => {
    event.locals.pb = new PocketBase(PB_URL);
    event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

    if (event.locals.pb.authStore.isValid) {
        event.locals.user = event.locals.pb.authStore.record;
        if (!event.locals.user.avatar.startsWith(PB_FILES_URL)) {
            event.locals.user.avatar = `${PB_FILES_URL}/${event.locals.pb.authStore.record!.collectionId}/${event.locals.user.id}/${event.locals.user.avatar}`;
        }
    }
    else {
        event.locals.user = null;
    }

    // URL Validation
    if (event.url.pathname.startsWith('/login') || event.url.pathname.startsWith('/register')) {
        if (event.locals.user) {
            throw redirect(303, '/');
        }
    }
    if (event.url.pathname.startsWith('/author-dashboard')) {
        if (!event.locals.user) {
            throw redirect(303, '/');
        }
    }

    
	const response = await resolve(event);

    response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie({ secure: false }))

	return response;
};
