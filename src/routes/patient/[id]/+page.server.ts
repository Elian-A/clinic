import { db } from "$lib/server/db";
import { eq } from "drizzle-orm";
import type { PageServerLoad } from "./$types";
import { patientTable } from "$lib/server/schema";
import { error, redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ params }) => {
	const id = params.id

	if (!id || isNaN(+id)) {
		throw redirect(303, '/admin')
	}

	const patient = await db.query.patientTable.findFirst({ where: eq(patientTable.id, +id) })

	if (!patient) {
		throw error(404, "Patient Not Found")
	}

	return {
		patient
	}
}
