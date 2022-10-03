import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX, faUser, faFilePen } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import EngLogo from '../../assets/engLogo.png'

export const MenuModal = ({ openModal }) => {
  return (
    <>
      <div
        onClick={openModal}
        className="absolute top-0 left-0 w-full h-screen bg-black opacity-30"
      ></div>
      <div className="absolute top-0 right-0 bg-white h-screen w-3/4 text-white z-10 transition-all">
        <div className="bg-white flex items-center justify-between">
          <div className="ml-3">
            <Image src={EngLogo} width={200} height={80} />
          </div>
          <span onClick={openModal}>
            <FontAwesomeIcon
              icon={faX}
              className="text-slate-600 text-3xl mr-4 "
            />
          </span>
        </div>
        <div className="bg-lime-800 flex flex-col text-white pt-5 pb-10">
          <h3 className="text-center p-3 mb-2 font-bold text-lg ">
            로그인이 필요합니다!
          </h3>
          <div className="flex justify-center gap-3 flex-wrap">
            <div className="w-[100px] p-1 bg-white text-black rounded-sm flex justify-center">
              <span>
                <FontAwesomeIcon icon={faUser} className="text-black mx-1" />
              </span>
              로그인
            </div>
            <div className="w-[100px] p-1 bg-white text-black rounded-sm">
              <span>
                <FontAwesomeIcon icon={faFilePen} className="text-black mx-1" />
              </span>
              회원가입
            </div>
          </div>
        </div>
        <ul className="text-black text-2xl flex flex-col items-start font-bold ml-10">
          <li className="mt-8 mb-4">DMA 소개</li>
          <li className="my-4">교육과정</li>
          <li className="my-4">입학안내</li>
          <li className="my-4">DMA 소식</li>
          <li className="my-4">상담예약</li>
        </ul>
      </div>
    </>
  )
}
