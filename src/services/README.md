# Weather Service

This service provides consistent weather data across the application using WeatherAPI.com.

## Current Implementation

Uses WeatherAPI.com for real weather data with fallback to mock data when no API key is provided.

## To Integrate Real Weather API

1. **Get API Key**: Sign up for a free API key from [WeatherAPI.com](https://www.weatherapi.com/)
   - **No credit card required!**
   - Free tier: 1 million calls per month
   - Current weather, forecast, and historical data

2. **Set Environment Variable**: Add your API key to your environment:
   ```bash
   VITE_WEATHER_API_KEY=your_weatherapi_key_here
   ```

3. **The service automatically detects your API key** and switches from mock data to real data.

## Features

- **Caching**: Weather data is cached for 10 minutes to reduce API calls
- **Fallback**: Graceful fallback to default weather if API fails
- **Consistent**: Same data across header and home page
- **Loading States**: Proper loading indicators while fetching data

## API Response Format

The service expects weather data in this format:
```typescript
interface WeatherData {
  temperature: number    // Temperature in Celsius
  condition: string      // Weather condition (e.g., "Partly Cloudy")
  icon: string          // Icon identifier (e.g., "cloud-sun")
  description: string   // Human-readable description
}
```
