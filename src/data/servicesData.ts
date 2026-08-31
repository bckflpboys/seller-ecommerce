export interface ServiceItem {
  id: string;
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  imageUrl: string;
  secondaryImageUrl: string;
  idealFor: string[];
  scopeChecklist: string[];
  processSteps: { step: string; title: string; desc: string }[];
  keyBenefits: string[];
  scheduleOptions: string[];
  equipmentAndChemicals: string[];
  faqs: { question: string; answer: string }[];
  estimatedTime: string;
  pricingStartingAt: string;
  featuredBadge?: string;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'srv-01',
    slug: 'contract-cleaning',
    number: '01',
    title: 'Contract Cleaning',
    subtitle: 'Scheduled Routine Maintenance for Workplaces & Institutions',
    tagline: 'Reliable, daily or weekly contract cleaning tailored to business continuity.',
    shortDescription: 'Regular professional cleaning services for corporate offices, schools, healthcare centers, and commercial properties across Kimberley and the Northern Cape.',
    fullDescription: 'Moon Soft delivers dependable contract cleaning agreements structured around your facility\'s operational rhythms. From high-traffic corporate headquarters to educational institutions and clinics, our vetted teams ensure immaculate hygiene standards, daily sanitisation, and transparent oversight with dedicated supervisors.',
    iconName: 'Building2',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200',
    secondaryImageUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800',
    featuredBadge: 'Most Popular for Businesses',
    idealFor: [
      'Corporate Headquarters & Office Parks',
      'Primary, High Schools & Tertiary Campuses',
      'Private Clinics, Surgeries & Healthcare Facilities',
      'Retail Outlets, Dealerships & Commercial Showrooms',
      'Government & Municipal Department Buildings'
    ],
    scopeChecklist: [
      'Daily dusting, surface sanitisation & high-touch point disinfection',
      'Restroom deep hygiene maintenance, stocking & deodorisation',
      'Floor sweeping, damp mopping, buffing & carpet vacuuming',
      'Kitchenette, cafeteria & breakroom hygiene sanitisation',
      'Waste bin clearance, recycling sorting & liner replacement',
      'Entryway, reception & boardroom pristine presentation'
    ],
    processSteps: [
      {
        step: '01',
        title: 'Site Survey & Scope Analysis',
        desc: 'Audit of property layout, traffic patterns, and hygiene sensitivities.'
      },
      {
        step: '02',
        title: 'Custom SLA & Schedule',
        desc: 'Transparent pricing with tailored shift rotas (morning, evening, weekend).'
      },
      {
        step: '03',
        title: 'Dedicated Team & Supervisor',
        desc: 'Trained, vetted cleaning personnel deployed with Moon Soft certified eco-chemicals.'
      },
      {
        step: '04',
        title: 'Quality Audits & Sign-Off',
        desc: 'Continuous supervisor checklists and regular client satisfaction scorecards.'
      }
    ],
    keyBenefits: [
      'Consistent, pristine workplace hygiene boosting staff morale and client trust',
      'Flexible contracts with zero hidden fees and transparent invoicing',
      'Dedicated on-site supervisors and replacement guarantees for staff absenteeism',
      '100% compliant with Northern Cape health and safety regulations'
    ],
    scheduleOptions: ['Daily (Morning/Evening)', 'Bi-Weekly', 'Weekly', 'Custom Shift Rotas'],
    equipmentAndChemicals: [
      'HEPA-filter commercial vacuum systems',
      'Moon Soft Bio-Active hospital-grade disinfectants',
      'Color-coded cross-contamination prevention microfiber systems',
      'High-speed floor burnishers and scrubbers'
    ],
    faqs: [
      {
        question: 'How flexible are your cleaning schedules?',
        answer: 'We operate 7 days a week, offering pre-opening, daytime porter, after-hours, and weekend cleaning rotas to avoid disrupting your core operations.'
      },
      {
        question: 'Are your cleaners vetted and insured?',
        answer: 'Yes, every Moon Soft cleaning operative is background-checked, thoroughly trained in chemical safety and modern hygiene protocols, and fully insured.'
      },
      {
        question: 'Do you supply the cleaning chemicals and consumables?',
        answer: 'Yes! We supply Moon Soft certified chemicals, heavy-duty equipment, and can also manage toilet paper, soap, and sanitizer replenishment.'
      }
    ],
    estimatedTime: 'Custom recurring schedule',
    pricingStartingAt: 'Custom Quote / Tailored Monthly Retainer'
  },
  {
    id: 'srv-02',
    slug: 'deep-cleaning-sanitisation',
    number: '02',
    title: 'Deep Cleaning & Sanitisation',
    subtitle: 'Comprehensive Intensive Hygiene & Disinfection Protocols',
    tagline: 'Intensive decontamination targeting deep-seated dirt, microbes, and allergens.',
    shortDescription: 'Intensive deep-level cleaning and hospital-grade sanitisation for workspaces, clinics, hospitality venues, and residential homes requiring restorative hygiene.',
    fullDescription: 'Standard cleaning handles surface maintenance; Moon Soft Deep Cleaning reaches the foundational layer. We disinfect vents, dismantle grime in hidden crevices, steam-sanitize wet areas, and eliminate microbial pathogens with hospital-grade sanitisation agents.',
    iconName: 'Sparkles',
    imageUrl: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&q=80&w=1200',
    secondaryImageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
    featuredBadge: 'High-Impact Hygiene',
    idealFor: [
      'Medical practices, dental suites & diagnostic laboratories',
      'Commercial food prep kitchens, restaurants & food courts',
      'Offices undergoing seasonal wellness or post-illness sanitisation',
      'Residential moves (move-in / move-out hygiene reset)',
      'Childcare centers, nursery schools & retirement facilities'
    ],
    scopeChecklist: [
      'High-pressure steam cleaning of tile grout, basins & sanitaryware',
      'Complete degreasing of kitchen extractors, splashbacks & appliances',
      'Under-furniture and behind-fixture intensive decontamination',
      'Wall washing, light switch and door frame microbial sanitisation',
      'Air vent grilles, ceiling fans & duct perimeter micro-cleaning',
      'Full facility chemical misting and antimicrobial surface coating'
    ],
    processSteps: [
      {
        step: '01',
        title: 'Bio-Load & Area Assessment',
        desc: 'Identify critical high-risk zones, grease build-up points, and priority areas.'
      },
      {
        step: '02',
        title: 'Intensive Stripping & Degreasing',
        desc: 'Application of deep-penetration agents to dissolve grime and lime scale.'
      },
      {
        step: '03',
        title: 'Thermal Steam & Disinfection',
        desc: 'High-temperature steam sanitisation killing 99.9% of bacteria and viruses.'
      },
      {
        step: '04',
        title: 'Final Hygiene Validation',
        desc: 'Comprehensive inspection checklist ensuring sterile handover.'
      }
    ],
    keyBenefits: [
      'Eliminates 99.9% of bacteria, viruses, allergens, and persistent odors',
      'Restores fixtures, tiles, and fittings to near-new condition',
      'Guarantees compliance with food safety and medical hygiene guidelines',
      'Creates a clean, refreshed atmosphere that visitors immediately notice'
    ],
    scheduleOptions: ['One-Off Service', 'Quarterly Hygiene Refresh', 'Bi-Annual Contract'],
    equipmentAndChemicals: [
      'Commercial 180°C steam extraction units',
      'Moon Soft Broad-Spectrum Virucidal & Antibacterial Disinfectants',
      'Heavy-duty non-abrasive mineral scale and grease emulsifiers',
      'ULV cold fogging sanitisation mist generators'
    ],
    faqs: [
      {
        question: 'How long does a deep cleaning session take?',
        answer: 'Depending on the property square footage and condition, a commercial or residential deep clean typically takes between 4 to 8 hours with an assigned specialist team.'
      },
      {
        question: 'Is your sanitisation chemical safe for food preparation zones?',
        answer: 'Yes, we use food-safe, SABS-certified disinfectants that leave no toxic residues once cured and wiped down.'
      }
    ],
    estimatedTime: '4 - 8 Hours (Session based)',
    pricingStartingAt: 'Based on Area (m²) & Scope'
  },
  {
    id: 'srv-03',
    slug: 'post-construction-cleaning',
    number: '03',
    title: 'Post-Construction Cleaning',
    subtitle: 'Precision Builders Clean & Move-In Handover Ready',
    tagline: 'Transforming dusty construction sites into gleaming, occupied-ready properties.',
    shortDescription: 'Specialized builders cleaning removing fine drywall dust, paint splatters, silicones, adhesive labels, and construction debris for new builds and renovations.',
    fullDescription: 'Construction and refurbishment leave behind pervasive micro-dust, cement residue, mortar flecks, and paint overspray. Moon Soft\'s post-construction cleaning team uses multi-phase dust extraction, glass detailing, and surface polishing to ensure properties are 100% turnkey ready for owner inspection and handover.',
    iconName: 'Home',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
    secondaryImageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800',
    featuredBadge: 'Turnkey Handover Specialists',
    idealFor: [
      'Property Developers & General Building Contractors',
      'Architects, Project Managers & Interior Designers',
      'Commercial Retail Fit-Outs & Shopping Mall Tenants',
      'Newly Built Luxury Residential Homes & Estate Properties',
      'Corporate Office Renovations & Expansions'
    ],
    scopeChecklist: [
      'Industrial vacuuming of all surfaces, ceilings, wall recesses & cabinets',
      'Removal of protective films, manufacturer stickers & silicone residue',
      'Paint overspray, grout haze & cement slurry elimination from glass & tile',
      'High-detail polishing of fixtures, stainless steel, glass balustrades & joinery',
      'Window frame, track, sliding runner & sill precision vacuuming & cleaning',
      'Flooring deep scrub, sealant polish & ready-for-furnishing handover'
    ],
    processSteps: [
      {
        step: '01',
        title: 'Phase 1: Rough Builders Clean',
        desc: 'Clearing bulky debris, initial high-volume fine dust extraction, and sticker removal.'
      },
      {
        step: '02',
        title: 'Phase 2: Detailed Technical Clean',
        desc: 'Scrubbing tiles, removing mortar haze, cleaning fixtures, vents, sockets, and interior joinery.'
      },
      {
        step: '03',
        title: 'Phase 3: Handover Sparkle Polish',
        desc: 'Final glass polishing, buffing floors, wiping door edges, and micro-dust elimination.'
      },
      {
        step: '04',
        title: 'Joint Sign-off Inspection',
        desc: 'Walkthrough with site manager or property owner for 100% completion verification.'
      }
    ],
    keyBenefits: [
      'Accelerates tenant move-in and handover timelines without snagging delays',
      'Safeguards delicate new surfaces against accidental scratches or chemical etching',
      'Heavy-duty industrial equipment capable of filtering hazardous silica and drywall dust',
      'Experienced teams equipped with full PPE and construction safety protocols'
    ],
    scheduleOptions: ['Phased Build Handover', 'One-Day Sparkle Clean', 'Emergency Fast-Track Clean'],
    equipmentAndChemicals: [
      'Class-M Industrial particulate extractors',
      'Non-abrasive cement & grout film dissolvers',
      'Safety glass razor scrapers & solvent adhesive removers',
      'Rotary floor scrubbing machines and dry-polishers'
    ],
    faqs: [
      {
        question: 'When should we book the post-construction clean?',
        answer: 'We recommend booking 3 to 5 days before your scheduled handover inspection, ideally once all contractor trades (plumbing, electrical, painting) have finished their work.'
      },
      {
        question: 'Can you handle large multi-story commercial developments in Kimberley?',
        answer: 'Absolutely. We have the team size, industrial machinery, and logistical capacity to service both residential builds and large commercial multi-level developments.'
      }
    ],
    estimatedTime: '1 - 3 Days depending on build size',
    pricingStartingAt: 'Priced per m² or Project Scope'
  },
  {
    id: 'srv-04',
    slug: 'carpet-upholstery-cleaning',
    number: '04',
    title: 'Carpet & Upholstery Cleaning',
    subtitle: 'Deep Steam Hydro-Extraction & Fabric Revitalization',
    tagline: 'Restoring texture, banishing stains, and rejuvenating fibers with eco-safe care.',
    shortDescription: 'Advanced hot-water extraction and delicate upholstery detailing that lifts trapped dirt, tough stains, allergens, and odors from carpets, sofas, and office seating.',
    fullDescription: 'Carpets and fabric furnishings trap millions of dust mites, bacteria, and allergens that regular vacuuming cannot dislodge. Moon Soft\'s thermal hydro-extraction injects pressurized heated solutions deep into fibers, breaking down stubborn stains and extracting moisture rapidly for swift drying.',
    iconName: 'Shirt',
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1200',
    secondaryImageUrl: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&q=80&w=800',
    featuredBadge: 'Fiber Restoration',
    idealFor: [
      'Executive Boardroom & High-Traffic Office Carpets',
      'Hotels, Lodges, Guest Houses & Conference Centers',
      'Residential Sofas, Dining Chairs, Mattresses & Rugs',
      'Vehicle Fleets, Tour Buses & Corporate Shuttles',
      'Cinema Theaters, Auditoriums & Waiting Room Seating'
    ],
    scopeChecklist: [
      'Fiber inspection, colorfastness testing & pre-vacuuming',
      'Targeted pre-treatment of coffee, grease, ink & organic stains',
      'High-pressure hot-water thermal extraction (steam clean)',
      'Odor neutralizing enzyme application and anti-microbial treatment',
      'Fabric conditioning and fiber pile realignment brushing',
      'Optional Scotchgard-style stain barrier protective coating'
    ],
    processSteps: [
      {
        step: '01',
        title: 'Inspection & Stain Mapping',
        desc: 'Testing fabric weave and selecting pH-balanced solutions tailored to fibers.'
      },
      {
        step: '02',
        title: 'Deep Pre-Conditioning',
        desc: 'Lifting bonded oils and ground-in soil from high-traffic pathways.'
      },
      {
        step: '03',
        title: 'Dual-Vacuum Thermal Extraction',
        desc: 'Deep hydro-washing removing grime while extracting 90%+ moisture for rapid drying.'
      },
      {
        step: '04',
        title: 'Grooming & Deodorisation',
        desc: 'Refreshing scents and brush-aligning carpet pile for a plush look.'
      }
    ],
    keyBenefits: [
      'Extends the lifespan of expensive carpets and office furnishings by years',
      'Rapid dry times (2-4 hours) allowing same-day room re-entry',
      'Removes deep allergens and dust mites for healthier indoor air quality',
      'Safe for pets, children, and sensitive fabrics'
    ],
    scheduleOptions: ['On-Demand Service', 'Quarterly Commercial Maintenance', 'Annual Reset'],
    equipmentAndChemicals: [
      'High-PSI hot water extraction machines with dual vacuum motors',
      'Moon Soft enzyme-based stain and protein dissolvers',
      'High-velocity air blowers for accelerated drying',
      'Delicate upholstery hand tools and velvet/chenille brushes'
    ],
    faqs: [
      {
        question: 'How long until the carpets and couches are dry?',
        answer: 'Thanks to our powerful dual-vacuum extraction, carpets and fabric chairs are typically dry within 2 to 4 hours, depending on room ventilation.'
      },
      {
        question: 'Can you remove old, dried coffee or ink stains?',
        answer: 'We use specialized professional spotting agents for stubborn stains with a 95%+ success rate in lifting set-in stains.'
      }
    ],
    estimatedTime: '1 - 3 Hours per room/suite',
    pricingStartingAt: 'Priced per Room or Furniture Piece'
  },
  {
    id: 'srv-05',
    slug: 'window-cleaning',
    number: '05',
    title: 'Window Cleaning',
    subtitle: 'Streak-Free Precision Glass & Multi-Story Reach',
    tagline: 'Flawless optical clarity that maximizes natural light and architectural beauty.',
    shortDescription: 'Professional interior and exterior window cleaning for commercial buildings, shopfronts, and luxury homes using purified water technology and streak-free squeegee craftsmanship.',
    fullDescription: 'Clean windows transform the appearance of any property. Moon Soft provides pristine window detailing for multi-level commercial properties, retail display glass, residential picture windows, frames, tracks, and flyscreens. We eliminate hard water mineral spots, dust haze, and finger marks.',
    iconName: 'SprayCan',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200',
    secondaryImageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800',
    featuredBadge: 'Crystal-Clear Views',
    idealFor: [
      'Retail Shopfronts & Shopping Mall Showrooms',
      'Multi-Level Corporate Office Buildings & Facades',
      'Residential Homes, Sunrooms & Sliding Glass Doors',
      'Hotels, Safari Lodges & Bed & Breakfasts',
      'Solar Panel Arrays & Glass Skylights'
    ],
    scopeChecklist: [
      'Interior and exterior window glass streak-free cleaning',
      'Window frame, sill, rubber seal & track vacuuming and wiping',
      'Removal of bird droppings, insect marks, tape & hard-water stains',
      'High-reach water-fed pole cleaning for multi-story buildings',
      'Flyscreen removal, washing, mesh dusting & re-installation',
      'Skylight, glass balustrade & mirror polishing'
    ],
    processSteps: [
      {
        step: '01',
        title: 'Safety Check & Access Setup',
        desc: 'Positioning safety harnesses, ladders, and pure water filtration systems.'
      },
      {
        step: '02',
        title: 'Frame & Sill Preparation',
        desc: 'Brushing and wiping away dust and debris before glass cleaning to avoid runoff.'
      },
      {
        step: '03',
        title: 'Purified Water & Squeegee Detail',
        desc: 'Spot-free deionized water wash and precision rubber squeegee strokes.'
      },
      {
        step: '04',
        title: 'Microfiber Edge Buffing',
        desc: 'Drying all corner droplets and verifying flawless transparency.'
      }
    ],
    keyBenefits: [
      'Maximizes natural daylight and drastically improves property curb appeal',
      'Prevents permanent hard-water etching and acid rain glass damage',
      'Safe high-reach systems with full working-at-heights safety compliance',
      'Cost-effective regular maintenance plans for commercial shopfronts'
    ],
    scheduleOptions: ['Weekly Shopfront', 'Monthly Commercial', 'Quarterly Residential'],
    equipmentAndChemicals: [
      'Multi-stage Deionised Pure Water Filtration Poles (up to 4 storeys)',
      'Professional brass squeegees with surgical-grade natural rubber blades',
      'Moon Soft Anti-Static Glass Sheen formulas (repels dust)',
      'Microfiber glass detailing cloths'
    ],
    faqs: [
      {
        question: 'Can you clean windows on upper floors?',
        answer: 'Yes! We use telescopic purified-water carbon fiber poles capable of safely cleaning up to 4 stories from the ground without costly scaffolding.'
      },
      {
        question: 'Will rain immediately ruin freshly cleaned windows?',
        answer: 'Clean rain does not dirty windows—dirt already on the glass does. Because our purified water leaves zero soap residue, raindrops bead and roll off cleanly without leaving spots.'
      }
    ],
    estimatedTime: '1 - 4 Hours depending on glass area',
    pricingStartingAt: 'Priced per Pane or Building Facade'
  },
  {
    id: 'srv-06',
    slug: 'professional-cleaning-chemicals',
    number: '06',
    title: 'Supply of Professional Cleaning Chemicals',
    subtitle: 'Moon Soft Certified High-Performance Cleaning Supplies & Consumables',
    tagline: 'Industrial-grade potency, eco-conscious formulations, and bulk reliability.',
    shortDescription: 'Direct distribution and supply of Moon Soft certified professional detergents, sanitizers, degreasers, floor polishes, and bulk paper consumables for businesses and facilities.',
    fullDescription: 'Moon Soft formulates and supplies high-grade commercial cleaning chemicals engineered for maximum efficacy and safety. Whether you require concentrated multi-surface cleaners, virucidal disinfectants, heavy degreasers, or bulk toilet paper and hand towels, we ensure consistent supply and competitive direct-from-manufacturer pricing.',
    iconName: 'Droplets',
    imageUrl: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?auto=format&fit=crop&q=80&w=1200',
    secondaryImageUrl: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&q=80&w=800',
    featuredBadge: 'Direct Factory Supply',
    idealFor: [
      'Janitorial Contractors & In-House Facility Teams',
      'Hospitals, Clinics & Retirement Villages',
      'Hotels, Lodges, Spas & Restaurants',
      'Schools, Colleges & Municipal Facilities',
      'Warehouses, Factories & Auto Workshops'
    ],
    scopeChecklist: [
      'Bulk 5L, 25L and 200L chemical drum supply',
      'Safety Data Sheets (SDS) and dilution charts provided',
      'Eco-friendly biodegradable formulas with low VOC emissions',
      'Disinfectants, pine gels, bleach, heavy degreasers & floor polishes',
      'High-grade Moon Soft toilet paper, hand towels & dispenser refills',
      'Automated monthly replenishment schedules for seamless supply'
    ],
    processSteps: [
      {
        step: '01',
        title: 'Needs Assessment & Audit',
        desc: 'Reviewing your facility\'s chemical usage, dispensers, and compliance needs.'
      },
      {
        step: '02',
        title: 'Custom Product Selection',
        desc: 'Recommending high-yield concentrates that dramatically reduce cost-per-use.'
      },
      {
        step: '03',
        title: 'Prompt Regional Delivery',
        desc: 'Reliable distribution across Kimberley and Northern Cape directly to your doorstep.'
      },
      {
        step: '04',
        title: 'Safety Training & Support',
        desc: 'Free staff guidance on safe dilution ratios, color coding, and SDS protocols.'
      }
    ],
    keyBenefits: [
      'Super-concentrated formulas reducing plastic waste and saving up to 40% on operating costs',
      'SABS-tested, hospital-safe, and environmentally responsible ingredients',
      'Bundle discounts when combined with Moon Soft paper and contract services',
      'Guaranteed stock availability and Northern Cape priority delivery'
    ],
    scheduleOptions: ['One-Off Bulk Order', 'Monthly Auto-Restock', 'Custom Consumable Contract'],
    equipmentAndChemicals: [
      'Moon Soft All-Purpose Citrus Concentrates',
      'Moon Soft Bio-Sanitizer QAC Hospital-Grade Disinfectant',
      'Moon Soft Heavy-Duty Industrial Alkaline Degreaser',
      'Moon Soft High-Gloss Polymer Floor Sealers & Strippers'
    ],
    faqs: [
      {
        question: 'Do you provide Safety Data Sheets (SDS) for health compliance?',
        answer: 'Yes, full SDS documentation and workplace safety wall charts are supplied with every order to keep your business 100% compliant with OHSA guidelines.'
      },
      {
        question: 'Can we order combined chemical and toilet paper deliveries?',
        answer: 'Yes! Bundling our Moon Soft paper products with cleaning chemicals unlocks free regional delivery and tiered wholesale volume discounts.'
      }
    ],
    estimatedTime: 'Fast Regional Delivery (24-48 Hours)',
    pricingStartingAt: 'Wholesale & Tiered Bulk Rates'
  }
];

export const TARGET_MARKETS = [
  {
    title: 'Corporate Offices & Workspaces',
    sector: 'Corporate',
    tag: 'Boardrooms & Parks',
    imageUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800',
    description: 'Pristine workspaces that elevate brand image, staff productivity, and daily sanitisation hygiene.',
    keyNeed: 'Daily after-hours cleaning, boardroom detailing, hygiene consumables',
    iconName: 'Building2'
  },
  {
    title: 'Healthcare Facilities & Clinics',
    sector: 'Healthcare',
    tag: 'Medical & Dental',
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
    description: 'Hospital-grade surface sanitisation, cross-contamination prevention, and sterile bio-safety compliance.',
    keyNeed: 'SABS disinfectants, color-coded protocol, emergency deep cleans',
    iconName: 'Sparkles'
  },
  {
    title: 'Schools & Educational Campuses',
    sector: 'Education',
    tag: 'Schools & Colleges',
    imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=800',
    description: 'Healthy, germ-reduced environments for classrooms, cafeterias, sports facilities, and dormitories.',
    keyNeed: 'Scheduled holiday deep cleans, daily germ defense, bulk chemical supply',
    iconName: 'PackageCheck'
  },
  {
    title: 'Retail Outlets & Showrooms',
    sector: 'Retail',
    tag: 'Malls & Dealerships',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800',
    description: 'High-gloss floors, spotless storefront windows, and sanitized customer-facing facilities.',
    keyNeed: 'Floor buffing, shopfront glass clarity, restroom management',
    iconName: 'Droplets'
  },
  {
    title: 'Hospitality & Guest Lodges',
    sector: 'Hospitality',
    tag: 'Hotels & Safaris',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800',
    description: 'Immaculate guest rooms, pristine upholstery, and sparkling public dining areas.',
    keyNeed: 'Carpet extraction, linen hygiene, kitchen degreasing, paper supplies',
    iconName: 'Home'
  },
  {
    title: 'Residential & Luxury Estates',
    sector: 'Residential',
    tag: 'Private Residences',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800',
    description: 'Discreet, high-touch residential deep cleaning, moving cleans, and carpet rejuvenation.',
    keyNeed: 'Move-in/out deep cleans, upholstery steam wash, window polish',
    iconName: 'Shirt'
  }
];

export const COMPETITIVE_ADVANTAGES = [
  {
    number: '01',
    title: 'Northern Cape & Kimberley Market Expertise',
    desc: 'Deep local roots, regional knowledge, and rapid response times with zero remote delays.'
  },
  {
    number: '02',
    title: 'Competitive, Transparent Pricing',
    desc: 'Clear itemized quotations with zero hidden surcharges and transparent scope commitments.'
  },
  {
    number: '03',
    title: 'Flexible Service Agreements',
    desc: 'Tailored contracts designed around your operational hours, seasonal demands, and budget.'
  },
  {
    number: '04',
    title: 'Proprietary Moon Soft Certified Products',
    desc: 'Using our own high-efficacy, eco-friendly chemicals and premium paper supplies.'
  },
  {
    number: '05',
    title: 'Vetted, Trained & Insured Specialists',
    desc: 'Every cleaning professional is thoroughly background checked, safety-certified, and supervised.'
  },
  {
    number: '06',
    title: 'Custom Sector-Specific Protocols',
    desc: 'Specialized cleaning methodologies tuned specifically for healthcare, corporate, or industrial sites.'
  }
];
