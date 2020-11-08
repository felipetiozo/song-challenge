import SpotifyAPI from '@app/helpers/SpotifyAPI'
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
  const populatedTrackVariations = await Promise.all(
    trackVariations.map(async (variationId) => {
      const variation = await letrasMusAPI.getTrackVariationInfo(
        letrasMusTrackId,
        variationId
      )

      // const variationDuration = youtubeaPI...

      return {
        subtitle: variation.Original.Subtitle,
        // duration: variationDuration,
      }
    })
  )

  // ver qual tem a duration mais parecida com spotifyTrackDuration e retornar subtitle
  populatedTrackVariations
  spotifyTrackDuration
  return ''
}
