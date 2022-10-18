import { useRouter } from 'next/router'
import * as api from '../../../api/api'
import Layout from '../../components/Layout'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'

export default function NoticeDetail({ data }) {
  console.log(data)
  const router = useRouter()
  return (
    <Layout>
      <div className="container mx-auto">
        <div className="flex justify-center">
          <h1 className="text-center text-xl md:text-2xl font-bold w-[40%] my-[30px] p-4 border-solid border-y-2 border-slate-500">
            DMA 소식
          </h1>
        </div>
        <div
          onClick={() => {
            router.push('/notice')
          }}
          className="mx-[5%] mb-5 w-[150px] h-[50px] text-lg border-2 border-solid border-slate-300 flex items-center justify-center cursor-pointer"
        >
          <span className="mr-2">
            <FontAwesomeIcon icon={faAngleLeft} />
          </span>
          <span>Back to list</span>
        </div>
        <article className="my-2">
          <h2 className="text-lg sm:text-2xl text-left mx-[5%] font-bold py-3">
            {data.title}
          </h2>
          <p className="mx-[5%] pb-3 text-sm sm:text-lg text-slate-600 mb-10 border-solid border-b-[1px] border-slate-400">
            {data.createdAt}
          </p>

          <div className="mx-[5%] flex flex-col items-center">
            {data.imgURL.length !== 0 ? (
              data.imgURL.map((el) => {
                return (
                  <div key={el} className="relative w-[600px] h-[600px] mb-5">
                    <Image alt="notice" src={el} layout="fill" />
                  </div>
                )
              })
            ) : (
              <div>내용무</div>
            )}
          </div>
        </article>
      </div>
    </Layout>
  )
}

export async function getStaticProps(context) {
  const { id } = context.params
  const res = await api.get(`/admin/notice/${id}`)
  const data = await res.data

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
