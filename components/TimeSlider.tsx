'use client'

import { useState } from 'react'
import { subDays, addDays, format } from 'date-fns'

interface TimeSliderProps {
  onDateChange: (date: Date) => void
  maxDaysBack?: number
  maxDaysForward?: number
}

export default function TimeSlider({
  onDateChange,
  maxDaysBack = 7,
  maxDaysForward = 7,
}: TimeSliderProps) {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [customDaysBack, setCustomDaysBack] = useState(maxDaysBack)
  const [customDaysForward, setCustomDaysForward] = useState(maxDaysForward)

  const minDate = subDays(new Date(), customDaysBack)
  const maxDate = addDays(new Date(), customDaysForward)

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value)
    setSelectedDate(newDate)
    onDateChange(newDate)
  }

  const handleQuickSelect = (daysOffset: number) => {
    const newDate = addDays(new Date(), daysOffset)
    setSelectedDate(newDate)
    onDateChange(newDate)
  }

  const handleCustomDaysBack = (value: number) => {
    const clampedValue = Math.min(Math.max(value, 0), 90)
    setCustomDaysBack(clampedValue)
  }

  const handleCustomDaysForward = (value: number) => {
    const clampedValue = Math.min(Math.max(value, 0), 14)
    setCustomDaysForward(clampedValue)
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      padding: '16px',
      boxShadow: '0 -4px 6px rgba(0, 0, 0, 0.1)',
      zIndex: 10,
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ marginBottom: '16px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>
            Select Date: {format(selectedDate, 'MMM dd, yyyy')}
          </h3>
          <input
            type="range"
            min={minDate.getTime()}
            max={maxDate.getTime()}
            value={selectedDate.getTime()}
            onChange={handleSliderChange}
            style={{ width: '100%', cursor: 'pointer' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
            <span>{format(minDate, 'MMM dd')}</span>
            <span>Today</span>
            <span>{format(maxDate, 'MMM dd')}</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <button
            onClick={() => handleQuickSelect(-7)}
            style={{
              padding: '6px 12px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '14px',
              cursor: 'pointer',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#3b82f6')}
          >
            7 days ago
          </button>
          <button
            onClick={() => handleQuickSelect(-1)}
            style={{
              padding: '6px 12px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '14px',
              cursor: 'pointer',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#3b82f6')}
          >
            Yesterday
          </button>
          <button
            onClick={() => handleQuickSelect(0)}
            style={{
              padding: '6px 12px',
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '14px',
              cursor: 'pointer',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#059669')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#10b981')}
          >
            Today
          </button>
          <button
            onClick={() => handleQuickSelect(1)}
            style={{
              padding: '6px 12px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '14px',
              cursor: 'pointer',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#3b82f6')}
          >
            Tomorrow
          </button>
          <button
            onClick={() => handleQuickSelect(7)}
            style={{
              padding: '6px 12px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '14px',
              cursor: 'pointer',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#3b82f6')}
          >
            7 days ahead
          </button>
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            style={{
              padding: '6px 12px',
              backgroundColor: '#6b7280',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '14px',
              cursor: 'pointer',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#4b5563')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#6b7280')}
          >
            {showAdvanced ? 'Hide' : 'Show'} Advanced
          </button>
        </div>

        {showAdvanced && (
          <div style={{ backgroundColor: '#f3f4f6', padding: '12px', borderRadius: '4px', border: '1px solid #e5e7eb' }}>
            <p style={{ fontSize: '12px', color: '#4b5563', marginBottom: '12px' }}>
              <strong>Note:</strong> MET API provides forecasts up to 14 days ahead. Historical observations are limited to recent past.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#374151', marginBottom: '4px' }}>
                  Days Back (Max: 90 days): {customDaysBack}
                </label>
                <input
                  type="range"
                  min="0"
                  max="90"
                  value={customDaysBack}
                  onChange={(e) => handleCustomDaysBack(parseInt(e.target.value))}
                  style={{ width: '100%', cursor: 'pointer' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#374151', marginBottom: '4px' }}>
                  Days Forward (Max: 14 days): {customDaysForward}
                </label>
                <input
                  type="range"
                  min="0"
                  max="14"
                  value={customDaysForward}
                  onChange={(e) => handleCustomDaysForward(parseInt(e.target.value))}
                  style={{ width: '100%', cursor: 'pointer' }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
