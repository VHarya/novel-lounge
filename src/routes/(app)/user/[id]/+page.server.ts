import { PB_FILES_URL } from '$env/static/private';

import type { PageServerLoad } from './$types';
import type { Novel } from '$lib/models/novel';
import type { User } from '$lib/models/user';

import { convertFilenameToFileURL } from '$lib/utils';

export const load = (async ({ locals, params }) => {
    let user:User;
    let profileOwner:boolean = locals.user.id === params.id;
    
    if (!profileOwner) {
        user = await locals.pb.collection('users').getOne(params.id);
    }
    else {
        user = locals.user;
    }

    const novels = await locals.pb.collection('novels').getList<Novel>(1, 10, {
        filter: `author.id = '${user.id}'`
    });

    novels.items = novels.items.map((novel) => {
        if (novel.cover) {
            novel.cover = convertFilenameToFileURL(PB_FILES_URL, 'novels', novel.id, novel.cover);
        } else {
            novel.cover = null;
        }
        
        return novel;
    });

    return { user, novels, profileOwner };
}) satisfies PageServerLoad;