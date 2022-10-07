import { useRouter } from 'next/router'
import { useEffect } from 'react'
import * as api from '../api/api'
export default function SocialLogin() {
  const router = useRouter()
  const { code } = router.query

  useEffect(() => {
    if (code) {
      login(code)
    }
    // router.push('/')
  }, [code])

  async function login(code: string | string[]) {
    try {
      const res = await api.get('/auth/kakao', code)
      console.log('인가코드 넘겨주기', res)
    } catch (error) {
      console.error(error)
    }
  }

  return <>로그인소셜</>
}
