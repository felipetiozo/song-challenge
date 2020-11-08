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
      'https://studiosolsolr-a.akamaihd.net/letras/m1/?callback=LetrasSug'
    )
    findTrackURL.searchParams.append('q', q)

    const { data: rawResponse } = await this.request(
      'GET',
      null,
      undefined,
      undefined,
      { q },
      findTrackURL.href
    )

    const track = JSON.parse(rawResponse.split('LetrasSug(')[1].split(')\n')[0])
      .response.docs[0]

    const trackId = track.imu
    return trackId
  }
}
