"use client";

import React, {useEffect, useState} from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import "./styles/dot-styles.css"
import {
    useSessionContext,
    useSupabaseClient
} from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';

import Modal from './Modal';
import useSignUPModal from "@/hooks/useSignUpModal";
import button from "@/components/Button";
import updateLatestUserWithNullUsername from "@/actions/getLatestRegisteredAndSetUserName";
import { useCookies } from 'react-cookie';

const SignUPModal = () => {
    const { session } = useSessionContext();
    const router = useRouter();
    const { onClose, isOpen } = useSignUPModal();
    const supabaseClient = useSupabaseClient();
    const [currentPage, setCurrentPage] = useState(1);
    const [username, setUsername] = useState('');
    const [cookies, setCookie] = useCookies(['username']);

    useEffect(() => {
        if (session) {
            router.refresh();
            onClose();
        }
    }, [session, router, onClose]);

    const onChange = (open: boolean) => {
        if (!open) {
            onClose();
            setCurrentPage(1);
        }
    }

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
        const delay = setTimeout(() => {
            changeDefaultSupabaseAuthElements();
            setCookie('username', username, { path: '/' });
        }, 0);

    };

    const previousPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleUsernameChange = (e: any) => {
        setUsername(e.target.value);
    };

    const handleClick = () => {
        console.log('jhello')
    };

    const changeDefaultSupabaseAuthElements = () => {
        // Crutch to change Sign In to Sign Up because of using supabase sign in functionality that does not
        // allow to add or change extra fields during signin/signup process etc.

        const button = document.getElementsByClassName('supabase-auth-ui_ui-button c-egTDuJ c-egTDuJ-cmFMMs-color-primary')[0];
        const googleButton = document.getElementsByClassName("supabase-auth-ui_ui-button c-egTDuJ c-egTDuJ-iwjZXY-color-default")[0];
        const signUpLink = document.getElementsByClassName("supabase-auth-ui_ui-anchor c-dumjqv")[1]
        // Check if the button element exists
        if (button) {
            // Update the button text
            button.textContent = 'Sign Up';
        }
        if(googleButton) {
            googleButton.childNodes[1].textContent = 'Sign up with Google';;
        }
        // if (signUpLink) {
        //     signUpLink.remove();
        // }
    };

    return (
        <Modal
            title="Sign UP"
            isOpen={isOpen}
            onChange={onChange}
            description="Create a new account">

            <div className="modal-content">
                {currentPage === 1 && (
                    <div className="page">
                        <h2 style={{paddingBottom: '5px', color:"inherit"}}>Provide Your Username</h2>
                        <input type="text" value={username} className="username-input" onChange={handleUsernameChange} />
                        <br/>
                        <br/>

                        <button className='buttons' disabled={!username} onClick={nextPage}>
                            Next
                        </button>

                    </div>
                )}

                {currentPage === 2 && (
                    <div className="page">
                        <Auth
                            supabaseClient={supabaseClient}
                            providers={['google']}
                            appearance={{
                                theme: ThemeSupa,
                                variables: {
                                    default: {
                                        colors: {
                                            brand: '#404040',
                                            brandAccent: '#22c55e'
                                        }
                                    }
                                }
                            }}

                            theme="dark"
                        />

                        <button className='buttons' onClick={previousPage}>Back</button>

                    </div>
                )}

                <div className="flex mt-[10px] justify-center">
                    <span className={`dot ${currentPage === 1 ? 'active' : ''}`} />
                    <span className={`dot ${currentPage === 2 ? 'active' : ''}`} />
                </div>
            </div>

        </Modal>
    );
}

export default SignUPModal;