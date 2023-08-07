'use client'

import loginUseCase from "@/src/application/usecases/auth/login_usecase";
import login_usecase from "@/src/application/usecases/auth/login_usecase";
import { useState, useEffect, useRef } from "react";
import { useMutation } from "react-query";
import jwt from 'jsonwebtoken';
import registerUseCase from "@/src/application/usecases/auth/register_usecase";
import { decodeToken } from "@/src/utils/auth/decodeToken";


const LoginButton = () => {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const dialogRef = useRef<HTMLElement | any>(null);
    const [register, setRegister] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    // const { mutate, isLoading, isError } = useMutation(login);
    const { mutate, isLoading, isError } = useMutation(register ? registerUseCase : loginUseCase);


    if (isLoading) {
        console.log('Loading');
    }

    

    const openLoginDialog = () => {
        setDialogOpen(true);
    };

    const closeLoginDialog = () => {
        setDialogOpen(false);
    };

    const handleLogin = (event: any) => {
        
        event.preventDefault();
        
        mutate({ email, password });
    };

    const handleRegister = (event: any) => {
        event.preventDefault();
        mutate({ name, email, password })

    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dialogRef.current &&
                !dialogRef.current.contains(event.target as Node)
            ) {
                closeLoginDialog();
            }
        };

        if (isDialogOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isDialogOpen]);

    return (
        <div>
            <button className='btn btn-sm btn-outline border-blue-400 border-2 font-semibold text-xs capitalize' onClick={openLoginDialog}>
                masuk
            </button>

            {isDialogOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-filter backdrop-blur-sm bg-opacity-50">
                    <div className="bg-white p-6 rounded"
                        ref={dialogRef}
                    >
                        {register ? (
                            // register form
                            <div className="bg-grey-lighter flex flex-col">
                                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                                    <div className="px-6 py-8 text-black w-full">
                                        <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                                        <form action="" onSubmit={handleRegister}>
                                            <input
                                                onChange={(e) => setName(e.target.value)}
                                                type="text"
                                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                                name="name"
                                                placeholder="Name" />

                                            <input
                                                onChange={(e) => setEmail(e.target.value)}
                                                type="text"
                                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                                name="email"
                                                placeholder="Email" />

                                            <input
                                                onChange={(e) => setPassword(e.target.value)}
                                                type="password"
                                                className="block border border-grey-light w-full p-3 rounded mb-4"
                                                name="password"
                                                placeholder="Password" />

                                            <button
                                                type="submit"
                                                className="block w-full rounded-lg bg-blue-300 px-5 py-3 text-sm font-medium text-white"
                                            >
                                                Register
                                            </button>
                                        </form>
                                    </div>

                                    <div className="text-grey-dark mt-6">
                                        Already have an account?
                                        <a className="no-underline border-b border-blue text-blue cursor-pointer" onClick={() => setRegister(!register)}>
                                            Log in
                                        </a>.
                                    </div>
                                </div>
                            </div>
                        ) : (
                            // login form
                            <form
                                action=""
                                className="mb-0 mt-6 space-y-4 rounded-lg p-4 sm:p-6 lg:p-8"
                                onSubmit={handleLogin}
                            >
                                <p className="text-center text-lg font-medium">Sign in to your account</p>

                                <div>
                                    <label className="sr-only">Email</label>

                                    <div className="relative">
                                        <input
                                            type="email"
                                            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                            placeholder="Enter email"
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="sr-only">Password</label>

                                    <div className="relative">
                                        <input
                                            type="password"
                                            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                            placeholder="Enter password"
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="block w-full rounded-lg bg-blue-300 px-5 py-3 text-sm font-medium text-white"
                                >
                                    Sign in
                                </button>

                                <p className="text-center text-sm text-gray-500">
                                    No account?
                                    <a className="underline cursor-pointer" onClick={() => setRegister(true)}>Sign up</a>
                                </p>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoginButton;
