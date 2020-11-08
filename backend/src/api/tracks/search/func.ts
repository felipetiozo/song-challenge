import BadRequest from '@app/errors/BadRequest'
import SpotifyAPI from '@app/helpers/SpotifyAPI'

export default async function func(context) {
  const q = context.query.q

  if (!q) {
    throw new BadRequest(`Missing 'q' parameter`)
  }

  const spotifyAPI = new SpotifyAPI(process.env.SPOTIFY_TOKEN)
  const tracks = await spotifyAPI.searchTrack(q)
  return tracks
}
