<script lang="ts">
    import type { PageData } from './$types';

    import { dragscroll } from "@svelte-put/dragscroll";

    import IconPerson from 'phosphor-svelte/lib/UserCircle';
    import IconEye from 'phosphor-svelte/lib/Eye';
    import IconBookmark from 'phosphor-svelte/lib/BookmarkSimple';
    import IconStar from 'phosphor-svelte/lib/Star';
    import IconBookOpen from 'phosphor-svelte/lib/BookOpen';
    import IconFlag from 'phosphor-svelte/lib/Flag';
    import IconError from 'phosphor-svelte/lib/WarningOctagon';

    import PlaceholderImage from '$lib/images/cover-placeholder.png';

    import NovelWithChapterCard from '$lib/components/cardNovelChapter.svelte';
    import NovelCard from '$lib/components/cardNovel.svelte';
    
    let { data }: { data: PageData } = $props();
</script>

<div class="h-fit mb-8">
    <h2 class="mb-4 text-4xl font-lexend">Popular Titles</h2>
    <div class="p-4 relative flex rounded bg-background-alt">
        <div class="h-[20rem] aspect-[5/7]">
            <img src="{PlaceholderImage}" alt="placeholder_image.png" class="h-full w-full rounded">
        </div>
        <div class="h-[20rem] ml-4 flex flex-col">
            <h3 class="text-3xl font-bold">Novel Title</h3>
            <div class="mb-1 flex items-center">
                <IconPerson size={18} weight="bold" />
                <span class="ml-1 text-sm">Writer Name</span>
            </div>
            <div class="flex space-x-2">
                <div class="flex items-center">
                    <IconEye size={16} weight="bold" />
                    <span class="ml-1 text-sm">20k</span>
                </div>
                <div class="flex items-center">
                    <IconBookmark size={16} weight="bold" />
                    <span class="ml-1 text-sm">20k</span>
                </div>
                <div class="flex items-center">
                    <IconStar size={16} weight="bold" />
                    <span class="ml-1 text-sm">20k</span>
                </div>
            </div>
            <p class="my-2 overflow-scroll text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque  non tempor lectus, ac malesuada nunc. Vivamus risus felis, vulputate ut  sodales eu, lobortis nec magna. Suspendisse sagittis felis eget purus  eleifend ultricies ac eu quam. Sed nulla felis, bibendum commodo lacus  vitae, vulputate feugiat est. Proin pellentesque nunc nec nibh  ullamcorper congue. Etiam et viverra ex, sit amet rutrum felis. Mauris  in ligula quis libero condimentum condimentum. Donec imperdiet ipsum eu  odio gravida, eget semper elit malesuada.
                <br>
                Suspendisse ullamcorper id tellus a dignissim. Sed facilisis quis elit a tincidunt. Nunc consequat vulputate elit, eget egestas turpis. Aenean  eu dolor sem. Pellentesque ac nunc tempus, ultrices sem vel, bibendum  elit. Nam vulputate eros quam, at rhoncus turpis condimentum sed.  Curabitur dignissim quis orci at elementum. Curabitur vitae est congue,  malesuada odio a, efficitur lorem. Aliquam erat volutpat. Maecenas  suscipit, dui eget dictum congue, massa ipsum viverra augue, venenatis  dapibus nisi metus eu lorem. Cras fringilla elementum vestibulum. Ut  euismod eleifend nisl, vitae luctus odio ultrices eu. Nullam id  vulputate ex, id scelerisque dolor. Vestibulum ante ipsum primis in  faucibus orci luctus et ultrices posuere cubilia curae; Praesent ut  gravida quam. Suspendisse ut elementum mi.
            </p>
            <div class="flex space-x-2">
                <button class="p-2 flex items-center space-x-1 rounded bg-accent">
                    <IconBookmark size="1.2rem"/>
                    <span>Add to Bookmark</span>
                </button>
                <button class="p-2 flex items-center space-x-1 rounded bg-foreground">
                    <IconBookOpen size="1.2rem"/>
                    <span>Read First Chapter</span>
                </button>
                <button class="p-2 flex items-center space-x-1 rounded bg-foreground">
                    <IconStar size="1.2rem"/>
                    <span>Rate</span>
                </button>
                <button class="p-2 flex items-center space-x-1 rounded bg-foreground">
                    <IconFlag size="1.2rem"/>
                    <span>Report</span>
                </button>
            </div>
        </div>
    </div>
</div>

<div class="flex flex-col">
    <h2 class="mb-4 text-4xl font-lexend">Recently Updated</h2>
    {#if data.newChapters != undefined}
        <div class="max-h-[50rem] grid 3xl:grid-cols-2 3xl:grid-rows-3 grid-cols-1 grid-rows-1 bg-background-alt">
            {#each data.newChapters as item}
                <NovelWithChapterCard novel={item} />
            {/each}
        </div>
    {:else}
        <div class="py-20 flex flex-col justify-center items-center bg-background-alt">
            <IconError size="8rem" weight="light"/>
            <div class="w-[20rem] mt-4 flex flex-col items-center text-center">
                <h2 class="text-xl font-bold">No Updates</h2>
                <p class="text-sm">There's currently no updates yet, make sure to check back soon for any new chapters.</p>
            </div>
        </div>
    {/if}
</div>

<div class="max-w-full mt-16 flex flex-col">
    <h2 class="mb-4 text-4xl font-lexend">Newest Novels</h2>
    <div class="max-w-full w-fit h-fit flex gap-8 overflow-x-scroll overflow-y-hidden" use:dragscroll>
        {#each data.newNovels as item}
            <NovelCard novel={item} />
        {/each}
    </div>
</div>


<style></style>