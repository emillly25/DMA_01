export default function ReservationForm() {
  return (
    <div className="w-full h-[500px]  ">
      <div className="flex flex-col items-start">
        <div className="mx-auto my-5 ">
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
              className="w-[200px] rounded-md border-2 border-slate-200 shadow-sm  sm:text-sm pl-2 py-1  "
            />
          </div>
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
              className="w-[200px]  rounded-md border-2 border-slate-200 shadow-sm sm:text-sm pl-2 py-1  "
            />
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
              className="w-[200px] h-[150px] rounded-md border-2 border-slate-200 shadow-sm sm:text-sm pl-2 py-1  "
            ></textarea>
          </div>
        </div>
        <div className="mx-auto px-4 py-3  sm:px-6">
          <button
            type="submit"
            className="flex justify-center w-[300px] rounded-md bg-lime-800 py-3 px-4 text-sm font-medium text-white shadow-sm "
          >
            예약하기
          </button>
        </div>
      </div>
    </div>
  )
}
