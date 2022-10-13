import Layout from '../../components/Layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAnglesRight,
  faAngleRight,
  faAnglesLeft,
  faAngleLeft,
} from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import * as api from '../../../api/api'
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'

export async function getNotices(page) {
  const res = await api.get(`/admin/notice?page=${page}`)
  const data = await res.data
  return data
}

export async function getServerSideProps(context) {
  const queryClient = new QueryClient()
  const nextPage = Number(context.query.page)
  await queryClient.prefetchQuery(['notices', nextPage], () =>
    getNotices(nextPage),
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default function Notice(props) {
  const { isLoading, data } = useQuery(
    ['notices', props.dehydratedState.queries[0].state.data.currentPage],
    () => getNotices(data.currentPage),
    {
      initialData: props.dehydratedState.queries[0].state.data,
    },
  )

  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(1)

  function pageBtnCreator() {
    const pages = []
    if (data) {
      for (let i = data.startPage; i <= data.endPage; i++) {
        pages.push(
          <button
            className={`m-2 text-lg ${
              i === currentPage ? 'text-black' : 'text-slate-400'
            }`}
            key={i}
            onClick={() => {
              setCurrentPage(i)
              router.push(`?page=${i}`)
            }}
          >
            {i}
          </button>,
        )
      }
    }
    return pages
  }

  if (isLoading) {
    return <h1>Loading...</h1>
  }
  return (
    <Layout>
      <div className="container mx-auto ">
        <div className="flex justify-center">
          <h1 className="text-center text-xl md:text-2xl font-bold w-[40%] my-[30px] p-4 border-solid border-y-2 border-slate-500">
            DMA NOTICE
          </h1>
        </div>

        <div className="overflow-x-auto p-3">
          <table className="w-full text-sm sm:text-base text-left text-gray-500">
            <thead className="text-sm text-gray-700 uppercase bg-slate-200 ">
              <tr>
                <th scope="col" className="w-[10%] py-3 px-6 text-center">
                  No
                </th>
                <th scope="col" className="w-[60%] py-3 px-6">
                  TITLE
                </th>
                <th
                  scope="col"
                  className="py-3 px-6 text-center hidden sm:block"
                >
                  DATE
                </th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.notices.map((el, idx) => {
                  return (
                    <tr key={idx} className="bg-white border-b">
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap text-center"
                      >
                        {data && data.maxNotice * (currentPage - 1) + (idx + 1)}
                      </th>
                      <td className="py-4 px-6">{el.title}</td>
                      <td className="py-4 px-6 text-center hidden sm:block">
                        {el.createdAt}
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
          <nav className="flex justify-center p-3 text-lg font-medium items-center">
            <div>
              <button
                className="inline-block mr-3 disabled:text-slate-200"
                disabled={data && currentPage <= data.maxNotice}
                onClick={() => {
                  setCurrentPage((cur) => {
                    if (data) {
                      const jumpPage =
                        data.maxNotice *
                          (Math.floor(cur / data.maxNotice) - 1) +
                        1
                      return jumpPage
                    }
                  })
                  router.push(
                    `?page=${
                      data.maxNotice *
                        (Math.floor(currentPage / data.maxNotice) - 1) +
                      1
                    }`,
                  )
                }}
              >
                <FontAwesomeIcon icon={faAnglesLeft} />
              </button>
              <button
                className="inline-block disabled:text-slate-200"
                disabled={currentPage <= 1}
                onClick={() => {
                  setCurrentPage((cur) => cur - 1)
                  router.push(`?page=${currentPage - 1}`)
                }}
              >
                <FontAwesomeIcon icon={faAngleLeft} />
              </button>
            </div>
            <div className="mx-10">{pageBtnCreator()}</div>
            <div>
              <button
                className="inline-block disabled:text-slate-200"
                disabled={data && currentPage >= data.totalPage}
                onClick={() => {
                  setCurrentPage((cur) => cur + 1)
                  router.push(`?page=${currentPage + 1}`)
                }}
              >
                <FontAwesomeIcon icon={faAngleRight} />
              </button>
              <button
                className="inline-block ml-3 disabled:text-slate-200"
                disabled={
                  data && data.totalPage - currentPage < data.maxNotice - 1
                }
                onClick={() => {
                  setCurrentPage((cur) => {
                    if (data) {
                      const jumpPage =
                        data.maxNotice * Math.ceil(cur / data.maxNotice) + 1
                      return jumpPage
                    }
                  })
                  router.push(
                    `?page=${
                      Math.ceil(currentPage / data.maxNotice) * data.maxNotice +
                      1
                    }`,
                  )
                }}
              >
                <FontAwesomeIcon icon={faAnglesRight} />
              </button>
            </div>
          </nav>
        </div>
      </div>
    </Layout>
  )
}
