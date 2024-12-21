import React, { useState } from 'react';
import { Input, message, notification } from 'antd';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';

const Login = () => {
    const router = useRouter();

    const [dataUser, setDataUser] = useState<{
        email: string;
        token: string;
    }>({
        email: '',
        token: ''
    });
    
    
    const { isLoading, error, data } = useQuery({
        queryKey: ['getByIdUser', dataUser.token.length],
        queryFn: async () => {
            if (dataUser.token.length < 7) {
                return null;
            }
            
            try {
                const { data } = await axios.get(`https://gorest.co.in/public/v2/users/${dataUser.token}`, {
                    headers: {
                        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
                    }
                });
                return data;
            } catch (error) {
                console.error('Error fetching user:', error);
                return null;
            }
        },
        enabled: dataUser.token.length >= 7
    });

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        if (dataUser?.token) {           
            if (data?.id.toString() !== dataUser?.token) {
                notification.error({
                    message: 'Wrong token',
                    description: 'wrong token, make sure you fill in the token correctly.',
                });
            }else if (data?.email !== dataUser?.email) {
                notification.error({
                    message: 'Wrong email',
                    description: 'wrong email, make sure you fill in the email correctly.',
                });
            }else if (data?.id == dataUser?.token && data?.email === dataUser?.email) {
                localStorage.setItem('user', JSON.stringify({
                    name: data.name,
                    email: data.email, 
                    idUser: data.id,
                    isLogin: true
                }));
    
                router.push(`/screen/beranda`);
    
                notification.success({
                    message: 'Login success',
                    description: 'The data you entered is correct, you are welcome to enter.',
                });
    
            }else{
                notification.error({
                    message: 'Login failed',
                    description: 'login failed, double check to make sure you filled in your email and token correctly.',
                });
            }
        }
    }


  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
            <div className="flex-1 hidden lg:flex p-12 lg:flex-col lg:justify-center"
            style={{ 
                backgroundImage: "url('https://images.unsplash.com/photo-1472289065668-ce650ac443d2?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                borderTopLeftRadius: "6px",
                borderBottomLeftRadius: "6px"
            }}
            >
                <h1 className='text-5xl font-bold italic'>Blog Test</h1>
                <p className='mt-3 text-gray-600'>This app will allow users to interact with public blog data through a user-friendly interface 
                    while demonstrating proficiency in building robust and efficient applications.</p>
            </div>
            <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                <div>
                    <img src="https://images.unsplash.com/uploads/141103282695035fa1380/95cdfeef?q=80&w=2860&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        className="rounded-lg h-52 w-full object-fill" />
                </div>
                <div className=" flex flex-col items-center">
                    <div className="w-full flex-1">
                        <div className="my-6 border-b text-center">
                            <div
                                className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                Login
                            </div>
                        </div>

                        <div className="mx-auto max-w-xs">
                            <form onSubmit={handleLogin}>           
                                <div className="mt-3">
                                    <label className="block text-sm font-medium leading-5 text-gray-700">
                                        Email
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <Input 
                                            onChange={(e)=>setDataUser({
                                                ...dataUser,
                                                email: e.target.value
                                            })}
                                            id="email" name="email" placeholder="user@example.com" type="email" required
                                            className="appearance-none text-gray-700 block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-yellow focus:border-yellow-500 transition duration-150 ease-in-out sm:text-sm sm:leading-5"/>
                                    </div>
                                </div>

                                <div className="mt-3">
                                    <label className="block text-sm font-medium leading-5 text-gray-700">
                                        Token
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <Input 
                                            onChange={(e)=>setDataUser({
                                                ...dataUser,
                                                token: e.target.value
                                            })}
                                            id="token" name="token" placeholder="input token" type="password" required
                                            className="appearance-none text-gray-700 block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-yellow focus:border-yellow-500 transition duration-150 ease-in-out sm:text-sm sm:leading-5"/>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <span className="block w-full rounded-md shadow-sm">
                                        <button type="submit"
                                            className="w-full text-gray-700 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:border-yellow-600 focus:shadow-outline-indigo active:bg-yellow-500 transition duration-150 ease-in-out">
                                            Login
                                        </button>
                                    </span>
                                </div>
                            </form>
                            
                            <p className="mt-6 text-md text-gray-600 text-center">
                                Dont have a token, please create a{" "}
                                <Link href="/auth/register" className="border-b border-blue-600 border-dotted text-blue-600">
                                    token
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Login;