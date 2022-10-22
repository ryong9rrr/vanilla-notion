const { API_END_POINT } = process.env

export default class Api {
  private API_END_POINT: string

  constructor() {
    this.API_END_POINT = API_END_POINT as string
  }

  protected async request(url: string, options?: RequestInit) {
    if (url[0] !== '/') {
      throw new Error("please '/' fill in api url")
    }
    try {
      const response = await fetch(`${this.API_END_POINT}${url}`, {
        ...options,
        headers: {
          'x-username': 'yongsangyoon',
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) {
        throw new Error('존재하지 않는 페이지입니다.')
      }
      return response.json()
    } catch (e) {
      throw new Error('fetch response error')
    }
  }
}
