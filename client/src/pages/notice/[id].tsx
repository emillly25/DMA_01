import { useRouter } from 'next/router'
import * as api from '../../../api/api'

export default function NoticeDetail({ data }) {
  return <div>{data.title}</div>
}

export async function getStaticProps(context) {
  const { id } = context.params
  console.log('id', id)
  const res = await api.get(`/admin/notice/${id}`)
  const data = await res.data
  console.log('data', data)

  return {
    props: { data },
  }
}

export async function getStaticPaths() {
  const res = await api.get('/admin/notices')
  const data = await res.data
  const ids = data.map((el) => el._id)
  const paths = ids.map((el) => {
    return { params: { id: el } }
  })
  return {
    paths: paths,
    fallback: false,
  }
}
