import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Wifi, Copy, Check, Eye, EyeOff, Smartphone, Shield, WifiIcon } from 'lucide-react'
import QRCode from 'qrcode'
import { guestConfig } from '@/config/guestConfig'

export function WifiQR() {
  const [qrCodeDataURL, setQrCodeDataURL] = useState<string>('')
  const [showPassword, setShowPassword] = useState(false)
  const [copied, setCopied] = useState(false)

  const wifiCredentials = guestConfig.wifi

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const wifiString = `WIFI:T:${wifiCredentials.security};S:${wifiCredentials.ssid};P:${wifiCredentials.password};H:false;;`
        const qrCodeDataURL = await QRCode.toDataURL(wifiString, {
          width: 256,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          }
        })
        setQrCodeDataURL(qrCodeDataURL)
      } catch (error) {
        console.error('Error generating QR code:', error)
      }
    }

    generateQRCode()
  }, [wifiCredentials.password, wifiCredentials.security, wifiCredentials.ssid])

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Hero Section */}
      <div className="text-center py-6 sm:py-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-blue-100 rounded-full">
            <Wifi className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
          Get Connected!
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
          Scan the QR code or use the details below to connect to WiFi
        </p>
      </div>

      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardContent className="p-4 sm:p-6 space-y-6 sm:space-y-8">
          {/* QR Code */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6">
              <Smartphone className="w-5 h-5 text-gray-600" />
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">Scan to Connect</h3>
            </div>
            <div className="flex justify-center">
              <div className="p-4 sm:p-6 bg-white rounded-2xl shadow-lg border-2 border-gray-200">
                {qrCodeDataURL ? (
                  <img 
                    src={qrCodeDataURL} 
                    alt="WiFi QR Code" 
                    className="w-48 h-48 sm:w-64 sm:h-64"
                  />
                ) : (
                  <div className="w-48 h-48 sm:w-64 sm:h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-gray-600 mx-auto mb-3 sm:mb-4"></div>
                      <div className="text-gray-600 font-medium text-sm sm:text-base">Generating QR Code...</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Manual Connection Info */}
          <div className="bg-gray-50 rounded-2xl p-4 sm:p-6 space-y-4 sm:space-y-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <WifiIcon className="w-5 h-5 text-gray-600" />
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">Or connect manually</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <WifiIcon className="w-5 h-5 text-green-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">Network Name</h4>
                </div>
                <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200">
                  <p className="font-mono text-lg sm:text-xl font-bold text-gray-800">{wifiCredentials.ssid}</p>
                </div>
                <Button
                  onClick={() => copyToClipboard(wifiCredentials.ssid)}
                  className="w-full mt-4 bg-gray-900 hover:bg-gray-800 text-white rounded-lg"
                >
                  {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                  Copy Network Name
                </Button>
              </div>

              <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Shield className="w-5 h-5 text-purple-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">Password</h4>
                </div>
                <div className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-200">
                  <p className="font-mono text-lg sm:text-xl font-bold text-gray-800">
                    {showPassword ? wifiCredentials.password : '••••••••••••'}
                  </p>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button
                    onClick={() => setShowPassword(!showPassword)}
                    className="flex-1 bg-gray-900 hover:bg-gray-800 text-white rounded-lg"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                    {showPassword ? 'Hide' : 'Show'}
                  </Button>
                  <Button
                    onClick={() => copyToClipboard(wifiCredentials.password)}
                    className="flex-1 bg-gray-900 hover:bg-gray-800 text-white rounded-lg"
                  >
                    {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                    Copy
                  </Button>
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-800 px-4 py-2 rounded-full">
                <Shield className="w-4 h-4" />
                <span className="font-semibold text-sm sm:text-base">Security: {wifiCredentials.security}</span>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-gray-50 rounded-2xl p-4 sm:p-6 border border-gray-200">
            <div className="text-center mb-4 sm:mb-6">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Smartphone className="w-5 h-5 text-gray-600" />
                <h4 className="text-lg sm:text-xl font-semibold text-gray-900">How to connect:</h4>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-blue-600">1</span>
                  </div>
                  <p className="text-gray-700 font-medium text-sm sm:text-base">Open WiFi settings</p>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-blue-600">2</span>
                  </div>
                  <p className="text-gray-700 font-medium text-sm sm:text-base">Scan QR code with camera</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-blue-600">3</span>
                  </div>
                  <p className="text-gray-700 font-medium text-sm sm:text-base">Or select network manually</p>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-blue-600">4</span>
                  </div>
                  <p className="text-gray-700 font-medium text-sm sm:text-base">Enter password & connect!</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
