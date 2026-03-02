# 🐝 Bee Keeper Dashboard

A configurable beekeeping dashboard that integrates weather data, bloom calendars, and seasonal bee management tasks for Top Bar Hive beekeepers.

![Bee Keeper Dashboard](https://img.shields.io/badge/Status-MVP-green) ![License](https://img.shields.io/badge/License-MIT-blue)

## Features

- **Real-time Weather Integration** - Live weather data from Open-Meteo API
- **Bloom Calendar** - Month-by-month nectar flow information for California Central Valley (Zone 9B)
- **Seasonal Bee Tasks** - Based on UC Davis California Beekeeping Timeline
- **Weekly Action Items** - Dynamic task generation based on season and weather
- **Configurable Location** - Customize for your specific location and climate zone
- **Top Bar Hive Focused** - Tailored for TBH management practices

## Tech Stack

- **Frontend:** React + Vite
- **Styling:** Tailwind CSS
- **Weather API:** Open-Meteo (free, no API key required)
- **Data:** California beekeeping research (UC Davis, Scientific Beekeeping)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/jorgenclaw/bee-keeper-dashboard.git
cd bee-keeper-dashboard
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

## Usage

1. **View Current Weather** - See real-time temperature, humidity, and hive inspection conditions
2. **Check Bloom Calendar** - Browse month-by-month nectar flow information
3. **Review Seasonal Tasks** - See what tasks are critical for the current month
4. **Weekly Action Items** - Get prioritized weekly tasks
5. **Configure Location** - Click Settings to customize your location and coordinates

## Project Structure

```
bee-keeper-dashboard/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── WeatherWidget.jsx      # Weather display & API integration
│   │   │   ├── BloomCalendar.jsx      # Monthly bloom timeline
│   │   │   ├── BeeSeasonalTasks.jsx   # Seasonal management tasks
│   │   │   ├── WeeklyTasks.jsx        # Dynamic weekly action items
│   │   │   └── LocationConfig.jsx     # Location settings
│   │   ├── App.jsx                    # Main dashboard layout
│   │   └── main.jsx                   # React entry point
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Data Sources

- **Bee Seasonal Cycles:** UC Davis Backyard Beekeeping Timeline for California
- **Top Bar Hive Management:** Dr. Wyatt Mangum (tbhsbywam.com)
- **Weather Data:** Open-Meteo API
- **Bloom Information:** California beekeeping research, Bee Culture magazine

## Roadmap

### Phase 1 (Current - MVP)
- ✅ Weather integration
- ✅ Bloom calendar (Zone 9B)
- ✅ Seasonal tasks
- ✅ Weekly action items
- ✅ Basic location configuration

### Phase 2 (Planned)
- [ ] Multi-zone support
- [ ] Custom plant additions
- [ ] Hive inspection logger
- [ ] Honey harvest tracker
- [ ] Mite treatment records
- [ ] Email/SMS notifications

### Phase 3 (Future)
- [ ] Mobile app
- [ ] Community plant database
- [ ] AI-powered task prioritization
- [ ] Smart hive sensor integration

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- UC Davis E.L. Niño Bee Lab for California beekeeping timeline
- Dr. Wyatt Mangum for Top Bar Hive expertise
- Randy Oliver (Scientific Beekeeping) for bee management research
- Open-Meteo for free weather API

## Support

For questions or issues, please open an issue on GitHub.

---

**Built with 💛 for beekeepers**
