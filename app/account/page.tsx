"use client"
import Header from "@/components/Header";

import AccountContent from "./components/AccountContent";
import {useUser} from "@/hooks/useUser";
import {getUserData} from "@/actions/getUserDataById";
import {useEffect, useState} from "react";

import {Song, UserDetails} from "@/types";
import {getSongsPurchasesByUserId} from "@/actions/getSongsPurchasesByUserId";
import Library from "@/components/Library";
import MediaItem from "@/components/MediaItem";
import LikeButton from "@/components/LikeButton";
import useOnPlay from "@/hooks/useOnPlay";

const Account = () => {
  const { user, subscription } = useUser();
  const [userData, setUserData] = useState<UserDetails|''>();
  const [songPurchases, setSongPucrases] = useState<Song[]>([])
  const onPlay = useOnPlay(songPurchases);
  useEffect(()=>{
    const data = async () => {
      const id = user?.id?user.id:''
      const data:UserDetails[] = await getUserData(id);
      setUserData(data[0])
      const songPurchases: Song[] = await getSongsPurchasesByUserId(id)
      setSongPucrases(songPurchases)
    }
    data()
  }, [])


  return (
    <div 
      className="
        bg-neutral-900 
        rounded-lg 
        h-full 
        w-full 
        overflow-hidden 
        overflow-y-auto
      "
    >
      <Header className="from-bg-neutral-900">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-white text-3xl font-semibold">
            Account
          </h1>
          <br/>
          <div className="flex">
            <div className="w=1/3">
              <img className="ml-14 rounded-full w-44 h-44" src={userData?userData.avatar_url:'no'}/>
              <br/>
              <h1 className="ml-20">
                {userData?userData.full_name:'no'}
              </h1>
              <br/>
              <AccountContent />
            </div>
            <div className="w-full pl-8">
              <h1>
                Purchases
              </h1>
              <br/>
              {songPurchases.map((song: Song) => (
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
          </div>
        </div>
      </Header>
    </div>
  )
}

export default Account;
