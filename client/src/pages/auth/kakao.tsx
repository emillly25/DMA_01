import { useRouter } from 'next/router'
import { useEffect } from 'react'
import * as api from '../../../api/api'
import Loading from '../../components/Loading'
export default function SocialLogin() {
  const router = useRouter()
  const { code } = router.query

  useEffect(() => {
    if (code) {
      login(code)
    }
  }, [code])

  async function login(code: string | string[]) {
    try {
      const res = await api.get('/auth/kakao', code)
      console.log(res)
      await sessionStorage.setItem('token', res.data.token)
      router.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Loading />
    </>
  )
}
