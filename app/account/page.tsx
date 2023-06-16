"use client"
import Header from "@/components/Header";

import AccountContent from "./components/AccountContent";
import {useUser} from "@/hooks/useUser";
import {getUserData} from "@/actions/getUserDataById";
import {useEffect, useState} from "react";

import {UserDetails} from "@/types";

const Account = () => {
  const { user, subscription } = useUser();
  const [userData, setUserData] = useState<UserDetails|''>();
  useEffect(()=>{
    const data = async () => {
      const id = user?.id?user.id:''
      const data:UserDetails[] = await getUserData(id);
      setUserData(data[0])
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
        </div>
      </Header>
      <AccountContent />
      <h1>
        UserName: {userData?userData.full_name:'no'}
      </h1>
      <img src={userData?userData.avatar_url:'no'}/>
      <h1>
        Purchases
      </h1>
    </div>
  )
}

export default Account;
