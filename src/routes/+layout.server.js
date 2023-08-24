export const load = async ({ cookies, fetch, url }) => {
	const accessToken = cookies.get('access_token');
	const refreshToken = cookies.get('refresh_token');
	if (!accessToken) {
		return {
			user: null
		};
	}

	const profileRes = await fetch(`https://api.spotify.com/v1/me`, {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});
	if (profileRes.ok) {
		const profile = await profileRes.json();
		return {
			user: profile,
            accessToken:accessToken
		};
	}}