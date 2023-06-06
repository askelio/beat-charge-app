"use client";
import {supabase} from "@supabase/auth-ui-shared";
import {useUser} from "@/hooks/useUser";

const Distribute = async () => {


    const { user, subscription } = useUser();
    return (
        <div>
            Chat
        </div>
    )
}

export default Distribute;