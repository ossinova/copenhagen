import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Cloud, Sun, CloudRain, CloudSnow, Wind, Droplets, Thermometer, Eye, Sunrise, Sunset } from 'lucide-react'

interface WeatherData {
  temperature: number
  description: string
  humidity: number
  windSpeed: number
  visibility: number
  sunrise: string
  sunset: string
  icon: string
  recommendations: string[]
}

const getWeatherIcon = (icon: string) => {
  switch (icon) {
    case '01d':
    case '01n':
      return <Sun className="w-8 h-8 text-yellow-500" />
    case '02d':
    case '02n':
    case '03d':
    case '03n':
    case '04d':
    case '04n':
      return <Cloud className="w-8 h-8 text-gray-500" />
    case '09d':
    case '09n':
    case '10d':
    case '10n':
      return <CloudRain className="w-8 h-8 text-blue-500" />
    case '11d':
    case '11n':
      return <CloudRain className="w-8 h-8 text-purple-500" />
    case '13d':
    case '13n':
      return <CloudSnow className="w-8 h-8 text-blue-300" />
    case '50d':
    case '50n':
      return <Cloud className="w-8 h-8 text-gray-400" />
    default:
      return <Sun className="w-8 h-8 text-yellow-500" />
  }
}

const getWeatherRecommendations = (description: string, temperature: number): string[] => {
  const recommendations: string[] = []
  
  if (description.toLowerCase().includes('rain')) {
    recommendations.push('Bring an umbrella or rain jacket')
    recommendations.push('Perfect for indoor activities like museums')
    recommendations.push('Great weather for cozy cafés')
  } else if (description.toLowerCase().includes('snow')) {
    recommendations.push('Dress warmly with layers')
    recommendations.push('Beautiful for winter photography')
    recommendations.push('Hot chocolate weather!')
  } else if (temperature < 5) {
    recommendations.push('Very cold - wear warm layers')
    recommendations.push('Great for indoor attractions')
    recommendations.push('Perfect for hot drinks')
  } else if (temperature < 15) {
    recommendations.push('Cool weather - bring a jacket')
    recommendations.push('Good for walking tours')
    recommendations.push('Great for outdoor activities')
  } else if (temperature > 25) {
    recommendations.push('Warm weather - stay hydrated')
    recommendations.push('Perfect for outdoor dining')
    recommendations.push('Great for canal tours')
  } else {
    recommendations.push('Pleasant weather for exploring')
    recommendations.push('Perfect for walking around')
    recommendations.push('Great for outdoor activities')
  }
  
  return recommendations
}

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true)
        // Using OpenWeatherMap API (you'll need to get a free API key)
        // For demo purposes, I'll use mock data
        const mockWeather: WeatherData = {
          temperature: 12,
          description: 'Partly cloudy',
          humidity: 65,
          windSpeed: 3.2,
          visibility: 10,
          sunrise: '07:45',
          sunset: '16:30',
          icon: '02d',
          recommendations: getWeatherRecommendations('Partly cloudy', 12)
        }
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        setWeather(mockWeather)
      } catch (err) {
        setError('Failed to load weather data')
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [])

  if (loading) {
    return (
      <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 animate-pulse">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
          </div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-40"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error || !weather) {
    return (
      <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300">
        <CardContent className="p-4 sm:p-6">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <Cloud className="w-8 h-8 mx-auto mb-2" />
            <p>Weather data unavailable</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105 animate-slide-up">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {getWeatherIcon(weather.icon)}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                Current Weather
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 capitalize transition-colors duration-300">
                {weather.description}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
              {weather.temperature}°C
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300">
            <Droplets className="w-4 h-4 text-blue-500 mx-auto mb-1" />
            <p className="text-xs text-gray-600 dark:text-gray-400">Humidity</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">{weather.humidity}%</p>
          </div>
          <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300">
            <Wind className="w-4 h-4 text-gray-500 mx-auto mb-1" />
            <p className="text-xs text-gray-600 dark:text-gray-400">Wind</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">{weather.windSpeed} m/s</p>
          </div>
          <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300">
            <Eye className="w-4 h-4 text-green-500 mx-auto mb-1" />
            <p className="text-xs text-gray-600 dark:text-gray-400">Visibility</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">{weather.visibility} km</p>
          </div>
          <div className="text-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300">
            <Sunrise className="w-4 h-4 text-orange-500 mx-auto mb-1" />
            <p className="text-xs text-gray-600 dark:text-gray-400">Sunset</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">{weather.sunset}</p>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white transition-colors duration-300">
            Today's Recommendations:
          </h4>
          <div className="flex flex-wrap gap-2">
            {weather.recommendations.map((rec, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 transition-colors duration-300"
              >
                {rec}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
