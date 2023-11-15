import bcrypt from 'bcrypt';
import { db } from '$lib/server/db';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { professionalTable } from '$lib/server/schema';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = ({ locals }) => {
	if (locals.professional) throw redirect(302, '/professional')
};

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const firstName = formData.get('firstName')?.toString();
		const lastName = formData.get('lastName')?.toString();
		const email = formData.get('email')?.toString();
		const password = formData.get('password')?.toString();
		const specialty = formData.get('specialty')?.toString();
		const rpn = formData.get('rpn')?.toString();
		const telephone = formData.get('telephone')?.toString();

		//TODO: Proper validation with zod
		if (
			!email ||
			!password ||
			!specialty ||
			!rpn ||
			!firstName ||
			!lastName
		) {
			return fail(403, { required: true });
		}

		try {
			const existentUser = await db.query.professionalTable.findFirst({
				where: eq(professionalTable.email, email), columns: {
					email: true
				}
			})

			if (existentUser) {
				return fail(400, { exist: true })
			}
			await db.insert(professionalTable).values({
				firstName: firstName,
				lastName: lastName,
				email: email,
				hashPassword: await bcrypt.hash(password, 10),
				specialty: specialty,
				rpn: +rpn,
				sessionToken: crypto.randomUUID(),
				telephone: telephone
			});
		} catch (error) {
			console.error(error)
			return fail(403, { server: true })
		}


		throw redirect(302, '/login')
	}
};
