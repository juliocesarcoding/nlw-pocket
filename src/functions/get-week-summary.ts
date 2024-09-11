import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import { db } from '../db'
import { goalCompletions, goals } from '../db/schema'
import { and, eq, lte, count, gte, sql } from 'drizzle-orm'

export async function getWeekSummary() {
  return {
    summary: 'teste',
  }
}
