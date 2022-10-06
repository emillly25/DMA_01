import Link from 'next/link'
import Image from 'next/image'

import KAKAO_IMG from '../../assets/kakao_login.png'

export default function KakaoLogin() {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&response_type=code`
  return (
    <Link href={KAKAO_AUTH_URL}>
      <div className="container mx-auto">
        <Image src={KAKAO_IMG} />
      </div>
    </Link>
  )
}
