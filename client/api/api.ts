import axios from 'axios'

async function get(apiUrl: string, code?: string | string[]) {
  const result = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}${apiUrl}`,
    {
      withCredentials: true,
      headers: {
        Authorization:
          typeof window !== 'undefined'
            ? sessionStorage.getItem('token')
            : null,
      },
      params: { code: code },
    },
  )

  if (!result) {
    throw new Error('ERROR')
  }

  return result
}

async function post<T>(apiUrl: string, data: T) {
  const result = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}${apiUrl}`,
    data,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    },
  )
  return result
}

async function patch<T>(apiUrl: string, data: T) {
  const result = await axios.patch(
    `${process.env.NEXT_PUBLIC_BASE_URL}${apiUrl}`,
    data,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    },
  )
  return result
}

async function del(apiUrl: string) {
  const result = await axios.delete(
    `${process.env.NEXT_PUBLIC_BASE_URL}${apiUrl}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    },
  )
  return result
}
async function uploadFile<T>(apiUrl: string, data: T) {
  const result = await axios.patch(
    `${process.env.NEXT_PUBLIC_BASE_URL}${apiUrl}`,
    data,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    },
  )
  return result
}

export { get, post, patch, del as delete, uploadFile }
