import { getContext, setContext } from 'svelte';
import { writable, type Writable } from 'svelte/store';
import { persisted } from 'svelte-persisted-store';

type Options = {
	persistValue: boolean;
};

export type PersistedContext<T> = {
	init: (value: T) => Writable<T>;
	get: () => Writable<T>;
};

export const persistedContext = <T>(
	key: string,
	{ persistValue = false }: Partial<Options> = {}
): PersistedContext<T> => {
	const keySymbol = Symbol(key);
	return {
		init: (value) => {
			let store: Writable<T>;

			if (persistValue) {
				store = persisted(key, value);
			} else {
				store = writable(value);
			}

			const val = setContext(keySymbol, store);

			return val;
		},
		get: () => getContext(keySymbol)
	};
};
