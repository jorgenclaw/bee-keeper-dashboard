import { useState } from 'react'

// Based on UC Davis California Beekeeping Timeline
const seasonalTasks = {
  1: { // January
    month: 'January',
    season: 'Winter',
    tasks: [
      'Check hives for survival and strength',
      'Order replacement/expansion packages or nucs',
      'Clean dead hive equipment',
      'Determine feeding and mite management protocols',
      'Read and take beekeeping classes',
    ]
  },
  2: { // February
    month: 'February',
    season: 'Late Winter',
    tasks: [
      'Continue checking hives for survival and strength',
      'Feed colonies syrup and pollen',
      'Test for mite levels in larger colonies',
      'Potentially treat colonies for mites',
      'Prepare equipment for spring',
    ]
  },
  3: { // March
    month: 'March',
    season: 'Early Spring',
    tasks: [
      'Provide space/supers for expanding colonies',
      'Evaluate queen laying pattern',
      'Test mite levels in colonies',
      'Potentially treat for mites',
      'Add drone comb if desired',
      'Feed syrup to hives with undrawn frames',
    ]
  },
  4: { // April
    month: 'April',
    season: 'Spring Buildup',
    tasks: [
      'Pick-up/Install packages and/or nucs (if ordered)',
      'Ensure queen is present and egg-laying',
      'Feed syrup to packages',
      'Inspect colonies regularly',
      'Provide space/supers for expanding colonies',
      'Split strong colonies',
      'Replace poor/failing queens',
    ]
  },
  5: { // May
    month: 'May',
    season: 'Late Spring',
    tasks: [
      'Provide space/supers for expanding colonies',
      'Avoid hives from being "honey-bound"',
      'Add honey supers to production colonies',
      'Watch for swarming / Capture swarms',
      'Split strong colonies (by early June)',
      'Test mite levels and potentially treat',
      'Remove drone comb',
    ]
  },
  6: { // June
    month: 'June',
    season: 'Early Summer',
    tasks: [
      'Continue providing space/supers',
      'Add honey supers as needed',
      'Final window for splits (early June)',
      'Test mite levels and potentially treat',
      'Extract and bottle honey (late June)',
      'Monitor for queen issues',
    ]
  },
  7: { // July
    month: 'July',
    season: 'Summer',
    tasks: [
      'Nectar flow likely ending or minimal',
      'Test mite population and treat as needed',
      'Extract and bottle honey',
      'Add entrance reducers',
      'Prevent robbing',
      'Ensure colonies are still rearing brood',
    ]
  },
  8: { // August
    month: 'August',
    season: 'Late Summer',
    tasks: [
      'Test mite population and treat as needed (critical!)',
      'Reduce and equalize/combine colonies as needed',
      'Check queen has space to lay',
      'Ensure colonies are rearing brood for winter bees',
      'Continue preventing robbing',
      'Final honey extraction',
    ]
  },
  9: { // September
    month: 'September',
    season: 'Fall',
    tasks: [
      'Equalize/combine weak hives',
      'Clear dead-out equipment',
      'Continue to prevent robbing',
      'Reduce colonies if needed',
      'Ensure an egg-laying queen is present',
      'Test and treat for mites if needed',
      'Feed syrup',
    ]
  },
  10: { // October
    month: 'October',
    season: 'Fall',
    tasks: [
      'Feed syrup as needed',
      'Feed pollen patties',
      'Continue preventing robbing',
      'Check colony strength',
      'Ensure queens are present',
      'Final mite treatments',
      'Winterize hives',
    ]
  },
  11: { // November
    month: 'November',
    season: 'Early Winter',
    tasks: [
      'Feed syrup if needed',
      'Feed pollen patties if needed',
      'Monitor hive weight',
      'Reduce entrances',
      'Protect from wind and moisture',
      'Avoid opening hives unless necessary',
    ]
  },
  12: { // December
    month: 'December',
    season: 'Winter',
    tasks: [
      'Read and study beekeeping',
      'Plan for next season',
      'Order equipment if needed',
      'Monitor hive weight (lift from back)',
      'Emergency feed if very light',
      'Protect from weather',
      'Order packages/nucs for spring',
    ]
  },
}

function BeeSeasonalTasks() {
  const currentMonth = new Date().getMonth() + 1
  const [selectedMonth, setSelectedMonth] = useState(currentMonth)

  const monthData = seasonalTasks[selectedMonth]

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">📋 Bee Seasonal Tasks</h2>
      <p className="text-sm text-gray-600 mb-4">Based on UC Davis California Beekeeping Timeline</p>

      {/* Month Selector */}
      <div className="mb-6">
        <div className="grid grid-cols-6 sm:grid-cols-12 gap-2">
          {Object.keys(seasonalTasks).map((month) => {
            const monthNum = parseInt(month)
            const isSelected = monthNum === selectedMonth
            const isCurrent = monthNum === currentMonth

            return (
              <button
                key={month}
                onClick={() => setSelectedMonth(monthNum)}
                className={`px-2 py-1 rounded text-sm font-medium transition-colors ${
                  isSelected
                    ? 'bg-green-600 text-white'
                    : isCurrent
                    ? 'bg-green-200 text-green-800'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {new Date(2024, monthNum - 1).toLocaleDateString('en-US', { month: 'short' })}
              </button>
            )
          })}
        </div>
      </div>

      {/* Selected Month Tasks */}
      <div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800">{monthData.month}</h3>
          <p className="text-sm text-gray-600">{monthData.season}</p>
        </div>

        <div className="space-y-2">
          {monthData.tasks.map((task, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex-shrink-0 mt-0.5">
                <div className="w-5 h-5 rounded-full border-2 border-green-500 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
              </div>
              <p className="text-gray-700 flex-1">{task}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Note about Top Bar Hives */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          💡 <strong>Top Bar Hive Note:</strong> These tasks are general guidelines. TBH management
          emphasizes checking from the front of the hive, keeping combs vertical, and sustainable IPM
          practices.
        </p>
      </div>
    </div>
  )
}

export default BeeSeasonalTasks
