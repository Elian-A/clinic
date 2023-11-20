import { db } from "$lib/server/db"
import { patientTable } from "$lib/server/schema"
import { error, json, type RequestHandler } from "@sveltejs/kit"
import { eq } from "drizzle-orm"

export const GET: RequestHandler = async ({ params }) => {
	// TODO: Add authorization if necesary
	const dni = params.dni
	if (!dni || isNaN(+dni)) {
		throw error(400, "Invalid input, must be a number")
	}

	const patient = await db.query.patientTable.findFirst({ where: eq(patientTable.dni, +dni) })
	if (!patient) {
		throw error(404, "Not found")
	}

	return json(patient)
}
