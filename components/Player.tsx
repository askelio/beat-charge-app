"use client";

import usePlayer from "@/hooks/usePlayer";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import useGetSongById from "@/hooks/useGetSongById";
import useGetSpotifySongById from "@/hooks/useGetSpotifySongById";
import PlayerContent from "./PlayerContent";


const Player = () => {
  const player = usePlayer();

  const { song } = useGetSongById(player.activeId);
  const songUrl = useLoadSongUrl(song!);

  const spotifySong = useGetSpotifySongById(player.activeId);
  const spotifySongUrl = spotifySong.song?.song_path;

  if (!song || !songUrl || !player.activeId) {
    if (!spotifySong.song || !spotifySongUrl || !player.activeId) {
      return null;
    }

    return (
        <div
            className="
        fixed
        bottom-0
        bg-black
        w-full
        py-2
        h-[100px]
        px-4
      "
        >
          <PlayerContent key={spotifySongUrl} song={spotifySong.song} songUrl={spotifySongUrl} ifSpotifySong={true}/>
        </div>
    );

  }

  return (
    <div 
      className="
        fixed 
        bottom-0 
        bg-black 
        w-full 
        py-2 
        h-[100px] 
        px-4
      "
    >
      <PlayerContent key={songUrl} song={song} songUrl={songUrl} ifSpotifySong={false}/>
    </div>
  );
}

export default Player;
