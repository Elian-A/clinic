import { db } from "$lib/server/db";
import { professionalTable } from "$lib/server/schema";
import type { Handle } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export const handle: Handle = async ({ resolve, event }) => {
	const professionalSession = event.cookies.get('session')

	if (!professionalSession) return resolve(event)

	const user = await db.query.professionalTable.findFirst({ where: eq(professionalTable.sessionToken, professionalSession) })

	if (!user) return resolve(event)

	event.locals = {
		professional: {
			id: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
			specialty: user.specialty,
			rpn: user.rpn,
			email: user.email,
			telephone: user.telephone,
		}
	}

	return resolve(event)
}
