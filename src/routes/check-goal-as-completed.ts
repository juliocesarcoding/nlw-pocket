import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { checkGoalAsCompleted } from '../functions/check-goal-as-completed'

export const checkGoalAsCompletedRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/completions',
    {
      schema: {
        body: z.object({
          goalId: z.string(),
        }),
      },
    },
    async request => {
      const { goalId } = request.body
      await checkGoalAsCompleted({
        goalId,
      })
    }
  )
}
