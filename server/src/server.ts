/* eslint-disable @typescript-eslint/no-unused-vars */

import 'dotenv/config'
import 'express-async-errors'
import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'

import router from './router'
import AppError from '@helpers/AppError'

const app = express()

const URL = process.env.APP_URL || 'http://localhost'
const PORT = process.env.APP_PORT || 3001

app.use(cors())
app.use(express.json())
app.use(router)

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {

  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    })
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  })
})

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${URL}:${PORT}`)
})
