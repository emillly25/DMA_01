import Layout from '../components/Layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAnglesRight,
  faAngleRight,
  faAnglesLeft,
  faAngleLeft,
} from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import * as api from '../pages/api/api'
import { resourceLimits } from 'worker_threads'

interface NoticeData {
  _id: string
  title: string
  createdAt: string
}

interface NoticeType {
  notices: NoticeData[]
  currentPage: number
  startPage: number
  endPage: number
  maxNotice: number
  totalPage: number
}

export default function Notice() {
  const [data, setData] = useState<NoticeType | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  // useEffect(() => {
  //   getNotices()
  // }, [])

  useEffect(() => {
    getNotices(currentPage)
  }, [currentPage])

  async function getNotices(currentPage: number): Promise<NoticeType> {
    const res = await api.get(`/admin/notice?page=${currentPage}`)
    setData(res.data)
    console.log(res.data)
    return res.data
  }

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
            onClick={() => setCurrentPage(i)}
          >
            {i}
          </button>,
        )
      }
    }
    return pages
  }

  return (
    <Layout>
      <div className="container mx-auto ">
        <div className="flex justify-center">
          <h1 className="text-center text-xl md:text-2xl font-bold w-[40%] my-[30px] p-4 border-solid border-y-2 border-slate-500">
            DMA 소식
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
                  제목
                </th>
                <th
                  scope="col"
                  className="py-3 px-6 text-center hidden sm:block"
                >
                  작성일자
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
                }}
              >
                <FontAwesomeIcon icon={faAnglesLeft} />
              </button>
              <button
                className="inline-block disabled:text-slate-200"
                disabled={currentPage <= 1}
                onClick={() => {
                  setCurrentPage((cur) => cur - 1)
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
                }}
              >
                <FontAwesomeIcon icon={faAngleRight} />
              </button>
              <button
                className="inline-block ml-3 disabled:text-slate-200"
                disabled={data && data.totalPage - currentPage < data.maxNotice}
                onClick={() => {
                  setCurrentPage((cur) => {
                    if (data) {
                      const jumpPage =
                        data.maxNotice * Math.ceil(cur / data.maxNotice) + 1
                      return jumpPage
                    }
                  })
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
