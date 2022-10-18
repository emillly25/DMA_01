import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import * as api from '../../../api/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface ReservationDataType {
  name: string
  phone: string
  date: string
  time: string
  school: string
  grade: string
  question?: string
}

export default function ReservationForm() {
  const queryClient = useQueryClient()
  const [isHopeTime, setIsHopeTime] = useState(false)
  const [reservationData, setReservationData] = useState<ReservationDataType>({
    name: '',
    phone: '',
    date: '',
    time: '14시',
    school: '',
    grade: '초3',
  })
  async function postData(reservationData: ReservationDataType) {
    const res = await api.post('/reservation', reservationData)
    console.log('res', res)
  }

  const postMutation = useMutation(postData, {
    onSuccess: () => {
      queryClient.invalidateQueries(['reservation'])
      alert('예약 완료! 담당자 확인 후 연락드리겠습니다.')
    },
  })
  function onChangeHandler(e) {
    setReservationData((cur) => {
      const newData = { ...cur }
      newData[e.target.name] = e.target.value
      return newData
    })
  }

  function hopeTimeSelector(e) {
    if (e.target.value === '직접입력') {
      setIsHopeTime(true)
    } else {
      setIsHopeTime(false)
      onChangeHandler(e)
    }
  }

  async function formValidation() {
    if (!reservationData.name) {
      return alert('학생 이름을 입력해주세요!')
    } else if (!reservationData.phone) {
      return alert('부모님 연락처를 입력해주세요!')
    } else if (!reservationData.date) {
      return alert('희망날짜를 입력해주세요!')
    } else if (!reservationData.time) {
      return alert('희망시간을 입력해주세요!')
    } else if (!reservationData.school) {
      return alert('학교를 입력해주세요!')
    }
    await postMutation.mutate(reservationData)
    console.log('야호')
  }
  function submitHandler(e) {
    e.preventDefault()
    formValidation()
  }

  return (
    <div className="w-full h-[600px] p-3 md:w-[60%] md:h-[700px]">
      <h2 className="font-bold text-lg text-center mb-3 md:text-2xl">
        상담예약
      </h2>
      <div className="w-full flex flex-col items-start">
        <div className="mx-auto pr-2">
          <div className="flex items-center py-2">
            <label
              htmlFor="name"
              className="text-sm text-left text-gray-700 font-bold p-2 w-[120px] md:w-[150px] md:text-lg"
            >
              학생 이름
            </label>
            <input
              type="text"
              name="name"
              required
              onChange={onChangeHandler}
              className="w-[200px] rounded-md border-2 border-slate-200 shadow-sm md:w-[400px] pl-2 py-1 md:py-2"
            />
          </div>
          <div className="flex items-center py-2">
            <label
              htmlFor="phone"
              className="text-sm text-left text-gray-700 font-bold p-2 w-[120px] md:w-[150px] md:text-lg"
            >
              부모님 연락처
            </label>
            <input
              type="number"
              name="phone"
              placeholder=" - 없이 입력해주세요"
              required
              onChange={onChangeHandler}
              className="w-[200px] rounded-md border-2 border-slate-200 shadow-sm sm:text-sm pl-2 py-1  md:w-[400px] md:py-2"
            />
          </div>
          <div className="flex items-center py-2">
            <label
              htmlFor="date"
              className="text-sm text-left text-gray-700 font-bold p-2 w-[120px] md:w-[150px] md:text-lg"
            >
              희망날짜
            </label>
            <input
              type="date"
              name="date"
              required
              onChange={onChangeHandler}
              className="w-[200px] rounded-md border-2 border-slate-200 shadow-sm sm:text-sm pl-2 py-1  md:w-[400px] md:py-2"
            />
          </div>

          {isHopeTime ? (
            <div className="flex items-center py-2 relative">
              <label
                htmlFor="time"
                className="text-sm text-left text-gray-700 font-bold p-2 w-[120px] md:w-[150px] md:text-lg"
              >
                희망시간
              </label>
              <input
                type="text"
                name="time"
                required
                onChange={onChangeHandler}
                className="w-[200px] rounded-md border-2 border-slate-200 shadow-sm sm:text-sm pl-2 py-1 md:w-[400px] md:py-2"
              />
              <span
                className={`text-sm absolute right-2 cursor-pointer  md:right-3 ${
                  isHopeTime ? 'text-slate-200' : 'block'
                }`}
                onClick={() => {
                  setIsHopeTime(false)
                }}
              >
                <FontAwesomeIcon icon={faChevronDown} />
              </span>
            </div>
          ) : (
            <div className="flex items-center py-2">
              <label
                htmlFor="time"
                className="text-sm text-left text-gray-700 font-bold p-2 w-[120px] md:w-[150px] md:text-lg"
              >
                희망시간
              </label>
              <select
                name="time"
                required
                onChange={hopeTimeSelector}
                className="w-[200px] rounded-md border-2 border-slate-200 shadow-sm sm:text-sm  pl-2 py-1  md:w-[400px] md:py-2"
              >
                <option>14시</option>
                <option>14시 30분</option>
                <option>15시</option>
                <option>15시 30분</option>
                <option>16시</option>
                <option>16시 30분</option>
                <option>17시</option>
                <option>17시 30분</option>
                <option>직접입력</option>
              </select>
            </div>
          )}
          <div className="flex items-center py-2 ">
            <label
              htmlFor="school"
              className="text-sm text-left text-gray-700 font-bold p-2 w-[120px] md:w-[150px] md:text-lg"
            >
              학교
            </label>
            <input
              type="text"
              name="school"
              required
              onChange={onChangeHandler}
              className="w-[200px] rounded-md border-2 border-slate-200 shadow-sm sm:text-sm pl-2 py-1  md:w-[400px] md:py-2"
            />
          </div>

          <div className="flex items-center py-2 ">
            <label
              htmlFor="grade"
              className="text-sm text-left text-gray-700 font-bold p-2 w-[120px] md:w-[150px] md:text-lg"
            >
              학년
            </label>
            <select
              name="grade"
              required
              onChange={onChangeHandler}
              className="w-[200px] rounded-md border-2 border-slate-200 shadow-sm sm:text-sm pl-2 py-1  md:w-[400px] md:py-2"
            >
              <option>초 3</option>
              <option>초 4</option>
              <option>초 5</option>
              <option>초 6</option>
              <option>중 1</option>
              <option>중 2</option>
              <option>중 3</option>
              <option>고 1</option>
              <option>고 2</option>
              <option>고 3</option>
            </select>
          </div>

          <div className="flex items-center py-2 ">
            <label
              htmlFor="question"
              className="text-sm text-left text-gray-700 font-bold p-2 w-[120px] md:w-[150px] md:text-lg"
            >
              문의사항
            </label>
            <textarea
              name="question"
              placeholder="간단히 작성해주세요!"
              onChange={onChangeHandler}
              className="w-[200px] h-[150px] rounded-md border-2 border-slate-200 shadow-sm sm:text-sm pl-2 py-1  md:w-[400px] md:h-[150px] "
            ></textarea>
          </div>
        </div>
        <div className="mx-auto px-4 py-3  sm:px-6">
          <button
            type="submit"
            onClick={submitHandler}
            className="flex justify-center w-[300px] rounded-md bg-lime-800 py-3 px-4 text-sm font-medium text-white shadow-sm md:w-[500px] md:text-lg"
          >
            예약하기
          </button>
        </div>
      </div>
    </div>
  )
}
