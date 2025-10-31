import express from 'express'

import habitRoutes from './routes/habitRoutes.ts'
import authRoutes from './routes/authRoutes.ts'
import userRoutes from './routes/userRoutes.ts'

const app = express()
app.use(express.json())

app.use('/api/habits', habitRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)

app.get('/health', (req, res) => {
  res.json({ success: 'true' })
})

app.listen(3000, () => {
  console.log('server is running on port 3000')
})

export default app
