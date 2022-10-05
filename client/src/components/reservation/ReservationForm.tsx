import { useState } from 'react'

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
  const [isHopeTime, setIsHopeTime] = useState(false)
  const [reservationData, setReservationData] = useState<ReservationDataType>({
    name: '',
    phone: '',
    date: '',
    time: '14시',
    school: '',
    grade: '초3',
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

  return (
    <div className="w-full h-[600px] p-3">
      <h2 className="font-bold text-lg text-center mb-3">상담예약</h2>
      <div className=" flex flex-col items-start ">
        <div className="mx-auto pr-2  ">
          <div className="flex items-center py-2 ">
            <label
              htmlFor="name"
              className="text-sm text-left text-gray-700 font-bold p-2 w-[120px]  "
            >
              학생 이름
            </label>
            <input
              type="text"
              name="name"
              required
              onChange={onChangeHandler}
              className="w-[200px] rounded-md border-2 border-slate-200 shadow-sm  sm:text-sm pl-2 py-1  "
            />
          </div>
          <div className="flex items-center py-2">
            <label
              htmlFor="phone"
              className="text-sm text-left text-gray-700 font-bold p-2 w-[120px]  "
            >
              부모님 연락처
            </label>
            <input
              type="number"
              name="phone"
              placeholder=" - 없이 입력해주세요"
              required
              onChange={onChangeHandler}
              className="w-[200px]  rounded-md border-2 border-slate-200 shadow-sm sm:text-sm pl-2 py-1  "
            />
          </div>
          <div className="flex items-center py-2 ">
            <label
              htmlFor="date"
              className="text-sm text-left text-gray-700 font-bold p-2 w-[120px]  "
            >
              희망날짜
            </label>
            <input
              type="date"
              name="date"
              required
              onChange={onChangeHandler}
              className="w-[200px] rounded-md border-2 border-slate-200 shadow-sm  sm:text-sm pl-2 py-1"
            />
          </div>

          {isHopeTime ? (
            <div className="flex items-center py-2 ">
              <label
                htmlFor="time"
                className="text-sm text-left text-gray-700 font-bold p-2 w-[120px]  "
              >
                희망시간
              </label>
              <input
                type="text"
                name="time"
                required
                onChange={onChangeHandler}
                className="w-[200px] rounded-md border-2 border-slate-200 shadow-sm  sm:text-sm pl-2 py-1  "
              />
            </div>
          ) : (
            <div className="flex items-center py-2 ">
              <label
                htmlFor="time"
                className="text-sm text-left text-gray-700 font-bold p-2 w-[120px]  "
              >
                희망시간
              </label>
              <select
                name="time"
                required
                onChange={hopeTimeSelector}
                className="w-[200px] rounded-md border-2 border-slate-200 shadow-sm  sm:text-sm  pl-2 py-1"
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
              className="text-sm text-left text-gray-700 font-bold p-2 w-[120px]  "
            >
              학교
            </label>
            <input
              type="text"
              name="school"
              required
              onChange={onChangeHandler}
              className="w-[200px] rounded-md border-2 border-slate-200 shadow-sm  sm:text-sm pl-2 py-1"
            />
          </div>

          <div className="flex items-center py-2 ">
            <label
              htmlFor="grade"
              className="text-sm text-left text-gray-700 font-bold p-2 w-[120px]  "
            >
              학년
            </label>
            <select
              name="grade"
              required
              onChange={onChangeHandler}
              className="w-[200px] rounded-md border-2 border-slate-200 shadow-sm  sm:text-sm  pl-2 py-1"
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
              className="text-sm text-left text-gray-700 font-bold p-2 w-[120px]  "
            >
              문의사항
            </label>
            <textarea
              name="question"
              placeholder="간단히 작성해주세요!"
              onChange={onChangeHandler}
              className="w-[200px] h-[150px] rounded-md border-2 border-slate-200 shadow-sm sm:text-sm pl-2 py-1  "
            ></textarea>
          </div>
        </div>
        <div className="mx-auto px-4 py-3  sm:px-6">
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault()
              console.log(reservationData)
            }}
            className="flex justify-center w-[300px] rounded-md bg-lime-800 py-3 px-4 text-sm font-medium text-white shadow-sm "
          >
            예약하기
          </button>
        </div>
      </div>
    </div>
  )
}
