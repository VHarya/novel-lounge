<script lang="ts">
    import IconBack from 'phosphor-svelte/lib/ArrowLeft';
    
    import type { ActionData, PageData } from './$types';
    import { toast } from 'svelte-sonner';

    let { data, form }: { data: PageData, form: ActionData } = $props();

    if (form?.error) {
        toast.error(form.message);
    }
</script>

<a href="/user/{data.user.id}" class="w-fit py-2 flex items-center">
    <IconBack class="mr-2"/>
    <span>Go Back</span>
</a>
<h1 class="mb-6 text-3xl font-bold">Edit Profile</h1>

<form action="?/update" method="post" class="flex flex-col space-y-4">
    <div class="w-full flex flex-col">
        <label for="username" class="mb-1 font-semibold">Username</label>
        <input type="text" name="username" value={form?.data.username || data.user.username} required class=" border-none rounded-md bg-foreground-alt">
    </div>

    <div class="w-full flex space-x-4">
        <div class="w-full flex flex-col">
            <label for="first_name" class="mb-1 font-semibold">First Name</label>
            <input type="text" name="first_name" value={form?.data.firstName || data.user.firstName} class=" border-none rounded-md bg-foreground-alt">
        </div>
        <div class="w-full flex flex-col">
            <label for="last_name" class="mb-1 font-semibold">Last Name</label>
            <input type="text" name="last_name" value={form?.data.lastName || data.user.lastName} class=" border-none rounded-md bg-foreground-alt">
        </div>
    </div>
    
    <div class="w-full flex flex-col">
        <label for="email" class="mb-1 font-semibold">Email</label>
        <input type="text" name="email" value={form?.data.email || data.user.email} class=" border-none rounded-md bg-foreground-alt">
    </div>
    
    <button type="submit" class="p-2 rounded bg-accent">Save Changes</button>
</form>