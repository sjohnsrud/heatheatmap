import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

type ResponseData = {
  data?: any
  error?: string
}

const NORWAY_CITIES = [
  { name: 'Oslo', lat: 59.9139, lon: 10.7522 },
  { name: 'Bergen', lat: 60.3913, lon: 5.3221 },
  { name: 'Trondheim', lat: 63.4469, lon: 10.4744 },
  { name: 'Stavanger', lat: 58.9734, lon: 5.7331 },
  { name: 'Tromsø', lat: 69.6492, lon: 18.9553 },
  { name: 'Lillehammer', lat: 61.1186, lon: 10.4669 },
  { name: 'Kristiansand', lat: 58.1436, lon: 8.0743 },
  { name: 'Ålesund', lat: 62.4724, lon: 6.1467 },
  { name: 'Narvik', lat: 68.4338, lon: 17.4261 },
  { name: 'Alta', lat: 70.0, lon: 23.1 },
  { name: 'Bodø', lat: 67.2827, lon: 14.4075 },
  { name: 'Mo i Rana', lat: 66.3142, lon: 14.1997 },
  { name: 'Hamar', lat: 60.5063, lon: 11.0733 },
  { name: 'Gjøvik', lat: 60.7906, lon: 10.6906 },
  { name: 'Sandefjord', lat: 59.1336, lon: 10.4742 },
]

const USER_AGENT = 'heatheatmap-app (https://github.com/sjohnsrud/heatheatmap)'

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const temperatureData = await Promise.all(
      NORWAY_CITIES.map(async (city) => {
        try {
          const response = await axios.get(
            `https://api.met.no/weatherapi/locationforecast/2.0/compact`,
            {
              params: {
                lat: city.lat,
                lon: city.lon,
              },
              headers: {
                'User-Agent': USER_AGENT,
              },
            }
          )

          const timeseries = response.data.properties.timeseries
          if (timeseries && timeseries.length > 0) {
            const current = timeseries[0]
            const temp = current.data.instant.details.air_temperature

            return {
              name: city.name,
              lat: city.lat,
              lon: city.lon,
              temperature: temp,
              timestamp: current.time,
            }
          }
        } catch (error) {
          console.error(`Error fetching data for ${city.name}:`, error)
        }
        return null
      })
    )

    const validData = temperatureData.filter((d) => d !== null)

    res.status(200).json({ data: validData })
  } catch (error) {
    console.error('Temperature API error:', error)
    res.status(500).json({ error: 'Failed to fetch temperature data' })
  }
}
