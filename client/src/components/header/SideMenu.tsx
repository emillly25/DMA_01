import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBars,
  faX,
  faUser,
  faFilePen,
} from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import EngLogo from '../../assets/engLogo.png'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import * as api from '../../../api/api'
import { useRouter } from 'next/router'

export const SideMenu = () => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    const userToken = sessionStorage.getItem('token')
    if (userToken) {
      setIsLogin(true)
    }
  }, [])

  function sideMenuController() {
    setIsOpen((cur) => !cur)
  }
  async function logout() {
    if (confirm('로그아웃 하시겠습니까?')) {
      await api.get('/auth/logout')
      sessionStorage.removeItem('token')
      setIsLogin(false)
      setIsOpen(false)
      router.push('/')
    }
  }
  return (
    <>
      {!isOpen ? (
        <span
          className="block md:hidden absolute right-2 top-7"
          onClick={sideMenuController}
        >
          <FontAwesomeIcon
            icon={faBars}
            className="text-4xl text-lime-800 mr-5"
          />
        </span>
      ) : (
        <>
          <div
            onClick={sideMenuController}
            className="absolute top-0 left-0 w-full h-screen bg-black opacity-30"
          ></div>
        </>
      )}
      <div
        className={`fixed top-0 right-0 bg-white h-screen w-3/4 z-30 text-white  ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } ease-in-out duration-500`}
      >
        <div className="bg-white flex items-center justify-between">
          <div className="ml-3">
            <Image src={EngLogo} width={200} height={80} alt="engLogo" />
          </div>
          <span onClick={sideMenuController}>
            <FontAwesomeIcon
              icon={faX}
              className="text-slate-600 text-3xl mr-4 "
            />
          </span>
        </div>
        <div className="bg-lime-800 flex flex-col text-white pt-5 pb-10">
          {!isLogin ? (
            <h3 className="text-center p-3 mb-2 font-bold text-lg ">
              로그인이 필요합니다!
            </h3>
          ) : (
            <h3 className="text-center p-3 mb-2 font-bold text-lg ">
              환영합니다! OOO 님
            </h3>
          )}
          {!isLogin ? (
            <div className="flex justify-center gap-3 flex-wrap">
              <Link href="/login">
                <div className="w-[100px] p-1 bg-white text-black rounded-sm flex justify-center">
                  <span>
                    <FontAwesomeIcon
                      icon={faUser}
                      className="text-black mx-1"
                    />
                  </span>
                  로그인
                </div>
              </Link>
              <Link href="/register">
                <div className="w-[100px] p-1 bg-white text-black rounded-sm">
                  <span>
                    <FontAwesomeIcon
                      icon={faFilePen}
                      className="text-black mx-1"
                    />
                  </span>
                  회원가입
                </div>
              </Link>
            </div>
          ) : (
            <div className="flex justify-center gap-3 flex-wrap">
              <Link href="/mypage">
                <div className="w-[100px] p-1 bg-white text-black rounded-sm flex justify-center">
                  <span>
                    <FontAwesomeIcon
                      icon={faUser}
                      className="text-black mx-1"
                    />
                  </span>
                  MY PAGE
                </div>
              </Link>
              <div
                onClick={logout}
                className="w-[100px] p-1 bg-white text-black rounded-sm"
              >
                <span>
                  <FontAwesomeIcon
                    icon={faFilePen}
                    className="text-black mx-1"
                  />
                </span>
                로그아웃
              </div>
            </div>
          )}
        </div>
        <ul className="text-black text-lg flex flex-col items-start font-bold ml-10">
          <li className="mt-8 mb-4">DMA 소개</li>
          <li className="my-4">교육과정</li>
          <li className="my-4">입학안내</li>
          <Link href="/notice">
            <li className="my-4">DMA 소식</li>
          </Link>
          <Link href="/reservation">
            <li className="my-4">상담예약</li>
          </Link>
        </ul>
      </div>
    </>
  )
}
