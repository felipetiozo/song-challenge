// import _ from 'lodash'
// import Fields from '@app/api/tracks/Fields'
// import Challenge from '@app/models/challenge'
// import ChallengeFields from '@app/api/challenge/Fields'
// import handleMongoError from '@app/helpers/handleMongoError'
import getSubtitleFromTrackId from '@app/helpers/getSubtitleFromTrackId'

export default async function func(context) {
  // const payload = _.pick(context.body, Fields.create)

  try {
    await getSubtitleFromTrackId(context.params.spotifyTrackId)
  } catch (err) {
    console.log(err.response.data)
  }

  // try {
  //   const challenge = await Challenge.create(payload)
  //   // TODO: Implement pickFields
  //   return challenge
  // } catch (err) {
  //   handleMongoError(err)
  // }
}
