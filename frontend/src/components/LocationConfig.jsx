import { useState, useEffect } from 'react'
import { detectSunsetZone, detectState, getCityFromCoords, getZoneName } from '../utils/zoneDetector'

function LocationConfig({ location, onUpdate, onClose }) {
  const [formData, setFormData] = useState(location)
  const [autoDetecting, setAutoDetecting] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    onUpdate(formData)
    onClose()
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Auto-detect zone when coordinates change
  const handleCoordinateChange = (e) => {
    const { name, value } = e.target
    const numValue = parseFloat(value)

    setFormData(prev => {
      const updated = {
        ...prev,
        [name]: numValue
      }

      // If both lat and lon are valid, auto-detect zone
      if (updated.latitude && updated.longitude) {
        updated.zone = detectSunsetZone(updated.latitude, updated.longitude)
        updated.state = detectState(updated.latitude, updated.longitude)
      }

      return updated
    })
  }

  // Auto-detect city name from coordinates
  const handleAutoDetectCity = async () => {
    if (!formData.latitude || !formData.longitude) {
      alert('Please enter latitude and longitude first')
      return
    }

    setAutoDetecting(true)
    try {
      const city = await getCityFromCoords(formData.latitude, formData.longitude)
      setFormData(prev => ({
        ...prev,
        city: city
      }))
    } catch (error) {
      console.error('Error auto-detecting city:', error)
    } finally {
      setAutoDetecting(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">⚙️ Location Settings</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 text-2xl"
        >
          ×
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                required
              />
              <button
                type="button"
                onClick={handleAutoDetectCity}
                disabled={autoDetecting}
                className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm disabled:opacity-50"
                title="Auto-detect city from coordinates"
              >
                {autoDetecting ? '...' : '📍'}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              State
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sunset Zone (auto-detected)
            </label>
            <input
              type="text"
              name="zone"
              value={formData.zone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-gray-50"
              placeholder="e.g., 9B"
              required
              readOnly
              title={getZoneName(formData.zone)}
            />
            <p className="text-xs text-gray-500 mt-1">{getZoneName(formData.zone)}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Latitude
            </label>
            <input
              type="number"
              step="0.0001"
              name="latitude"
              value={formData.latitude}
              onChange={handleCoordinateChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Longitude
            </label>
            <input
              type="number"
              step="0.0001"
              name="longitude"
              value={formData.longitude}
              onChange={handleCoordinateChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-sm text-blue-800">
            💡 <strong>Tip:</strong> Enter your latitude and longitude (find at{' '}
            <a
              href="https://www.latlong.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-blue-600"
            >
              latlong.net
            </a>
            ) and the Sunset Zone will be auto-detected! Click 📍 to auto-detect city name.
          </p>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default LocationConfig
