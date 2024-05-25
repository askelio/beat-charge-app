"use client";

import Image from "next/image";

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import PlayButton from "./PlayButton";
import {useUser} from "@/hooks/useUser";
import {useEffect, useState} from "react";
import loading from "@/components/loading";
import axios from "axios";

interface SongItemProps {
  data: Song;
  onClick: (id: string) => void;
}

const SongItem: React.FC<SongItemProps> = ({
  data,
  onClick
}) => {
  const imagePath = useLoadImage(data);
  const user = useUser();
  const [isloading, setIsLoading] = useState(false);

  const [title, setTitle] = useState(data.title);
  const [price, setPrice] = useState(data.price);
  const [email, setEmail] = useState(user.user?.email)
  const [song_id, setSongId] = useState(data.id)
  const [paymentLink, setPaymentLink] = useState('');

  const HandleBuyClick = async () => {
    setIsLoading(true)
    try {

      const response = await axios.post('/api/create-product', {
        title,
        price,
        song_id,
      });
      
      setPaymentLink(response.data.url);
      const url = response.data.url
      if(url) {
        window.open(url)
      }
      
    } catch (error) {
      console.error('Error creating product:', error);
    }
  }

  if (isloading) {
    return loading()
  }

  return ( 
    <div>
      <div
          onClick={() => onClick(data.id)}
          className="
        relative
        group
        flex
        flex-col
        items-center
        justify-center
        rounded-md
        overflow-hidden
        gap-x-4
        bg-neutral-400/5
        cursor-pointer
        hover:bg-neutral-400/10
        transition
        p-3
      "
      >
        <div
            className="
          relative
          aspect-square
          w-full
          h-full
          rounded-md
          overflow-hidden
        "
        >
          <Image
              className="object-cover"
              src={imagePath || '/images/music-placeholder.png'}
              fill
              alt="Image"
          />
        </div>
        <div className="flex flex-col items-start w-full pt-4 gap-y-1">
          <p className="font-semibold truncate w-full">
            {data.title}
          </p>
          <div className="flex justify-between items-center w-full">
            <p
                className="
            text-neutral-400
            text-sm
            truncate
          "
            >
              By {data.author}
            </p>
            <p
                className="
            text-neutral-400
            text-lg
            truncate
            text-[#B87333]
          "
            >
              {data.price}$
            </p>
          </div>

        </div>
        <div
            className="
          absolute
          bottom-24
          right-5
        "
        >
          <PlayButton />
        </div>
      </div>
      <button onClick={()=>{HandleBuyClick()}} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
        Buy
      </button>
    </div>
   );
}
 
export default SongItem;
