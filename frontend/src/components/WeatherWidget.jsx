import { useState, useEffect } from 'react'

function WeatherWidget({ location }) {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true)
        // Using Open-Meteo API (free, no API key needed)
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&temperature_unit=fahrenheit&timezone=America/Los_Angeles&forecast_days=7`
        )

        if (!response.ok) {
          throw new Error('Failed to fetch weather data')
        }

        const data = await response.json()
        setWeather(data)
        setError(null)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
    // Refresh every 30 minutes
    const interval = setInterval(fetchWeather, 30 * 60 * 1000)
    return () => clearInterval(interval)
  }, [location])

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">🌤️ Weather</h2>
        <div className="animate-pulse">
          <div className="h-16 bg-gray-200 rounded mb-4"></div>
          <div className="h-8 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">🌤️ Weather</h2>
        <p className="text-red-600">Error: {error}</p>
      </div>
    )
  }

  const current = weather?.current
  const daily = weather?.daily

  // Determine if conditions are good for hive inspection
  const isGoodInspectionWeather = current &&
    current.temperature_2m > 60 &&
    current.temperature_2m < 85 &&
    current.wind_speed_10m < 15

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">🌤️ Weather</h2>

      {/* Current Conditions */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-4xl font-bold text-gray-800">
              {Math.round(current.temperature_2m)}°F
            </p>
            <p className="text-gray-600">Currently</p>
          </div>
          <div className="text-right">
            <p className="text-gray-600">Humidity: {current.relative_humidity_2m}%</p>
            <p className="text-gray-600">Wind: {Math.round(current.wind_speed_10m)} mph</p>
          </div>
        </div>

        {/* Inspection Weather Indicator */}
        {isGoodInspectionWeather ? (
          <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded">
            ✅ Great conditions for hive inspection!
          </div>
        ) : (
          <div className="mt-4 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-2 rounded text-sm">
            ⚠️ Weather may not be ideal for inspection
          </div>
        )}
      </div>

      {/* 7-Day Forecast */}
      <div>
        <h3 className="font-semibold text-gray-700 mb-2">7-Day Forecast</h3>
        <div className="space-y-2">
          {daily.temperature_2m_max.slice(0, 7).map((maxTemp, index) => {
            const minTemp = daily.temperature_2m_min[index]
            const date = new Date(daily.time[index])
            const dayName = index === 0 ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' })

            return (
              <div key={index} className="flex justify-between items-center text-sm">
                <span className="font-medium w-16">{dayName}</span>
                <div className="flex items-center gap-2 flex-1">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-amber-500 h-2 rounded-full"
                      style={{ width: `${((maxTemp - 32) / 1.8)}%` }}
                    ></div>
                  </div>
                </div>
                <span className="text-gray-600 w-24 text-right">
                  {Math.round(minTemp)}° / {Math.round(maxTemp)}°F
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default WeatherWidget
