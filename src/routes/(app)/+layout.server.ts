import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals }) => {
    const user = locals.user;
    if (user) {
        const wallet = await locals.pb.collection('wallet').getFirstListItem(`user.id = '${user.id}'`);
        return { user, wallet }
    }
    return { user }
};
