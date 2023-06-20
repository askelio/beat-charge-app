import axios from "axios";
import queryString from "query-string";



async function getAccessToken(): Promise<string> {
    const clientId = '97d2b1fd02624c528b6c1e09c97b4910';
    const clientSecret = '9bec2f3d6f854a188366d31c759e5318';

    const response = await axios.post(
        'https://accounts.spotify.com/api/token',
        queryString.stringify({
            grant_type: 'client_credentials',
        }),
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
            },
        }
    );

    if (response.status === 200) {
        return response.data.access_token;
    } else {
        throw new Error('Failed to get access token');
    }
}

export default getAccessToken;