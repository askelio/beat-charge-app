import { PrettyChatWindow } from "react-chat-engine-pretty";
import axios from "axios";
import {useEffect, useState} from "react";
import {register} from "react-scroll/modules/mixins/scroller";
const ChatsPage = (props: any) => {



    const [result, setResult] = useState('');
    const [chatSecret, setChatSecret] = useState(process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID??'');

    useEffect(() => {
        const REACT_APP_CHAT_ENGINE_PROJECT_ID = process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID??''
        const email = props?.user.email;
        const secret  = props?.user.id;
        const login = async () => {
            try {
                const r = await axios.get("https://api.chatengine.io/users/me/", {
                    headers: {
                        "Project-ID": "449a17c0-5787-4be0-9f16-d3c4491aa969",
                        "User-Name": email,
                        "User-Secret": secret,
                    },
                });
                console.log(r.data)
            } catch (e) {
                console.log(e);
            }
        }

        const register = async () => {
            const REACT_APP_CHAT_ENGINE_PROJECT_ID = process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID??''
            const email = props?.user.email;
            const secret  = props?.user.id;


            try {
                const r = await axios.post(
                    "https://api.chatengine.io/users/",
                    { username: email,email, secret, first_name:email, last_name:email},
                    { headers: { "Private-Key":  "c1ab4a15-ea83-4483-99a5-4c18c9e6b1ab" } }
                );
                console.log(r.data)
            } catch (e) {
                console.log(e);
            }
        }
        register();

    }, [])

    // Fetch this user from Chat Engine in this project!
    // Docs at rest.chatengine.io


    return (
        <div id={'chat-class-id'} style={{ height: "80vh", width: "70vw"}}>
            <PrettyChatWindow
                projectId={"449a17c0-5787-4be0-9f16-d3c4491aa969"}
                username={props.user.email}
                secret={props.user.id}
                style={{ height: "100%"}}
            />
        </div>
    );
};

export default ChatsPage;