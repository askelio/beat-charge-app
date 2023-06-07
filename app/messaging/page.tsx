"use client";
import {supabase} from "@supabase/auth-ui-shared";
import {useUser} from "@/hooks/useUser";
import Header from "@/components/Header";
import ChatPage from "@/app/messaging/components/chatPage";

const Distribute = async () => {

    const { user, subscription } = useUser();
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
                        <ChatPage user={user} />
                        {process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID}
                    </h1>
                </div>
            </Header>
        </div>
    );
}

export default Distribute;