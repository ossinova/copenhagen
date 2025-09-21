import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Music, 
  Utensils, 
  BookOpen, 
  Gamepad2, 
  Moon, 
  Users, 
  Gift, 
  CreditCard,
  Filter,
  RefreshCw,
  ExternalLink
} from 'lucide-react'
import { guestConfig, type EventItem } from '@/config/guestConfig'

export function Events() {
  const [events, setEvents] = useState<EventItem[]>([])
  const [filteredEvents, setFilteredEvents] = useState<EventItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [isLoading, setIsLoading] = useState(true)
  const [apiEvents, setApiEvents] = useState<EventItem[]>([])
  const [apiStatus, setApiStatus] = useState<'connected' | 'fallback' | 'none'>('none')

  const categories = [
    { id: 'all', label: 'All Events', icon: Calendar },
    { id: 'music', label: 'Music', icon: Music },
    { id: 'food', label: 'Food & Drink', icon: Utensils },
    { id: 'culture', label: 'Culture', icon: BookOpen },
    { id: 'sports', label: 'Sports', icon: Gamepad2 },
    { id: 'nightlife', label: 'Nightlife', icon: Moon },
    { id: 'family', label: 'Family', icon: Users },
    { id: 'free', label: 'Free', icon: Gift },
  ]

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'music': return Music
      case 'food': return Utensils
      case 'culture': return BookOpen
      case 'sports': return Gamepad2
      case 'nightlife': return Moon
      case 'family': return Users
      case 'free': return Gift
      case 'paid': return CreditCard
      default: return Calendar
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'music': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
      case 'food': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
      case 'culture': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'sports': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'nightlife': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
      case 'family': return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200'
      case 'free': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200'
      case 'paid': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  // Filter out events that have links but don't match their displayed date
  const filterValidEvents = (events: any[]) => {
    return events.filter(event => {
      // If event has no URL, it's valid
      if (!event.url) return true
      
      // If event has URL, check if it's actually happening on the displayed date
      const displayedDate = new Date(event.date)
      const today = new Date()
      
      // Only show events that are today or in the future
      if (displayedDate < today) return false
      
      // For events with URLs, be more strict - only show if they're within the next 7 days
      const nextWeek = new Date(today.getTime() + (7 * 86400000))
      if (displayedDate > nextWeek) return false
      
      return true
    })
  }

  // Fetch live events from Meetup API (more reliable than Eventbrite)
  const fetchLiveEvents = async () => {
    if (!guestConfig.events.apiConfig?.meetupApiKey && !guestConfig.events.apiConfig?.eventbriteToken) {
      setApiStatus('none')
      return []
    }

    try {
      // Try Meetup API first (more reliable for public events)
      if (guestConfig.events.apiConfig?.meetupApiKey) {
        console.log('Attempting to fetch events from Meetup API...')
        
        // Meetup API endpoint for events in Copenhagen
        const meetupResponse = await fetch(`https://api.meetup.com/find/upcoming_events?key=${guestConfig.events.apiConfig.meetupApiKey}&location=Copenhagen,Denmark&radius=25&page=20`)
        
        if (meetupResponse.ok) {
          const meetupData = await meetupResponse.json()
          if (meetupData.events && meetupData.events.length > 0) {
            setApiStatus('connected')
            const mappedEvents = meetupData.events.map((event: any) => {
              const eventDate = new Date(event.time)
              const dateStr = eventDate.toISOString().split('T')[0]
              const timeStr = eventDate.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: false 
              })
              
              const eventText = (event.name || '').toLowerCase() + ' ' + (event.description || '').toLowerCase()
              let category: 'music' | 'food' | 'culture' | 'sports' | 'nightlife' | 'family' | 'free' | 'paid' = 'free'
              
              if (eventText.includes('music') || eventText.includes('concert') || eventText.includes('jazz') || eventText.includes('band')) {
                category = 'music'
              } else if (eventText.includes('food') || eventText.includes('restaurant') || eventText.includes('dining') || eventText.includes('cooking')) {
                category = 'food'
              } else if (eventText.includes('museum') || eventText.includes('art') || eventText.includes('culture') || eventText.includes('exhibition')) {
                category = 'culture'
              } else if (eventText.includes('sport') || eventText.includes('fitness') || eventText.includes('marathon') || eventText.includes('run') || eventText.includes('yoga')) {
                category = 'sports'
              } else if (eventText.includes('night') || eventText.includes('bar') || eventText.includes('club') || eventText.includes('party') || eventText.includes('drinks')) {
                category = 'nightlife'
              } else if (eventText.includes('child') || eventText.includes('family') || eventText.includes('kids') || eventText.includes('parent')) {
                category = 'family'
              }
              
            return {
              id: `meetup-${event.id}`,
              title: event.name || 'Untitled Event',
              description: (event.description || 'No description available').substring(0, 200) + '...',
              date: dateStr,
              time: timeStr,
              location: event.venue?.name || event.venue?.address_1 || 'Copenhagen',
              category: category,
              price: 'Free',
              url: event.link,
              isRecurring: false,
              // Add original event data for filtering
              originalEvent: event
            }
            })
            
            // Filter out events with links that don't match their date
            return filterValidEvents(mappedEvents)
          }
        }
      }
      
      // Fallback to Eventbrite if Meetup fails
      if (guestConfig.events.apiConfig?.eventbriteToken) {
        console.log('Meetup API failed, trying Eventbrite API...')
        
        const eventbriteResponse = await fetch(`https://www.eventbriteapi.com/v3/events/search/?location.address=Copenhagen&token=${guestConfig.events.apiConfig.eventbriteToken}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${guestConfig.events.apiConfig.eventbriteToken}`,
            'Content-Type': 'application/json'
          }
        })
        
        if (eventbriteResponse.ok) {
          const eventbriteData = await eventbriteResponse.json()
          if (eventbriteData.events && eventbriteData.events.length > 0) {
            setApiStatus('connected')
            const mappedEvents = eventbriteData.events.map((event: any) => {
              const eventDate = new Date(event.start?.local || event.start?.utc)
              const dateStr = eventDate.toISOString().split('T')[0]
              const timeStr = eventDate.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: false 
              })
              
              const eventText = (event.name?.text || '').toLowerCase() + ' ' + (event.description?.text || '').toLowerCase()
              let category: 'music' | 'food' | 'culture' | 'sports' | 'nightlife' | 'family' | 'free' | 'paid' = 'paid'
              
              if (event.is_free) {
                category = 'free'
              } else if (eventText.includes('music') || eventText.includes('concert') || eventText.includes('jazz')) {
                category = 'music'
              } else if (eventText.includes('food') || eventText.includes('restaurant') || eventText.includes('dining')) {
                category = 'food'
              } else if (eventText.includes('museum') || eventText.includes('art') || eventText.includes('culture')) {
                category = 'culture'
              } else if (eventText.includes('sport') || eventText.includes('fitness') || eventText.includes('marathon')) {
                category = 'sports'
              } else if (eventText.includes('night') || eventText.includes('bar') || eventText.includes('club')) {
                category = 'nightlife'
              } else if (eventText.includes('child') || eventText.includes('family') || eventText.includes('kids')) {
                category = 'family'
              }
              
              return {
                id: `eventbrite-${event.id}`,
                title: event.name?.text || 'Untitled Event',
                description: (event.description?.text || 'No description available').substring(0, 200) + '...',
                date: dateStr,
                time: timeStr,
                location: event.venue?.name || event.venue?.address?.city || 'Copenhagen',
                category: category,
                price: event.is_free ? 'Free' : (event.is_free === false ? 'Paid' : 'Check event page'),
                url: event.url,
                isRecurring: false,
                // Add original event data for filtering
                originalEvent: event
              }
            })
            
            // Filter out events with links that don't match their date
            return filterValidEvents(mappedEvents)
          }
        }
      }
      
      // If both APIs fail, return empty array (no fallback events)
      console.log('Both APIs unavailable. No events to show.')
      setApiStatus('none')
      return []
    } catch (error) {
      console.error('Error fetching live events:', error)
      setApiStatus('none')
      return []
    }
  }

  useEffect(() => {
    const loadEvents = async () => {
      setIsLoading(true)
      
      // Load static recurring events
      const staticEvents = guestConfig.events.staticEvents
      
      // Try to fetch live events from APIs
      const liveEvents = await fetchLiveEvents()
      
      // Combine static recurring events and live events
      const allEvents = [...staticEvents, ...liveEvents]
      
      setEvents(allEvents)
      setApiEvents(liveEvents)
      setFilteredEvents(allEvents)
      setIsLoading(false)
    }

    loadEvents()
  }, [])

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredEvents(events)
    } else {
      setFilteredEvents(events.filter(event => event.category === selectedCategory))
    }
  }, [selectedCategory, events])

  const refreshEvents = async () => {
    setIsLoading(true)
    const liveEvents = await fetchLiveEvents()
    const allEvents = [...guestConfig.events.staticEvents, ...liveEvents]
    setEvents(allEvents)
    setApiEvents(liveEvents)
    setFilteredEvents(selectedCategory === 'all' ? allEvents : allEvents.filter(event => event.category === selectedCategory))
    setIsLoading(false)
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Hero Section */}
      <div className="text-center py-6 sm:py-8 animate-fade-in">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-xl transition-colors duration-300">
            <Calendar className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
            Copenhagen Events
          </h1>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
          Discover what's happening in Copenhagen today and beyond
        </p>
      </div>

      {/* Filter and Refresh Section */}
      <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                Filter Events
              </h3>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                onClick={refreshEvents}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                {isLoading ? 'Loading...' : 'Refresh'}
              </Button>
            </div>
          </div>

          {/* Category Filters */}
          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((category) => {
              const Icon = category.icon
              const isActive = selectedCategory === category.id
              return (
                <Button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  variant={isActive ? "default" : "outline"}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-purple-600 hover:bg-purple-700 text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category.label}
                </Button>
              )
            })}
          </div>

          {/* API Status Indicator */}
          {apiStatus === 'connected' && apiEvents.length > 0 && (
            <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <p className="text-sm text-green-700 dark:text-green-300 font-medium">
                🟢 {apiEvents.length} live event{apiEvents.length !== 1 ? 's' : ''} from Meetup/Eventbrite + {guestConfig.events.staticEvents.length} recurring events
              </p>
            </div>
          )}
          {apiStatus === 'none' && guestConfig.events.staticEvents.length > 0 && (
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">
                🔄 Showing {guestConfig.events.staticEvents.length} recurring events (no live events from APIs)
              </p>
            </div>
          )}
          {apiStatus === 'none' && (guestConfig.events.apiConfig?.meetupApiKey || guestConfig.events.apiConfig?.eventbriteToken) && (
            <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <p className="text-sm text-yellow-700 dark:text-yellow-300 font-medium">
                ⚠️ No live events found from APIs. Add your Meetup API key to see events.
              </p>
            </div>
          )}
          {apiStatus === 'none' && !guestConfig.events.apiConfig?.meetupApiKey && !guestConfig.events.apiConfig?.eventbriteToken && (
            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-900/20 rounded-lg border border-gray-200 dark:border-gray-800">
              <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                ℹ️ No API keys configured. Add Meetup API key to see live events.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => {
          const CategoryIcon = getCategoryIcon(event.category)
          return (
            <Card 
              key={event.id} 
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-[1.02] animate-slide-up"
            >
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <CategoryIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <Badge className={`${getCategoryColor(event.category)} text-xs font-medium`}>
                      {event.category}
                    </Badge>
                  </div>
                  {event.isRecurring && (
                    <Badge variant="outline" className="text-xs">
                      Recurring
                    </Badge>
                  )}
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
                  {event.title}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 transition-colors duration-300">
                  {event.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <Clock className="w-4 h-4" />
                    <span>{event.time}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <MapPin className="w-4 h-4" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>
                  
                  {event.price && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <CreditCard className="w-4 h-4" />
                      <span className="font-medium">{event.price}</span>
                    </div>
                  )}
                </div>

                {event.recurringPattern && (
                  <div className="mb-4 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-xs text-blue-700 dark:text-blue-300">
                      <strong>Schedule:</strong> {event.recurringPattern}
                    </p>
                  </div>
                )}

                {event.url && (
                  <Button
                    onClick={() => window.open(event.url, '_blank')}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-300 flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Learn More
                  </Button>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* No Events Message */}
      {filteredEvents.length === 0 && !isLoading && (
        <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
          <CardContent className="p-8 text-center">
            <Calendar className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
              No events found
            </h3>
            <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300 mb-4">
              No events found in the selected category.
            </p>
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                <strong>Available:</strong> {guestConfig.events.staticEvents.length} recurring events + live events from APIs
              </p>
              {(!guestConfig.events.apiConfig?.meetupApiKey && !guestConfig.events.apiConfig?.eventbriteToken) && (
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                  Add Meetup API key for live events: meetup.com/meetup_api/key/
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
