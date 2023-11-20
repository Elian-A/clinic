import bcrypt from 'bcrypt';
import { db } from '$lib/server/db';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { eq } from 'drizzle-orm';
import { professionalTable } from '$lib/server/schema';

export const load: PageServerLoad = ({ locals }) => {
	if (locals.professional) throw redirect(302, '/professional')
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const email = formData.get('email')?.toString();
		const password = formData.get('password')?.toString();

		//TODO: Proper validation with zod
		if (!email || !password) return fail(403, { required: true });

		const professional = await db.query.professionalTable.findFirst({
			where: eq(professionalTable.email, email), columns: {
				hashPassword: true,
			}
		})

		if (!professional) {
			return fail(400, { invalid: true })
		}

		try {
			bcrypt.compare(password, professional.hashPassword)
			const [newProfessional] = await db.update(professionalTable).set({
				sessionToken: crypto.randomUUID()
			}).where(eq(professionalTable.email, email)).returning()

			cookies.set("session", newProfessional.sessionToken, {
				path: '/',
				maxAge: 60 * 60 * 24
			})
		} catch (error) {
			console.error(error)
			return fail(400, { server: true })
		}
		throw redirect(302, '/professional')

	}
};
