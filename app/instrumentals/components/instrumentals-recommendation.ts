import axios from 'axios';
import queryString from 'query-string';
import getAccessToken from "@/app/instrumentals/components/getAccessToken";
import {toast} from "react-hot-toast";
import {Song} from "@/types";
import SpotifyTrack from "@/app/instrumentals/components/ISpotifyTrack";
interface Artist {
    name: string;
}

async function getInstrumentalBeatsRecommendation(songs: Song[]): Promise<SpotifyTrack[]> {
    try {
        // Step 2: Search for instrumental beats
        const seedTracks = songs.map((song)=> song.id); // Replace with actual track IDs or adjust as needed

        const response = await axios.get('https://api.spotify.com/v1/recommendations', {
            headers: {
                Authorization: `Bearer ${await getAccessToken()}`,
            },
            params: {
                seed_tracks: `4AgWxBw5eaCqBDc5zpFCys,1Q86rVd7lXXZ63qf0cUx8M`,
                market: 'US',
                limit: 40,
            },
        });

        const instrumentalTracks: SpotifyTrack[] = response.data.tracks;

        const topInstrumentalBeats: SpotifyTrack[] = instrumentalTracks.slice(0, 40);
        return topInstrumentalBeats
    } catch (error) {
        console.log('Error:', error);
        return []
    }
}

export default getInstrumentalBeatsRecommendation;

