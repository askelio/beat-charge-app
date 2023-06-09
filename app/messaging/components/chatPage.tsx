import { PrettyChatWindow } from "react-chat-engine-pretty";
import axios from "axios";
import {useEffect, useState} from "react";
import Modal from "@/components/Modal";
const ChatsPage = (props: any) => {


    const email = props?.user?.email;
    const secret  = props?.user?.id;

    useEffect(() => {

        const email = props?.user?.email;
        const first_name = props?.user?.first_name;
        const secret  = props?.user?.id;

        if (!email || !secret) {
            return;
        }

        const login = async () => {
            await axios.get("https://api.chatengine.io/users/me/", {
                headers: {
                    "Project-ID": "449a17c0-5787-4be0-9f16-d3c4491aa969",
                    "User-Name": email,
                    "User-Secret": secret,
                },
            }).catch(()=>{
                register()
            });
        }

        const register = async () => {

            try {
                const r = await axios.post(
                    "https://api.chatengine.io/users/",
                    { username: email,email, secret, first_name:email, last_name:email},
                    { headers: { "Private-Key":  "c1ab4a15-ea83-4483-99a5-4c18c9e6b1ab" } }
                );
            } catch (e) {
                console.log(e);
            }
        }

        login();

    }, [])


    // Fetch this user from Chat Engine in this project!
    // Docs at rest.chatengine.io

    const [isOpen, setIsOpen] = useState(true);

    if (!email || !secret) {
        return (
            <div>
                <Modal
                    isOpen={isOpen}
                       onChange={()=>{setIsOpen(false)}}
                       title={'Chat unavailable'}
                       description={'Sign up or Sign in please to use chat'}>
                </Modal>
            </div>
        )
    }




    return (
        <div id={'chat-class-id'} style={{ height: "80vh", width: "70vw"}}>
            <PrettyChatWindow
                projectId={"449a17c0-5787-4be0-9f16-d3c4491aa969"}
                username={props?.user.email}
                secret={props?.user.id}

                style={{ height: "100%"}}
            />
        </div>
    );
};

export default ChatsPage;