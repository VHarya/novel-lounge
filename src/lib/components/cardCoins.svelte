<script lang="ts">
    const { coin, price, onclick: onClick }: {coin:number, price:number, onclick:Function} = $props();
</script>

<div class="p-4 flex justify-between items-center rounded bg-foreground-alt">
    <div class="flex flex-col justify-center">
        <span class="text-xl font-bold">{coin.toLocaleString()} Coins</span>
        <span>Rp {price.toLocaleString()},-</span>
    </div>
    <button type="button" onclick={(e:MouseEvent) => onClick(e)} class="px-4 py-1 rounded font-bold bg-accent">Buy Coins</button>
</div>
