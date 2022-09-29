import { isNumber } from '../utils/constant'

const API_END_POINT = 'https://kdt-frontend.programmers.co.kr'

const request = async (url: any, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        'x-username': 'yongsangyoon',
        'Content-Type': 'application/json',
      },
    })

    if (res.ok) return await res.json()

    throw new Error('API 호출 오류')
  } catch (e: any) {
    console.error(`API 호출에 문제가 있는 것 같아요. 에러 메시지: ${e.message}`)
    throw new Error('API 호출 오류')
  }
}

export const getAllDocument = async () => {
  return await request('/documents')
}

export const getDocument = async (documentId: any) => {
  if (!isNumber(documentId)) throw new Error('인자가 숫자형식이 아니에요.')

  return await request(`/documents/${documentId}`)
}

export const postNewDocument = async (requestBodyObj: any) => {
  if (requestBodyObj.title === undefined || requestBodyObj.parent === undefined)
    throw new Error('title이나 parent가 정의되지 않았어요.')

  const { title, parent } = requestBodyObj
  if (typeof title !== 'string') {
    throw new Error('추가될 post에 title이 없거나 올바른 형식이 아니에요.')
  }

  if (parent !== null && !isNumber(parent)) {
    throw new Error('추가될 post에 parent가 없거나 올바른 형식이 아니에요.')
  }

  return await request('/documents', {
    method: 'POST',
    body: JSON.stringify({ title, parent }),
  })
}

export const removeDocument = async (documentId: any) => {
  if (!isNumber(documentId)) throw new Error('인자가 숫자형식이 아니에요.')

  return await request(`/documents/${documentId}`, {
    method: 'DELETE',
  })
}

export const editDocument = async (documentId: any, requestBodyObj: any) => {
  if (requestBodyObj.title === undefined || requestBodyObj.content === undefined)
    throw new Error('title이나 content가 정의되지 않았어요.')
  const { title, content } = requestBodyObj
  if (!isNumber(documentId)) throw new Error('인자가 숫자형식이 아니에요.')
  if (!(typeof title === 'string' && typeof content === 'string'))
    throw new Error('title과 content는 모두 문자열이어야 해요.')

  return await request(`/documents/${documentId}`, {
    method: 'PUT',
    body: JSON.stringify({ title, content }),
  })
}
