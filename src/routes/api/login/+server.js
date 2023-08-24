import { redirect } from '@sveltejs/kit';

const state = 'hss3uro2hsxfogfq'
console.log("login")
const scope =
	'ugc-image-upload user-modify-playback-state user-read-playback-state user-read-currently-playing user-follow-modify user-follow-read user-read-recently-played user-read-playback-position user-top-read playlist-read-collaborative playlist-modify-public playlist-read-private playlist-modify-private app-remote-control streaming user-read-email user-read-private user-library-modify user-library-read';

export const GET = ({ cookies }) => {
	cookies.set('spotify_auth_state', state);
	const params = {
        client_id: '506558ff37a44221b8ecc78b3150799b',
        redirect_uri: 'http://localhost:5173/api/callback',
        scope,
        state,
        response_type: 'code' 
    };

    const authURL = `https://accounts.spotify.com/authorize?${new URLSearchParams(params)}`;

    throw redirect(307, authURL);
};