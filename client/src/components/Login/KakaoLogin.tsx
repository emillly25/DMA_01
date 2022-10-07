import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentDots } from '@fortawesome/free-solid-svg-icons'

interface LoginBoxProps {
  title: string
  isLogin?: boolean
}

export default function KakaoLogin({ title }: LoginBoxProps) {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&response_type=code`
  return (
    <Link href={KAKAO_AUTH_URL}>
      <div className="w-[55%]">
        <div className="flex gap-2 p-2 justify-center items-center bg-[#FEE500] text-[#000000] w-full h-[50px] rounded-md md:h-[60px]">
          <span className="text-xl sm:text-2xl md:text-3xl">
            <FontAwesomeIcon icon={faCommentDots} />
          </span>
          <p className="font-black text-sm sm:text-lg md:text-2xl">
            카카오 {title}
          </p>
        </div>
      </div>
    </Link>
  )
}
