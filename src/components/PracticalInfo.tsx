import { Card, CardContent } from '@/components/ui/card'
import { Info, Phone, Clock, Train, Heart, Cloud, Smartphone, Plane, MapPin, CreditCard, Utensils, AlertTriangle } from 'lucide-react'
import { guestConfig } from '@/config/guestConfig'

export function PracticalInfo() {
  const { host } = guestConfig

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Train': return Train;
      case 'Plane': return Plane;
      case 'MapPin': return MapPin;
      case 'CreditCard': return CreditCard;
      case 'Utensils': return Utensils;
      case 'AlertTriangle': return AlertTriangle;
      case 'Info': return Info;
      case 'Phone': return Phone;
      case 'Clock': return Clock;
      case 'Heart': return Heart;
      case 'Cloud': return Cloud;
      case 'Smartphone': return Smartphone;
      default: return Info;
    }
  }


  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Hero Section */}
      <div className="text-center py-6 sm:py-8 animate-fade-in">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full transition-colors duration-300">
            <Info className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          </div>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 transition-colors duration-300">Practical Tips</h2>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
          Everything you need to know for a smooth stay in Copenhagen
        </p>
      </div>

      <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-[1.01] animate-slide-up">
        <CardContent className="p-4 sm:p-6 space-y-6 sm:space-y-8">
          {/* Emergency Contacts */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg transition-colors duration-300">
                <Phone className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">Emergency Contacts</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {host.emergencyContacts?.map((contact, index) => (
                <div key={index} className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 transition-all duration-300 transform hover:scale-[1.02]">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400 transition-colors duration-300" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base transition-colors duration-300">{contact.name}</h4>
                      <p className="text-lg font-mono text-gray-800 dark:text-gray-200 transition-colors duration-300">{contact.number}</p>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">{contact.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Transportation */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg transition-colors duration-300">
                <Train className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">Transportation</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {host.transport?.options.map((option, index) => {
                const Icon = getIconComponent(option.icon)
                return (
                  <div key={index} className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 transition-all duration-300 transform hover:scale-[1.02]">
                    <div className="flex items-center gap-3 mb-3">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-400 transition-colors duration-300" />
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base transition-colors duration-300">{option.type}</h4>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">{option.description}</p>
                      </div>
                    </div>
                    <ul className="space-y-1">
                      {option.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2 transition-colors duration-300">
                          <span className="text-gray-500 dark:text-gray-400 mt-1">•</span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Practical Tips */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg transition-colors duration-300">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">Practical Tips</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {host.practicalTips?.map((category, index) => {
                const Icon = getIconComponent(category.icon)
                return (
                  <div key={index} className="space-y-3 p-3 sm:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 transition-all duration-300 transform hover:scale-[1.02]">
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400 transition-colors duration-300" />
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base transition-colors duration-300">{category.category}</h4>
                    </div>
                    <ul className="space-y-2">
                      {category.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2 transition-colors duration-300">
                          <span className="text-gray-500 dark:text-gray-400 mt-1">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
          </div>

          {/* House Rules */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg transition-colors duration-300">
                <Heart className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">House Rules</h3>
            </div>
            <div className="space-y-3">
              {host.houseRules?.map((rule, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 transition-all duration-300 transform hover:scale-[1.01]">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400 mt-0.5 flex-shrink-0 transition-colors duration-300" />
                  <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base transition-colors duration-300">{rule}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Weather & Time */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg transition-colors duration-300">
                <Cloud className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">Weather & Time</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 transition-all duration-300 transform hover:scale-[1.02]">
                <div className="flex items-center gap-3 mb-3">
                  <Cloud className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400 transition-colors duration-300" />
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base transition-colors duration-300">Weather Tips</h4>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">
                  {host.weather?.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-gray-500 dark:text-gray-400 mt-1">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 transition-all duration-300 transform hover:scale-[1.02]">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400 transition-colors duration-300" />
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base transition-colors duration-300">Time Zone</h4>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">
                  {host.timeZone?.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-gray-500 dark:text-gray-400 mt-1">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Essential Apps */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg transition-colors duration-300">
                <Smartphone className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">Essential Apps</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {host.essentialApps?.map((app, index) => (
                <div key={index} className="p-3 sm:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 transition-all duration-300 transform hover:scale-[1.02]">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400 transition-colors duration-300" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base transition-colors duration-300">{app.name}</h4>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">{app.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}