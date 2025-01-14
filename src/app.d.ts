import type { Balance } from '$lib/models/balance';
import type { User } from '$lib/models/user';
import PocketBase from 'pocketbase';
import User from '$lib/models/user';
import Midtrans from 'midtrans-client';

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			pb: PocketBase,
			user: User|null,
			balance: Balance|null,
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
	interface Window {
		snap: any,
	}
	declare module 'midtrans-client';
}


export {};
