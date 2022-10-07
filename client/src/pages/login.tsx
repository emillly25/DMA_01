import Layout from '../components/Layout'
import LoginBox from '../components/Login/LoginBox'
export default function Login() {
  return (
    <Layout>
      <LoginBox title={'로그인'} isLogin={true} />
    </Layout>
  )
}
