import Layout from '../components/Layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAnglesRight,
  faAngleRight,
  faAnglesLeft,
  faAngleLeft,
} from '@fortawesome/free-solid-svg-icons'

const DATA = [
  { title: '2학기 기말고사 안내', created_date: '2022-10-11' },
  { title: '2023 겨울방학 특강 안내', created_date: '2022-10-12' },
  { title: '시험 대비 스케줄', created_date: '2022-10-13' },
  { title: '시험 대비 스케줄', created_date: '2022-10-13' },
  { title: '시험 대비 스케줄', created_date: '2022-10-13' },
]
export default function Notice() {
  return (
    <Layout>
      <div className="container mx-auto ">
        <div className="flex justify-center">
          <h1 className="text-center text-xl md:text-2xl font-bold w-[40%] my-[30px] p-4 border-solid border-y-2 border-slate-500">
            DMA 소식
          </h1>
        </div>

        <div className="overflow-x-auto border-2 border-solid border-orange-400 p-3">
          <table className="w-full text-sm sm:text-base text-left text-gray-500">
            <thead className="text-sm text-gray-700 uppercase bg-slate-200 ">
              <tr>
                <th scope="col" className="py-3 px-6 text-center">
                  No
                </th>
                <th scope="col" className="py-3 px-6">
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
              {DATA.map((el, idx) => {
                return (
                  <tr key={idx} className="bg-white border-b">
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap text-center"
                    >
                      {idx + 1}
                    </th>
                    <td className="py-4 px-6">{el.title}</td>
                    <td className="py-4 px-6 text-center hidden sm:block">
                      {el.created_date}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <nav className="flex justify-center p-3 text-lg font-medium items-center">
            <div>
              <a className="inline-block mx-1">
                <FontAwesomeIcon icon={faAnglesLeft} />
              </a>
              <a className="inline-block mx-1">
                <FontAwesomeIcon icon={faAngleLeft} />
              </a>
            </div>
            <div className="mx-10">
              <a className="inline-block mx-1">1</a>
              <a className="inline-block mx-1 text-gray-300">2</a>
            </div>
            <div>
              <a className="inline-block mx-1">
                <FontAwesomeIcon icon={faAngleRight} />
              </a>
              <a className="inline-block mx-1">
                <FontAwesomeIcon icon={faAnglesRight} />
              </a>
            </div>
          </nav>
        </div>
      </div>
    </Layout>
  )
}
