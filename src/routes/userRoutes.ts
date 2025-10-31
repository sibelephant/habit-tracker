import { Router } from 'express'
const router = Router()

router.get('/', (req, res) => {
  res.send('User profile data')
})

router.get('/:id', (req, res) => {
  res.send(`User with id ${req.params.id} retrieved`).status(200)
})

router.put('/:id', (req, res) => {
  res.send(`User with id ${req.params.id} updated`).status(200)
})

router.delete('/:id', (req, res) => {
  res.send(`User with id ${req.params.id} deleted`).status(200)
})

export default router
