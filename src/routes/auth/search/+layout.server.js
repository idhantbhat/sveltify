export const load = async ({ cookies, fetch, url }) => {
	const accessToken = cookies.get('access_token');
		return {
            accessToken:accessToken
		};
	}