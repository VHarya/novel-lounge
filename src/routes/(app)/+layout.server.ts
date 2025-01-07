import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals }) => {
    if (!locals.user) {
        return {}
    }

    const balance = await locals.pb.collection('balances').getOne(locals.user.balance);
    return { user: locals.user, balance }
};
