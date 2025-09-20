import { Cloud, Sun, CloudRain, CloudSnow, Wind } from 'lucide-react'

interface WeatherCardProps {
  variant?: 'header' | 'card'
  className?: string
}

export function WeatherCard({ variant = 'card', className = '' }: WeatherCardProps) {
  // Simplified weather data for now to fix the blank page issue
  const weather = {
    temperature: 12,
    condition: 'Partly Cloudy',
    icon: 'cloud-sun',
    description: 'Perfect for exploring!'
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
