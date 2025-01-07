import type { User } from '$lib/models/user';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, params }) => {
    let user:User;
    let profileOwner:boolean = locals.user.id === params.id;
    
    if (!profileOwner) {
        user = await locals.pb.collection('users').getOne(params.id);
    }
    else {
        user = locals.user;
    }

    const novels = await locals.pb.collection('novels').getList(1, 10, {
        filter: `author.id = '${user.id}'`
    });

    return { user, novels, profileOwner };
}) satisfies PageServerLoad;