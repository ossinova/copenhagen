export type HostInfo = {
  houseName?: string
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
  // Social media
  instagram?: string
  whatsapp?: string
  couchsurfing?: string
  // Additional properties
  emergencyContacts?: Array<{
    name: string
    number: string
    description: string
  }>
  transport?: {
    options: Array<{
      type: string
      icon: any
      description: string
      details: string[]
    }>
  }
  practicalTips?: Array<{
    category: string
    icon: any
    tips: string[]
  }>
  houseRules?: string[]
  weather?: {
    tips: string[]
  }
  timeZone?: {
    tips: string[]
  }
  essentialApps?: Array<{
    name: string
    description: string
  }>
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
    // Social media
    instagram: 'norsehorizon',
    whatsapp: '+47 98605552',
    couchsurfing: 'https://www.couchsurfing.com/people/oscar-dyremyhr-1',
    // Emergency contacts
    emergencyContacts: [
      {
        name: 'Oscar (Host)',
        number: '+47 98605552',
        description: 'Available 24/7 for emergencies'
      },
      {
        name: 'Emergency Services',
        number: '112',
        description: 'Police, Fire, Medical'
      }
    ],
    // Transportation options
    transport: {
      options: [
        {
          type: 'Train Station',
          icon: 'Train',
          description: 'Dybbølsbro Station - 2 min walk',
          details: ['Metro M1/M2 lines', 'S-train connections', 'Bus connections nearby']
        },
        {
          type: 'Airport',
          icon: 'Plane',
          description: 'CPH Airport - 30 min by metro',
          details: ['Metro M2 to Kongens Nytorg', 'Then M4 to Havneholmen', 'Total: ~30 minutes']
        }
      ]
    },
    // Practical tips
    practicalTips: [
      {
        category: 'Getting Around',
        icon: 'MapPin',
        tips: [
          'Download Rejseplanen app for public transport',
          'Get a Rejsekort (travel card) for cheaper fares',
          'Bikes are everywhere - consider renting one',
          'Walking is often faster than public transport in city center'
        ]
      },
      {
        category: 'Money & Payments',
        icon: 'CreditCard',
        tips: [
          'Denmark is mostly cashless - cards accepted everywhere',
          'Tipping is not expected but appreciated (10% max)',
          'VAT is included in all prices',
          'ATMs are widely available'
        ]
      },
      {
        category: 'Food & Dining',
        icon: 'Utensils',
        tips: [
          'Restaurants are expensive - budget accordingly',
          'Try smørrebrød (open sandwiches)',
          'Supermarkets close early (6-8 PM)',
          'Tap water is safe and free everywhere'
        ]
      },
      {
        category: 'Safety & Emergency',
        icon: 'AlertTriangle',
        tips: [
          'Copenhagen is very safe, even at night',
          'Emergency number: 112',
          'Keep your belongings secure in crowded areas',
          'Bike theft is common - always lock your bike'
        ]
      }
    ],
    // House rules
    houseRules: [
      'No smoking inside the apartment',
      'Please remove shoes at the entrance',
      'Keep noise down after 10 PM',
      'Clean up after yourself in shared spaces',
      'Let me know if you need anything!'
    ],
    // Weather tips
    weather: {
      tips: [
        'Weather changes quickly - always bring layers',
        'Rain is common - pack a light rain jacket',
        'Summer: 15-25°C, Winter: -5 to 5°C',
        'Check weather forecast daily'
      ]
    },
    // Time zone info
    timeZone: {
      tips: [
        'Copenhagen is GMT+1 (CET)',
        'Daylight saving: GMT+2 (CEST) March-October',
        'Sunrise: 4:30 AM (summer), 8:30 AM (winter)',
        'Sunset: 10 PM (summer), 4 PM (winter)'
      ]
    },
    // Essential apps
    essentialApps: [
      {
        name: 'Rejseplanen',
        description: 'Public transport planning'
      },
      {
        name: 'MobilePay',
        description: 'Danish payment app'
      },
      {
        name: 'Too Good To Go',
        description: 'Cheap food from restaurants'
      },
      {
        name: 'Donkey Republic',
        description: 'Bike sharing app'
      }
    ]
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
      {
        id: 6,
        name: 'Rosenborg Castle',
        type: 'museum',
        coordinates: [55.6857, 12.5775],
        description: 'Renaissance castle with crown jewels and beautiful gardens',
        icon: { name: 'BookOpen' },
        color: 'bg-purple-500',
        tips: ['See the crown jewels in the basement', 'Beautiful gardens are free', 'Great for history lovers'],
        bestTime: 'Morning (less crowded)',
        cost: 'DKK 130',
        duration: '2-3 hours',
      },
      {
        id: 7,
        name: 'Round Tower',
        type: 'attraction',
        coordinates: [55.6814, 12.5760],
        description: '17th-century tower with panoramic city views',
        icon: { name: 'Camera' },
        color: 'bg-blue-500',
        tips: ['Spiral walkway to the top', 'Best views of Copenhagen', 'No elevator - be prepared to walk'],
        bestTime: 'Sunset for best photos',
        cost: 'DKK 40',
        duration: '1 hour',
      },
      {
        id: 8,
        name: 'Freetown Christiania',
        type: 'attraction',
        coordinates: [55.6739, 12.6014],
        description: 'Alternative neighborhood with unique culture',
        icon: { name: 'Sparkles' },
        color: 'bg-green-500',
        tips: ['No photos on Pusher Street', 'Respect the community rules', 'Great for alternative culture'],
        bestTime: 'Daytime (safer)',
        cost: 'Free to visit',
        duration: '1-2 hours',
      },
      {
        id: 9,
        name: 'Amalienborg Palace',
        type: 'attraction',
        coordinates: [55.6840, 12.5933],
        description: 'Royal residence with changing of the guard',
        icon: { name: 'Camera' },
        color: 'bg-yellow-500',
        tips: ['Changing of guard at 12:00', 'See the royal palace', 'Near Marmorkirken'],
        bestTime: '12:00 for guard ceremony',
        cost: 'Free to visit square',
        duration: '30 minutes',
      },
      {
        id: 10,
        name: 'Canal Tours (Nyhavn)',
        type: 'attraction',
        coordinates: [55.6794, 12.5906],
        description: 'Boat tours through Copenhagen canals',
        icon: { name: 'Plane' },
        color: 'bg-cyan-500',
        tips: ['Best way to see the city', 'Multiple tour companies', 'Book online for discounts'],
        bestTime: 'Morning or afternoon',
        cost: 'DKK 80-120',
        duration: '1 hour',
      },
      {
        id: 11,
        name: 'National Museum',
        type: 'museum',
        coordinates: [55.6754, 12.5714],
        description: 'Denmark\'s largest cultural history museum',
        icon: { name: 'BookOpen' },
        color: 'bg-indigo-500',
        tips: ['Great Viking exhibition', 'Free on Wednesdays', 'Large museum - plan your visit'],
        bestTime: 'Wednesday (free entry)',
        cost: 'DKK 100 (free Wed)',
        duration: '2-4 hours',
      },
      {
        id: 12,
        name: 'Meatpacking District',
        type: 'food',
        coordinates: [55.6614, 12.5514],
        description: 'Trendy area with restaurants, bars, and nightlife',
        icon: { name: 'Utensils' },
        color: 'bg-red-500',
        tips: ['Great for dinner and drinks', 'Trendy atmosphere', 'Many options to choose from'],
        bestTime: 'Evening',
        cost: 'DKK 200-400',
        duration: '2-3 hours',
      },
      {
        id: 13,
        name: 'Superkilen Park',
        type: 'nature',
        coordinates: [55.6900, 12.5500],
        description: 'Colorful urban park in Nørrebro',
        icon: { name: 'Mountain' },
        color: 'bg-pink-500',
        tips: ['Instagram-worthy photos', 'Unique design', 'Great for a walk'],
        bestTime: 'Daytime',
        cost: 'Free',
        duration: '1 hour',
      },
      {
        id: 14,
        name: 'Copenhill',
        type: 'attraction',
        coordinates: [55.6514, 12.6014],
        description: 'Ski slope on top of a waste-to-energy plant',
        icon: { name: 'Mountain' },
        color: 'bg-slate-500',
        tips: ['Unique Copenhagen experience', 'Great views from the top', 'Can ski year-round'],
        bestTime: 'Any time',
        cost: 'DKK 200-300',
        duration: '2-3 hours',
      },
      {
        id: 15,
        name: 'Reffen Street Food',
        type: 'food',
        coordinates: [55.6914, 12.6014],
        description: 'Outdoor street food market by the water',
        icon: { name: 'Utensils' },
        color: 'bg-orange-500',
        tips: ['Great variety of food', 'Nice waterfront location', 'Cashless payments'],
        bestTime: 'Lunch or dinner',
        cost: 'DKK 80-150',
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
