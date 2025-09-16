import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { WifiQR } from './components/WifiQR'
import { CopenhagenMap } from './components/CopenhagenMap'
import { ThingsToDo } from './components/ThingsToDo'
import { PracticalInfo } from './components/PracticalInfo'
import { MapPin, Wifi, Home, Compass, Info, ArrowRight, MapPin as LocationIcon, Phone, Clock, Shield } from 'lucide-react'
import { guestConfig } from '@/config/guestConfig'
import { AboutHost } from '@/components/AboutHost'

function App() {
  const [activeTab, setActiveTab] = useState('home')

  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'wifi', label: 'WiFi', icon: Wifi },
    { id: 'map', label: 'Map', icon: MapPin },
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'tips', label: 'Tips', icon: Info },
  ]

  const { host } = guestConfig

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
              Copenhagen
            </h1>
            <p className="text-sm sm:text-base text-gray-600">Your home away from home</p>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex justify-center space-x-1 sm:space-x-2 py-3 sm:py-4">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <Button
                  key={tab.id}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center gap-1 sm:gap-2 h-12 sm:h-16 w-16 sm:w-20 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? 'bg-gray-900 text-white shadow-md' 
                      : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-xs font-medium">{tab.label}</span>
                </Button>
              )
            })}
          </div>
      </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === 'home' && (
          <div className="space-y-6 sm:space-y-8">
            {/* Welcome Hero */}
            <div className="text-center py-8 sm:py-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
                {host.houseName || 'Welcome to My Place'}
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                {host.addressLine1}, {host.addressLine2 ? `${host.addressLine2}, ` : ''}{host.postalCode} {host.city}
        </p>
      </div>

            {/* Home Image with Arrow */}
            <Card className="bg-white border border-gray-200 shadow-sm overflow-hidden">
              <CardContent className="p-0">
                <div className="relative">
                  <img 
                    src="/home.jpg" 
                    alt="Your stay in Copenhagen" 
                    className="w-full h-48 sm:h-64 object-cover"
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

            {/* Quick Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Location Card */}
              <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <LocationIcon className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">My Address</h3>
                  </div>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p className="font-semibold">{host.houseName}</p>
                    <p className="font-mono">{host.addressLine1}</p>
                    {host.addressLine2 && (
                      <p className="font-mono">{host.addressLine2}</p>
                    )}
                    <p>{host.postalCode} {host.city}</p>
                    <p>{host.country}</p>
                  </div>
                  {host.nearbyTransit?.trainStation && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-600">Close to {host.nearbyTransit.trainStation}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Getting Here Card */}
              <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <MapPin className="w-5 h-5 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Getting Here</h3>
                  </div>
                  <div className="space-y-2 text-sm text-gray-700">
                    {host.nearbyTransit?.trainStation && <p>Train station: {host.nearbyTransit.trainStation}</p>}
                    {host.nearbyTransit?.buses && host.nearbyTransit.buses.length > 0 && (
                      <p>Bus: Lines {host.nearbyTransit.buses.join(', ')}</p>
                    )}
                    {host.nearbyTransit?.airportRoute && <p>Airport: {host.nearbyTransit.airportRoute}</p>}
                  </div>
                  {host.intercom && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-600">Call {host.intercom} at intercom</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* House Rules Card */}
              <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 sm:col-span-2 lg:col-span-1">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Shield className="w-5 h-5 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">House Rules</h3>
                  </div>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span>Quiet: 10 PM - 7 AM</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-gray-400" />
                      <span>No smoking inside</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Home className="w-4 h-4 text-gray-400" />
                      <span>Remove shoes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Home className="w-4 h-4 text-gray-400" />
                      <span>Kitchen is yours!</span>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600">Ask me anything!</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* About Host */}
            <AboutHost />

            {/* Quick Actions */}
            <div className="text-center py-6 sm:py-8">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">What do you need?</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <Button 
                  onClick={() => setActiveTab('wifi')}
                  className="bg-gray-900 text-white px-4 sm:px-6 py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-gray-800 transition-all duration-200 flex items-center gap-2"
                >
                  <Wifi className="w-4 h-4" />
                  <span className="hidden sm:inline">Get WiFi</span>
                  <span className="sm:hidden">WiFi</span>
                </Button>
                <Button 
                  onClick={() => setActiveTab('map')}
                  className="bg-gray-900 text-white px-4 sm:px-6 py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-gray-800 transition-all duration-200 flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4" />
                  <span className="hidden sm:inline">Explore Map</span>
                  <span className="sm:hidden">Map</span>
                </Button>
                <Button 
                  onClick={() => setActiveTab('explore')}
                  className="bg-gray-900 text-white px-4 sm:px-6 py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-gray-800 transition-all duration-200 flex items-center gap-2"
                >
                  <Compass className="w-4 h-4" />
                  <span className="hidden sm:inline">Things to Do</span>
                  <span className="sm:hidden">Explore</span>
                </Button>
                <Button 
                  onClick={() => setActiveTab('tips')}
                  className="bg-gray-900 text-white px-4 sm:px-6 py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-gray-800 transition-all duration-200 flex items-center gap-2"
                >
                  <Info className="w-4 h-4" />
                  <span className="hidden sm:inline">Local Tips</span>
                  <span className="sm:hidden">Tips</span>
                </Button>
              </div>
            </div>

            {/* Emergency Info */}
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Phone className="w-5 h-5 text-red-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Emergency Contacts</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-sm">
                  <div className="p-3 bg-gray-50 rounded-lg text-center">
                    <p className="font-semibold text-gray-900 mb-1">Emergency</p>
                    <p className="text-lg font-mono text-red-600">112</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg text-center">
                    <p className="font-semibold text-gray-900 mb-1">Police</p>
                    <p className="text-lg font-mono text-blue-600">114</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg text-center">
                    <p className="font-semibold text-gray-900 mb-1">My Phone</p>
                    <p className="text-sm font-mono text-gray-700">{host.phone}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg text-center">
                    <p className="font-semibold text-gray-900 mb-1">Hospital</p>
                    <p className="text-sm text-gray-700">Rigshospitalet</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'wifi' && <WifiQR />}
        {activeTab === 'map' && <CopenhagenMap />}
        {activeTab === 'explore' && <ThingsToDo />}
        {activeTab === 'tips' && <PracticalInfo />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12 sm:mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 text-center">
          <p className="text-base sm:text-lg font-semibold text-gray-700 mb-1 sm:mb-2">Enjoy your stay in Copenhagen</p>
          <p className="text-sm sm:text-base text-gray-500">Made for amazing Couchsurfing guests</p>
        </div>
      </footer>
    </div>
  )
}

export default App