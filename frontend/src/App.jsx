import { useState, useEffect } from 'react'
import WeatherWidget from './components/WeatherWidget'
import BloomCalendar from './components/BloomCalendar'
import BeeSeasonalTasks from './components/BeeSeasonalTasks'
import WeeklyTasks from './components/WeeklyTasks'
import LocationConfig from './components/LocationConfig'

function App() {
  const [location, setLocation] = useState({
    city: 'Manteca',
    state: 'CA',
    zone: '9B',
    latitude: 37.7975,
    longitude: -121.215
  })

  const [showConfig, setShowConfig] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-green-50">
      {/* Header */}
      <header className="bg-amber-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                🐝 Bee Keeper Dashboard
              </h1>
              <p className="text-amber-100 mt-1">
                {location.city}, {location.state} - Zone {location.zone}
              </p>
            </div>
            <button
              onClick={() => setShowConfig(!showConfig)}
              className="bg-amber-700 hover:bg-amber-800 px-4 py-2 rounded-lg transition-colors"
            >
              ⚙️ Settings
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {showConfig && (
          <div className="mb-8">
            <LocationConfig
              location={location}
              onUpdate={setLocation}
              onClose={() => setShowConfig(false)}
            />
          </div>
        )}

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Weather & Weekly Tasks */}
          <div className="lg:col-span-1 space-y-6">
            <WeatherWidget location={location} />
            <WeeklyTasks location={location} />
          </div>

          {/* Middle/Right Columns - Bloom Calendar & Seasonal Tasks */}
          <div className="lg:col-span-2 space-y-6">
            <BloomCalendar zone={location.zone} />
            <BeeSeasonalTasks />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-12 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            Built with 💛 for beekeepers | Open Source on{' '}
            <a
              href="https://github.com/jorgenclaw/bee-keeper-dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300"
            >
              GitHub
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
