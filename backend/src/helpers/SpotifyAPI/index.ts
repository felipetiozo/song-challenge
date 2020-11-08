import * as Interfaces from './interfaces'
import Axios, { AxiosRequestConfig, Method } from 'axios'

export default class SpotifyAPI {
  constructor(token: string) {
    this.token = token.startsWith('Bearer ') ? token : `Bearer ${token}`
  }

  private token: string

  private async request(
    method: Method,
    route: string,
    data?: any,
    headers?: any,
    params?: any
  ) {
    const axiosRequest: AxiosRequestConfig = {
      url: `${process.env.SPOTIFY_API}${route}`,
      method,
      data,
      params,
      headers: {
        authorization: this.token,
        ...headers,
      },
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

  public async searchTrack(q: string): Promise<Interfaces.iTrack[]> {
    const { data: response } = await this.get(`/search`, { q, type: 'track' })
    return response.tracks.items
  }
}
