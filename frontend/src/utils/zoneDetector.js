// Utility to detect Sunset Climate Zone based on coordinates
// This is a simplified version - full mapping would require more detailed data

export function detectSunsetZone(latitude, longitude) {
  // California zones (approximate boundaries)

  // Southern California (Zones 18-24)
  if (latitude < 35.0) {
    if (longitude > -118.0) { // Coastal
      return '24' // Los Angeles coastal
    } else if (longitude > -120.0) {
      return '22' // Inland Southern California
    } else {
      return '20' // Inland valleys
    }
  }

  // Central California (Zones 7-17)
  if (latitude >= 35.0 && latitude < 38.5) {
    if (longitude > -120.0) { // Coastal Central CA
      return '17' // Central Coast
    } else if (longitude > -121.5) { // Central Valley
      return '9' // Fresno, Bakersfield area
    } else { // Inland Central Valley
      // Manteca area - Zone 9B (more specific)
      if (latitude > 37.5 && latitude < 38.2 && longitude > -121.5 && longitude < -120.5) {
        return '9B'
      }
      // Sacramento Valley
      if (latitude > 38.0) {
        return '14' // Sacramento area
      }
      return '9' // Default Central Valley
    }
  }

  // Northern California (Zones 1-17)
  if (latitude >= 38.5) {
    if (longitude > -122.5) { // Bay Area / Coastal
      return '17' // SF Bay Area
    } else if (longitude > -123.0) {
      return '15' // North Bay interior
    } else {
      return '7' // Mountain/Sierra foothills
    }
  }

  // Pacific Northwest (Zones 1-6)
  if (latitude >= 42.0) {
    return '3' // Pacific Northwest
  }

  // Southwest (Arizona, Nevada)
  if (longitude > -115.0) {
    return '13' // Low desert
  }

  // Mountain regions
  if (longitude < -122.0 && latitude > 36.0) {
    return '7' // Sierra Nevada
  }

  // Default to Zone 9 for unknown Central California
  return '9'
}

// Get a descriptive name for the zone
export function getZoneName(zone) {
  const zoneNames = {
    '1': 'Cold mountain and intermountain areas',
    '2': 'Cold-winter areas',
    '3': 'Mild maritime areas',
    '7': 'California foothills',
    '8': 'Cold-air basins',
    '9': 'Central Valley',
    '9B': 'Central Valley (warmer)',
    '13': 'Low desert',
    '14': 'Sacramento Valley',
    '15': 'Inland Northern California',
    '17': 'Coastal Northern California',
    '18': 'Thermal belts',
    '20': 'Inland Southern California valleys',
    '22': 'Inland Southern California',
    '24': 'Southern California coastal',
  }

  return zoneNames[zone] || 'Unknown zone'
}

// Get state from coordinates (simplified)
export function detectState(latitude, longitude) {
  // California
  if (latitude >= 32.5 && latitude <= 42.0 && longitude >= -124.5 && longitude <= -114.0) {
    return 'CA'
  }

  // Oregon
  if (latitude >= 42.0 && latitude <= 46.3 && longitude >= -124.6 && longitude <= -116.5) {
    return 'OR'
  }

  // Washington
  if (latitude >= 45.5 && latitude <= 49.0 && longitude >= -124.8 && longitude <= -116.9) {
    return 'WA'
  }

  // Arizona
  if (latitude >= 31.3 && latitude <= 37.0 && longitude >= -114.8 && longitude <= -109.0) {
    return 'AZ'
  }

  // Nevada
  if (latitude >= 35.0 && latitude <= 42.0 && longitude >= -120.0 && longitude <= -114.0) {
    return 'NV'
  }

  return 'Unknown'
}

// Reverse geocode to get city name (simplified - just for display)
export async function getCityFromCoords(latitude, longitude) {
  try {
    // Using a free reverse geocoding API
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
    )

    if (response.ok) {
      const data = await response.json()
      return data.city || data.locality || 'Unknown City'
    }
  } catch (error) {
    console.error('Error fetching city name:', error)
  }

  return 'Unknown City'
}
