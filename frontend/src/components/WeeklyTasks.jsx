import { useState, useEffect } from 'react'

function WeeklyTasks({ location }) {
  const [tasks, setTasks] = useState([])
  const currentMonth = new Date().getMonth() + 1
  const currentWeek = `Week of ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`

  useEffect(() => {
    // Generate weekly tasks based on season and conditions
    const generateTasks = () => {
      const weeklyTasks = []

      // Add season-specific priority tasks
      if (currentMonth >= 3 && currentMonth <= 5) {
        // Spring
        weeklyTasks.push({
          priority: 'high',
          category: 'Seasonal',
          task: 'Inspect colonies for queen laying pattern and brood development',
          icon: '👑'
        })
        weeklyTasks.push({
          priority: 'high',
          category: 'Swarm Prevention',
          task: 'Check for queen cells and signs of swarming',
          icon: '🐝'
        })
        weeklyTasks.push({
          priority: 'medium',
          category: 'Space Management',
          task: 'Add supers if colonies are growing quickly',
          icon: '📦'
        })
      }

      if (currentMonth >= 6 && currentMonth <= 8) {
        // Summer
        weeklyTasks.push({
          priority: 'high',
          category: 'Mite Management',
          task: 'Test mite levels - critical summer treatment window',
          icon: '🔬'
        })
        weeklyTasks.push({
          priority: 'medium',
          category: 'Honey Harvest',
          task: 'Check honey stores and plan extraction',
          icon: '🍯'
        })
        weeklyTasks.push({
          priority: 'medium',
          category: 'Ventilation',
          task: 'Ensure adequate ventilation during hot weather',
          icon: '🌡️'
        })
      }

      if (currentMonth >= 9 && currentMonth <= 11) {
        // Fall
        weeklyTasks.push({
          priority: 'high',
          category: 'Winter Prep',
          task: 'Feed syrup and pollen patties for winter stores',
          icon: '🥄'
        })
        weeklyTasks.push({
          priority: 'high',
          category: 'Mite Treatment',
          task: 'Final mite treatment before winter',
          icon: '💊'
        })
        weeklyTasks.push({
          priority: 'medium',
          category: 'Robbing Prevention',
          task: 'Reduce entrances and prevent robbing',
          icon: '🚪'
        })
      }

      if (currentMonth === 12 || currentMonth <= 2) {
        // Winter
        weeklyTasks.push({
          priority: 'low',
          category: 'Monitoring',
          task: 'Check hive weight from outside (lift from back)',
          icon: '⚖️'
        })
        weeklyTasks.push({
          priority: 'low',
          category: 'Planning',
          task: 'Order packages/nucs and plan for spring',
          icon: '📝'
        })
        weeklyTasks.push({
          priority: 'medium',
          category: 'Education',
          task: 'Read beekeeping resources and watch tutorials',
          icon: '📚'
        })
      }

      // Add weather-dependent task
      weeklyTasks.push({
        priority: 'medium',
        category: 'Weather',
        task: 'Check weather forecast for good inspection days (60-85°F, low wind)',
        icon: '🌤️'
      })

      setTasks(weeklyTasks)
    }

    generateTasks()
  }, [currentMonth])

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-4 border-red-500 bg-red-50'
      case 'medium': return 'border-l-4 border-yellow-500 bg-yellow-50'
      case 'low': return 'border-l-4 border-blue-500 bg-blue-50'
      default: return 'border-l-4 border-gray-500 bg-gray-50'
    }
  }

  const getPriorityBadge = (priority) => {
    const colors = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-blue-100 text-blue-800'
    }
    return colors[priority] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-2">✅ Weekly Action Items</h2>
      <p className="text-sm text-gray-600 mb-4">{currentWeek}</p>

      <div className="space-y-3">
        {tasks.map((item, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg ${getPriorityColor(item.priority)}`}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{item.icon}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-semibold ${getPriorityBadge(
                      item.priority
                    )}`}
                  >
                    {item.priority.toUpperCase()}
                  </span>
                  <span className="text-xs font-medium text-gray-600">{item.category}</span>
                </div>
                <p className="text-sm text-gray-700">{item.task}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {tasks.length === 0 && (
        <p className="text-gray-500 text-center py-4">No tasks for this week.</p>
      )}
    </div>
  )
}

export default WeeklyTasks
