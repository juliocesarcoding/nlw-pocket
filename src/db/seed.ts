import { client, db } from '.'
import { goalCompletions, goals } from './schema'
import dayjs from 'dayjs'

async function seed() {
  await db.delete(goalCompletions)
  await db.delete(goals)
  const result = await db
    .insert(goals)
    .values([
      { title: 'Learn to code', desiredWeeklyFrequency: 2 },
      { title: 'Exercise', desiredWeeklyFrequency: 3 },
      { title: 'Read', desiredWeeklyFrequency: 1 },
    ])
    .returning()

  const startOfWeek = dayjs().startOf('week')

  await db.insert(goalCompletions).values([
    { goalId: result[0].id, completedAt: new Date() },
    { goalId: result[1].id, completedAt: startOfWeek.toDate() },
    { goalId: result[2].id, completedAt: startOfWeek.add(1, 'day').toDate() },
  ])
}

seed().finally(() => client.end())
