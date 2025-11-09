import { Router } from 'express'
import { validateBody, validateParams } from '../middleware/validation.ts'
import { z } from 'zod'

const router = Router()

const createHabitSchema = z.object({
  name: z.string(),
})

const completeParamsSchema = z.object({
  id: z.string().min(3, 'at least 3 characters long'),
})
// Define habit-related routes here
router.get('/', (req, res) => {
  res.send('List of habits')
})

router.post('/', validateBody(createHabitSchema), (req, res) => {
  res.status(201).send('Habit created').status(201)
})

router.put('/:id', (req, res) => {
  res.send(`Habit with id ${req.params.id} updated`).status(200)
})

router.delete('/:id', validateBody(createHabitSchema), (req, res) => {
  res.send(`Habit with id ${req.params.id} deleted`).status(200)
})

router.post('/:id/complete', (req, res) => {
  res.send(`Habit with id ${req.params.id} marked as complete`).status(200)
})

export default router
