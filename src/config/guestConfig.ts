export type HostInfo = {
  addressLine1: string
  addressLine2?: string
  city: string
  postalCode?: string
  country: string
  intercom?: string
  notes?: string
  phone: string
  nearbyTransit?: {
    trainStation?: string
    buses?: string[]
    airportRoute?: string
  }
  // About host
  name: string
  birthday: string // ISO date string e.g., 1995-05-20
  nationality?: string
  hobbies?: string[]
  favorites?: {
    food?: string
    country?: string
  }
  countriesLived?: string[]
  photo?: string // path under public/
  houseName?: string
}

export type WifiInfo = {
  ssid: string
  password: string
  security: 'WPA' | 'WPA2' | 'WEP' | 'None'
}

export type MapLocation = {
  id: number
  name: string
  type: 'home' | 'attraction' | 'museum' | 'food' | 'shopping' | 'nature' | 'cafe'
  coordinates?: [number, number]
  description?: string
  icon?: { name: string }
  color?: string
  tips?: string[]
  bestTime?: string
  cost?: string
  duration?: string
}

export type MapConfig = {
  center?: [number, number]
  zoom?: number
  locations: MapLocation[]
}

export type ExploreCategory = {
  id: string
  title: string
  items: { name: string; description?: string; tip?: string }[]
}

export type ExploreConfig = {
  categories: ExploreCategory[]
  food: { name: string; description?: string; emoji?: string; tip?: string }[]
  drinks: { name: string; description?: string; emoji?: string; tip?: string }[]
}

export type GuestConfig = {
  host: HostInfo
  wifi: WifiInfo
  map: MapConfig
  explore: ExploreConfig
}

export const guestConfig: GuestConfig = {
  host: {
    houseName: 'Kaktus Towers',
    addressLine1: 'Dybbølsbro 3',
    addressLine2: 'Apartment 13.1',
    city: 'Copenhagen',
    postalCode: '1577',
    country: 'Denmark',
    intercom: '13.1',
    notes: 'Close to Dybbølsbro Station. Use intercom and take elevator to 13th floor.',
    phone: '+47 98605552',
    nearbyTransit: {
      trainStation: 'Dybbølsbro Station',
      buses: ['1A', '2A', '5A', '6A'],
      airportRoute: 'Metro M2 to Kongens Nytorg, then M4 to Havneholmen',
    },
    name: 'Oscar Dyremyhr',
    birthday: '1995-05-20',
    nationality: 'Norwegian',
    hobbies: ['Traveling', 'Walking', 'Skiing', 'Socializing'],
    favorites: {
      food: 'Thai',
      country: 'Burma / Myanmar',
    },
    countriesLived: ['Norway', 'Thailand', 'USA', 'Denmark'],
    photo: '/me.png',
  },
  wifi: {
    ssid: 'NOKIA-4351',
    password: 'k7LrxabPBw',
    security: 'WPA2',
  },
  map: {
    center: [55.6650, 12.5650],
    zoom: 14,
    locations: [
      {
        id: 1,
        name: 'Kaktus Towers — Dybbølsbro 3',
        type: 'home',
        coordinates: [55.6650, 12.5650],
        description: 'Your stay: Dybbølsbro 3, Apartment 13.1 (Kaktus Towers)',
        icon: { name: 'Home' },
        color: 'bg-red-500',
        tips: ['Use intercom system - call apartment 13.1', 'Take elevator to 13th floor', 'First door on the right', 'Close to Dybbølsbro Station'],
        bestTime: 'Any time',
        cost: 'Free',
        duration: 'Your stay',
      },
      {
        id: 2,
        name: 'Nyhavn',
        type: 'attraction',
        coordinates: [55.6794, 12.5906],
        description: 'Iconic colorful harbor with restaurants and bars',
        icon: { name: 'Camera' },
        color: 'bg-blue-500',
        tips: ['Best photos in morning light', 'Free to walk around', 'Many restaurants are tourist traps - check prices'],
        bestTime: 'Morning or late afternoon',
        cost: 'Free to visit',
        duration: '1-2 hours',
      },
      {
        id: 3,
        name: 'Tivoli Gardens',
        type: 'attraction',
        coordinates: [55.6754, 12.5653],
        description: 'Historic amusement park in the city center',
        icon: { name: 'Camera' },
        color: 'bg-green-500',
        tips: ['Beautiful at night with lights', 'Skip the rides, enjoy the atmosphere', 'Great for families'],
        bestTime: 'Evening (lights are magical)',
        cost: 'DKK 155-185',
        duration: '3-4 hours',
      },
      {
        id: 4,
        name: 'The Little Mermaid',
        type: 'attraction',
        coordinates: [55.6929, 12.5995],
        description: 'Famous bronze statue by Edvard Eriksen',
        icon: { name: 'Camera' },
        color: 'bg-purple-500',
        tips: ['Can be crowded - visit early morning', 'Smaller than expected', 'Nice walk from city center'],
        bestTime: 'Early morning (7-9 AM)',
        cost: 'Free',
        duration: '30 minutes',
      },
      {
        id: 5,
        name: 'Torvehallerne',
        type: 'food',
        coordinates: [55.6784, 12.5714],
        description: 'Modern food market with local delicacies',
        icon: { name: 'Utensils' },
        color: 'bg-orange-500',
        tips: ['Try smørrebrød and local cheeses', 'Great for lunch', 'Can be expensive but worth it'],
        bestTime: 'Lunch time (12-2 PM)',
        cost: 'DKK 50-200',
        duration: '1-2 hours',
      },
    ],
  },
  explore: {
    categories: [
      {
        id: 'museums',
        title: 'Museums',
        items: [
          { name: 'Glyptoteket', description: 'Next to Tivoli', tip: 'Free on Tuesdays!' },
          { name: 'National Museum', description: 'Cultural history', tip: 'Great Viking exhibition' },
          { name: 'Rosenborg Castle', description: 'Crown jewels & gardens', tip: 'See the crown jewels in basement' },
          { name: 'Danish Architecture Museum', description: 'Modern design & architecture' },
          { name: 'The David Collection', description: 'Islamic & European art', tip: 'Hidden gem' },
        ],
      },
      {
        id: 'attractions',
        title: 'Must-See Attractions',
        items: [
          { name: 'Round Tower', description: 'City views', tip: 'Spiral walkway' },
          { name: 'Little Mermaid', description: 'Iconic statue (overrated)', tip: 'Go if you are near Kastellet' },
          { name: 'Amalienborg & Marmorkirken', description: 'Royal palace & marble church', tip: 'Changing of the guard' },
          { name: 'Canal Tour', description: 'Depart from Nyhavn', tip: 'Best city views' },
          { name: 'Nyhavn & Broen Gatekjøkken', description: 'Photos & food' },
          { name: 'Freetown Christiania', description: 'Alternative neighborhood', tip: 'No photos on Pusher Street' },
          { name: 'Meatpacking District', description: 'Restaurants, cafés & bars' },
        ],
      },
      {
        id: 'hidden',
        title: 'Hidden Gems',
        items: [
          { name: 'Cisternene (Frederiksberg)', description: 'Underground art space' },
          { name: 'Superkilen (Nørrebro)', description: 'Colorful urban park' },
          { name: 'Assistens Cemetery (Nørrebro)', description: 'Peaceful park' },
          { name: 'Copenhill', description: 'Skiing on a roof' },
          { name: 'Reffen', description: 'Street food / cool vibe' },
          { name: 'Frederiksberg Gardens + Zoo', description: 'Green space & animals' },
        ],
      },
      {
        id: 'daytrips',
        title: 'Day Trips',
        items: [
          { name: 'Louisiana Museum of Modern Art', description: 'Modern art by the sea', tip: '1 hour by train' },
          { name: 'Kronborg Castle (Helsingør)', description: "Hamlet's castle", tip: 'UNESCO site' },
          { name: 'Dragør', description: 'Charming fishing village' },
          { name: 'Viking Museum (Roskilde)', description: 'Viking ships' },
        ],
      },
    ],
    food: [
      { name: 'Smørrebrød', description: 'Open-faced sandwich', tip: 'Aamanns or Schønnemann' },
      { name: 'Pastry', description: 'Hart, Juno the Bakery' },
      { name: 'Flæskesteg Sandwich', description: 'Roasted pork belly' },
      { name: 'Gasoline Grill', description: 'Great burger' },
      { name: 'Danish Hot Dogs', description: 'Try remoulade' },
      { name: 'Frikadeller', description: 'Danish meatballs' },
    ],
    drinks: [
      { name: 'Local Beer', description: 'Carlsberg, Tuborg' },
      { name: 'Faxe Kondi', description: 'Classic Danish soda' },
      { name: 'Squash', description: 'Orange soda' },
      { name: 'Schnapps', description: 'Traditional shot' },
      { name: 'Gammel Dansk', description: 'Danish bitter' },
      { name: 'Æblekageshot', description: 'Apple pie shot' },
    ],
  },
}
