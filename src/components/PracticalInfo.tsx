import { Card, CardContent } from '@/components/ui/card'
import { Info, Phone, Clock, Train, Heart, Cloud, Smartphone } from 'lucide-react'
import { guestConfig } from '@/config/guestConfig'

export function PracticalInfo() {
  const { host } = guestConfig


  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Hero Section */}
      <div className="text-center py-6 sm:py-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-purple-100 rounded-full">
            <Info className="w-8 h-8 text-purple-600" />
          </div>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Practical Tips</h2>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
          Everything you need to know for a smooth stay in Copenhagen
        </p>
      </div>

      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardContent className="p-4 sm:p-6 space-y-6 sm:space-y-8">
          {/* Emergency Contacts */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <Phone className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">Emergency Contacts</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {host.emergencyContacts?.map((contact, index) => (
                <div key={index} className="p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{contact.name}</h4>
                      <p className="text-lg font-mono text-gray-800 text-sm sm:text-base">{contact.number}</p>
                      <p className="text-xs sm:text-sm text-gray-600">{contact.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Transportation */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Train className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">Transportation</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {host.transport?.options.map((option, index) => {
                const Icon = option.icon
                return (
                  <div key={index} className="p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-3 mb-3">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{option.type}</h4>
                        <p className="text-xs sm:text-sm text-gray-600">{option.description}</p>
                      </div>
                    </div>
                    <ul className="space-y-1">
                      {option.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="text-xs sm:text-sm text-gray-700 flex items-start gap-2">
                          <span className="text-gray-500 mt-1">•</span>
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
              <div className="p-2 bg-blue-100 rounded-lg">
                <Info className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">Practical Tips</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {host.practicalTips?.map((category, index) => {
                const Icon = category.icon
                return (
                  <div key={index} className="space-y-3 p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{category.category}</h4>
                    </div>
                    <ul className="space-y-2">
                      {category.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="text-xs sm:text-sm text-gray-700 flex items-start gap-2">
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

          {/* House Rules */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Heart className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">House Rules</h3>
            </div>
            <div className="space-y-3">
              {host.houseRules?.map((rule, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700 text-sm sm:text-base">{rule}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Weather & Time */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Cloud className="w-5 h-5 text-yellow-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">Weather & Time</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <Cloud className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Weather Tips</h4>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                  {host.weather?.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-gray-500 mt-1">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Time Zone</h4>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                  {host.timeZone?.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-gray-500 mt-1">•</span>
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
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Smartphone className="w-5 h-5 text-indigo-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">Essential Apps</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {host.essentialApps?.map((app, index) => (
                <div key={index} className="p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{app.name}</h4>
                      <p className="text-xs sm:text-sm text-gray-600">{app.description}</p>
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