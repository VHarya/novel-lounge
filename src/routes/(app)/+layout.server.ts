import { currentUser, pb } from "$lib/utils/pocketbase";
import { get } from "svelte/store";
import type { LayoutServerLoad } from "./$types";
import type { User } from "$lib/models/user";

export const load: LayoutServerLoad = async () => {
    const currUser = get(currentUser);

    if (!currUser) return { user: null }

    const user = await pb.collection('users').getOne<User>(currUser!.id);

    return { user }
};