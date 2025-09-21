import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  Wind, 
  Droplets, 
  Eye, 
  Sunrise, 
  Sunset,
  Gauge,
  Zap,
  Umbrella,
  MapPin,
  Calendar
} from 'lucide-react'
import { WeatherService, type WeatherData, type ForecastData, type HourlyData } from '@/services/weatherService'

interface WeatherRecommendation {
  icon: string
  title: string
  description: string
  category: 'indoor' | 'outdoor' | 'food' | 'transport'
  priority: 'high' | 'medium' | 'low'
}

export function EnhancedWeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [forecast, setForecast] = useState<ForecastData[]>([])
  const [hourly, setHourly] = useState<HourlyData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'current' | 'forecast' | 'hourly'>('current')

  const weatherService = WeatherService.getInstance()

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true)
        const [currentWeather, forecastData, hourlyData] = await Promise.all([
          weatherService.getWeather(),
          weatherService.getForecast(),
          weatherService.getHourlyForecast()
        ])
        
        setWeather(currentWeather)
        setForecast(forecastData)
        setHourly(hourlyData)
      } catch (err) {
        setError('Failed to load weather data')
        console.error('Weather fetch error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchWeatherData()
  }, [])

  const getWeatherIcon = (icon: string, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-6 h-6',
      lg: 'w-8 h-8'
    }
    
    const iconClass = sizeClasses[size]
    
    switch (icon) {
      case 'sun': return <Sun className={`${iconClass} text-yellow-500`} />
      case 'cloud': return <Cloud className={`${iconClass} text-gray-500`} />
      case 'rain': return <CloudRain className={`${iconClass} text-blue-500`} />
      case 'cloud-sun': return <Cloud className={`${iconClass} text-gray-400`} />
      case 'snow': return <CloudSnow className={`${iconClass} text-blue-200`} />
      case 'wind': return <Wind className={`${iconClass} text-gray-400`} />
      default: return <Sun className={`${iconClass} text-yellow-500`} />
    }
  }

  const getWeatherRecommendations = (weather: WeatherData): WeatherRecommendation[] => {
    const recommendations: WeatherRecommendation[] = []
    const temp = weather.temperature
    const condition = weather.condition.toLowerCase()
    const windSpeed = weather.windSpeed || 0
    const precipitation = condition.includes('rain') || condition.includes('snow')

    // Temperature-based recommendations
    if (temp < 5) {
      recommendations.push({
        icon: '🏠',
        title: 'Indoor Activities',
        description: 'Perfect weather for museums, cafés, and indoor attractions',
        category: 'indoor',
        priority: 'high'
      })
    } else if (temp > 20) {
      recommendations.push({
        icon: '🌊',
        title: 'Water Activities',
        description: 'Great day for canal tours and harbor walks',
        category: 'outdoor',
        priority: 'high'
      })
    }

    // Weather condition recommendations
    if (precipitation) {
      recommendations.push({
        icon: '☔',
        title: 'Bring an Umbrella',
        description: 'Pack rain gear for outdoor activities',
        category: 'transport',
        priority: 'high'
      })
      recommendations.push({
        icon: '🏛️',
        title: 'Museum Day',
        description: 'Perfect weather for indoor cultural experiences',
        category: 'indoor',
        priority: 'high'
      })
    } else if (condition.includes('sun') || condition.includes('clear')) {
      recommendations.push({
        icon: '🚶',
        title: 'Walking Tours',
        description: 'Excellent weather for exploring on foot',
        category: 'outdoor',
        priority: 'high'
      })
      recommendations.push({
        icon: '🚴',
        title: 'Bike Tours',
        description: 'Great day for cycling around the city',
        category: 'outdoor',
        priority: 'medium'
      })
    }

    // Wind-based recommendations
    if (windSpeed > 5) {
      recommendations.push({
        icon: '🧥',
        title: 'Windy Conditions',
        description: 'Dress warmly and consider indoor alternatives',
        category: 'transport',
        priority: 'medium'
      })
    }

    // General recommendations
    if (temp >= 10 && temp <= 20 && !precipitation) {
      recommendations.push({
        icon: '🌅',
        title: 'Perfect Weather',
        description: 'Ideal conditions for all outdoor activities',
        category: 'outdoor',
        priority: 'high'
      })
    }

    return recommendations.slice(0, 4) // Limit to 4 recommendations
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  if (loading) {
    return (
      <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300 animate-pulse">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            <div className="space-y-2">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error || !weather) {
    return (
      <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300">
        <CardContent className="p-6 text-center">
          <div className="text-red-500 mb-2">⚠️</div>
          <p className="text-gray-600 dark:text-gray-400">Unable to load weather data</p>
        </CardContent>
      </Card>
    )
  }

  const recommendations = getWeatherRecommendations(weather)

  return (
    <div className="space-y-6">
      {/* Main Weather Card */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700 border border-gray-200 dark:border-gray-600 shadow-lg transition-all duration-300 hover:shadow-xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="text-4xl">
                {getWeatherIcon(weather.icon, 'lg')}
              </div>
              <div>
                <div className="text-4xl font-bold text-gray-900 dark:text-white">
                  {weather.temperature}°C
                </div>
                <div className="text-lg text-gray-600 dark:text-gray-300">
                  {weather.condition}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {weather.description}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300 mb-1">
                <MapPin className="w-4 h-4" />
                Copenhagen
              </div>
              {weather.feelsLike && (
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Feels like {weather.feelsLike}°C
                </div>
              )}
            </div>
          </div>

          {/* Weather Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {weather.humidity && (
              <div className="flex items-center gap-2 p-3 bg-white/50 dark:bg-gray-600/50 rounded-lg">
                <Droplets className="w-5 h-5 text-blue-500" />
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {weather.humidity}%
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Humidity</div>
                </div>
              </div>
            )}
            {weather.windSpeed && (
              <div className="flex items-center gap-2 p-3 bg-white/50 dark:bg-gray-600/50 rounded-lg">
                <Wind className="w-5 h-5 text-gray-500" />
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {weather.windSpeed} m/s
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Wind</div>
                </div>
              </div>
            )}
            {weather.visibility && (
              <div className="flex items-center gap-2 p-3 bg-white/50 dark:bg-gray-600/50 rounded-lg">
                <Eye className="w-5 h-5 text-green-500" />
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {weather.visibility} km
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Visibility</div>
                </div>
              </div>
            )}
            {weather.pressure && (
              <div className="flex items-center gap-2 p-3 bg-white/50 dark:bg-gray-600/50 rounded-lg">
                <Gauge className="w-5 h-5 text-purple-500" />
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {weather.pressure} hPa
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Pressure</div>
                </div>
              </div>
            )}
          </div>

          {/* Sunrise/Sunset */}
          {(weather.sunrise || weather.sunset) && (
            <div className="flex items-center justify-center gap-6 p-4 bg-white/30 dark:bg-gray-600/30 rounded-lg">
              {weather.sunrise && (
                <div className="flex items-center gap-2">
                  <Sunrise className="w-5 h-5 text-orange-500" />
                  <div className="text-sm">
                    <div className="font-medium text-gray-900 dark:text-white">Sunrise</div>
                    <div className="text-gray-600 dark:text-gray-400">{weather.sunrise}</div>
                  </div>
                </div>
              )}
              {weather.sunset && (
                <div className="flex items-center gap-2">
                  <Sunset className="w-5 h-5 text-orange-500" />
                  <div className="text-sm">
                    <div className="font-medium text-gray-900 dark:text-white">Sunset</div>
                    <div className="text-gray-600 dark:text-gray-400">{weather.sunset}</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Weather Recommendations */}
      {recommendations.length > 0 && (
        <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-yellow-500" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Weather Recommendations
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {recommendations.map((rec, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-2xl">{rec.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                        {rec.title}
                      </h4>
                      <Badge className={`text-xs ${getPriorityColor(rec.priority)}`}>
                        {rec.priority}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {rec.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Forecast Tabs */}
      <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Weather Forecast
            </h3>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex gap-2 mb-4">
            <Button
              variant={activeTab === 'current' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('current')}
            >
              Current
            </Button>
            <Button
              variant={activeTab === 'forecast' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('forecast')}
            >
              5-Day
            </Button>
            <Button
              variant={activeTab === 'hourly' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('hourly')}
            >
              Hourly
            </Button>
          </div>

          {/* Tab Content */}
          {activeTab === 'forecast' && forecast.length > 0 && (
            <div className="space-y-3">
              {forecast.map((day, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-lg">
                      {getWeatherIcon(day.icon, 'sm')}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white text-sm">
                        {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {day.description}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {day.temperature.min}°
                    </div>
                    <div className="w-8 h-1 bg-gray-300 dark:bg-gray-600 rounded-full">
                      <div className="w-4 h-1 bg-gradient-to-r from-blue-500 to-red-500 rounded-full"></div>
                    </div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {day.temperature.max}°
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'hourly' && hourly.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {hourly.map((hour, index) => (
                <div key={index} className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {hour.time}
                  </div>
                  <div className="text-lg mb-1">
                    {getWeatherIcon(hour.icon, 'sm')}
                  </div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {hour.temperature}°
                  </div>
                  {hour.precipitation > 0 && (
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <Umbrella className="w-3 h-3 text-blue-500" />
                      <span className="text-xs text-blue-500">{hour.precipitation}mm</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'current' && (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">
                {getWeatherIcon(weather.icon, 'lg')}
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {weather.temperature}°C
              </div>
              <div className="text-lg text-gray-600 dark:text-gray-300 mb-1">
                {weather.condition}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {weather.description}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
