import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import getAccessToken from "@/app/instrumentals/components/getAccessToken";
import { Song } from "@/types";
import axios from "axios";

const useGetSpotifySongById = (id?: string) => {
    const [isLoading, setIsLoading] = useState(false);
    const [song, setSong] = useState<Song | undefined>(undefined);

    useEffect(() => {
        if (!id) {
            return;
        }

        setIsLoading(true);

        const fetchSong = async () => {
            try {
                const accessToken = `Bearer ${await getAccessToken()}`
                const response = await axios.get(`https://api.spotify.com/v1/tracks/${id}`, {
                    headers: {
                        Authorization: accessToken,
                    },
                });

                const song: Song = {
                    id: response.data.id,
                    user_id: '', // Replace with the actual user ID
                    author: response.data.album.artists[0].name,
                    title: response.data.album.name,
                    song_path: response.data.preview_url,
                    image_path: response.data.album.images[0].url,
                    price:""
                };
                setSong(song);
                setIsLoading(false);
            }
            catch (error) {
                setIsLoading(false);
                // return toast.error('Error while receiving spotify song');
            }

        }

        fetchSong();
    }, [id]);

    return useMemo(() => ({
        isLoading,
        song
    }), [isLoading, song]);
};

export default useGetSpotifySongById;
