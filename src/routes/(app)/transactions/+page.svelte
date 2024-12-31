<script lang="ts">
    import { PUBLIC_MT_CLIENT_KEY } from '$env/static/public';
    
    import type { PageData } from './$types';
    import type { Transaction } from '$lib/models/transaction';
    
    import { browser } from '$app/environment';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

    import CardTransactions from '$lib/components/cardTransactions.svelte';
    import { toast } from 'svelte-sonner';

    let { data }: { data: PageData } = $props();
    
    let idValue: string = $state(data.form.transactionId || '');
    let dateValue: string = $state(data.form.date || '');
    let statusValue: string = $state(data.form.status || '');

    let snapScript:HTMLScriptElement;

    onMount(() => {
        snapScript = document.createElement('script');
        snapScript.src = "https://app.sandbox.midtrans.com/snap/snap.js";
        snapScript.setAttribute("data-client-key", PUBLIC_MT_CLIENT_KEY);
        snapScript.async = true;

        document.body.appendChild(snapScript);

        return () => {
            document.body.removeChild(snapScript);
        }
    })

    function checkTransaction(transaction:Transaction) {
        if (window.snap && browser) {
            window.snap.pay(transaction.snapToken, {
                onSuccess: () => {
                    goto('/transactions');
                },
                onPending: () => {
                    console.log('On Pending');
                },
                onError: (result: any) => {
                    toast.error("An error has occured!", { class: "bg-error" });
                    
                    console.log('----- Original Error Result -----');
                    console.log(result);
                    console.log('');
                    console.log('----- JSON Error Result -----');
                    console.log(JSON.stringify(result));
                },
                onClose: () => {
                    console.log('On Close');
                }
            });
        }
    }
</script>

<h1 class="mb-4 text-4xl font-bold">Transactions</h1>

<form method="get" class="mb-2 flex flex-col items-end">
    <div class="w-full mb-4 flex space-x-4">
        <div class="w-full flex flex-col">
            <label for="transaction-id" class="mb-1">Transaction ID</label>
            <input type="search" name="transaction-id" placeholder="Search transaction id" value={idValue} class="border-none rounded bg-foreground-alt focus:bg-foreground focus:placeholder:text-transparent">
        </div>
        <div class="w-full flex flex-col">
            <label for="date" class="mb-1">Date</label>
            <input type="date" name="date" value={dateValue} class="border-none rounded bg-foreground-alt focus:bg-foreground">
        </div>
        <div class="w-full flex flex-col">
            <label for="status" class="mb-1">Status</label>
            <select name="status" class="border-none rounded bg-foreground-alt focus:bg-foreground">
                <option value="">Include All</option>
                <option value="failure" selected={statusValue === 'failure'}>Failed</option>
                <option value="cancel" selected={statusValue === 'cancel'}>Cancelled</option>
                <option value="expire" selected={statusValue === 'expire'}>Expire</option>
                <option value="pending" selected={statusValue === 'pending'}>Pending</option>
                <option value="settlement" selected={statusValue === 'settlement'}>Success</option>
            </select>
        </div>
        <button type="submit" class="w-fit mt-7 px-4 py-1.5 rounded text-nowrap bg-accent">Apply Filter</button>
    </div>
</form>

{#if data.transactions.totalItems <= 0}
    <div class="min-h-72 py-10 flex flex-col items-center text-center">
        <h2 class="w-80 text-3xl font-bold">No transactions yet...</h2>
        <p class="w-80">There's currently no transactions yet, coin transaction will be recorded here.</p>
    </div>
{:else}
    <div class="min-h-72 flex flex-col space-y-4">
        {#each data.transactions.items as transaction}
            <CardTransactions onclick={() => { checkTransaction(transaction) }} transaction={transaction}/>
        {/each}
    </div>
{/if}
