import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import Logo from '../../assets/mainLogo.png'
import { SideMenu } from './SideMenu'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export const Header = () => {
  const [isLogin, setIsLogin] = useState(false)
  const value = sessionStorage.getItem('isLogin')
  useEffect(() => {
    const convertedBool = value === 'true'
    setIsLogin(convertedBool)
  }, [value])

  return (
    <header className="container mx-auto relative w-screen h-[80px] bg-slate-100 text-gray-500 ">
      <Link href="/">
        <a className="absolute left-2 top-2">
          <Image src={Logo} width={200} height={70} alt="mainLogo" />
        </a>
      </Link>
      <SideMenu />
      <nav className="md:ml-auto hidden md:block flex flex-wrap items-center text-lg justify-center absolute right-2 top-7">
        <a className="mr-5 hover:text-gray-900">DMA 소개</a>
        <a className="mr-5 hover:text-gray-900">교육과정</a>
        <a className="mr-5 hover:text-gray-900">입학안내</a>
        <a className="mr-5 hover:text-gray-900">DMA 소식</a>
        <Link href="/reservation">
          <a className="mr-5 hover:text-gray-900">상담예약</a>
        </Link>
        {!isLogin ? (
          <Link href="/login">
            <a className="border-solid border-2 border-slate-400 px-2 py-1 rounded-full ">
              <FontAwesomeIcon icon={faUser} className="text-xl text-black" />
            </a>
          </Link>
        ) : (
          <Link href="/mypage">
            <a className="border-solid border-2 border-slate-400 px-2 py-1 rounded-full ">
              <FontAwesomeIcon icon={faUser} className="text-xl text-black" />
            </a>
          </Link>
        )}
      </nav>
    </header>
  )
}
