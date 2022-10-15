import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faB } from '@fortawesome/free-solid-svg-icons'
import { faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons'

export const Footer = () => {
  return (
    <footer className="text-gray-500 bg-slate-200 container w-screen p-5 mx-auto">
      <p className="text-xs py-1">대치수학</p>
      <p className="text-xs py-1">대표: 김지혜 | 사업자번호 111-11-11111</p>
      <p className="text-xs py-1">
        경기도 용인시 기흥구 동백중앙로 283 골드프라자B동
      </p>
      <p className="text-xs py-1">
        <span className="font-bold text-slate-600">초중등</span> 버드수학 8층 |
        031-282-7749
      </p>
      <p className="text-xs py-1">
        <span className="font-bold text-slate-600">고등</span> 대치수학 5층 |
        031-286-7749
      </p>

      <span className="py-1 flex gap-2 text-xl text-gray-500 ">
        <FontAwesomeIcon icon={faB} />
        <FontAwesomeIcon icon={faYoutube} />
        <FontAwesomeIcon icon={faInstagram} />
      </span>
    </footer>
  )
}
