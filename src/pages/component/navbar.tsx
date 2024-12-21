import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

function Navbar() {
    const router = useRouter();
    const { pathname } = router;

    const [data, setData] = useState<{
        title: string,
        path: string
    }>({
        title: '',
        path: ''
    });

    useEffect(() => {
        handlePath();
    }, [pathname]);

    const handlePath = ()=>{
        if (pathname == '/auth/login') {
            setData({
                ...data,
                title:'Create Token',
                path: '/auth/register'
            })
        } else if (pathname == '/auth/register') {
            setData({
                ...data,
                title:'Login',
                path: '/auth/login'
            })  
        } else if (pathname == '/auth/[id]') {
            setData({
                ...data,
                title:'Login',
                path: '/auth/login'
            })  
        }else {
            setData({
                ...data,
                title:'Logout',
                path: '/auth/login'
            })  
        }
    }

    const handleAction = ()=>{
        if (data.title == 'Logout') {
            router.push(data.path)
            localStorage.removeItem('user');
        }else{
            router.push(data.path)
        }
    }


  return (
    <nav className="bg-yellow-500 shadow shadow-gray-300 w-100 px-8 md:px-auto sticky top-0 z-50">
        <div className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
            <div className="text-gray-700 italic font-bold md:order-1 text-xl">
                <span>Blog Test</span>
            </div>
            <div className="order-2 md:order-3">
                <button className="px-8 py-2 bg-yellow-100 hover:bg-yellow-300 text-gray-700 font-semibold border border-gray-500 rounded-xl flex items-center gap-2"
                onClick={()=>handleAction()}
                >
                    {data.title}
                </button>
            </div>
        </div>
    </nav>
  )
}

export default Navbar