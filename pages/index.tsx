'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import axios from 'axios'
import TimeSlider from '../components/TimeSlider'
import HeatmapLegend from '../components/HeatmapLegend'
import { TemperatureDataPoint } from '../lib/temperatureUtils'

const TemperatureMap = dynamic(() => import('../components/TemperatureMap'), {
  ssr: false,
  loading: () => <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>Loading map...</div>,
})

export default function Home() {
  const [temperatureData, setTemperatureData] = useState<TemperatureDataPoint[]>([])
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTemperatureData = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await axios.get('/api/temperature')
        setTemperatureData(response.data.data)
      } catch (err) {
        console.error('Error fetching temperature data:', err)
        setError('Failed to fetch temperature data. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchTemperatureData()
    // Refresh data every 30 minutes
    const interval = setInterval(fetchTemperatureData, 30 * 60 * 1000)

    return () => clearInterval(interval)
  }, [selectedDate])

  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f3f4f6' }}>
      <div style={{ flex: 1, position: 'relative' }}>
        {loading && (
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.75)',
            zIndex: 50,
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                display: 'inline-block',
                animation: 'spin 1s linear infinite',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                borderTop: '2px solid #3b82f6',
                marginBottom: '16px',
              }} />
              <p style={{ color: '#374151' }}>Loading temperature data...</p>
            </div>
          </div>
        )}
        {error && (
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.75)',
            zIndex: 50,
          }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: '#dc2626', fontWeight: '600', marginBottom: '8px' }}>Error</p>
              <p style={{ color: '#374151' }}>{error}</p>
            </div>
          </div>
        )}
        <TemperatureMap data={temperatureData} selectedDate={selectedDate} />
        <HeatmapLegend />
      </div>
      <TimeSlider onDateChange={setSelectedDate} />
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
