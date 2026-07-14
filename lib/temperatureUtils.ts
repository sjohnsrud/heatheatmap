export interface TemperatureDataPoint {
  name: string
  lat: number
  lon: number
  temperature: number
  timestamp: string
}

export interface HeatmapDataPoint {
  lat: number
  lon: number
  intensity: number
}

export const convertToHeatmapData = (
  temperatureData: TemperatureDataPoint[]
): HeatmapDataPoint[] => {
  if (!temperatureData || temperatureData.length === 0) {
    return []
  }

  const temps = temperatureData.map((d) => d.temperature)
  const minTemp = Math.min(...temps)
  const maxTemp = Math.max(...temps)
  const tempRange = maxTemp - minTemp || 1

  return temperatureData.map((d) => ({
    lat: d.lat,
    lon: d.lon,
    intensity: (d.temperature - minTemp) / tempRange,
  }))
}

export const temperatureToColor = (temp: number): string => {
  // Blue (cold) to Red (hot)
  if (temp < -10) return '#0000ff' // Blue
  if (temp < 0) return '#00aaff' // Light blue
  if (temp < 10) return '#00ff00' // Green
  if (temp < 20) return '#ffff00' // Yellow
  if (temp < 30) return '#ff8800' // Orange
  return '#ff0000' // Red
}

export const getTemperatureLabel = (temp: number): string => {
  return `${temp.toFixed(1)}°C`
}
