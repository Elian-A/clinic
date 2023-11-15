// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			professional: {
				id: number,
				firstName: string,
				lastName: string,
				specialty: string,
				rpn: number,
				email: string,
				telephone: string | null,
			}
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export { };
