import { writable } from 'svelte/store';

export default function buildStore<A>(initialValue: A, key: string) {
	const store = writable(initialValue);

	store.subscribe((value) => {
		try {
			// Save to local storage
			window.localStorage.setItem(key, JSON.stringify(value));
		} catch (error) {
			// A more advanced implementation would handle the error case
			console.log('LocalStorage Flush Error', error);
		}
	});

	return store;
}
