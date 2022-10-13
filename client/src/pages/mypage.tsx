import Layout from '../components/Layout'
import * as api from '../../api/api'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

interface UserData {
  _id: string
  name: string
  email: string
  profile_url: string
  role: string
}

export default function MyPage() {
  const [userData, setUserData] = useState<UserData | null>()
  const router = useRouter()
  async function getUserData() {
    const res = await api.get('/user')
    setUserData(res.data)
  }

  useEffect(() => {
    getUserData()
  }, [])

  async function logout() {
    if (confirm('로그아웃 하시겠습니까?')) {
      await api.get('/auth/logout')
      sessionStorage.removeItem('token')
      router.push('/')
    }
  }

  return (
    <Layout>
      <div className="container mx-auto">
        <h1>마이페이지</h1>
        {userData && <p>이름:{userData.name}</p>}
        <button className="bg-rose-400" onClick={logout}>
          로그아웃
        </button>
      </div>
    </Layout>
  )
}
