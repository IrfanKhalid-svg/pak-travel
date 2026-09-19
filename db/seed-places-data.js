// Real, well-known Pakistani places used to seed the database.
// Descriptions, prices, and fees are placeholder-quality — edit freely,
// then delete db/pak-travel.sqlite and restart the app to reseed.
module.exports = [
  {
    name: 'Hunza Valley',
    province: 'Gilgit-Baltistan',
    category: 'Mountains',
    description: 'A mountain valley in the Karakoram range known for dramatic peaks, terraced orchards, and the historic Baltit and Altit forts. Popular for its scenery, hiking routes, and dried fruit.',
    best_time: 'April to October',
    how_to_get_there: 'Fly to Gilgit or Skardu, then drive 2-3 hours via the Karakoram Highway. Alternatively, drive the full Karakoram Highway from Islamabad (~20-22 hours).',
    entry_fee: 'Free (Baltit Fort entry: approx. PKR 400)',
    estimated_cost: 'PKR 15,000 - 30,000 per person for a 3-4 day trip',
    map_lat: 36.3167,
    map_lng: 74.6500,
    photos: [
      'https://picsum.photos/seed/hunza1/900/600',
      'https://picsum.photos/seed/hunza2/900/600'
    ],
    hotels: [
      { name: 'Hunza Serena Inn', price_per_night: 25000, contact: '+92 5813 455000', description: 'Upscale hotel with valley and mountain views.' },
      { name: 'Hunza Embassy Hotel', price_per_night: 8000, contact: '+92 300 5551234', description: 'Comfortable mid-range stay near Karimabad.' }
    ],
    tours: [
      { name: 'Hunza 3-Day Valley Tour', price: 18000, duration: '3 days / 2 nights', description: 'Guided trip covering Baltit Fort, Attabad Lake, and Khunjerab Pass viewpoint.' }
    ]
  },
  {
    name: 'Fairy Meadows',
    province: 'Gilgit-Baltistan',
    category: 'Mountains',
    description: 'A lush green plateau offering one of the closest views of Nanga Parbat, the ninth-highest mountain in the world. A favorite for camping and short treks.',
    best_time: 'June to September',
    how_to_get_there: 'Drive to Raikot Bridge on the Karakoram Highway, then jeep to Tattu village, followed by a 3-4 hour hike or pony ride to Fairy Meadows.',
    entry_fee: 'Approx. PKR 500 (jeep and environment fees vary)',
    estimated_cost: 'PKR 20,000 - 35,000 per person for a 2-3 day trip',
    map_lat: 35.3900,
    map_lng: 74.5789,
    photos: [
      'https://picsum.photos/seed/fairy1/900/600',
      'https://picsum.photos/seed/fairy2/900/600'
    ],
    hotels: [
      { name: 'Fairy Meadows Cottages', price_per_night: 6000, contact: '+92 346 5551122', description: 'Wooden cottages with direct Nanga Parbat views.' }
    ],
    tours: [
      { name: 'Fairy Meadows Trek & Camp', price: 22000, duration: '2 days / 1 night', description: 'Jeep transfer, guided hike, and camping under Nanga Parbat.' }
    ]
  },
  {
    name: 'Badshahi Mosque',
    province: 'Punjab',
    category: 'Historical',
    description: 'A 17th-century Mughal-era mosque in Lahore, one of the largest in the world at the time of its construction, known for its red sandstone architecture and marble domes.',
    best_time: 'October to March',
    how_to_get_there: 'Located in Lahore city, near Lahore Fort. Accessible by car, rickshaw, or the Orange Line metro.',
    entry_fee: 'Free (camera fee may apply)',
    estimated_cost: 'PKR 1,000 - 2,000 per person for a half-day visit',
    map_lat: 31.5880,
    map_lng: 74.3095,
    photos: [
      'https://picsum.photos/seed/badshahi1/900/600',
      'https://picsum.photos/seed/badshahi2/900/600'
    ],
    hotels: [
      { name: 'Walled City Guest House', price_per_night: 5000, contact: '+92 42 37123456', description: 'Boutique guesthouse a short walk from the mosque.' }
    ],
    tours: [
      { name: 'Lahore Heritage Walk', price: 3000, duration: 'Half-day', description: 'Guided walking tour of Badshahi Mosque, Lahore Fort, and the Walled City.' }
    ]
  },
  {
    name: 'Mohenjo-daro',
    province: 'Sindh',
    category: 'Historical',
    description: 'One of the largest and best-preserved sites of the ancient Indus Valley Civilization, dating back over 4,500 years, with a UNESCO World Heritage designation.',
    best_time: 'November to February',
    how_to_get_there: 'Fly to Sukkur or Moenjodaro Airport, then a short drive. Also accessible by road from Larkana.',
    entry_fee: 'Approx. PKR 500 for foreigners, PKR 50 for locals',
    estimated_cost: 'PKR 8,000 - 15,000 per person for a day trip',
    map_lat: 27.3294,
    map_lng: 68.1381,
    photos: [
      'https://picsum.photos/seed/mohenjo1/900/600',
      'https://picsum.photos/seed/mohenjo2/900/600'
    ],
    hotels: [
      { name: 'Larkana Inn', price_per_night: 6000, contact: '+92 74 4551122', description: 'Basic comfortable stay in nearby Larkana.' }
    ],
    tours: [
      { name: 'Mohenjo-daro Archaeology Tour', price: 7000, duration: 'Full day', description: 'Guided tour of the ruins and on-site museum.' }
    ]
  },
  {
    name: 'Faisal Mosque',
    province: 'Islamabad Capital Territory',
    category: 'Religious',
    description: 'The national mosque of Pakistan, notable for its striking modern, tent-shaped design set against the Margalla Hills in Islamabad.',
    best_time: 'Year-round, best in cooler months (October to March)',
    how_to_get_there: 'Located in Islamabad, easily reached by car or taxi from anywhere in the city.',
    entry_fee: 'Free',
    estimated_cost: 'PKR 500 - 1,500 per person for a visit',
    map_lat: 33.7295,
    map_lng: 73.0372,
    photos: [
      'https://picsum.photos/seed/faisal1/900/600',
      'https://picsum.photos/seed/faisal2/900/600'
    ],
    hotels: [
      { name: 'Margalla View Hotel', price_per_night: 12000, contact: '+92 51 2345678', description: 'Comfortable hotel with views toward the Margalla Hills.' }
    ],
    tours: [
      { name: 'Islamabad City Tour', price: 4000, duration: 'Half-day', description: 'Covers Faisal Mosque, Daman-e-Koh viewpoint, and Lok Virsa museum.' }
    ]
  },
  {
    name: 'Saif-ul-Malook Lake',
    province: 'Khyber Pakhtunkhwa',
    category: 'Lakes',
    description: 'A high-altitude alpine lake near Naran, framed by snow-capped peaks including Malika Parbat, and tied to local folklore about fairies.',
    best_time: 'June to September',
    how_to_get_there: 'Drive to Naran, then a jeep track (~14 km) up to the lake; hiking is also possible.',
    entry_fee: 'Free (jeep hire required)',
    estimated_cost: 'PKR 12,000 - 20,000 per person for a 2-day trip',
    map_lat: 34.8825,
    map_lng: 73.6960,
    photos: [
      'https://picsum.photos/seed/saiful1/900/600',
      'https://picsum.photos/seed/saiful2/900/600'
    ],
    hotels: [
      { name: 'Naran Continental Hotel', price_per_night: 9000, contact: '+92 997 551234', description: 'Popular hotel base for Saif-ul-Malook day trips.' }
    ],
    tours: [
      { name: 'Naran & Saif-ul-Malook Trip', price: 15000, duration: '2 days / 1 night', description: 'Jeep tour to the lake plus a stay in Naran.' }
    ]
  },
  {
    name: 'Swat Valley',
    province: 'Khyber Pakhtunkhwa',
    category: 'Mountains',
    description: 'Known as the "Switzerland of Pakistan," a green valley with rivers, meadows, and ski slopes at Malam Jabba, plus Buddhist archaeological remains.',
    best_time: 'April to October (winter for skiing at Malam Jabba)',
    how_to_get_there: 'Drive from Islamabad via the Swat Expressway (~5-6 hours), or fly to Saidu Sharif Airport.',
    entry_fee: 'Free (individual attractions may charge)',
    estimated_cost: 'PKR 15,000 - 25,000 per person for a 3-day trip',
    map_lat: 35.2227,
    map_lng: 72.4258,
    photos: [
      'https://picsum.photos/seed/swat1/900/600',
      'https://picsum.photos/seed/swat2/900/600'
    ],
    hotels: [
      { name: 'Swat Serena Hotel', price_per_night: 20000, contact: '+92 946 712000', description: 'Well-known upscale hotel in Mingora.' }
    ],
    tours: [
      { name: 'Swat Valley Explorer', price: 16000, duration: '3 days / 2 nights', description: 'Covers Mingora, Malam Jabba, and Kalam.' }
    ]
  },
  {
    name: 'Clifton Beach',
    province: 'Sindh',
    category: 'Beaches',
    description: 'A popular Arabian Sea beach in Karachi, known for camel and horse rides, food stalls, and sunset views.',
    best_time: 'November to February',
    how_to_get_there: 'Located within Karachi city, accessible by car or ride-hailing apps.',
    entry_fee: 'Free',
    estimated_cost: 'PKR 1,000 - 3,000 per person for a visit',
    map_lat: 24.8138,
    map_lng: 67.0300,
    photos: [
      'https://picsum.photos/seed/clifton1/900/600',
      'https://picsum.photos/seed/clifton2/900/600'
    ],
    hotels: [
      { name: 'Beach Luxury Hotel', price_per_night: 15000, contact: '+92 21 32311661', description: 'Established hotel a short drive from Clifton.' }
    ],
    tours: [
      { name: 'Karachi Coastal Evening Tour', price: 3500, duration: 'Half-day', description: 'Clifton Beach, Do Darya, and Port Grand in one evening.' }
    ]
  },
  {
    name: 'Katas Raj Temples',
    province: 'Punjab',
    category: 'Historical',
    description: 'A complex of ancient Hindu temples built around a sacred pond, with roots going back over a thousand years, located near Chakwal.',
    best_time: 'October to March',
    how_to_get_there: 'Drive from Islamabad or Lahore via the M2 motorway, exiting near Kallar Kahar (~2.5 hours from Islamabad).',
    entry_fee: 'Free',
    estimated_cost: 'PKR 3,000 - 6,000 per person for a day trip',
    map_lat: 32.7686,
    map_lng: 72.9317,
    photos: [
      'https://picsum.photos/seed/katas1/900/600',
      'https://picsum.photos/seed/katas2/900/600'
    ],
    hotels: [
      { name: 'Kallar Kahar Resort', price_per_night: 10000, contact: '+92 543 551122', description: 'Nearby resort overlooking Kallar Kahar lake.' }
    ],
    tours: [
      { name: 'Katas Raj Day Trip', price: 5000, duration: 'Full day', description: 'Guided visit to the temple complex with a stop at Kallar Kahar.' }
    ]
  },
  {
    name: 'Ziarat',
    province: 'Balochistan',
    category: 'Mountains',
    description: 'A hill town famous for the world\'s second-largest juniper forest and the Ziarat Residency, where Muhammad Ali Jinnah spent his final days.',
    best_time: 'May to September (October for autumn colors)',
    how_to_get_there: 'Drive from Quetta (~2-3 hours) via the Quetta-Ziarat road.',
    entry_fee: 'Free (Ziarat Residency museum entry: nominal fee)',
    estimated_cost: 'PKR 10,000 - 18,000 per person for a 2-day trip',
    map_lat: 30.3818,
    map_lng: 67.7250,
    photos: [
      'https://picsum.photos/seed/ziarat1/900/600',
      'https://picsum.photos/seed/ziarat2/900/600'
    ],
    hotels: [
      { name: 'Ziarat Continental Hotel', price_per_night: 7000, contact: '+92 823 551122', description: 'Simple, comfortable stay close to the juniper forest.' }
    ],
    tours: [
      { name: 'Ziarat Juniper Forest Tour', price: 9000, duration: '2 days / 1 night', description: 'Includes Ziarat Residency and juniper forest trail.' }
    ]
  }
];
