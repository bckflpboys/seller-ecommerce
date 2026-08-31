import Head from 'next/head';

interface FAQItem {
  question: string;
  answer: string;
}

interface MetaSEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  keywords?: string[];
  faqs?: FAQItem[];
  serviceSchema?: {
    name: string;
    serviceType: string;
    description: string;
    providerName?: string;
    areaServed?: string[];
    priceStarting?: string;
  };
  productSchema?: {
    name: string;
    image: string;
    description: string;
    price: number;
    currency?: string;
    sku?: string;
    inStock?: boolean;
  };
}

export default function MetaSEO({
  title,
  description,
  canonicalUrl = 'https://www.moonsoft.life',
  ogImage = 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200',
  ogType = 'website',
  keywords = [],
  faqs = [],
  serviceSchema,
  productSchema
}: MetaSEOProps) {
  const defaultKeywords = [
    'Moon Soft',
    'Where quality meets care',
    'Cleaning Services Kimberley',
    'Commercial Cleaning Northern Cape',
    'Contract Cleaning Kimberley',
    'Deep Cleaning and Sanitisation Kimberley',
    'Post-Construction Cleaning Northern Cape',
    'Carpet and Upholstery Cleaning Kimberley',
    'Window Cleaning Kimberley',
    'Supply of Professional Cleaning Chemicals',
    'Toilet Paper Manufacturer Kimberley',
    'Bulk Toilet Paper Northern Cape',
    '1-ply and 2-ply toilet paper supplier',
    'SABS Approved Cleaning Chemicals',
    'Janitorial Services Kimberley',
    'Office Cleaning Services Kimberley',
    'Hospital and Clinic Sanitisation Northern Cape',
    'Best cleaning company Kimberley'
  ];

  const allKeywords = Array.from(new Set([...keywords, ...defaultKeywords])).join(', ');

  // Structured Data Schema: LocalBusiness / CleaningService
  const businessSchema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'CleaningService', 'Manufacturer'],
    '@id': 'https://www.moonsoft.life/#organization',
    'name': 'Moon Soft',
    'alternateName': 'Moon Soft Hygiene & Cleaning Solutions',
    'legalName': 'Moon Soft Pty Ltd',
    'slogan': 'Where quality meets care',
    'url': 'https://www.moonsoft.life',
    'logo': 'https://www.moonsoft.life/favi.png',
    'image': ogImage,
    'description': 'Moon Soft is the leading commercial cleaning service provider and certified toilet paper & chemical manufacturer in Kimberley and the Northern Cape. Providing contract cleaning, deep sanitisation, post-construction cleaning, carpet extraction, window detailing, and SABS chemicals.',
    'telephone': '+277888401',
    'email': 'sales@moonsoft.life',
    'priceRange': '$$',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': '4139 Sehurutsi Street',
      'addressLocality': 'Kimberley',
      'addressRegion': 'Northern Cape',
      'postalCode': '8301',
      'addressCountry': 'ZA'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': -28.74,
      'longitude': 24.75
    },
    'areaServed': [
      { '@type': 'AdministrativeArea', 'name': 'Kimberley' },
      { '@type': 'AdministrativeArea', 'name': 'Northern Cape' },
      { '@type': 'AdministrativeArea', 'name': 'Upington' },
      { '@type': 'AdministrativeArea', 'name': 'Kuruman' },
      { '@type': 'AdministrativeArea', 'name': 'De Aar' },
      { '@type': 'AdministrativeArea', 'name': 'Jan Kempdorp' },
      { '@type': 'Country', 'name': 'South Africa' }
    ],
    'openingHoursSpecification': [
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        'opens': '00:00',
        'closes': '23:59'
      }
    ],
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': 'Moon Soft Hygiene & Cleaning Services Portfolio',
      'itemListElement': [
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Contract Cleaning' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Deep Cleaning & Sanitisation' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Post-Construction Cleaning' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Carpet & Upholstery Cleaning' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Window Cleaning' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Supply of Professional Cleaning Chemicals' } },
        { '@type': 'Offer', 'itemOffered': { '@type': 'Product', 'name': 'Premium 1-Ply and 2-Ply Toilet Paper' } }
      ]
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.95',
      'reviewCount': '184',
      'bestRating': '5',
      'worstRating': '1'
    },
    'knowsAbout': [
      'Commercial Contract Cleaning',
      'Hospital-Grade Deep Sanitisation and Disinfection',
      'Post-Construction Handover Turnkey Cleaning',
      'Industrial Steam Carpet and Upholstery Extraction',
      'High-Reach Streak-Free Window Detailing',
      'SABS Approved Commercial Cleaning Chemical Formulation',
      'Eco-Friendly Virgin and Recycled Pulp Toilet Paper Manufacturing'
    ],
    'sameAs': [
      'https://www.facebook.com/moonsoftlife',
      'https://www.instagram.com/moonsoftlife',
      'https://www.linkedin.com/company/moonsoft'
    ]
  };

  // Structured Data Schema: FAQPage (Crucial for AI Answers & Google Rich Snippets)
  const faqSchema = faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  } : null;

  // Structured Data Schema: Specific Service
  const specificServiceSchema = serviceSchema ? {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': serviceSchema.name,
    'serviceType': serviceSchema.serviceType,
    'description': serviceSchema.description,
    'provider': {
      '@type': 'CleaningService',
      'name': 'Moon Soft',
      'telephone': '+277888401',
      'url': 'https://www.moonsoft.life'
    },
    'areaServed': serviceSchema.areaServed || ['Kimberley', 'Northern Cape', 'South Africa'],
    'offers': {
      '@type': 'Offer',
      'priceCurrency': 'ZAR',
      'price': serviceSchema.priceStarting || 'Custom Quote'
    }
  } : null;

  // Structured Data Schema: Product
  const specificProductSchema = productSchema ? {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': productSchema.name,
    'image': productSchema.image,
    'description': productSchema.description,
    'sku': productSchema.sku || 'MOONSOFT-PROD',
    'brand': {
      '@type': 'Brand',
      'name': 'Moon Soft'
    },
    'offers': {
      '@type': 'Offer',
      'url': canonicalUrl,
      'priceCurrency': productSchema.currency || 'ZAR',
      'price': productSchema.price,
      'availability': productSchema.inStock !== false ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      'seller': {
        '@type': 'Organization',
        'name': 'Moon Soft'
      }
    }
  } : null;

  return (
    <Head>
      {/* Essential Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords} />
      <meta name="author" content="Moon Soft Pty Ltd - Kimberley, Northern Cape" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Geo Location Tags (Local SEO & GEO for Kimberley / Northern Cape) */}
      <meta name="geo.region" content="ZA-NC" />
      <meta name="geo.placename" content="Kimberley, Northern Cape, South Africa" />
      <meta name="geo.position" content="-28.74;24.75" />
      <meta name="ICBM" content="-28.74, 24.75" />

      {/* AI & Search Engine Optimization Tags */}
      <meta name="rating" content="General" />
      <meta name="distribution" content="Global" />
      <meta name="revisit-after" content="2 days" />
      <meta name="coverage" content="Northern Cape, South Africa" />
      <meta name="target" content="all" />
      <meta name="audience" content="all" />

      {/* Open Graph / Facebook / WhatsApp */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="Moon Soft" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content="Moon Soft - Where quality meets care" />
      <meta property="og:locale" content="en_ZA" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content="Moon Soft Kimberley" />

      {/* JSON-LD Structured Data for Search & Answer Engines (AEO & GEO) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />

      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {specificServiceSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(specificServiceSchema) }}
        />
      )}

      {specificProductSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(specificProductSchema) }}
        />
      )}
    </Head>
  );
}
