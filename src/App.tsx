import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { WifiQR } from './components/WifiQR'
import { CopenhagenMap } from './components/CopenhagenMap'
import { ThingsToDo } from './components/ThingsToDo'
import { PracticalInfo } from './components/PracticalInfo'
import { MapPin, Wifi, Home, Compass, Info, ArrowRight, MapPin as LocationIcon, Phone, Clock, Shield, Moon, Sun, Menu, X } from 'lucide-react'
import { guestConfig } from '@/config/guestConfig'
import { AboutHost } from '@/components/AboutHost'
import { WeatherWidget } from '@/components/WeatherWidget'
import { HeaderWeather } from '@/components/HeaderWeather'
import { WeatherCard } from '@/components/WeatherCard'

function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Dark mode persistence and initialization
  useEffect(() => {
    const savedTheme = localStorage.getItem('copenhagen-theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    // Use system preference as default, then saved preference
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true)
      document.documentElement.classList.add('dark')
    } else if (savedTheme === 'light') {
      setIsDarkMode(false)
      document.documentElement.classList.remove('dark')
    } else {
      // No saved preference, use system preference
      setIsDarkMode(prefersDark)
      if (prefersDark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen) {
        const target = event.target as Element
        if (!target.closest('nav')) {
          setIsMobileMenuOpen(false)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMobileMenuOpen])

  const toggleDarkMode = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    
    if (newMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('copenhagen-theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('copenhagen-theme', 'light')
    }
  }

  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'wifi', label: 'WiFi', icon: Wifi },
    { id: 'map', label: 'Map', icon: MapPin },
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'tips', label: 'Tips', icon: Info },
  ]

  const { host } = guestConfig

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Navigation Bar */}
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 shadow-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Brand */}
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                Copenhagen
              </h1>
              <span className="hidden md:inline text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
                Your home away from home
              </span>
            </div>

            {/* Center - Navigation Links (Desktop) */}
            <div className="hidden md:flex items-center space-x-1">
              {tabs.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                return (
                  <Button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    variant={isActive ? "default" : "ghost"}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-gray-900 dark:bg-gray-700 text-white shadow-sm'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </Button>
                )
              })}
            </div>

            {/* Right side - Weather, Dark Mode, Mobile Menu */}
            <div className="flex items-center gap-4">
              {/* Weather */}
              <div className="hidden sm:block">
                <HeaderWeather />
              </div>

              {/* Dark Mode Toggle */}
              <div className="flex items-center gap-2">
                <Sun className="w-4 h-4 text-gray-400 dark:text-gray-500 transition-colors duration-300" />
                <button
                  onClick={toggleDarkMode}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 ${
                    isDarkMode ? 'bg-gray-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                      isDarkMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
                <Moon className="w-4 h-4 text-gray-400 dark:text-gray-500 transition-colors duration-300" />
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4">
              <div className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  const isActive = activeTab === tab.id
                  return (
                    <Button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id)
                        setIsMobileMenuOpen(false)
                      }}
                      variant={isActive ? "default" : "ghost"}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-gray-900 dark:bg-gray-700 text-white shadow-sm'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {tab.label}
                    </Button>
                  )
                })}
              </div>
              
              {/* Mobile Weather */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <HeaderWeather />
              </div>
            </div>
          )}
        </div>
      </nav>

          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
        {activeTab === 'home' && (
          <div className="space-y-8">
            {/* Welcome Hero */}
            <div className="text-center py-8 animate-fade-in">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3 transition-colors duration-300">
                {host.houseName || 'Welcome to My Place'}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
                {host.addressLine1}, {host.addressLine2 ? `${host.addressLine2}, ` : ''}{host.postalCode} {host.city}
              </p>
            </div>

            {/* Home Image with Arrow */}
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02] animate-slide-up">
              <CardContent className="p-0">
                <div className="relative">
                  <img 
                    src="/home.jpg" 
                    alt="Your stay in Copenhagen" 
                    className="w-full h-48 sm:h-64 object-cover transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="flex items-center gap-2 mb-2">
                        <LocationIcon className="w-6 h-6" />
                        <span className="text-lg sm:text-xl font-semibold">Your Stay!</span>
                        <ArrowRight className="w-5 h-5" />
                      </div>
                      <p className="text-sm sm:text-base opacity-90">{host.houseName || 'Home'} — {host.addressLine1}, {host.city}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Main Dashboard Cards */}
              <div className="lg:col-span-3 space-y-6">
                {/* Top Row - Key Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Location Card */}
                  <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105 animate-slide-up" style={{animationDelay: '0.1s'}}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-xl transition-colors duration-300">
                          <LocationIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-300">Address</h3>
                      </div>
                      <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">
                        <p className="font-semibold text-base">{host.houseName}</p>
                        <p className="font-mono">{host.addressLine1}</p>
                        {host.addressLine2 && (
                          <p className="font-mono">{host.addressLine2}</p>
                        )}
                        <p>{host.postalCode} {host.city}</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Getting Here Card */}
                  <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105 animate-slide-up" style={{animationDelay: '0.2s'}}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-green-100 dark:bg-green-900 rounded-xl transition-colors duration-300">
                          <MapPin className="w-6 h-6 text-green-600 dark:text-green-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-300">Transport</h3>
                      </div>
                      <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">
                        {host.nearbyTransit?.trainStation && <p>🚂 {host.nearbyTransit.trainStation}</p>}
                        {host.nearbyTransit?.buses && host.nearbyTransit.buses.length > 0 && (
                          <p>🚌 Lines {host.nearbyTransit.buses.join(', ')}</p>
                        )}
                        {host.nearbyTransit?.airportRoute && <p>✈️ {host.nearbyTransit.airportRoute}</p>}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Weather Card */}
                  <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105 animate-slide-up" style={{animationDelay: '0.3s'}}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-xl transition-colors duration-300">
                          <Sun className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-300">Weather</h3>
                      </div>
                      <WeatherCard variant="card" />
                    </CardContent>
                  </Card>
                </div>

                {/* Middle Row - House Rules & Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* House Rules Card */}
                  <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105 animate-slide-up" style={{animationDelay: '0.4s'}}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-xl transition-colors duration-300">
                          <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-300">House Rules</h3>
                      </div>
                      <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">
                        <div className="flex items-center gap-3">
                          <Clock className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                          <span>Quiet hours: 10 PM - 7 AM</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Shield className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                          <span>No smoking inside</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Home className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                          <span>Remove shoes at entrance</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Home className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                          <span>Kitchen is fully available</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Actions Card */}
                  <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105 animate-slide-up" style={{animationDelay: '0.5s'}}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-xl transition-colors duration-300">
                          <Compass className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-300">Quick Actions</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <Button 
                          onClick={() => setActiveTab('wifi')}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-300 flex items-center gap-2"
                        >
                          <Wifi className="w-3 h-3" />
                          WiFi
                        </Button>
                        <Button 
                          onClick={() => setActiveTab('map')}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-300 flex items-center gap-2"
                        >
                          <MapPin className="w-3 h-3" />
                          Map
                        </Button>
                        <Button 
                          onClick={() => setActiveTab('explore')}
                          className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-300 flex items-center gap-2"
                        >
                          <Compass className="w-3 h-3" />
                          Explore
                        </Button>
                        <Button 
                          onClick={() => setActiveTab('tips')}
                          className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-300 flex items-center gap-2"
                        >
                          <Info className="w-3 h-3" />
                          Tips
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* About Host */}
                <AboutHost />
              </div>

              {/* Right Sidebar - Emergency Contacts & Additional Info */}
              <div className="lg:col-span-1 flex flex-col gap-6 h-full">
                {/* Emergency Contacts - Vertical Card */}
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105 animate-slide-up flex-1" style={{animationDelay: '0.6s'}}>
                  <CardContent className="p-6 h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-red-100 dark:bg-red-900 rounded-xl transition-colors duration-300">
                        <Phone className="w-6 h-6 text-red-600 dark:text-red-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-300">Emergency</h3>
                    </div>
                    <div className="space-y-4 flex-1">
                      <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 transition-all duration-300">
                        <div className="flex items-start gap-3">
                          <Phone className="w-4 h-4 text-gray-600 dark:text-gray-400 mt-1 transition-colors duration-300" />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 dark:text-white text-sm transition-colors duration-300">Emergency</h4>
                            <p className="text-lg font-mono text-red-600 dark:text-red-400 transition-colors duration-300">112</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400 transition-colors duration-300">Police, Fire, Medical</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 transition-all duration-300">
                        <div className="flex items-start gap-3">
                          <Phone className="w-4 h-4 text-gray-600 dark:text-gray-400 mt-1 transition-colors duration-300" />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 dark:text-white text-sm transition-colors duration-300">Host Phone</h4>
                            <p className="text-lg font-mono text-gray-800 dark:text-gray-200 transition-colors duration-300">{host.phone}</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400 transition-colors duration-300">Available 24/7</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 transition-all duration-300">
                        <div className="flex items-start gap-3">
                          <Phone className="w-4 h-4 text-gray-600 dark:text-gray-400 mt-1 transition-colors duration-300" />
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 dark:text-white text-sm transition-colors duration-300">Hospital</h4>
                            <p className="text-lg font-mono text-gray-800 dark:text-gray-200 transition-colors duration-300">Rigshospitalet</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400 transition-colors duration-300">Main hospital</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Additional Info Card */}
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105 animate-slide-up flex-1" style={{animationDelay: '0.7s'}}>
                  <CardContent className="p-6 h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-xl transition-colors duration-300">
                        <Info className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-300">Need Help?</h3>
                    </div>
                    <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300 flex-1">
                      <p>• Check the WiFi tab for internet access</p>
                      <p>• Use the Map tab to explore the area</p>
                      <p>• Browse Things to Do for recommendations</p>
                      <p>• Check Tips for local insights</p>
                    </div>
                    <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg transition-colors duration-300">
                      <p className="text-xs text-blue-700 dark:text-blue-300 font-medium">💡 Pro tip: Save this page to your home screen for quick access!</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'wifi' && <WifiQR />}
        {activeTab === 'map' && <CopenhagenMap />}
        {activeTab === 'explore' && <ThingsToDo />}
        {activeTab === 'tips' && <PracticalInfo />}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12 sm:mt-16 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 text-center">
          <p className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1 sm:mb-2 transition-colors duration-300">Enjoy your stay in Copenhagen</p>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 transition-colors duration-300">Made for amazing Couchsurfing guests</p>
        </div>
      </footer>
    </div>
  )
}

export default App