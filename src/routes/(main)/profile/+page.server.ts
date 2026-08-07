// import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {

	// if (!session) {
	// 	// Adjust to match your sign-in route
	// 	redirect(303, '/login');
	// }

	return {
	user: {
				id: 'usr_mock_01HX8',
				name: 'Juan Dela Cruz',
				email: 'juan.delacruz@example.com',
				image: null as string | null,
				emailVerified: true,
				createdAt: new Date('2024-08-12T08:30:00Z')
			},
			currentSession: {
				ipAddress: '127.0.0.1',
				userAgent:
					'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
				expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
			}
	};
};
