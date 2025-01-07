import type { Pricing } from '$lib/models/pricing';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
    const pricings = await locals.pb.collection('pricings').getList<Pricing>(1, 5);
    return { pricings };
}) satisfies PageServerLoad;