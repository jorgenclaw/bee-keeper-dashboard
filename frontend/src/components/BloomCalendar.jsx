import { useState } from 'react'

// Bloom data for California Central Valley (Zone 9B)
const bloomData = {
  1: { // January
    name: 'January',
    plants: [
      { name: 'Eucalyptus', type: 'tree', flow: 'high', notes: 'Major winter nectar source' },
      { name: 'Magnolia (early)', type: 'tree', flow: 'medium', notes: 'Starting to bloom' },
    ]
  },
  2: { // February
    name: 'February',
    plants: [
      { name: 'Eucalyptus', type: 'tree', flow: 'high', notes: 'Peak flow continues' },
      { name: 'Almond trees', type: 'tree', flow: 'high', notes: 'Major early bloom' },
      { name: 'Peach trees', type: 'tree', flow: 'medium', notes: 'Early fruit trees' },
      { name: 'Magnolia', type: 'tree', flow: 'medium', notes: 'Continues blooming' },
      { name: 'Maples', type: 'tree', flow: 'medium', notes: 'Early pollen' },
      { name: 'Willows', type: 'tree', flow: 'high', notes: 'Excellent nectar & pollen' },
    ]
  },
  3: { // March
    name: 'March',
    plants: [
      { name: 'Eucalyptus', type: 'tree', flow: 'high', notes: 'Still flowering' },
      { name: 'Fruit trees', type: 'tree', flow: 'high', notes: 'Peak fruit tree bloom' },
      { name: 'California Poppy', type: 'wildflower', flow: 'medium', notes: 'Starting to appear' },
      { name: 'Mustard', type: 'wildflower', flow: 'high', notes: 'Explosive bloom' },
      { name: 'Willows', type: 'tree', flow: 'high', notes: 'Continues' },
    ]
  },
  4: { // April
    name: 'April',
    plants: [
      { name: 'Eucalyptus', type: 'tree', flow: 'medium', notes: 'Tapering off' },
      { name: 'Cherry blossoms', type: 'tree', flow: 'high', notes: 'Peak bloom' },
      { name: 'Wildflowers', type: 'wildflower', flow: 'high', notes: 'Peak wildflower season' },
      { name: 'California Poppy', type: 'wildflower', flow: 'high', notes: 'Peak bloom' },
      { name: 'Mustard', type: 'wildflower', flow: 'medium', notes: 'Continuing' },
    ]
  },
  5: { // May
    name: 'May',
    plants: [
      { name: 'Eucalyptus', type: 'tree', flow: 'low', notes: 'Ending' },
      { name: 'California Buckeye', type: 'tree', flow: 'medium', notes: 'Late spring bloom' },
      { name: 'Wildflowers', type: 'wildflower', flow: 'medium', notes: 'Continuing at elevation' },
      { name: 'Lupines (high elevation)', type: 'wildflower', flow: 'medium', notes: 'Mountain blooms' },
    ]
  },
  6: { // June
    name: 'June',
    plants: [
      { name: 'California Buckeye', type: 'tree', flow: 'medium', notes: 'Straddling May/June' },
      { name: 'Lupines', type: 'wildflower', flow: 'low', notes: 'Ending' },
      { name: 'Urban gardens', type: 'perennial', flow: 'medium', notes: 'Becoming important' },
    ]
  },
  7: { // July
    name: 'July',
    plants: [
      { name: 'Urban gardens', type: 'perennial', flow: 'medium', notes: 'Main nectar source' },
      { name: 'Russian Sage', type: 'perennial', flow: 'medium', notes: 'Heat-tolerant blooms' },
      { name: 'Lavender', type: 'perennial', flow: 'medium', notes: 'Summer blooms' },
    ]
  },
  8: { // August
    name: 'August',
    plants: [
      { name: 'Urban gardens', type: 'perennial', flow: 'medium', notes: 'Critical period' },
      { name: 'Russian Sage', type: 'perennial', flow: 'medium', notes: 'Late summer purple' },
      { name: 'Goldenrod', type: 'perennial', flow: 'medium', notes: 'Starting to bloom' },
      { name: 'Asters', type: 'perennial', flow: 'medium', notes: 'Late summer nectar' },
    ]
  },
  9: { // September
    name: 'September',
    plants: [
      { name: 'Goldenrod', type: 'perennial', flow: 'high', notes: 'Peak fall bloom' },
      { name: 'Asters', type: 'perennial', flow: 'high', notes: 'Peak fall nectar' },
      { name: 'Urban gardens', type: 'perennial', flow: 'medium', notes: 'Continues' },
    ]
  },
  10: { // October
    name: 'October',
    plants: [
      { name: 'Goldenrod', type: 'perennial', flow: 'medium', notes: 'Continuing' },
      { name: 'Asters', type: 'perennial', flow: 'medium', notes: 'Continuing' },
      { name: 'Urban gardens', type: 'perennial', flow: 'low', notes: 'Declining' },
    ]
  },
  11: { // November
    name: 'November',
    plants: [
      { name: 'Eucalyptus (early)', type: 'tree', flow: 'low', notes: 'Some varieties starting' },
      { name: 'Limited forage', type: 'other', flow: 'low', notes: 'Prepare for winter' },
    ]
  },
  12: { // December
    name: 'December',
    plants: [
      { name: 'Eucalyptus', type: 'tree', flow: 'medium', notes: 'Winter flow beginning' },
      { name: 'Limited forage', type: 'other', flow: 'low', notes: 'Winter preparation' },
    ]
  },
}

function BloomCalendar({ zone }) {
  const currentMonth = new Date().getMonth() + 1
  const [selectedMonth, setSelectedMonth] = useState(currentMonth)

  const monthData = bloomData[selectedMonth]

  const getFlowColor = (flow) => {
    switch (flow) {
      case 'high': return 'bg-green-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-orange-500'
      default: return 'bg-gray-500'
    }
  }

  const getFlowLabel = (flow) => {
    switch (flow) {
      case 'high': return 'High Flow'
      case 'medium': return 'Medium Flow'
      case 'low': return 'Low Flow'
      default: return 'Unknown'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">🌸 Bloom Calendar - Zone {zone}</h2>

      {/* Month Selector */}
      <div className="mb-6">
        <div className="grid grid-cols-6 sm:grid-cols-12 gap-2">
          {Object.keys(bloomData).map((month) => {
            const monthNum = parseInt(month)
            const isSelected = monthNum === selectedMonth
            const isCurrent = monthNum === currentMonth

            return (
              <button
                key={month}
                onClick={() => setSelectedMonth(monthNum)}
                className={`px-2 py-1 rounded text-sm font-medium transition-colors ${
                  isSelected
                    ? 'bg-amber-600 text-white'
                    : isCurrent
                    ? 'bg-amber-200 text-amber-800'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {new Date(2024, monthNum - 1).toLocaleDateString('en-US', { month: 'short' })}
              </button>
            )
          })}
        </div>
      </div>

      {/* Selected Month Details */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-3">
          {monthData.name} Blooms
        </h3>

        <div className="space-y-3">
          {monthData.plants.map((plant, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{plant.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{plant.notes}</p>
                  <p className="text-xs text-gray-500 mt-1 capitalize">Type: {plant.type}</p>
                </div>
                <div className="ml-3">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white ${getFlowColor(
                      plant.flow
                    )}`}
                  >
                    {getFlowLabel(plant.flow)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {monthData.plants.length === 0 && (
          <p className="text-gray-500 text-center py-4">No major blooms recorded for this month.</p>
        )}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-sm font-semibold text-gray-700 mb-2">Nectar Flow Legend:</p>
        <div className="flex gap-4 flex-wrap text-sm">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-green-500"></span>
            <span className="text-gray-600">High Flow</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-yellow-500"></span>
            <span className="text-gray-600">Medium Flow</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full bg-orange-500"></span>
            <span className="text-gray-600">Low Flow</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BloomCalendar
