"use client";
import {supabase} from "@supabase/auth-ui-shared";
import {useUser} from "@/hooks/useUser";
import Header from "@/components/Header";
import ChatPage from "@/app/messaging/components/chatPage";
import useSubscribeModal from "@/hooks/useSubscribeModal";

const Distribute = async () => {

    const { user, subscription } = useUser();
    const subscribeModal = useSubscribeModal();
    if (!subscription) {
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
                <Header className="from-bg-neutral-900  h-full">
                    <div className="flex mb-2 flex flex-col gap-y-6 align-middle text-center">
                        <h1 className="text-white text-3xl font-semibold mt-24 justify-center align-center">
                            Subscribe please to use this feature
                        </h1>
                    </div>
                </Header>
            </div>
        );
    }

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
                    </h1>
                </div>
            </Header>
        </div>
    );
}

export default Distribute;