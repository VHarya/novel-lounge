import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals }) => {
    if (!locals.user) {
        return {}
    }

    return {
        user: locals.user,
        balance: locals.balance
    }
};
