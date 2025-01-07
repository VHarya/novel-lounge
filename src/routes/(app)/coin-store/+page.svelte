<script lang="ts">
    import { PUBLIC_MT_CLIENT_KEY } from '$env/static/public';
    import type { PageData } from './$types';

    import { browser } from '$app/environment';
    import { onMount } from 'svelte';
    
    import CardCoins from '$lib/components/cardCoins.svelte';
    import IconCart from 'phosphor-svelte/lib/ShoppingCartSimple';
    import { toast } from 'svelte-sonner';

    let { data }: { data: PageData } = $props();
    const user = data.user;

    let loading:boolean = $state(false);
    let selectedPricing:any = $state();
    let showWarning:boolean = $state(false);
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
    
    async function buyCoin(amount: number, price: number) {
        if (!user) {
            toast.error('To continue you must be logged in!', { class: "bg-error" });
            return;
        }

        loading = true;
        const result = await fetch("/api/transaction/get-token", {
            method: "post",
            body: JSON.stringify({
                coins: amount,
                price: price,
            }),
        })

        if (!result.ok) {
            loading = false;
            toast.error("Failed to get transaction token!", { class: "bg-error" });
            return;
        }

        const data = await result.json();

        if (window.snap && browser) {
            loading = false;
            window.snap.pay(data.token, {
                onSuccess: () => {
                    toast.success("Successfully Purchased!", { class: "bg-success" });
                },
                onPending: () => {
                    console.log("Payment Pending...");
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
                    toast.info("You can find the transactions in Transaction History!");
                }
            });
        }
    }
</script>

{#if loading}
    <div class="w-screen h-screen absolute top-0 left-0 -z-50 bg-black/50"></div>
{/if}

{#if showWarning}
    <div role="button" tabindex="-1" onclick={(e) => showWarning = false} onkeydown={() => {}} class="w-screen h-screen fixed top-0 left-0 flex justify-center items-center cursor-default bg-black/50">
        <div role="button" tabindex="-1" onclick={(e) => e.stopPropagation} onkeydown={() => {}} class="w-fit p-4 flex flex-col items-center cursor-default bg-background-alt">
            <div class="w-fit mb-2 p-2 rounded-full bg-accent/60">
                <div class="p-4 rounded-full bg-accent/80">
                    <IconCart size="2rem"/>
                </div>
            </div>
            <span class="mb-0.5 text-2xl font-bold">Are you sure?</span>
            <p class="mb-4 text-center">
                You will be buying <strong>{selectedPricing.coins} coins</strong>, which costs <strong>{selectedPricing.price}</strong>. <br>
                Do you wish to continue the transaction?
            </p>
            <div class="w-full flex space-x-2">
                <button onclick={() => { selectedPricing = null; showWarning = true; }} class="w-full p-1.5 rounded bg-foreground-alt hover:bg-foreground active:bg-foreground-alt/80">Cancel</button>
                <button onclick={() => buyCoin(selectedPricing.coins, selectedPricing.price)} class="w-full p-1.5 rounded bg-foreground-alt hover:bg-foreground active:bg-foreground-alt/80">Continue</button>
            </div>
        </div>
    </div>
{/if}

<div class="mb-4">
    <h1 class="text-2xl font-bold">Coin Store</h1>
    <p>
        Welcome to the Coin Store!<br>
        Coins are used to buy novel chapters, let's get some!
    </p>
</div>

<div class="flex flex-col space-y-4">
    {#each data.pricings.items as item}
        <CardCoins coin={item.coins} price={item.price} onclick={() => { selectedPricing = item; showWarning = true; }}/>
    {/each}
</div>
