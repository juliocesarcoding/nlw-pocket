import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { checkGoalAsCompletedRoute } from '../routes/check-goal-as-completed'
import { getWeekPendingGoalsRoute } from '../routes/get-week-pending-goals'
import { getWeekSummaryRoute } from '../routes/get-week-summary'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)
app.register(checkGoalAsCompletedRoute)
app.register(getWeekPendingGoalsRoute)
app.register(getWeekSummaryRoute)

app.listen({ port: 3333 }).then(() => {
  console.log('Listining on port 3333')
})
