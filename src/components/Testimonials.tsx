import { Card, CardContent } from '@/components/ui/card'
import { Star, Quote, ExternalLink } from 'lucide-react'
import { guestConfig } from '@/config/guestConfig'

interface Testimonial {
  id: string
  name: string
  country: string
  date: string
  rating: number
  text: string
  avatar?: string
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah M.',
    country: 'Canada',
    date: 'December 2024',
    rating: 5,
    text: 'Oscar was an amazing host! His place is perfectly located and he gave me the best local tips for Copenhagen. The guide he created is incredibly helpful - I used it every day during my stay.',
  },
  {
    id: '2',
    name: 'Marco R.',
    country: 'Italy',
    date: 'November 2024',
    rating: 5,
    text: 'Fantastic experience! Oscar is very welcoming and his apartment is cozy and clean. The location is perfect - close to everything. Highly recommend staying here!',
  },
  {
    id: '3',
    name: 'Emma L.',
    country: 'Australia',
    date: 'October 2024',
    rating: 5,
    text: 'Oscar is a wonderful host with great local knowledge. His place is exactly as described and the digital guide he provides is incredibly detailed and useful. Would definitely stay again!',
  }
]

export function Testimonials() {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating
            ? 'text-yellow-400 fill-yellow-400'
            : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ))
  }

  return (
    <div className="section-spacing">
      <div className="content-container">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
              <Star className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What Guests Say
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Don't just take our word for it - hear from travelers who've stayed with us!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="bg-white dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 shadow-soft card-hover"
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-3">
                  {renderStars(testimonial.rating)}
                </div>
                
                <div className="flex items-start gap-3 mb-4">
                  <Quote className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    "{testimonial.text}"
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {testimonial.country} • {testimonial.date}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Couchsurfing Profile Link */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200/50 dark:border-blue-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">CS</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Verified Couchsurfing Host
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Check out my profile for more reviews
                  </p>
                </div>
              </div>
              
              <a
                href={guestConfig.host.couchsurfing}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-mobile bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 focus-ring inline-flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                View Couchsurfing Profile
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
