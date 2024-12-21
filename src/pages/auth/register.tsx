import { useMutation } from '@tanstack/react-query';
import { Input, notification } from 'antd'
import axios from 'axios';
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/router';

function Register() {
    const router = useRouter();
    const [formData, setFormData] = useState<{
        name: string,
        email: string,
        gender: string,
        status: string
    }>({
        name: '',
        email: '',
        gender: '',
        status: 'active'
    });

    const addUser = useMutation({
        mutationFn: async (newUser: typeof formData) => {
            try {
                const { data } = await axios.post('https://gorest.co.in/public/v2/users', newUser, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
                    }
                });

                return data;
            } catch (error) {
                throw new Error('Gagal menambahkan pengguna baru');
            }
        },
        onSuccess: (data) => {
            notification.success({
                message: 'Successfully created token',
                description: 'Please keep your tokens safe.',
            });
            router.push(`/auth/${data.id}`);
        },
        onError: (error) => {
            notification.error({
                message: 'Failed to create token',
                description: error.message,
            });
        }
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addUser.mutate(formData);
    };

    return (
        <div className="min-h-screen bg-yellow-500 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="text-center text-3xl leading-9 font-extrabold text-gray-900">
                    Create Token
                </h2>
                <p className="mt-2 text-center text-sm leading-5 text-gray-500 max-w">
                    Or have token, you can
                    <Link href="/auth/login"
                        className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                        {" "} login {" "}
                    </Link>
                    directly
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-yellow-100 py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium leading-5 text-gray-700">Name</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <Input 
                                    id="name" 
                                    name="name" 
                                    placeholder="John Doe" 
                                    type="text" 
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="appearance-none text-gray-700 block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-yellow focus:border-yellow-500 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <label className="block text-sm font-medium leading-5 text-gray-700">
                                Email
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <input 
                                    id="email" 
                                    name="email" 
                                    placeholder="user@example.com" 
                                    type="email" 
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="appearance-none text-gray-700 block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-yellow focus:border-yellow-500 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <label className="block text-sm font-medium leading-5 text-gray-700">
                                Gender
                            </label>
                            <div className="mt-1 rounded-md shadow-sm">
                                <select 
                                    id="gender" 
                                    name="gender" 
                                    required
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-yellow focus:border-yellow-500 transition duration-150 ease-in-out sm:text-sm sm:leading-5 text-gray-700"
                                >
                                    <option value="">Select gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-6">
                            <span className="block w-full rounded-md shadow-sm">
                                <button 
                                    type="submit"
                                    disabled={addUser.isPending}
                                    className="w-full text-gray-700 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:border-yellow-600 focus:shadow-outline-indigo active:bg-yellow-500 transition duration-150 ease-in-out"
                                >
                                    {addUser.isPending ? 'Creating...' : 'Create token'}
                                </button>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register