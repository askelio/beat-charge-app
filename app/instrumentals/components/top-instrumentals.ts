import axios, { AxiosResponse } from 'axios';
import SpotifyTrack from "@/app/instrumentals/components/ISpotifyTrack";

interface Artist {
    name: string;
}

interface Track {
    id: string;
    name: string;
    artists: Artist[];
    popularity: number;
}

async function getTopInstrumentalBeats(accessToken: string): Promise<SpotifyTrack[]> {
    try {
        // Step 2: Search for instrumental beats
        const searchQuery = 'instrumental beats';
        const response: AxiosResponse = await axios.get('https://api.spotify.com/v1/search', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                q: searchQuery,
                type: 'track',
                market: 'US',
                limit: 50, // Increase limit for more search results
            },
        });


        const instrumentalTracks: SpotifyTrack[] = response.data.tracks.items;


        instrumentalTracks.sort((a: Track, b: Track) => {
            // Sort by popularity (optional, can use any other criteria)
            return b.popularity - a.popularity;
        });

        // Step 4: Retrieve track details
        const topInstrumentalBeats: SpotifyTrack[] = instrumentalTracks.slice(0, 10);

        return topInstrumentalBeats
    } catch (error) {
        console.log('Error:', error);
        return []
    }
}

export default getTopInstrumentalBeats;
