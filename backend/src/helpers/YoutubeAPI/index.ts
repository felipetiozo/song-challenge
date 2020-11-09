import moment from 'moment'
import Axios, { AxiosRequestConfig, Method } from 'axios'

export default class YoutubeAPI {
  constructor(key: string) {
    this.key = key
  }

  private key: string

  private async request(
    method: Method,
    route: string,
    data?: any,
    headers?: any,
    params?: any,
    url?: string
  ) {
    const axiosRequest: AxiosRequestConfig = {
      url: url || `${process.env.YOUTUBE_API}${route}`,
      method,
      data,
      params: {
        ...params,
        key: this.key,
      },
      headers,
    }

    return await Axios(axiosRequest)
  }

  private async get(route: string, params?: any) {
    return await this.request('GET', route, undefined, undefined, params)
  }

  private async put(route: string, data?: any, headers?: any, params?: any) {
    return await this.request('PUT', route, data, headers, params)
  }

  private async post(route: string, data?: any, headers?: any, params?: any) {
    return await this.request('POST', route, data, headers, params)
  }

  private async delete(route: string, data?: any, params?: any) {
    return await this.request('DELETE', route, data, params)
  }

  public async getVideoDuration(videoId: string): Promise<number> {
    const { data: response } = await this.get(
      `/videos?part=contentDetails&id=${videoId}`
    )
    return moment
      .duration(response.items[0].contentDetails.duration)
      .asMilliseconds()
  }
}
