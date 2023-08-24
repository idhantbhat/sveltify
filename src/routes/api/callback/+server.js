import { error, redirect } from '@sveltejs/kit';
console.log('callback')
export const GET= async ({ url, cookies, fetch }) => {
	const code = url.searchParams.get('code') || null;
	const state = url.searchParams.get('state') || null;

	const storedState = cookies.get('spotify_auth_state') || null;

	if (state === null || state !== storedState) {
		throw error(400, 'State Mismatch!');
	}

	const response = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: `Basic ${Buffer.from(
				`506558ff37a44221b8ecc78b3150799b:e69c918a770f4752b7e096a74305580e`
			).toString('base64')}`
		},
		body: new URLSearchParams({
			code: code || '',
			redirect_uri: `http://localhost:5173/api/callback`,
			grant_type: 'authorization_code',
			client_id: '506558ff37a44221b8ecc78b3150799b'
		})
	});
	const responseJSON = await response.json();

	if (responseJSON.error) {
		throw error(400, responseJSON.error_description);
	}

	cookies.delete('spotify_auth_state');
	cookies.set('refresh_token', responseJSON.refresh_token, { path: '/' });
	cookies.set('access_token', responseJSON.access_token, { path: '/' });

	throw redirect(303, '/');
};