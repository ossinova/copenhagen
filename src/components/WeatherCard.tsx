import { useState, useEffect } from 'react'
import { Cloud, Sun, CloudRain, CloudSnow, Wind } from 'lucide-react'
import { WeatherService, type WeatherData } from '@/services/weatherService'

interface WeatherCardProps {
  variant?: 'header' | 'card'
  className?: string
}

export function WeatherCard({ variant = 'card', className = '' }: WeatherCardProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const weatherService = WeatherService.getInstance()
        const weatherData = await weatherService.getWeather()
        setWeather(weatherData)
      } catch (error) {
        console.error('Failed to fetch weather:', error)
        // Fallback to default weather
        setWeather({
          temperature: 12,
          condition: 'Partly Cloudy',
          icon: 'cloud-sun',
          description: 'Perfect for exploring!'
        })
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [])

  if (loading || !weather) {
    return (
      <div className={`${className} animate-pulse`}>
        {variant === 'header' ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="w-8 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        ) : (
          <div className="text-center">
            <div className="w-16 h-6 bg-gray-200 dark:bg-gray-700 rounded mx-auto mb-2"></div>
            <div className="w-20 h-4 bg-gray-200 dark:bg-gray-700 rounded mx-auto"></div>
          </div>
        )}
      </div>
    )
  }

  const getWeatherIcon = (icon: string, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-6 h-6',
      lg: 'w-8 h-8'
    }
    
    const iconClass = sizeClasses[size]
    
    switch (icon) {
      case 'sun': return <Sun className={iconClass} />
      case 'cloud': return <Cloud className={iconClass} />
      case 'rain': return <CloudRain className={iconClass} />
      case 'cloud-sun': return <Cloud className={iconClass} />
      case 'snow': return <CloudSnow className={iconClass} />
      case 'wind': return <Wind className={iconClass} />
      default: return <Sun className={iconClass} />
    }
  }


  if (variant === 'header') {
    return (
      <div className={`flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 ${className}`}>
        {getWeatherIcon(weather.icon, 'sm')}
        <span className="font-medium">{weather.temperature}°C</span>
        <span className="hidden sm:inline text-gray-500 dark:text-gray-400">
          {weather.condition}
        </span>
      </div>
    )
  }

  return (
    <div className={`text-center ${className}`}>
      <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
        {weather.temperature}°C
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400">
        {weather.condition}
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-500 mt-2">
        {weather.description}
      </div>
    </div>
  )
}
