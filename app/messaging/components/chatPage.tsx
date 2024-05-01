import { PrettyChatWindow } from "react-chat-engine-pretty";
import axios from "axios";
import {useEffect, useState} from "react";
import Modal from "@/components/Modal";
import {getUserData} from "@/actions/getUserDataById";
import {UserDetails} from "@/types";
const ChatsPage = (props: any) => {


    const email = props?.user?.email;
    const secret  = props?.user?.id;

    const [userData, setUserData] = useState<UserDetails|''>();

    useEffect(() => {
        const data = async () => {
            const id = props?.user?.id;
            const data:UserDetails[] = await getUserData(id);
            setUserData(data[0])
            return data[0]
        }

        data().then((userData)=>{
            if (!email || !secret) {
                return;
            }

            const login = async () => {
                await axios.get("https://api.chatengine.io/users/me/", {
                    headers: {
                        "Project-ID": "9226e59e-9c0b-4699-8872-64f9136129b4",
                        "User-Name": userData?userData.username:email,
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
                        { username: userData?userData.username:email,
                            email, secret,
                            first_name:userData?userData.first_name:email,
                            last_name:userData?userData.last_name:email},
                        { headers: { "Private-Key":  "b64b5462-4b60-45a7-8ae6-37aa6748f936" } }
                    );
                } catch (e) {
                    console.log(e);
                }
            }

            login();
        })
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

    if (!userData){
        return <div>Loading...</div>;
    }

    return (
        <div id={'chat-class-id'} style={{ height: "80vh", width: "70vw"}}>
            <PrettyChatWindow
                projectId={"9226e59e-9c0b-4699-8872-64f9136129b4"}
                username={userData?userData.username:''}
                secret={props?.user.id}

                style={{ height: "100%"}}
            />
        </div>
    );
};

export default ChatsPage;