export interface ProductItem {
  id: string;
  name: string;
  category: 'Basic' | 'Premium' | 'Ultra-Premium';
  image: string;
  colorPatternImage?: string;
  price: string;
  dimensions: string;
  description: string;
  status: 'In Stock' | 'Experience Center Showcase' | 'Made to Order';
  features: string[];
}

export const PRODUCTS_CATALOG: ProductItem[] = [
  // --- BASIC COLLECTION (Sheet 1) ---
  {
    id: 'TRNG-BSC-01',
    name: 'Tarang Kinetic Sand Table 16" (Basic Edition)',
    category: 'Basic',
    image: '/products/image24.jpg',
    colorPatternImage: '/products/image23.jpg',
    price: '₹24,999',
    dimensions: '16" Diameter • Height 18" • Weight 8.5 kg',
    description: 'Compact kinetic sand art table featuring automated single-steel ball movement. Creates mesmerizing geometric patterns in high-contrast white kinetic sand.',
    status: 'In Stock',
    features: ['Single-ball magnetic drive', 'Warm white LED edge illumination', 'Stained birch wood enclosure', 'Silent step motor mechanism']
  },
  {
    id: 'TRNG-BSC-02',
    name: 'Tarang Kinetic Sand Table 18" Classic (Basic)',
    category: 'Basic',
    image: '/products/image4.png',
    colorPatternImage: '/products/image23.jpg',
    price: '₹28,500',
    dimensions: '18" Diameter • Height 19" • Weight 10 kg',
    description: 'Classic circular kinetic sand art table with integrated Bluetooth pattern control. Pre-loaded with 50+ geometric sand drawing algorithms.',
    status: 'In Stock',
    features: ['50+ Preloaded sand patterns', 'App & Bluetooth connectivity', 'Toughened anti-glare glass top', 'Natural oak finish']
  },
  {
    id: 'TRNG-BSC-03',
    name: 'Tarang Minimalist Sand Vessel 20" (Basic)',
    category: 'Basic',
    image: '/products/image19.png',
    colorPatternImage: '/products/image23.jpg',
    price: '₹31,999',
    dimensions: '20" Diameter • Height 20" • Weight 12 kg',
    description: 'Sleek minimalist edition designed for modern home interiors and waiting lounges. Smooth motorized motion with low ambient noise level.',
    status: 'In Stock',
    features: ['Low-noise whisper drive (<25dB)', 'Multi-speed pattern drawing', 'USB-C power input', 'Matte black aluminum rim']
  },
  {
    id: 'TRNG-BSC-04',
    name: 'Tarang Kinetic Circle Table 22" (Basic)',
    category: 'Basic',
    image: '/products/image1.png',
    colorPatternImage: '/products/image23.jpg',
    price: '₹34,500',
    dimensions: '22" Diameter • Height 20" • Weight 13.5 kg',
    description: 'Medium-sized kinetic sand table featuring dual-concentric ring lighting and smooth steel sphere dynamics.',
    status: 'In Stock',
    features: ['Dual ring perimeter lighting', 'Fine quartz sand bed', 'Low power 12V adapter', 'Scratch-resistant glass']
  },
  {
    id: 'TRNG-BSC-05',
    name: 'Tarang Kinetic Hexagon Table (Basic)',
    category: 'Basic',
    image: '/products/image12.png',
    colorPatternImage: '/products/image23.jpg',
    price: '₹36,999',
    dimensions: '22" Hexagonal • Height 21" • Weight 14 kg',
    description: 'Geometric hexagon frame design creating complex tessellation and spiral sand sculptures in real time.',
    status: 'In Stock',
    features: ['Hexagonal geometric frame', 'Custom speed controller', 'Ultra-dense magnetic core', 'Walnut veneer trim']
  },
  {
    id: 'TRNG-BSC-06',
    name: 'Tarang Sand Sphere Coffee Table 24" (Basic)',
    category: 'Basic',
    image: '/products/image3.png',
    colorPatternImage: '/products/image23.jpg',
    price: '₹39,999',
    dimensions: '24" Diameter • Height 22" • Weight 16 kg',
    description: 'Functional coffee table height with active kinetic sand canvas under transparent safety glass.',
    status: 'In Stock',
    features: ['Functional coffee table height', 'Tempered top glass up to 50kg load', 'RGB light mode toggle', 'Solid timber legs']
  },
  {
    id: 'TRNG-BSC-07',
    name: 'Tarang Kinetic Square Art Unit 24" (Basic)',
    category: 'Basic',
    image: '/products/image7.png',
    colorPatternImage: '/products/image23.jpg',
    price: '₹42,000',
    dimensions: '24" x 24" Square • Height 20" • Weight 17.5 kg',
    description: 'Square form factor kinetic sand table ideal for modern architectural spaces and executive offices.',
    status: 'In Stock',
    features: ['Square geometric canvas', '80+ Downloadable patterns via Mobile App', 'Soft ambient LED strip', 'Anodized aluminum casing']
  },
  {
    id: 'TRNG-BSC-08',
    name: 'Tarang Kinetic Lounge Edition 26" (Basic)',
    category: 'Basic',
    image: '/products/image13.png',
    colorPatternImage: '/products/image23.jpg',
    price: '₹45,999',
    dimensions: '26" Diameter • Height 20" • Weight 19 kg',
    description: 'Spacious sand canvas table created for lounge areas, hotel lobbies, and premium executive suites.',
    status: 'In Stock',
    features: ['Wide 26" interactive surface', 'Automated pattern scheduling', 'High-torque precision motor', 'Dark walnut finish']
  },
  {
    id: 'TRNG-BSC-09',
    name: 'Tarang Studio Sand Art Table 28" (Basic)',
    category: 'Basic',
    image: '/products/image25.png',
    colorPatternImage: '/products/image23.jpg',
    price: '₹48,999',
    dimensions: '28" Diameter • Height 22" • Weight 21 kg',
    description: 'Large studio edition featuring wide-format sand drawing area and dynamic LED color shifting.',
    status: 'In Stock',
    features: ['Studio 28" canvas', 'Dynamic color cycling LEDs', 'Heavy-duty tempered glass', 'Wireless app control']
  },

  // --- PREMIUM COLLECTION (Sheet 2) ---
  {
    id: 'TRNG-PRM-01',
    name: 'Tarang Premium Sand Art Table 24" (RGB Smart LED)',
    category: 'Premium',
    image: '/products/image15.png',
    colorPatternImage: '/products/image23.jpg',
    price: '₹54,999',
    dimensions: '24" Diameter • Height 21" • Weight 18 kg',
    description: 'Premium kinetic art table equipped with full spectrum RGB IC lighting effects, custom track playlisting, and handcrafted teak finish.',
    status: 'In Stock',
    features: ['RGB IC Addressable Lighting (16M colors)', 'Multi-ball magnetic movement support', 'Hand-carved teak wood bezel', 'WiFi & Cloud Pattern Sync']
  },
  {
    id: 'TRNG-PRM-02',
    name: 'Tarang Premium Sand Art Table 28" (Teak Finish)',
    category: 'Premium',
    image: '/products/image8.png',
    colorPatternImage: '/products/image23.jpg',
    price: '₹62,500',
    dimensions: '28" Diameter • Height 22" • Weight 22 kg',
    description: 'Luxurious 28" teak sand art table designed for luxury residences and experience centers. Features smart home automation integration.',
    status: 'In Stock',
    features: ['Smart Home Integration (Alexa/Google Assistant)', 'Dual-layer sand pattern renderer', 'Premium Teak Wood frame', 'Ultra-clear low iron glass']
  },
  {
    id: 'TRNG-PRM-03',
    name: 'Tarang Premium Square Sand Table 30" (Rosewood)',
    category: 'Premium',
    image: '/products/image5.png',
    colorPatternImage: '/products/image23.jpg',
    price: '₹69,999',
    dimensions: '30" x 30" Square • Height 22" • Weight 25 kg',
    description: 'Architectural square sand table with rosewood inlay and continuous mesmerizing sand art generator.',
    status: 'In Stock',
    features: ['Rosewood hand-polished frame', 'High-density micro quartz sand', 'Infinite pattern loop modes', 'Touch key control panel']
  },
  {
    id: 'TRNG-PRM-04',
    name: 'Tarang Premium Sand Art Coffee Table 32"',
    category: 'Premium',
    image: '/products/image2.png',
    colorPatternImage: '/products/image23.jpg',
    price: '₹76,500',
    dimensions: '32" Diameter • Height 20" • Weight 28 kg',
    description: 'Centerpiece coffee table with oversized sand canvas and subtle under-table ambient illumination.',
    status: 'In Stock',
    features: ['Centerpiece 32" diameter', 'Heavy load toughened glass top', 'Custom SVG pattern importer', 'Dual silent stepper drive']
  },
  {
    id: 'TRNG-PRM-05',
    name: 'Tarang Premium Hexagon LED Sand Table 32"',
    category: 'Premium',
    image: '/products/image21.png',
    colorPatternImage: '/products/image23.jpg',
    price: '₹82,000',
    dimensions: '32" Hexagonal • Height 22" • Weight 30 kg',
    description: 'Hexagonal flagship table with multi-zone LED lighting synchronizing with pattern movements.',
    status: 'Experience Center Showcase',
    features: ['Multi-zone LED sync with ball motion', 'High-speed drawing mode', 'Solid hardwood construction', 'Dedicated iOS & Android App']
  },
  {
    id: 'TRNG-PRM-06',
    name: 'Tarang Premium Oval Sand Art Credenza 34"',
    category: 'Premium',
    image: '/products/image26.png',
    colorPatternImage: '/products/image23.jpg',
    price: '₹88,999',
    dimensions: '34" x 22" Oval • Height 24" • Weight 32 kg',
    description: 'Elongated oval sand art table crafted for corporate boardrooms and luxury villa foyers.',
    status: 'In Stock',
    features: ['Unique oval geometry', 'High-precision magnetic gantry', 'Premium brass inlay accents', 'Remote cloud control']
  },
  {
    id: 'TRNG-PRM-07',
    name: 'Tarang Premium Lounge Sand Table 36"',
    category: 'Premium',
    image: '/products/image18.png',
    colorPatternImage: '/products/image23.jpg',
    price: '₹95,000',
    dimensions: '36" Diameter • Height 22" • Weight 35 kg',
    description: '36" large format kinetic art piece creating intricate mathematical mandalas and labyrinth patterns.',
    status: 'Experience Center Showcase',
    features: ['36" Large format canvas', '150+ Pre-loaded mandala patterns', 'Reinforced frame structure', 'Integrated sound-to-sand motion']
  },
  {
    id: 'TRNG-PRM-08',
    name: 'Tarang Premium Executive Sand Table 36" (Walnut)',
    category: 'Premium',
    image: '/products/image17.png',
    colorPatternImage: '/products/image23.jpg',
    price: '₹99,999',
    dimensions: '36" Diameter • Height 22" • Weight 36 kg',
    description: 'Executive walnut finish kinetic table designed for high-end corporate suites and luxury lounges.',
    status: 'In Stock',
    features: ['Executive Walnut hardwood', 'Multi-ball concurrent drawing', 'Custom company logo sand renderer', '5-Year structural warranty']
  },

  // --- ULTRA-PREMIUM COLLECTION (Sheet 3) ---
  {
    id: 'TRNG-ULT-01',
    name: 'Tarang Ultra-Premium Sand Art Sculpture Table 36"',
    category: 'Ultra-Premium',
    image: '/products/image14.png',
    colorPatternImage: '/products/image23.jpg',
    price: '₹1,25,000',
    dimensions: '36" Diameter • Height 22" • Weight 40 kg',
    description: 'Ultra-premium kinetic sand table crafted with Italian marble trim, dual-ball magnetic drive, and custom RGB halo backlighting.',
    status: 'Made to Order',
    features: ['Italian Carrara Marble Trim', 'Dual-Ball Concurrent Drawing Engine', 'App-Controlled Custom Vector Renderer', 'Zero-Vibration Whisper Drive']
  },
  {
    id: 'TRNG-ULT-02',
    name: 'Tarang Ultra-Premium Grand Table 40" (Solid Mahogany)',
    category: 'Ultra-Premium',
    image: '/products/image22.png',
    colorPatternImage: '/products/image23.jpg',
    price: '₹1,45,000',
    dimensions: '40" Diameter • Height 24" • Weight 48 kg',
    description: 'Grand 40" statement piece designed for luxury hotel lobbies and presidential suites. Features hand-carved mahogany border.',
    status: 'Made to Order',
    features: ['Solid Mahogany Hardwood', '40" Super-wide canvas', 'Multi-color gradient LED lighting', 'Smart home API integration']
  },
  {
    id: 'TRNG-ULT-03',
    name: 'Tarang Ultra-Premium Square Centerpiece 42"',
    category: 'Ultra-Premium',
    image: '/products/image6.png',
    colorPatternImage: '/products/image23.jpg',
    price: '₹1,65,000',
    dimensions: '42" x 42" Square • Height 22" • Weight 55 kg',
    description: 'Architectural masterpiece square table with quad-zone lighting and high-speed sand tracing technology.',
    status: 'Made to Order',
    features: ['42" Monumental square top', 'Quad-Zone RGB IC LEDs', 'High-speed pattern rendering (2x normal speed)', 'Heavy 10mm tempered glass']
  },
  {
    id: 'TRNG-ULT-04',
    name: 'Tarang Ultra-Premium Kinetic Sand Bar Table 44"',
    category: 'Ultra-Premium',
    image: '/products/image9.png',
    colorPatternImage: '/products/image23.jpg',
    price: '₹1,85,000',
    dimensions: '44" Diameter • Height 38" (Bar Height) • Weight 60 kg',
    description: 'Bar height kinetic sand art table designed for high-end lounge bars, luxury clubs, and executive entertainment centers.',
    status: 'Experience Center Showcase',
    features: ['Bar Height Ergonomics (38")', 'Sound-Reactive Music Sand Mode', 'Spill-Proof Sealed Enclosure', 'Stainless Steel Base']
  },
  {
    id: 'TRNG-ULT-05',
    name: 'Tarang Ultra-Premium Brass-Inlaid Sand Table 48"',
    category: 'Ultra-Premium',
    image: '/products/image11.png',
    colorPatternImage: '/products/image23.jpg',
    price: '₹2,10,000',
    dimensions: '48" Diameter • Height 22" • Weight 68 kg',
    description: 'Handcrafted with solid brass geometric inlays and royal teak casing. Features 300+ algorithm library.',
    status: 'Made to Order',
    features: ['Solid Brass Inlays & Trim', '48" Extra-large sand field', '300+ Pattern algorithm library', 'Dual-ball simultaneous drawing']
  },
  {
    id: 'TRNG-ULT-06',
    name: 'Tarang Ultra-Premium Architectural Oval 50"',
    category: 'Ultra-Premium',
    image: '/products/image20.png',
    colorPatternImage: '/products/image23.jpg',
    price: '₹2,35,000',
    dimensions: '50" x 30" Oval • Height 24" • Weight 72 kg',
    description: '50" grand oval sand art dining/display table created for ultra-luxury estates and corporate headquarters.',
    status: 'Made to Order',
    features: ['50" Grand Oval format', 'Multi-axis CNC precision motion', 'Custom pattern cloud designer', 'Lifetime maintenance warranty']
  },
  {
    id: 'TRNG-ULT-07',
    name: 'Tarang Ultra-Premium Mirror Glass Table 52"',
    category: 'Ultra-Premium',
    image: '/products/image16.png',
    colorPatternImage: '/products/image23.jpg',
    price: '₹2,65,000',
    dimensions: '52" Diameter • Height 22" • Weight 80 kg',
    description: 'Infinity mirror sand art table creating infinite depth optical reflections alongside kinetic sand drawings.',
    status: 'Made to Order',
    features: ['Infinity Mirror optical glass', 'Programmable 3D LED effects', 'Triple magnetic ball dynamics', 'Custom smartphone app']
  },
  {
    id: 'TRNG-ULT-08',
    name: 'Tarang Ultra-Premium Flagship Sand Table 60"',
    category: 'Ultra-Premium',
    image: '/products/image10.png',
    colorPatternImage: '/products/image23.jpg',
    price: '₹2,99,999',
    dimensions: '60" Diameter • Height 22" • Weight 95 kg',
    description: 'The ultimate flagship 5-foot kinetic sand art table. Built with aerospace-grade precision mechanics and hand-finished exotic timber.',
    status: 'Made to Order',
    features: ['Flagship 5-Foot (60") Canvas', 'Aerospace-Grade Gantry System', 'Custom RGBW Ambient Lighting', 'Dedicated Concierge Setup']
  }
];
