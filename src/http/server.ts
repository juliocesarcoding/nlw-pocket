import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { checkGoalAsCompletedRoute } from '../routes/check-goal-as-completed'
import { getWeekPendingGoalsRoute } from '../routes/get-week-pending-goals'
import { getWeekSummaryRoute } from '../routes/get-week-summary'
import fastifyCors from '@fastify/cors'
import { createGoalRoute } from '../routes/create-goal'

const app = fastify().withTypeProvider<ZodTypeProvider>()
app.register(fastifyCors, {
  origin: '*',
})
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)
app.register(checkGoalAsCompletedRoute)
app.register(getWeekPendingGoalsRoute)
app.register(getWeekSummaryRoute)
app.register(createGoalRoute)

app.listen({ port: 3333 }).then(() => {
  console.log('Listining on port 3333')
})
