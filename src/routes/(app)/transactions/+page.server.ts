import type { Transaction } from '$lib/models/transaction';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, url }) => {
    const transactionId = url.searchParams.get('transaction-id');
    const date = url.searchParams.get('date');
    const status = url.searchParams.get('status');

    let filters = `user.id = '${locals.user.id}'`;
    if (transactionId) {
        filters = `${filters} && id = '${transactionId}'`;
    }
    if (date) {
        filters = `${filters} && status = '${date}'`
    }
    if (status) {
        filters = `${filters} && status = '${status}'`
    }

    const transactions = await locals.pb.collection('transactions').getList<Transaction>(1, 10, {
        sort: '-created',
        filter: filters,
    });

    return {
        transactions,
        form: { transactionId, date, status }
    };
}) satisfies PageServerLoad;