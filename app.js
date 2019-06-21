import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import morgan from 'morgan'
import database from './config/database'

import allRoutes from './config/routes'

const port = 9000
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(helmet())
app.use(morgan('dev'))

database.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/xendit')

app.use('/', allRoutes)

app.listen(port, () => {
  console.log(`This app started on port: ${port}`)
})

module.exports = app