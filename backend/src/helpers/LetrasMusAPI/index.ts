import { URL } from 'url'
// import * as Interfaces from './interfaces'
import Axios, { AxiosRequestConfig, Method } from 'axios'

export default class SpotifyAPI {
  private async request(
    method: Method,
    route: string,
    data?: any,
    headers?: any,
    params?: any,
    url?: string
  ) {
    const axiosRequest: AxiosRequestConfig = {
      url: url || `${process.env.LETRAS_MUS_API}${route}`,
      method,
      data,
      params,
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

  public async getTrackId(trackName: string, trackAuthorName: string) {
    const q = `${trackName} ${trackAuthorName}`
    const findTrackURL = new URL(
      'https://cse.google.com/cse/element/v1?rsz=8&num=8&hl=pt-PT&source=gcsc&gss=.br&cselibv=26b8d00a7c7a0812&cx=partner-pub-9911820215479768:4038644078&safe=off&cse_tok=AJvRUv2JvuJRrM286WPOFydbrmA_:1604715442272&exp=csqr,cc&callback=google.search.cse.api1616'
    )
    findTrackURL.searchParams.append('q', q)

    console.log(findTrackURL.href)

    const { data: response } = await this.request(
      'GET',
      null,
      undefined,
      undefined,
      { q },
      findTrackURL.href
    )

    console.log(response)
  }
}
