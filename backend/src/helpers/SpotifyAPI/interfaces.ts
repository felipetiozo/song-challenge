export interface iTrack {
  type: string
  name: string
  id: string
  duration_ms: number
  album: {
    album_type: string
    artists: {
      name: string
      type: string
    }[]
    id: string
    images: {
      height: number
      url: string
      width: number
    }[]
    name: string
    release_date: string
    total_tracks: number
    type: string
  }
}
