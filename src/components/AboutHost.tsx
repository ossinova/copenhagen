import { Card, CardContent } from '@/components/ui/card'
import { User, Heart, Globe, Instagram, MessageCircle, Users } from 'lucide-react'
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
    <Card className="bg-white dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 shadow-soft card-hover animate-slide-up">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-xl transition-colors duration-300">
            <User className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">About Your Host</h3>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="relative">
            <img
              src={host.photo || '/me.png'}
              alt={host.name}
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl object-cover border-2 border-gray-200/50 dark:border-gray-600/50 flex-shrink-0 transition-all duration-300 shadow-soft"
            />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <h4 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-300 mb-2">{host.name}</h4>
              <p className="text-gray-600 dark:text-gray-400 text-base transition-colors duration-300 mb-3">{age} years old • {host.nationality}</p>
              <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                Hey there! 👋 I'm Oscar, your friendly Copenhagen host. I love meeting travelers from around the world and sharing the best of what this amazing city has to offer. Whether you're here for a few days or a few weeks, I'm here to make your stay unforgettable!
              </p>
            </div>

            {host.hobbies && host.hobbies.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="w-4 h-4 text-gray-400 dark:text-gray-500 transition-colors duration-300" />
                  <h5 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base transition-colors duration-300">Hobbies</h5>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm transition-colors duration-300">{host.hobbies.join(', ')}</p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-gray-50 dark:bg-gray-700 p-3 sm:p-4 rounded-lg border border-gray-200 dark:border-gray-600 transition-all duration-300 transform hover:scale-[1.02]">
                <h5 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm sm:text-base transition-colors duration-300">Favorite Food</h5>
                <p className="text-gray-700 dark:text-gray-300 text-sm transition-colors duration-300">{host.favorites?.food || '-'}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-3 sm:p-4 rounded-lg border border-gray-200 dark:border-gray-600 transition-all duration-300 transform hover:scale-[1.02]">
                <h5 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm sm:text-base transition-colors duration-300">Favorite Country</h5>
                <p className="text-gray-700 dark:text-gray-300 text-sm transition-colors duration-300">{host.favorites?.country || '-'}</p>
              </div>
            </div>

            {host.countriesLived && host.countriesLived.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="w-4 h-4 text-gray-400 dark:text-gray-500 transition-colors duration-300" />
                  <h5 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base transition-colors duration-300">Countries Lived In</h5>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm transition-colors duration-300">{host.countriesLived.join(', ')}</p>
              </div>
            )}

            {/* Social Media */}
            <div>
              <h5 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm sm:text-base transition-colors duration-300">Connect With Me</h5>
              <div className="flex flex-wrap gap-3">
                {host.instagram && (
                  <a
                    href={`https://instagram.com/${host.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 text-sm font-medium transform hover:scale-105"
                  >
                    <Instagram className="w-4 h-4" />
                    Instagram
                  </a>
                )}
                {host.whatsapp && (
                  <a
                    href={`https://wa.me/${host.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300 text-sm font-medium transform hover:scale-105"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </a>
                )}
                {host.couchsurfing && (
                  <a
                    href={host.couchsurfing}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-300 text-sm font-medium transform hover:scale-105"
                  >
                    <Users className="w-4 h-4" />
                    Couchsurfing
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
