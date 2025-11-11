import { db } from './connection.ts'
import { habits, users, entries, tags, habitTags } from './schema.ts'

const seed = async () => {
  console.log('🌱 Starting database seed...')
  try {
    console.log('Clearing exiting data.....')
    await db.delete(entries)
    await db.delete(habitTags)
    await db.delete(tags)
    await db.delete(habits)
    await db.delete(users)

    console.log('creating demo users...')
    const [demoUser] = await db
      .insert(users)
      .values({
        email: 'demo@app.com',
        username: 'demo_user',
        passwordHash: 'password',
        firstName: 'Demo',
        lastName: 'User',
      })
      .returning()

    console.log('Creating tags...')
    const [healthTag] = await db
      .insert(tags)
      .values({
        name: 'Health',
        color: '#10B981',
      })
      .returning()

    const [exerciseHabit] = await db
      .insert(habits)
      .values({
        userId: demoUser.id,
        name: 'Daily Exercise',
        description: '30 minutes of exercise every day',
        frequency: 'daily',
        targetCount: 1,
      })
      .returning()

    await db.insert(habitTags).values({
      habitId: exerciseHabit.id,
      tagId: healthTag.id,
    })

    console.log('Adding Completion entries....')
    const today = new Date()
    today.setHours(12, 0, 0)

    for (let i = 0; i < 7; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() - i)

      await db.insert(entries).values({
        habitId: exerciseHabit.id,
        completionDate: date,
        note: i % 2 === 0 ? 'Felt great after the workout!' : undefined,
      })
    }

    console.log('✅ Database seeding successful')
    console.log('User credentials :')
    console.log(`Email: ${demoUser.email}`)
    console.log(`Username: ${demoUser.username}`)
    console.log(`Password: ${demoUser.passwordHash}`)
  } catch (e) {
    console.error('Error seeding database:', e)
    process.exit(1)
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  seed()
    .then(() => process.exit(0))
    .catch(() => process.exit(1))
}

export default seed