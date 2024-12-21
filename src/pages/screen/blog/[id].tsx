import { LeftOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'

function DetailBlog() {
    const router = useRouter();
    const { id } = router.query

    const { isLoading, error, data } = useQuery({
        queryKey: ['getByIdUser', id],
        queryFn: async () => {
          if (id) {   
            const { data } = await axios.get(`https://gorest.co.in/public/v2/posts/${id}`, {
              headers: {
                "Authorization": process.env.NEXT_PUBLIC_TOKEN
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
    <div className="relative flex flex-col items-center mx-auto lg:flex-row-reverse lg:max-w-5xl lg:mt-12 xl:max-w-6xl">
        <div className="w-full h-64 lg:w-1/2 lg:h-auto">
          <Link href={'/screen/beranda'} className='text-yellow-500 ml-4 font-bold cursor-pointer lg:hidden absolute'>
              <LeftOutlined size={20} /> Back
            </Link>
            <img className="h-full w-full object-cover" src="https://images.unsplash.com/uploads/141103282695035fa1380/95cdfeef?q=80&w=2860&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="work place"/>
        </div>

        <div
            className="max-w-lg bg-white md:max-w-2xl md:z-10 md:shadow-lg md:absolute md:top-0 md:mt-48 lg:w-3/5 lg:left-0 lg:mt-20 lg:ml-20 xl:mt-24 xl:ml-12">
            <Link href={'/screen/beranda'} className='text-yellow-500 ml-4 font-bold cursor-pointer hidden lg:flex'>
            <LeftOutlined size={20} /> Back
            </Link>
            
            <div className="flex flex-col p-12 md:px-16">
                <h2 className="text-xl font-medium uppercase text-yellow-500 lg:text-4xl">{data?.title}</h2>
                <p className="mt-4 text-gray-800">{data?.body}</p>
            </div>
        </div>
    </div>
  )
}

export default DetailBlog