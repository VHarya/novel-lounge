import type { Pricing } from '$lib/models/pricing';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
    const pricing = await locals.pb.collection('pricing').getList<Pricing>(1, 5);
    return { pricing };
}) satisfies PageServerLoad;