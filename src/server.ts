import express from 'express'

const app = express()

app.get('/health', (req, res) => {
  res.json({ success: 'true' })
})

app.listen(3000, () => {
  console.log('server is running on port 3000')
})

export default app
