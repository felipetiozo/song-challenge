import { ConnectionOptions, connect } from 'mongoose'

export default async function mongoSetup() {
  let mongoURI: string

  const isTest = process.env.NODE_ENV === 'test'
  if (isTest) {
    mongoURI = `${process.env.MONGO_URI}-test`
  } else {
    mongoURI = process.env.MONGO_URI
  }

  const options: ConnectionOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  }
  const connection = await connect(mongoURI, options)
  return connection
}
