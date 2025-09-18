import { Card, CardContent } from '@/components/ui/card'
import { MapPin, Clock, Info, Home, Camera, ShoppingBag, Coffee, Mountain, BookOpen, Plane, Sparkles, Bike, CreditCard, Wifi, Car, Cloud, Smartphone, Heart, AlertTriangle, Train, Utensils } from 'lucide-react'
import { guestConfig } from '@/config/guestConfig'

export function SimpleMap() {
  const copenhagenLocations = guestConfig.map.locations

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Home': return Home;
      case 'Camera': return Camera;
      case 'Utensils': return Utensils;
      case 'ShoppingBag': return ShoppingBag;
      case 'Coffee': return Coffee;
      case 'Mountain': return Mountain;
      case 'BookOpen': return BookOpen;
      case 'Plane': return Plane;
      case 'Sparkles': return Sparkles;
      case 'Bike': return Bike;
      case 'CreditCard': return CreditCard;
      case 'Wifi': return Wifi;
      case 'Car': return Car;
      case 'Cloud': return Cloud;
      case 'Smartphone': return Smartphone;
      case 'Heart': return Heart;
      case 'Info': return Info;
      case 'AlertTriangle': return AlertTriangle;
      case 'Train': return Train;
      default: return MapPin;
    }
  }

  const getTypeColor = (type: string) => {
    const colors = {
      attraction: 'bg-blue-100 text-blue-800',
      shopping: 'bg-pink-100 text-pink-800',
      food: 'bg-orange-100 text-orange-800',
      cafe: 'bg-yellow-100 text-yellow-800',
      home: 'bg-red-100 text-red-800',
      nature: 'bg-green-100 text-green-800',
      museum: 'bg-purple-100 text-purple-800'
    }
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Hero Section */}
      <div className="text-center py-6 sm:py-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-green-100 rounded-full">
            <MapPin className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
          Copenhagen Map
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
          Explore key locations and get around easily!
        </p>
      </div>

      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardContent className="p-4 sm:p-6 space-y-6">
          <div className="h-64 sm:h-96 bg-gray-100 rounded-2xl flex items-center justify-center border-2 border-gray-200 shadow-sm">
            <div className="text-center">
              <MapPin className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
              <div className="text-gray-600 font-medium text-lg sm:text-xl">Map View Unavailable</div>
              <div className="text-sm sm:text-base text-gray-500 mt-2">Showing list of locations below.</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">Key Locations</h3>
              </div>
              <div className="space-y-3 sm:space-y-4 max-h-96 overflow-y-auto">
                {copenhagenLocations.map((location) => {
                  const Icon = getIconComponent(location.icon?.name || 'MapPin')
                  return (
                    <Card key={location.id} className="bg-white p-3 sm:p-4 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200">
                      <CardContent className="p-0">
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${location.color} flex-shrink-0`}>
                            <Icon className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <p className="font-semibold text-sm sm:text-base text-gray-900">{location.name}</p>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(location.type)}`}>
                                {location.type}
                              </span>
                            </div>
                            <p className="text-xs sm:text-sm text-gray-600 mb-3">{location.description}</p>
                            
                            <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-500 mb-3">
                              {location.bestTime && (
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                                  {location.bestTime}
                                </div>
                              )}
                              {location.cost && (
                                <div className="flex items-center gap-1">
                                  <span>💰</span>
                                  {location.cost}
                                </div>
                              )}
                              {location.duration && (
                                <div className="flex items-center gap-1">
                                  <span>⏱️</span>
                                  {location.duration}
                                </div>
                              )}
                            </div>

                            {location.tips && location.tips.length > 0 && (
                              <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="text-xs font-semibold text-gray-800 mb-2">Quick Tips:</p>
                                <ul className="text-xs text-gray-600 space-y-1">
                                  {location.tips.slice(0, 2).map((tip, index) => (
                                    <li key={index} className="flex items-start gap-1">
                                      <span className="text-gray-500 mt-0.5">•</span>
                                      <span className="line-clamp-1">{tip}</span>
                                    </li>
                                  ))}
                                  {location.tips.length > 2 && (
                                    <li className="text-gray-600 text-xs font-medium">
                                      +{location.tips.length - 2} more tips
                                    </li>
                                  )}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Info className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">Smart Travel Tips</h3>
              </div>
              <div className="space-y-3 sm:space-y-4">
                {guestConfig.host.practicalTips?.map((category, index) => {
                  const Icon = getIconComponent(category.icon.name)
                  return (
                    <div key={index} className="bg-gray-50 p-3 sm:p-4 rounded-xl border border-gray-200">
                      <div className="flex items-center gap-3 mb-3">
                        <Icon className="w-5 h-5 text-gray-600" />
                        <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{category.category}</h4>
                      </div>
                      <ul className="text-sm text-gray-800 space-y-2">
                        {category.tips.map((tip, tipIndex) => (
                          <li key={tipIndex} className="flex items-start gap-2">
                            <span className="text-gray-500 mt-1">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}