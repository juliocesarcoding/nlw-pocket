import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { createGoal } from '../functions/create-goal'

export const createGoalRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/goals',
    {
      schema: {
        body: z.object({
          title: z.string(),
          desiredWeeklyFrequency: z.number(),
        }),
      },
    },
    async request => {
      const { title, desiredWeeklyFrequency } = request.body
      return await createGoal({
        title,
        desiredWeeklyFrequency,
      })
    }
  )
}
