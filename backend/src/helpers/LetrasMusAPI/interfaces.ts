export interface iTrackVariationInfo {
  Original: {
    ID: number
    SongID: number
    Subtitle: string
    VideoID: string
    Lang: string
    UserID: number
    UserName: string
    SentAt: string
  }
  Translation?: {
    ID: number
    SongID: number
    Subtitle: string
    VideoID: string
    Lang: string
    UserID: number
    UserName: string
    SentAt: string
  }
}
