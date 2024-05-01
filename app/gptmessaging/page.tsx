"use client";
import Header from "@/components/Header";
import openai from "@/libs/openai";
import {useState} from "react";
import {ChatCompletionRequestMessageRoleEnum} from "openai";
import ChatMessaging from "@/app/gptmessaging/components/chat";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import {useUser} from "@/hooks/useUser";

interface IMsg {
    content: string;
    role: ChatCompletionRequestMessageRoleEnum;
}

type MessageArray = IMsg[]



const GptMessaging = () => {
    const { subscription, user } = useUser();
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

            </Header>
            <div className="mb-2 flex flex-col gap-y-6 items-center justify-center h-3/4 w-full">
                <h1>Chat Assistant</h1>
                <ChatMessaging/>
            </div>

        </div>
    );
}

export default GptMessaging;