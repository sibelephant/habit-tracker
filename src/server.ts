import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'

import habitRoutes from './routes/habitRoutes.ts'
import authRoutes from './routes/authRoutes.ts'
import userRoutes from './routes/userRoutes.ts'
import { isTest } from '../env.ts'

const port = process.env.PORT

const app = express()
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev', { skip: () => isTest() }))

app.use('/api/habits', habitRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)

app.get('/health', (req, res) => {
  res.json({ success: 'true' })
})

app.listen(port, () => {
  console.log(`server is running on port ${port} `)
})

export default app
