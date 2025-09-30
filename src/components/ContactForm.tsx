import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Mail, MessageCircle, Calendar, User, MapPin, Phone } from 'lucide-react'
import { guestConfig } from '@/config/guestConfig'

interface FormData {
  name: string
  email: string
  dates: string
  message: string
  guests: string
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    dates: '',
    message: '',
    guests: '1'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Create mailto link with form data
    const subject = `Couchsurfing Request from ${formData.name}`
    const body = `Hi Oscar!

I'm interested in staying at your place in Copenhagen.

Details:
- Name: ${formData.name}
- Email: ${formData.email}
- Dates: ${formData.dates}
- Number of guests: ${formData.guests}
- Message: ${formData.message}

Looking forward to hearing from you!

Best regards,
${formData.name}`
    
    const mailtoLink = `mailto:${guestConfig.host.phone}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.open(mailtoLink, '_blank')
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        email: '',
        dates: '',
        message: '',
        guests: '1'
      })
    }, 3000)
  }

  return (
    <div className="section-spacing">
      <div className="content-container">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
              <MessageCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Request to Stay
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Ready to experience Copenhagen like a local? Send me a message and let's make it happen!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="bg-white dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 shadow-soft">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Send a Message
              </h3>
              
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Message Sent!
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Your email client should open with a pre-filled message. I'll get back to you soon!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <User className="w-4 h-4 inline mr-1" />
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <Mail className="w-4 h-4 inline mr-1" />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="dates" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        Preferred Dates
                      </label>
                      <input
                        type="text"
                        id="dates"
                        name="dates"
                        value={formData.dates}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        placeholder="e.g., Dec 15-18, 2024"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="guests" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Number of Guests
                      </label>
                      <select
                        id="guests"
                        name="guests"
                        value={formData.guests}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="1">1 guest</option>
                        <option value="2">2 guests</option>
                        <option value="3">3 guests</option>
                        <option value="4">4 guests</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <MessageCircle className="w-4 h-4 inline mr-1" />
                      Tell me about yourself
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                      placeholder="Tell me a bit about yourself, your travel plans, and what you're looking forward to in Copenhagen..."
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-mobile-lg bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 focus-ring"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Mail className="w-5 h-5 mr-2" />
                        Send Request
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="bg-white dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 shadow-soft">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Quick Contact
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                      <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Phone</p>
                      <a
                        href={`tel:${guestConfig.host.phone}`}
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {guestConfig.host.phone}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                      <MessageCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">WhatsApp</p>
                      <a
                        href={`https://wa.me/${guestConfig.host.whatsapp?.replace('+', '') || ''}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 dark:text-green-400 hover:underline"
                      >
                        {guestConfig.host.whatsapp}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                      <MapPin className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Location</p>
                      <p className="text-gray-600 dark:text-gray-400">
                        {guestConfig.host.addressLine1}, {guestConfig.host.city}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200/50 dark:border-blue-700/50">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  💡 Pro Tip
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  I usually respond within a few hours! For urgent requests, feel free to call or WhatsApp me directly.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
