import { Card, CardContent } from '@/components/ui/card'
import { Compass, Utensils, Coffee, MapPin, Star, Info } from 'lucide-react'
import { guestConfig } from '@/config/guestConfig'

export function ThingsToDo() {
  const { categories, food, drinks } = guestConfig.explore

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Hero Section */}
      <div className="text-center py-6 sm:py-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-orange-100 rounded-full">
            <Compass className="w-8 h-8 text-orange-600" />
          </div>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
          My Copenhagen Tips
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
          Curated recommendations from a local - the places I actually send my friends!
        </p>
      </div>

      {/* Categories */}
      {categories.map((category) => (
        <Card key={category.id} className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">{category.title}</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {category.items.map((item, index) => (
                <div key={index} className="bg-gray-50 p-3 sm:p-4 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200">
                  <h4 className="font-semibold text-base sm:text-lg text-gray-900 mb-2">{item.name}</h4>
                  {item.description && (
                    <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                  )}
                  {item.tip && (
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <div className="flex items-start gap-2">
                        <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-700 font-medium">{item.tip}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Food & Drinks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Food */}
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Utensils className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">Must-Try Food</h3>
            </div>
            <div className="space-y-3 sm:space-y-4">
              {food.map((item, index) => (
                <div key={index} className="bg-gray-50 p-3 sm:p-4 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200">
                  <h4 className="font-semibold text-base sm:text-lg text-gray-900 mb-2">{item.name}</h4>
                  {item.description && <p className="text-gray-600 text-sm mb-3">{item.description}</p>}
                  {item.tip && (
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <div className="flex items-start gap-2">
                        <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-700 font-medium">{item.tip}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Drinks */}
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="p-2 bg-red-100 rounded-lg">
                <Coffee className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">Local Drinks</h3>
            </div>
            <div className="space-y-3 sm:space-y-4">
              {drinks.map((item, index) => (
                <div key={index} className="bg-gray-50 p-3 sm:p-4 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200">
                  <h4 className="font-semibold text-base sm:text-lg text-gray-900 mb-2">{item.name}</h4>
                  {item.description && <p className="text-gray-600 text-sm mb-3">{item.description}</p>}
                  {item.tip && (
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <div className="flex items-start gap-2">
                        <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-700 font-medium">{item.tip}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}