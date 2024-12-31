<script lang="ts">
    import type { Transaction } from "$lib/models/transaction";

    const { transaction, onclick:onClick } : { transaction:Transaction, onclick:((e:MouseEvent) => any) } = $props();
</script>

<button onclick={onClick} class="p-4 flex flex-col rounded-md bg-foreground-alt hover:bg-foreground">
    <div class="flex justify-between">
        <span class="w-fit px-2 py-1 rounded-sm text-xs font-light bg-white/10">{transaction.id}</span>
        <span class="mb-1 text-sm">{new Date(transaction.created).toISOString().replace('T', ' ').replace('Z', '').split('.')[0]}</span>
    </div>
    <div class="flex items-end space-x-4 text-nowrap">
        <div class="w-full flex flex-col justify-center items-start">
            <h2 class="text-xl font-bold">{transaction.coins} Coins</h2>
            <span>Rp {transaction.price.toLocaleString('id-ID')}</span>
        </div>
        <div class="{transaction.status}-container w-fit pl-2 pr-2.5 py-1.5 flex items-center space-x-1 rounded-full bg-error/10">
            <div class="{transaction.status} h-2.5 aspect-square rounded-full"></div>
            <span class="text-center text-xs font-semibold capitalize">
                {transaction.status === 'settlement' ? 'Successful' : transaction.status}
            </span>
        </div>
    </div>
</button>

<style>
    .cancel, .expire {
        background-color: theme('colors.error');
    }
    .cancel-container, .expire {
        background-color: theme('colors.error/0.45');
    }

    .pending {
        background-color: theme('colors.warning');
    }
    .pending-container {
        background-color: theme('colors.warning/0.45');
    }

    .settlement {
        background-color: theme('colors.success');
    }
    .settlement-container {
        background-color: theme('colors.success/0.45');
    }
</style>
