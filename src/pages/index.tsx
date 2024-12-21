import { useRouter, } from "next/router"
import { useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [userLogin, setUserLogin] = useState();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('user') || 'null');
    setUserLogin(data?.isLogin);
  }, []);

  useEffect(() => {
    if (userLogin) {
      router.push('/screen/beranda')
    } else {
      router.push('/auth/login')
    }
  }, [userLogin]);

  return (
    <main>
    </main>
  )
}
