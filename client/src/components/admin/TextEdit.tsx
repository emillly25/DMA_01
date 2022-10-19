import { useState, useEffect, useMemo, useRef } from 'react'
import dynamic from 'next/dynamic'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

export default function TextEdit() {
  const [content, setContent] = useState('')
  const quillRef = useRef(ReactQuill)
  const QuillWrapper = dynamic(() => import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
  })

  function imageHandler() {
    console.log('이미지')
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
    <>
      <QuillWrapper
        className="w-full h-[400px] mb-10"
        theme="snow"
        modules={modules}
        value={content}
        onChange={setContent}
        placeholder="내용을 입력해주세요!"
      />
    </>
  )
}
