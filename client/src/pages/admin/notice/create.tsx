import Layout from '../../../components/Layout'
import S3 from 'react-aws-s3'
import * as api from '../../../../api/api'
import { useState, useEffect, useMemo, useRef, forwardRef } from 'react'
import dynamic from 'next/dynamic'
// import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useRouter } from 'next/router'

// const QuillWrapper = dynamic(() => import('react-quill'), {
//   ssr: false,
//   loading: () => <p>Loading ...</p>,
// })

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill')
    return function quillComp({ forwardRef, ...props }: any) {
      return <RQ ref={forwardRef} {...props} />
    }
  },
  { ssr: false },
)

export default function NoticeCreate() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [data, setData] = useState('')
  const quillRef = useRef<any>()

  async function submitHandler() {
    const posting = { title, content: data }
    await api.post('/admin/notice', posting)
    router.push('/notice')
  }

  function imageHandler() {
    //1. 이미지를 업로드할 input Element를 만들자.
    const input = document.createElement('input')

    //2. input의 속성들을 설정하자
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.setAttribute('class', 'hidden')

    //3. body에 input을 추가하자
    document.body.appendChild(input)

    //4. 툴에서 이미지가 클릭되면 input을 클릭하자
    input.click()

    //5. 파일이 선택되면 사진을 서버로 보내자
    input.addEventListener('change', async () => {
      const file = input.files[0]
      const formData = new FormData()
      await formData.append('src', file)

      try {
        //6. 사진을 서버로 보내면 서버가 사진을 S3에 저장하고 URL을 줌
        const res = await api.post('/admin/notice/img', formData)
        const url = res.data.location
        //7. 텍스트 에디터에 커서위치에 사진을 넣자
        if (quillRef?.current) {
          const editor = quillRef.current.getEditor()
          // editor.root.innerHTML += `<img src=${url} /><br/>`
          const range = editor.getSelection()
          editor.insertEmbed(range.index, 'image', url)
        }
      } catch (error) {
        console.error(error)
      }
    })
  }

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'blockquote'],
          [{ size: ['small', false, 'large', 'huge'] }, { color: [] }],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
            { align: [] },
          ],
          ['image'],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    [],
  )

  return (
    <Layout>
      <div className="container mx-auto ">
        <div className="flex justify-center">
          <h1 className="text-center text-xl md:text-2xl font-bold w-[40%] my-[30px] p-4 border-solid border-y-2 border-slate-500">
            CREATE
          </h1>
        </div>
        <div className="flex flex-col items-center w-full px-3 mx-auto">
          <div className="w-full flex items-center gap-2 my-3">
            <input
              name="title"
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
              }}
              required
            />
          </div>
          <div className="w-full h-[400px] mb-10">
            <ReactQuill
              forwardRef={quillRef}
              className="h-full"
              theme="snow"
              value={data}
              onChange={setData}
              modules={modules}
            />
          </div>
          <button
            onClick={submitHandler}
            className="my-7 flex justify-center w-full rounded-md bg-lime-800 py-3 px-4 text-base font-medium text-white shadow-sm md:w-[500px] md:text-lg"
          >
            CREATE
          </button>
        </div>
      </div>
    </Layout>
  )
}
