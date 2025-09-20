# Weather Service

This service provides consistent weather data across the application.

## Current Implementation

Currently uses mock data for demonstration purposes. The weather data is consistent between the header and home page cards.

## To Integrate Real Weather API

1. **Get API Key**: Sign up for a free API key from [OpenWeatherMap](https://openweathermap.org/api)

2. **Set Environment Variable**: Add your API key to your environment:
   ```bash
   VITE_WEATHER_API_KEY=your_api_key_here
   ```

3. **Update WeatherService**: Uncomment the real API implementation in `weatherService.ts` and update the API_KEY constant:
   ```typescript
   const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
   ```

4. **Enable Real API**: Uncomment the `getWeatherFromAPI()` method and update the `getWeather()` method to use it instead of mock data.

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
