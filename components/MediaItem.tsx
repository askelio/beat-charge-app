"use client";

import Image from "next/image";

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";
import { useState } from "react";
import useDeleteSongById from "@/hooks/useDeleteSongById";

interface MediaItemProps {
  data: Song;
  onClick?: (id: string) => void;
  showDelete?: boolean;
  handleSongsDelete?: (id: any) => void;
}

const MediaItem: React.FC<MediaItemProps> = ({
  data,
  onClick,
  showDelete = false,
  handleSongsDelete = (id) => {},
}) => {
  const player = usePlayer();

  const imageUrl = useLoadImage(data);

  const handleClick = () => {
    if (onClick) {
      return onClick(data.id);
    }

    return player.setId(data.id);
  };

  return (
    <div className="flex">
      <div
        onClick={handleClick}
        className="
        flex 
        items-center 
        gap-x-3 
        cursor-pointer 
        hover:bg-neutral-800/50 
        w-full 
        p-2 
        rounded-md
      "
      >
        <div
          className="
          relative 
          rounded-md 
          min-h-[48px] 
          min-w-[48px] 
          overflow-hidden
        "
        >
          <Image
            fill
            src={imageUrl || "/images/music-placeholder.png"}
            alt="MediaItem"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-y-1 overflow-hidden">
          <p className="text-white truncate">{data.title}</p>
          <p className="text-neutral-400 text-sm truncate">By {data.author}</p>
        </div>
      </div>
      {showDelete && (
        <div
          className="w-fit h-fit"
          style={{
            marginLeft: "auto",
            backgroundColor: "brown",
            borderRadius: "4px",
            padding: "4px",
          }}
        >
          <button
            className=""
            style={{ margin: "0px", height: "57px", width: "25px" }}
            onClick={(id) => handleSongsDelete(id)}
          >
            <img
              src="https://img.icons8.com/?size=100&id=85194&format=png&color=000000"
              alt="trash"
              style={{
                width: "25px",
                height: "25px",
              }}
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default MediaItem;
