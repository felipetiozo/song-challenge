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

  letrasMusTrackId

  return 'opa'
}
