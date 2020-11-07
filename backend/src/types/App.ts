import express from 'express'
import { Mongoose } from 'mongoose'

type App = {
  express?: express.Express
  mongo?: Mongoose
}

export default App
