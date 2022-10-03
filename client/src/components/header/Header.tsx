import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import Logo from '../../assets/mainLogo.png'
import { MenuModal } from './MenuModal'
import { useState } from 'react'
export const Header = () => {
  const [isModal, setIsModal] = useState(false)

  function openModal() {
    setIsModal((cur) => !cur)
  }
  return (
    <header className="container mx-auto relative p-10 bg-slate-100 text-gray-500">
      <a className="absolute left-2 top-2">
        <Image src={Logo} width={200} height={70} />
      </a>
      {isModal && <MenuModal openModal={openModal} />}
      <nav className="md:ml-auto hidden md:block flex flex-wrap items-center text-lg justify-center absolute right-2 top-7">
        <a className="mr-5 hover:text-gray-900">DMA 소개</a>
        <a className="mr-5 hover:text-gray-900">교육과정</a>
        <a className="mr-5 hover:text-gray-900">입학안내</a>
        <a className="mr-5 hover:text-gray-900">DMA 소식</a>
        <a className="mr-5 hover:text-gray-900">상담예약</a>
        <a className="border-solid border-2 border-slate-400 px-2 py-1 rounded-full ">
          <FontAwesomeIcon icon={faUser} className="text-xl text-black" />
        </a>
      </nav>

      <span
        onClick={openModal}
        className="block md:hidden absolute right-2 top-7"
      >
        <FontAwesomeIcon
          icon={faBars}
          className="text-4xl text-lime-800 mr-5"
        />
      </span>
    </header>
  )
}
