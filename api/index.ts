import { type Context, Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { getHoliday, getHolidayDate } from '../lib/holiday.js'
import { dateSchema } from '../lib/date_schema.js'
import { zValidator } from '../lib/zod.js'
import { HTTPException } from 'hono/http-exception'
import { handle } from 'hono/vercel'

const app = new Hono()

app.use('*', logger())
app.use(
  '/api/*',
  cors({
    origin: '*',
    allowMethods: ['GET'],
  }),
)

app.get(
  '/api',
  zValidator('query', dateSchema),
  async (c: Context) => {
    const year = c.req.query('year') || new Date().getFullYear().toString()
    const month = c.req.query('month')
    const day = c.req.query('day')

    if (day) {
      return c.json(
        await getHolidayDate(new Date(`${year}-${month}-${day}`)),
      )
    }

    return c.json(
      await getHoliday(year, month),
    )
  },
)

app.get(
  '/api/today',
  async (c: Context) => {
    return c.json(
      await getHolidayDate(new Date()),
    )
  },
)

app.get(
  '/api/tomorrow',
  async (c: Context) => {
    const date = new Date()
    date.setDate(date.getDate() + 1)

    return c.json(
      await getHolidayDate(date),
    )
  },
)



app.onError((err: Error, c: Context) => {
  if (err instanceof HTTPException) {
    return c.json({
      message: err.message.toString(),
      errors: (err as any).cause,
    }, err.status)
  }

  return c.json({
    message: err.message.toString(),
  }, 500)
})

const handler = handle(app)

export const GET = handler
export const POST = handler
export const PUT = handler
export const PATCH = handler
export const DELETE = handler
export const OPTIONS = handler
