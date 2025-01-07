<script lang="ts">
    const { coin, price, onclick: onClick }: {coin:number, price:number, onclick:Function} = $props();
</script>

<div class="p-4 flex justify-between items-center rounded bg-foreground-alt">
    <div class="flex flex-col justify-center">
        <span class="text-xl font-bold">{coin.toLocaleString()} Coins</span>
        <span class="text-sm">Rp {price.toLocaleString()},-</span>
    </div>
    <button type="button" onclick={(e:MouseEvent) => onClick(e)} class="px-3 py-1 rounded-full font-medium bg-accent/75 hover:bg-accent">Buy Coins</button>
</div>
