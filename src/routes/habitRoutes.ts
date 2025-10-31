import { Router } from 'express'
const router = Router()

// Define habit-related routes here
router.get('/', (req, res) => {
  res.send('List of habits')
})

router.post('/', (req, res) => {
  res.status(201).send('Habit created').status(201)
})

router.put('/:id', (req, res) => {
  res.send(`Habit with id ${req.params.id} updated`).status(200)
})

router.delete('/:id', (req, res) => {
  res.send(`Habit with id ${req.params.id} deleted`).status(200)
})

router.post('/:id/complete', (req, res) => {
  res.send(`Habit with id ${req.params.id} marked as complete`).status(200)
})

export default router
