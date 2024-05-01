import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";

import { Song } from "@/types";

import getSongs from "./getSongs";

const getSongsByCategory = async (category: string): Promise<Song[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    if (!category) {
        const allSongs = await getSongs();
        return allSongs;
    }

    const { data, error } = await supabase
        .from('songs')
        .select('*')
        .ilike('category', `%${category}%`)
        .order('created_at', { ascending: false })

    if (error) {
        console.log(error.message);
    }

    return (data as any) || [];
};

export default getSongsByCategory;
