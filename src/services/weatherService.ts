interface WeatherData {
  temperature: number
  condition: string
  icon: string
  description: string
}

// Using OpenWeatherMap API (free tier)
const API_KEY = 'demo_key' // In production, this would be an environment variable
const COPENHAGEN_LAT = 55.6761
const COPENHAGEN_LON = 12.5683

export class WeatherService {
  private static instance: WeatherService
  private weatherData: WeatherData | null = null
  private lastFetch: number = 0
  private readonly CACHE_DURATION = 10 * 60 * 1000 // 10 minutes

  static getInstance(): WeatherService {
    if (!WeatherService.instance) {
      WeatherService.instance = new WeatherService()
    }
    return WeatherService.instance
  }

  async getWeather(): Promise<WeatherData> {
    const now = Date.now()
    
    // Return cached data if it's still fresh
    if (this.weatherData && (now - this.lastFetch) < this.CACHE_DURATION) {
      return this.weatherData
    }

    try {
      // For demo purposes, we'll use mock data that's consistent
      // In production, you would use a real API like OpenWeatherMap
      const mockWeather: WeatherData = {
        temperature: 12,
        condition: 'Partly Cloudy',
        icon: 'cloud-sun',
        description: 'Perfect for exploring!'
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      this.weatherData = mockWeather
      this.lastFetch = now
      
      return mockWeather
    } catch (error) {
      console.error('Failed to fetch weather:', error)
      
      // Fallback to default weather
      const fallbackWeather: WeatherData = {
        temperature: 12,
        condition: 'Partly Cloudy',
        icon: 'cloud-sun',
        description: 'Perfect for exploring!'
      }
      
      this.weatherData = fallbackWeather
      this.lastFetch = now
      
      return fallbackWeather
    }
  }

  // Real API implementation (commented out for demo)
  /*
  async getWeatherFromAPI(): Promise<WeatherData> {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${COPENHAGEN_LAT}&lon=${COPENHAGEN_LON}&appid=${API_KEY}&units=metric`
    )
    
    if (!response.ok) {
      throw new Error('Failed to fetch weather data')
    }
    
    const data = await response.json()
    
    return {
      temperature: Math.round(data.main.temp),
      condition: data.weather[0].main,
      icon: this.mapWeatherIcon(data.weather[0].icon),
      description: data.weather[0].description
    }
  }

  private mapWeatherIcon(iconCode: string): string {
    const iconMap: { [key: string]: string } = {
      '01d': 'sun',
      '01n': 'sun',
      '02d': 'cloud-sun',
      '02n': 'cloud-sun',
      '03d': 'cloud',
      '03n': 'cloud',
      '04d': 'cloud',
      '04n': 'cloud',
      '09d': 'rain',
      '09n': 'rain',
      '10d': 'rain',
      '10n': 'rain',
      '11d': 'rain',
      '11n': 'rain',
      '13d': 'snow',
      '13n': 'snow',
      '50d': 'cloud',
      '50n': 'cloud'
    }
    
    return iconMap[iconCode] || 'sun'
  }
  */
}

export type { WeatherData }
