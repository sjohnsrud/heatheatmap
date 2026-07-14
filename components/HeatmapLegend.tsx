'use client'

export default function HeatmapLegend() {
  return (
    <div style={{
      position: 'fixed',
      top: '16px',
      right: '16px',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      padding: '16px',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      zIndex: 10,
      maxWidth: '300px',
    }}>
      <h3 style={{ fontWeight: '600', fontSize: '14px', marginBottom: '12px' }}>Temperature Scale</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#0000ff' }} />
          <span>&lt; -10°C (Cold)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#00aaff' }} />
          <span>-10 to 0°C</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#00ff00' }} />
          <span>0 to 10°C</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#ffff00' }} />
          <span>10 to 20°C</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#ff8800' }} />
          <span>20 to 30°C</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#ff0000' }} />
          <span>&gt; 30°C (Hot)</span>
        </div>
      </div>
      <p style={{ fontSize: '12px', color: '#4b5563', marginTop: '12px', paddingTop: '8px', borderTop: '1px solid #e5e7eb' }}>
        Weather data from Norwegian Meteorological Institute (MET Norway)
      </p>
    </div>
  )
}
