interface WeatherData {
  temperature: number
  condition: string
  icon: string
  description: string
  humidity?: number
  windSpeed?: number
  visibility?: number
  sunrise?: string
  sunset?: string
  feelsLike?: number
  pressure?: number
  uvIndex?: number
}

interface ForecastData {
  date: string
  temperature: {
    min: number
    max: number
  }
  condition: string
  icon: string
  description: string
  precipitation: number
}

interface HourlyData {
  time: string
  temperature: number
  condition: string
  icon: string
  precipitation: number
}

// Using WeatherAPI.com (free tier - no credit card required)
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const COPENHAGEN_LOCATION = 'Copenhagen,Denmark'

export class WeatherService {
  private static instance: WeatherService
  private weatherData: WeatherData | null = null
  private forecastData: ForecastData[] | null = null
  private hourlyData: HourlyData[] | null = null
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
      // Use real API if key is available, otherwise fallback to mock data
      if (API_KEY && API_KEY !== 'your_openweathermap_api_key_here') {
        const weather = await this.getWeatherFromAPI()
        this.weatherData = weather
        this.lastFetch = now
        return weather
      } else {
        // Fallback to mock data when no API key
        const mockWeather: WeatherData = {
          temperature: 12,
          condition: 'Partly Cloudy',
          icon: 'cloud-sun',
          description: 'Perfect for exploring!',
          humidity: 65,
          windSpeed: 3.2,
          visibility: 10,
          sunrise: '07:45',
          sunset: '16:30',
          feelsLike: 10,
          pressure: 1013,
          uvIndex: 2
        }
        
        this.weatherData = mockWeather
        this.lastFetch = now
        return mockWeather
      }
    } catch (error) {
      console.error('Failed to fetch weather:', error)
      
      // Fallback to default weather
      const fallbackWeather: WeatherData = {
        temperature: 12,
        condition: 'Partly Cloudy',
        icon: 'cloud-sun',
        description: 'Perfect for exploring!',
        humidity: 65,
        windSpeed: 3.2,
        visibility: 10,
        sunrise: '07:45',
        sunset: '16:30',
        feelsLike: 10,
        pressure: 1013,
        uvIndex: 2
      }
      
      this.weatherData = fallbackWeather
      this.lastFetch = now
      
      return fallbackWeather
    }
  }

  // Real API implementation using WeatherAPI.com
  async getWeatherFromAPI(): Promise<WeatherData> {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(COPENHAGEN_LOCATION)}&aqi=no`
    )
    
    if (!response.ok) {
      throw new Error('Failed to fetch weather data')
    }
    
    const data = await response.json()
    
    return {
      temperature: Math.round(data.current.temp_c),
      condition: data.current.condition.text,
      icon: this.mapWeatherIcon(data.current.condition.code),
      description: data.current.condition.text,
      humidity: data.current.humidity,
      windSpeed: data.current.wind_kph ? Math.round(data.current.wind_kph / 3.6 * 10) / 10 : 0, // Convert km/h to m/s
      visibility: data.current.vis_km || 10,
      sunrise: data.current.sunrise || '07:45',
      sunset: data.current.sunset || '16:30',
      feelsLike: Math.round(data.current.feelslike_c),
      pressure: data.current.pressure_mb,
      uvIndex: data.current.uv || 0
    }
  }

  async getForecast(): Promise<ForecastData[]> {
    const now = Date.now()
    
    // Return cached data if it's still fresh
    if (this.forecastData && (now - this.lastFetch) < this.CACHE_DURATION) {
      return this.forecastData
    }

    try {
      if (API_KEY && API_KEY !== 'your_weatherapi_key_here') {
        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(COPENHAGEN_LOCATION)}&days=5&aqi=no&alerts=no`
        )
        
        if (!response.ok) {
          throw new Error('Failed to fetch forecast data')
        }
        
        const data = await response.json()
        
        const forecast: ForecastData[] = data.forecast.forecastday.map((day: any) => ({
          date: day.date,
          temperature: {
            min: Math.round(day.day.mintemp_c),
            max: Math.round(day.day.maxtemp_c)
          },
          condition: day.day.condition.text,
          icon: this.mapWeatherIcon(day.day.condition.code),
          description: day.day.condition.text,
          precipitation: day.day.totalprecip_mm || 0
        }))
        
        this.forecastData = forecast
        return forecast
      } else {
        // Mock forecast data
        const mockForecast: ForecastData[] = [
          {
            date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
            temperature: { min: 8, max: 14 },
            condition: 'Cloudy',
            icon: 'cloud',
            description: 'Overcast',
            precipitation: 0
          },
          {
            date: new Date(Date.now() + 172800000).toISOString().split('T')[0],
            temperature: { min: 6, max: 12 },
            condition: 'Rain',
            icon: 'rain',
            description: 'Light rain',
            precipitation: 2.5
          }
        ]
        this.forecastData = mockForecast
        return mockForecast
      }
    } catch (error) {
      console.error('Failed to fetch forecast:', error)
      return []
    }
  }

  async getHourlyForecast(): Promise<HourlyData[]> {
    const now = Date.now()
    
    // Return cached data if it's still fresh
    if (this.hourlyData && (now - this.lastFetch) < this.CACHE_DURATION) {
      return this.hourlyData
    }

    try {
      if (API_KEY && API_KEY !== 'your_weatherapi_key_here') {
        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(COPENHAGEN_LOCATION)}&days=1&aqi=no&alerts=no`
        )
        
        if (!response.ok) {
          throw new Error('Failed to fetch hourly forecast data')
        }
        
        const data = await response.json()
        
        const hourly: HourlyData[] = data.forecast.forecastday[0].hour.slice(0, 8).map((hour: any) => ({
          time: new Date(hour.time).toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
          }),
          temperature: Math.round(hour.temp_c),
          condition: hour.condition.text,
          icon: this.mapWeatherIcon(hour.condition.code),
          precipitation: hour.precip_mm || 0
        }))
        
        this.hourlyData = hourly
        return hourly
      } else {
        // Mock hourly data
        const mockHourly: HourlyData[] = [
          { time: '12:00', temperature: 12, condition: 'Partly Cloudy', icon: 'cloud-sun', precipitation: 0 },
          { time: '15:00', temperature: 14, condition: 'Sunny', icon: 'sun', precipitation: 0 },
          { time: '18:00', temperature: 11, condition: 'Cloudy', icon: 'cloud', precipitation: 0 },
          { time: '21:00', temperature: 9, condition: 'Rain', icon: 'rain', precipitation: 1.2 }
        ]
        this.hourlyData = mockHourly
        return mockHourly
      }
    } catch (error) {
      console.error('Failed to fetch hourly forecast:', error)
      return []
    }
  }

  private mapWeatherIcon(conditionCode: number): string {
    // WeatherAPI.com condition codes mapping
    const iconMap: { [key: number]: string } = {
      // Clear
      1000: 'sun',
      
      // Partly cloudy
      1003: 'cloud-sun',
      
      // Cloudy
      1006: 'cloud',
      1009: 'cloud',
      
      // Overcast
      1030: 'cloud',
      1063: 'rain',
      1066: 'snow',
      1069: 'rain',
      1072: 'rain',
      
      // Rain
      1087: 'rain',
      1114: 'snow',
      1117: 'snow',
      1135: 'cloud',
      1147: 'cloud',
      1150: 'rain',
      1153: 'rain',
      1168: 'rain',
      1171: 'rain',
      1180: 'rain',
      1183: 'rain',
      1186: 'rain',
      1189: 'rain',
      1192: 'rain',
      1195: 'rain',
      1198: 'rain',
      1201: 'rain',
      1204: 'rain',
      1207: 'rain',
      1210: 'snow',
      1213: 'snow',
      1216: 'snow',
      1219: 'snow',
      1222: 'snow',
      1225: 'snow',
      1237: 'snow',
      1240: 'rain',
      1243: 'rain',
      1246: 'rain',
      1249: 'rain',
      1252: 'rain',
      1255: 'snow',
      1258: 'snow',
      1261: 'snow',
      1264: 'snow',
      1273: 'rain',
      1276: 'rain',
      1279: 'snow',
      1282: 'snow'
    }
    
    return iconMap[conditionCode] || 'sun'
  }
}

export type { WeatherData, ForecastData, HourlyData }
