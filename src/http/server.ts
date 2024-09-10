import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { createGoal } from '../functions/create-goal'
import z from 'zod'
import { getWeekPendingGoals } from '../functions/get-week-pending-goals'
import { checkGoalAsCompleted } from '../functions/check-goal-as-completed'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

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
    return await checkGoalAsCompleted({
      goalId,
    })
  }
)
app.get('/pending-goals', async () => {
  const pendingGoals = await getWeekPendingGoals()

  return pendingGoals
})
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

app.listen({ port: 3333 }).then(() => {
  console.log('Listining on port 3333')
})
