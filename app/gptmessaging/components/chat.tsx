import {useState} from "react";
import {ChatCompletionRequestMessageRoleEnum} from "openai";
import openai from "@/libs/openai";

interface IMsg {
    content: string;
    role: ChatCompletionRequestMessageRoleEnum;
}

type MessageArray = IMsg[]


const ChatMessaging = (e: any, msg:any) => {
    const [message, setMessage] = useState("");
    const [chats, setChats] = useState<MessageArray>([]);
    const [isTyping, setIsTyping] = useState(false);

    const chat = async (e: any, message: any) => {
        e.preventDefault();

        if (!message) return;
        setIsTyping(true);
        scrollTo(0,1e10)

        let msgs:MessageArray = chats;
        msgs.push({ role: ChatCompletionRequestMessageRoleEnum.User, content: message });
        setChats(msgs);

        setMessage("");
        console.log(chats)
        console.log(msgs)
        await openai
            .createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content:
                            "You are a EbereGPT. You can help with graphic design tasks",
                    },
                    ...chats,
                ],
            })
            .then((res) => {
                console.log(res)
                const role = res.data.choices[0].message?.role?
                    ChatCompletionRequestMessageRoleEnum.Assistant:
                    ChatCompletionRequestMessageRoleEnum.Assistant
                const answer = res.data.choices[0].message?.content;

                msgs.push({
                    role: role,
                    content: answer?answer:''});

                setChats([...msgs]);
                setIsTyping(false);
                scrollTo(0,1e10);
                console.log(msg)
                console.log(chats)
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (

        <main className="flex flex-col flex-grow bg-gray shadow-xl rounded-lg overflow-hidden w-3/4">
            <section className="flex flex-col flex-grow p-4 overflow-auto w-full">
                {chats && chats.length ? (
                    chats.map((chat, index) => (
                        <div
                            key={index}
                            className={`${
                                chat.role === "user" ? "bg-green-500" : "bg-gray-400"
                            } text-white max-w-xl rounded-lg py-2 px-4 mb-2 max-w-max ${
                                chat.role === "user" ? "self-end" : "self-start"
                            }`}
                        >
                            <span className="font-semibold">{chat.role.toUpperCase()}</span>
                            <span className="mx-1">:</span>
                            <span>{chat.content}</span>
                        </div>
                    ))
                ) : (
                    <p>No chats available.</p>
                )}
            </section>

            <div className={`py-2 text-gray-500 ${isTyping ? "" : "hidden"}`}>
                <p>
                    <i>{isTyping ? "Typing" : ""}</i>
                </p>
            </div>

            <form action="" onSubmit={(e) => chat(e, message)} className="flex items-center h-14 w-full rounded px-3 text-sm">
                <input
                    type="text"
                    name="message"
                    value={message}
                    placeholder="Type a message here and hit Enter..."
                    className="bg-gray-100 rounded-md p-2 w-full text-black h-14"
                    onChange={(event) => setMessage(event.target.value)}
                />
            </form>
        </main>

    )
}

export default ChatMessaging;