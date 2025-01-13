<script lang="ts">
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();
</script>

<a href="/user/{data.user.id}">Go Back</a>
<h1 class="mb-6 text-3xl font-bold">Edit Profile</h1>

<form action="?/update" method="post" class="flex flex-col space-y-4">
    <div class="w-full flex flex-col">
        <label for="username" class="mb-1 font-semibold">Username</label>
        <input type="text" name="username" class=" border-none rounded-md bg-foreground-alt">
    </div>

    <div class="w-full flex space-x-4">
        <div class="w-full flex flex-col">
            <label for="first_name" class="mb-1 font-semibold">First Name</label>
            <input type="text" name="first_name" class=" border-none rounded-md bg-foreground-alt">
        </div>
        <div class="w-full flex flex-col">
            <label for="last_name" class="mb-1 font-semibold">Last Name</label>
            <input type="text" name="last_name" class=" border-none rounded-md bg-foreground-alt">
        </div>
    </div>
    
    <div class="w-full flex flex-col">
        <label for="email" class="mb-1 font-semibold">Email</label>
        <input type="text" name="email" class=" border-none rounded-md bg-foreground-alt">
    </div>
    
    <button type="submit" class="p-2 rounded bg-accent">Save Changes</button>
</form>