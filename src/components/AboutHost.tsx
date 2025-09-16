import { Card, CardContent } from '@/components/ui/card'
import { User, MapPin, Heart, Globe } from 'lucide-react'
import { guestConfig } from '@/config/guestConfig'

function calculateAge(birthdayIso: string): number {
  const b = new Date(birthdayIso)
  const now = new Date()
  let age = now.getFullYear() - b.getFullYear()
  const m = now.getMonth() - b.getMonth()
  if (m < 0 || (m === 0 && now.getDate() < b.getDate())) {
    age--
  }
  return age
}

export function AboutHost() {
  const { host } = guestConfig
  const age = calculateAge(host.birthday)

  return (
    <Card className="bg-white border border-gray-200 shadow-sm">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <User className="w-5 h-5 text-indigo-600" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">About Your Host</h3>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
          <img
            src={host.photo || '/me.png'}
            alt={host.name}
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl object-cover border border-gray-200 flex-shrink-0"
          />
          <div className="flex-1 space-y-4">
            <div>
              <h4 className="text-xl sm:text-2xl font-bold text-gray-900">{host.name}</h4>
              <p className="text-gray-700 text-sm sm:text-base">{age} years old • {host.nationality}</p>
            </div>

            {host.hobbies && host.hobbies.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="w-4 h-4 text-gray-400" />
                  <h5 className="font-semibold text-gray-900 text-sm sm:text-base">Hobbies</h5>
                </div>
                <p className="text-gray-700 text-sm">{host.hobbies.join(', ')}</p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200">
                <h5 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Favorite Food</h5>
                <p className="text-gray-700 text-sm">{host.favorites?.food || '-'}</p>
              </div>
              <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200">
                <h5 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Favorite Country</h5>
                <p className="text-gray-700 text-sm">{host.favorites?.country || '-'}</p>
              </div>
            </div>

            {host.countriesLived && host.countriesLived.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="w-4 h-4 text-gray-400" />
                  <h5 className="font-semibold text-gray-900 text-sm sm:text-base">Countries Lived In</h5>
                </div>
                <p className="text-gray-700 text-sm">{host.countriesLived.join(', ')}</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
