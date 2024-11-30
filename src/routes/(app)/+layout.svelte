<script lang="ts">
	import Sidebar from "$lib/components/sidebar.svelte";
	import Topbar from "$lib/components/topbar.svelte";

	let { children } = $props();

	let showSidebar = $state(true);
</script>

<div class="max-w-screen flex">
	<Sidebar bind:show={showSidebar} onCloseButtonPressed={() => { showSidebar = false; }}/>
	<div class="w-full flex-1">
		<Topbar bind:sidebarShown={showSidebar} onShowButtonPressed={() => { showSidebar = true; }} />
		{@render children()}
	</div>
</div>