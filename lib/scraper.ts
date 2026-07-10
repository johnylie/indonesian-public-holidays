import * as cheerio from 'cheerio'
import { MONTH_NAME } from './constants.js'

const fetcher = async (year: string) => {
  const response = await fetch(`https://tanggalans.com/kalender-${year}`)

  if (!response.ok) {
    throw new Error('Failed to fetch tanggalan')
  }

  return await response.text()
}

export const crawler = async (year: string) => {
  const html = await fetcher(year)
  const $ = cheerio.load(html)

  const months = $('.entry-content .kalender-indo')

  if (!months.length) {
    throw new Error('Failed to parse DOM')
  }

  const holidays: { date: string, name: string }[] = []

  months.each((_, item) => {
    const titleText = $(item).find('.kal-title .kal-title-link').text()
    const [monthName, yearStr] = titleText.split(' ')

    if (!monthName || !yearStr) return

    const monthKey = monthName.toLowerCase() as keyof typeof MONTH_NAME
    const month = MONTH_NAME[monthKey]

    if (!month) return

    $(item).find('.kal-libur-list li').each((__, holiday) => {
      const dayText = $(holiday).find('.kal-libur-day').text().trim()
      
      const dayEl = $(holiday).find('.kal-libur-day').get(0)
      const nameNode = dayEl?.nextSibling
      let name = ''
      if (nameNode) {
        if (nameNode.type === 'text') {
          name = nameNode.data?.trim() || ''
        } else {
          name = $(nameNode).text().trim()
        }
      }

      if (!dayText || !name) return

      if (dayText.includes('-')) {
        const split = dayText.split('-', 2)
        const start = Number(split[0])
        const end = Number(split[1])

        for (let i = start; i <= end; i++) {
          holidays.push({
            date: `${yearStr}-${month}-${i.toString().padStart(2, '0')}`,
            name,
          })
        }
      } else {
        holidays.push({
          date: `${yearStr}-${month}-${dayText.padStart(2, '0')}`,
          name,
        })
      }
    })
  })

  return holidays
}
