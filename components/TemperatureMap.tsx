'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { TemperatureDataPoint, temperatureToColor } from '../lib/temperatureUtils'

interface TemperatureMapProps {
  data: TemperatureDataPoint[]
  selectedDate: Date
}

export default function TemperatureMap({ data, selectedDate }: TemperatureMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<L.Map | null>(null)
  const markersRef = useRef<L.CircleMarker[]>([])

  useEffect(() => {
    // Initialize map
    if (mapContainer.current && !map.current) {
      map.current = L.map(mapContainer.current).setView([60.5, 10.5], 5)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '© OpenStreetMap contributors | Weather data from Norwegian Meteorological Institute',
        maxZoom: 19,
      }).addTo(map.current)
    }
  }, [])

  useEffect(() => {
    if (!map.current || !data || data.length === 0) return

    // Clear existing markers
    markersRef.current.forEach((marker) => map.current!.removeLayer(marker))
    markersRef.current = []

    // Add new markers with temperature colors
    data.forEach((point) => {
      const color = temperatureToColor(point.temperature)
      const radius = 12
      const opacity = 0.7

      const marker = L.circleMarker(
        [point.lat, point.lon],
        {
          radius,
          fillColor: color,
          color: color,
          weight: 2,
          opacity: 1,
          fillOpacity: opacity,
        }
      ).bindPopup(
        `<div style="font-weight: bold;">${point.name}</div><div style="margin-top: 4px; font-size: 12px;">${point.temperature.toFixed(1)}°C</div>`
      )

      marker.addTo(map.current!)
      markersRef.current.push(marker)
    })
  }, [data])

  return <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
}
