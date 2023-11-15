import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ locals }) => {

	if (!locals.professional) {
		throw redirect(301, '/signup')
	}

	return { professional: locals.professional }
}
