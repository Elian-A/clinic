import { redirect } from "@sveltejs/kit"
import type { Actions } from "./$types"

export const load = () => {
	throw redirect(302, '/professional')
}

export const actions: Actions = {
	default: ({ cookies }) => {
		cookies.delete('session')
		throw redirect(302, '/signup')
	}
}
