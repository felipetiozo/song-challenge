import SpotifyAPI from '@app/helpers/SpotifyAPI'
import YoutubeAPI from '@app/helpers/YoutubeAPI'
import LetrasMusAPI from '@app/helpers/LetrasMusAPI'

export default async function getSubtitleFromTrackId(
  trackId: string
): Promise<string> {
  const spotifyAPI = new SpotifyAPI(process.env.SPOTIFY_TOKEN)
  const spotifyTrack = await spotifyAPI.getTrack(trackId)

  const letrasMusAPI = new LetrasMusAPI()
  const letrasMusTrackId = await letrasMusAPI.getTrackId(
    spotifyTrack.name,
    spotifyTrack.album.artists.map((artist) => artist.name).join(' ')
  )

  const trackVariations = await letrasMusAPI.getTrackVariations(
    letrasMusTrackId
  )

  const bestVariation = await findBestVariation(
    trackVariations,
    letrasMusTrackId,
    letrasMusAPI,
    spotifyTrack.duration_ms
  )

  return bestVariation
}

async function findBestVariation(
  trackVariations,
  letrasMusTrackId,
  letrasMusAPI,
  spotifyTrackDuration
) {
  const youtubeAPI = new YoutubeAPI(process.env.YOUTUBE_KEY)
  const populatedTrackVariations = await Promise.all(
    trackVariations.map(async (variationId) => {
      const variation = await letrasMusAPI.getTrackVariationInfo(
        letrasMusTrackId,
        variationId
      )

      const variationDuration = await youtubeAPI.getVideoDuration(
        variation.Original.VideoID
      )

      return {
        subtitle: variation.Original.Subtitle,
        duration: variationDuration,
      }
    })
  )

  const bestVariation = populatedTrackVariations.reduce((prev, curr) => {
    return Math.abs(curr.duration - spotifyTrackDuration) <
      Math.abs(prev.duration - spotifyTrackDuration)
      ? curr
      : prev
  })

  console.log(bestVariation)

  return bestVariation.subtitle
}
