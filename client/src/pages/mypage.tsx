import Layout from '../components/Layout'
import * as api from '../pages/api/api'
import { useEffect, useState } from 'react'

interface UserData {
  _id: string
  name: string
  email: string
  profile_url: string
  role: string
}

export default function MyPage() {
  const [userData, setUserData] = useState<UserData | null>()
  async function getUserData() {
    const res = await api.get('/user')
    console.log(res)
    setUserData(res.data)
  }

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <Layout>
      <div className="container mx-auto">
        <h1>마이페이지</h1>
        {userData && <p>이름:{userData.name}</p>}
      </div>
    </Layout>
  )
}
