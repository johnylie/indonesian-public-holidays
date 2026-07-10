import { crawler } from './scraper.js'

type Holiday = { name: string; date: string }

const cache = new Map<string, Holiday[]>()

export const getHoliday = async (
  year: string,
  month?: string
): Promise<(Holiday & { is_national_holiday: boolean })[]> => {
  const holidays = await getHolidayYearly(year)

  const result = holidays.map((h) => ({
    ...h,
    is_national_holiday: !h.name.toLowerCase().includes('cuti bersama'),
  }))

  if (!month) return result

  const monthPadded = month.padStart(2, '0')
  const prefix = `${year}-${monthPadded}`

  return result.filter((item) => item.date.startsWith(prefix))
}

export const getHolidayDate = async (
  date: Date
) => {
  const current = new Date(
    date.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' })
  )

  const year = current.getFullYear().toString()
  const month = (current.getMonth() + 1).toString().padStart(2, '0')
  const day = current.getDate().toString().padStart(2, '0')
  const formattedDate = `${year}-${month}-${day}`

  const holidays = await getHolidayYearly(year)
  const dayHolidays = holidays.filter(item => item.date === formattedDate)
  const holidayList = dayHolidays.map(item => item.name)

  return {
    date: formattedDate,
    is_holiday: holidayList.length > 0,
    is_national_holiday: dayHolidays.some(
      (holiday) => !holiday.name.toLowerCase().includes('cuti bersama')
    ),
    holiday_list: holidayList,
  }
}

export const getHolidayYearly = async (
  year: string
): Promise<Holiday[]> => {
  if (cache.has(year)) {
    return cache.get(year)!
  }

  const data = await getData(year)

  if (data.length === 0) return data

  cache.set(year, data)

  return data
}

const getData = async (year: string): Promise<Holiday[]> => {
  try {
    return await crawler(year)
  } catch {
    return []
  }
}
