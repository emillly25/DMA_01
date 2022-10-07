import KakaoLogin from '../components/Login/KakaoLogin'
import Layout from '../components/Layout'
import Image from 'next/image'
import smLogo from '../assets/smLogo.png'
import Link from 'next/link'
export default function Login() {
  return (
    <Layout>
      <div className="container mx-auto p-3">
        <h1 className="font-bold text-2xl text-center p-2 md:text-3xl">
          로그인
        </h1>
        <div className="w-[90%] mx-auto border-slate-400 border-solid border-t-2 my-5 p-4">
          <div className="flex items-center">
            <div className="w-[40%] mx-auto">
              <Image src={smLogo} alt="로고" />
            </div>
            <KakaoLogin />
          </div>
          <p className="text-center text-sm py-3 sm:text-base md:text-xl">
            아직 회원이 아니신가요?
            <Link href="/register">
              <a className="text-gray-400 inline-block pl-3 "> 회원가입</a>
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  )
}
