import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { db } from "$lib/server/db";
import { patientTable } from "$lib/server/schema";

export const load: PageServerLoad = () => { }

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData()
		const firstName = formData.get('firstName')?.toString()
		const lastName = formData.get('lastName')?.toString()
		const address = formData.get('address')?.toString()
		const dni = formData.get('dni')?.toString()
		const telephone = formData.get('telephone')?.toString()
		const birthDate = formData.get('birthDate')?.toString()

		if (!firstName || !lastName || !address || !dni || !birthDate) {
			return fail(400, { invalid: true })
		}

		const [patient] = await db.insert(patientTable).values({
			firstName,
			lastName,
			address,
			dni: +dni,
			birthDate,
			telephone
		}).returning()

		throw redirect(303, `/patient/${patient.id}`)
	}
}
