import _ from 'lodash'
import Fields from '@app/api/tracks/Fields'
import BadRequest from '@app/errors/BadRequest'
import SpotifyAPI from '@app/helpers/SpotifyAPI'

export default async function func(context) {
  const q = context.query.q

  if (!q) {
    throw new BadRequest(`Missing 'q' parameter`)
  }

  const spotifyAPI = new SpotifyAPI(process.env.SPOTIFY_TOKEN)
  const tracks = await spotifyAPI.searchTrack(q)

  const filteredTracks = tracks.map((track) => _.pick(track, Fields.public))
  return filteredTracks
}
