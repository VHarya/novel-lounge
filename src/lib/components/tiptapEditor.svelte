<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
    import Heading from '@tiptap/extension-heading';
	import Paragraph from '@tiptap/extension-paragraph';
	import Bold from '@tiptap/extension-bold';
	import Italic from '@tiptap/extension-italic';
	import Underline from '@tiptap/extension-underline';

    import IconBold from 'phosphor-svelte/lib/TextB';
    import IconItalic from 'phosphor-svelte/lib/TextItalic';
    import IconUnderline from 'phosphor-svelte/lib/TextUnderline';

	interface Props {
		value: string,
		onchange?: (value:string) => {}
	}

	let { value = $bindable(), onchange } : Props = $props();

	let editorElement:any|HTMLDivElement = $state();
	let tiptapEditor:Editor|null = $state(null);
	let loading:boolean = $state(false);

	onMount(() => {
		tiptapEditor = new Editor({
			element: editorElement,
			extensions: [
				StarterKit,
				Heading.configure({
					levels: [ 1, 2, 3 ]
				}),
				Paragraph,
				Bold,
				Italic,
				Underline
			],
			content: value,
			editorProps: {
				attributes: {
					class: 'h-60 min-w-80 min-h-60 max-h-60 p-2 overflow-scroll prose prose-base sm:prose-sm prose-p:mb-2 font-ibm focus:outline-none'
				},
			},
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				tiptapEditor = tiptapEditor;
			},
			onCreate: () => {
				loading = false;
				value = tiptapEditor!.getHTML() || '';
			},
			onUpdate: () => {
				value = tiptapEditor!.getHTML() || '';
			},
		});
	});

	onDestroy(() => {
		if (tiptapEditor) {
			tiptapEditor.destroy();
		}
	});
</script>

{#if loading}
	<div class="h-60 min-w-[40rem]"></div>
{:else}
	<div class="h-full min-w-80 min-h-60 flex flex-col rounded-md overflow-hidden">
		<div class="h-14 flex bg-background-alt/70">
			{#if tiptapEditor}
				<select class="ml-2 my-2 pl-2 py-2 rounded text-sm bg-foreground border-none">
					<option onclick={() => { tiptapEditor!.chain().focus().setHeading({ level: 1 }).run(); }}>
						Heading 1
					</option>
					<option onclick={() => { tiptapEditor!.chain().focus().setHeading({ level: 2 }).run(); }}>
						Heading 2
					</option>
					<option onclick={() => { tiptapEditor!.chain().focus().setHeading({ level: 3 }).run(); }}>
						Heading 3
					</option>
					<option onclick={() => { tiptapEditor!.chain().focus().setParagraph().run(); }} selected>
						Body
					</option>
				</select>
				<button
					type="button"
					onclick={() => tiptapEditor!.chain().focus().toggleBold().run()}
					class:bg-accent={tiptapEditor.isActive('bold')}
					class="my-2 p-2"
				>
					<IconBold size="1.15rem" weight="bold"/>
				</button>
				<button
					type="button"
					onclick={() => tiptapEditor!.chain().focus().toggleItalic().run()}
					class:bg-accent={tiptapEditor.isActive('bold')}
					class="my-2 p-2"
				>
					<IconItalic size="1.15rem" weight="bold"/>
				</button>
				<button
					type="button"
					onclick={() => tiptapEditor!.chain().focus().toggleUnderline().run()}
					class:bg-accent={tiptapEditor.isActive('bold')}
					class="my-2 p-2"
				>
					<IconUnderline size="1.15rem" weight="bold"/>
				</button>
			{/if}
		</div>
		
		<div bind:this={editorElement} class="min-h-60 bg-foreground-alt"></div>
	</div>
{/if}
