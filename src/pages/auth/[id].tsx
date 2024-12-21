import { useQuery } from '@tanstack/react-query';
import { Table } from 'antd';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'

function Token() {
  const router = useRouter();
  const { id } = router.query

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Token',
      dataIndex: 'id',
      key: 'id',
    },
  ];
    
    const { isLoading, error, data } = useQuery({
        queryKey: ['getByIdUser', id],
        queryFn: async () => {
          if (id) {   
            const { data } = await axios.get(`https://gorest.co.in/public/v2/users/${id}`, {
              headers: {
                "Authorization": `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`
              }
            });
            
            return data;
          }
        },
      });

      if (error) {
        console.log(error);
      }
      

  return (
    <div className="min-h-screen bg-yellow-500 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="text-center text-3xl leading-9 font-extrabold text-gray-900">
                Account Information
            </h2>
            <p className="mt-2 text-md italic leading-5 text-gray-700 max-w text-justify">
              Here is your account information attachment, to be able to login you must use email and token. therefore save the following information well. proceed to
              <Link href="/auth/login"
                  className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                  {" "} login {" "}
              </Link>
              page
            </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-yellow-100 shadow sm:rounded-lg p-1">
              <Table dataSource={[data]} columns={columns} pagination={false}/>
            </div>
            <div className="mt-6">
                <span className="block w-full rounded-md shadow-sm">
                    <button type="submit"
                        className="w-full text-gray-700 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md bg-yellow-100 hover:bg-yellow-400 focus:outline-none focus:border-yellow-600 focus:shadow-outline-indigo active:bg-yellow-500 transition duration-150 ease-in-out">
                      <Link href="/auth/login">
                        Got it, to the login page
                      </Link>
                    </button>
                </span>
            </div>
        </div>
    </div>
  )
}

export default Token