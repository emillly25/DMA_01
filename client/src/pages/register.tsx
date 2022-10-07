import Layout from '../components/Layout'
import LoginBox from '../components/Login/LoginBox'
export default function Register() {
  return (
    <Layout>
      <LoginBox title={'회원가입'} isLogin={false} />
    </Layout>
  )
}
