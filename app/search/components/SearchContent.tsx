"use client";

import { Song } from "@/types";
import MediaItem from "@/components/MediaItem";
import LikeButton from "@/components/LikeButton";
import useOnPlay from "@/hooks/useOnPlay";


interface SearchContentProps {
  songs: Song[];
}

const SearchContent: React.FC<SearchContentProps> = ({
  songs
}) => {
  const onPlay = useOnPlay(songs);

  if (songs.length === 0) {
    return (
      <div 
        className="
          flex 
          flex-col 
          gap-y-2 
          w-full 
          px-6 
          text-neutral-400
        "
      >
        No songs found.
      </div>
    )
  }
  // flex flex-col gap-y-2 w-full px-6
  return (
    <div className="overflow-y-scroll scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-200 history-scroll-bar">
      <style>
        {`.history-scroll-bar {
          height: 30%;
          padding: 24px;
        }`}
      </style>

      {songs.map((song: Song) => (
        <div
          key={song.id}
          className="flex items-center gap-x-4 w-full"
        >
          <div className="flex-1">
            <MediaItem
              onClick={(id: string) => onPlay(id)}
              data={song}
            />
          </div>
          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  );
}
 
export default SearchContent;