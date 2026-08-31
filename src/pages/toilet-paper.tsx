import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { Building2, Sparkles, Home as HomeIcon, Shirt, SprayCan, Droplets, ShieldCheck, HeartHandshake, Truck, Award, ArrowRight } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import ProductCardSkeleton from '@/components/ProductCardSkeleton';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import { useState, useEffect } from 'react';

interface ProductType {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  isInStock: boolean;
}

interface ToiletPaperProps {
  products: ProductType[];
}

export default function ToiletPaperPage({ products: initialProducts }: ToiletPaperProps) {
  const [products, setProducts] = useState(initialProducts);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setProducts(initialProducts);
    setIsLoading(false);
  }, [initialProducts]);

  const renderSkeletons = () => {
    return Array(4).fill(null).map((_, index) => (
      <ProductCardSkeleton key={index} />
    ));
  };

  return (
    <>
      <Head>
        <title>Premium Toilet Paper & Tissue Products | Moon Soft</title>
        <meta 
          name="description" 
          content="Experience the ultimate in softness and comfort with Moon Soft premium 1-ply and 2-ply toilet paper. Gentle on your skin, strong when you need it." 
        />
      </Head>

      <main className="min-h-screen bg-white font-sans text-navy-950">
        
        {/* Original Hero Video Section with elevated Swiss typography */}
        <section className="relative h-[620px] flex items-center justify-center overflow-hidden border-b border-navy-900">
          <div className="absolute inset-0 z-0">
            <video
              src="/clousoft-banner-video.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-950/80 via-navy-900/60 to-navy-950/70 backdrop-blur-[2px]" />
          </div>

          <div className="container mx-auto max-w-5xl px-4 relative z-10 text-center">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 mb-6 rounded-full bg-white/15 backdrop-blur-md text-cyanAccent text-xs font-mono font-bold tracking-wider uppercase border border-white/20">
              <span className="w-2 h-2 rounded-full bg-cyanAccent animate-pulse mr-1" />
              <span>Premium Paper Products Division</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold mb-6 text-white leading-tight tracking-tight drop-shadow-lg">
              Welcome to Moon Soft
            </h1>

            <p className="text-base sm:text-xl md:text-2xl mb-8 text-slate-200 font-light max-w-2xl mx-auto leading-relaxed">
              Experience the ultimate in softness and comfort with our premium toilet paper — gentle on your skin, strong when you need it.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-glow-blue text-sm uppercase tracking-wider"
              >
                Shop Toilet Paper
              </Link>
              <Link
                href="/services"
                className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/30 px-8 py-4 rounded-xl font-semibold transition text-sm flex items-center justify-center space-x-2"
              >
                <span>Explore Cleaning Services</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Paper Features Bar */}
        <section className="bg-navy-950 text-white py-8 border-b border-navy-900">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="flex flex-col items-center">
                <ShieldCheck className="w-7 h-7 text-cyanAccent mb-2" />
                <h4 className="font-bold text-sm">100% Virgin &amp; Recycled Pulp</h4>
                <p className="text-xs text-slate-400 mt-0.5">Sustainably &amp; ethically crafted</p>
              </div>
              <div className="flex flex-col items-center">
                <Award className="w-7 h-7 text-cyanAccent mb-2" />
                <h4 className="font-bold text-sm">Ultra-Absorbent 2-Ply</h4>
                <p className="text-xs text-slate-400 mt-0.5">Maximum softness &amp; durability</p>
              </div>
              <div className="flex flex-col items-center">
                <HeartHandshake className="w-7 h-7 text-cyanAccent mb-2" />
                <h4 className="font-bold text-sm">Dermatologically Gentle</h4>
                <p className="text-xs text-slate-400 mt-0.5">Hypoallergenic everyday luxury</p>
              </div>
              <div className="flex flex-col items-center">
                <Truck className="w-7 h-7 text-cyanAccent mb-2" />
                <h4 className="font-bold text-sm">Northern Cape Delivery</h4>
                <p className="text-xs text-slate-400 mt-0.5">Prompt wholesale &amp; bulk supply</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-20 px-4 bg-slate-50 relative">
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <span className="text-xs uppercase tracking-widest text-blue-600 font-bold bg-blue-100 px-3 py-1 rounded-full inline-block mb-3">
                  01 // FACTORY SELECTION
                </span>
                <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-950">
                  Featured Paper Products
                </h2>
                <p className="text-slate-600 text-sm sm:text-base mt-1">
                  Discover our signature rolls, packs, and commercial bulk supplies.
                </p>
              </div>

              <div className="mt-4 md:mt-0">
                <Link
                  href="/products"
                  className="inline-block bg-navy-950 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-bold transition text-xs uppercase tracking-wider"
                >
                  View Full Catalogue →
                </Link>
              </div>
            </div>

            <div className={`grid grid-cols-1 gap-6 ${
              !isLoading && products.length === 1 
                ? 'md:grid-cols-1 md:max-w-md mx-auto' 
                : !isLoading && products.length === 2 
                  ? 'md:grid-cols-2 md:max-w-3xl mx-auto'
                  : !isLoading && products.length === 3 
                    ? 'md:grid-cols-3 md:max-w-5xl mx-auto'
                    : 'md:grid-cols-2 lg:grid-cols-4'
            }`}>
              {isLoading ? (
                renderSkeletons()
              ) : products.length > 0 ? (
                products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))
              ) : (
                <div className="col-span-full text-center text-slate-700 font-medium py-12 bg-white rounded-2xl border border-slate-200">
                  No products currently displayed. Browse our store catalogue below.
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Cleaning Services Connection */}
        <section className="py-24 px-4 bg-white border-t border-slate-200">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs uppercase tracking-widest text-blue-600 font-bold bg-blue-50 px-3.5 py-1 rounded-full inline-block mb-3">
                02 // FULL-SPECTRUM PARTNER
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-navy-950">
                Professional Cleaning Services
              </h2>
              <p className="text-slate-600 text-base sm:text-lg mt-3">
                Beyond quality paper products, Moon Soft provides complete cleaning solutions for businesses and homes across Kimberley and the Northern Cape.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {[
                {
                  title: 'Contract Cleaning',
                  description: 'Regular professional cleaning services for offices, schools, and healthcare facilities',
                  icon: Building2,
                  href: '/services/contract-cleaning'
                },
                {
                  title: 'Deep Cleaning & Sanitisation',
                  description: 'Thorough cleaning and sanitisation services for complete hygiene',
                  icon: Sparkles,
                  href: '/services/deep-cleaning-sanitisation'
                },
                {
                  title: 'Post-Construction Cleaning',
                  description: 'Specialized cleaning for newly built or renovated properties',
                  icon: HomeIcon,
                  href: '/services/post-construction-cleaning'
                },
                {
                  title: 'Carpet & Upholstery Cleaning',
                  description: 'Expert cleaning to restore and protect your furnishings',
                  icon: Shirt,
                  href: '/services/carpet-upholstery-cleaning'
                },
                {
                  title: 'Window Cleaning',
                  description: 'Crystal-clear windows for residential and commercial properties',
                  icon: SprayCan,
                  href: '/services/window-cleaning'
                },
                {
                  title: 'Professional Cleaning Chemicals',
                  description: 'Supply of high-quality Moon Soft certified cleaning chemicals',
                  icon: Droplets,
                  href: '/services/professional-cleaning-chemicals'
                }
              ].map((service, index) => (
                <Link
                  key={index}
                  href={service.href}
                  className="bg-slate-50/70 p-8 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-card-hover hover:border-blue-500 hover:bg-white transition-all duration-300 block group"
                >
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 group-hover:bg-navy-950 transition-colors border border-slate-200 shadow-sm">
                    <service.icon className="w-7 h-7 text-navy-900 group-hover:text-cyanAccent transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-navy-950 mb-3 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </Link>
              ))}
            </div>

            <div className="text-center">
              <Link
                href="/services"
                className="inline-block bg-navy-950 hover:bg-blue-600 text-white px-10 py-4 rounded-xl font-bold transition text-sm uppercase tracking-wider shadow-lg"
              >
                Explore All Services Directory
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    await connectDB();
    
    let products = await Product.find({ isFeatured: true })
      .select('_id name description price category image stock isInStock')
      .limit(4)
      .lean();

    if (products.length === 0) {
      products = await Product.find()
        .select('_id name description price category image stock isInStock')
        .sort({ createdAt: -1 })
        .limit(4)
        .lean();
    }

    const serializedProducts = products.map((product: any) => ({
      ...product,
      _id: product._id.toString(),
      price: Number(product.price),
      stock: Number(product.stock),
      isInStock: Boolean(product.isInStock)
    }));

    return {
      props: {
        products: serializedProducts
      }
    };
  } catch (error) {
    console.error('Error fetching products for toilet-paper page:', error);
    return {
      props: {
        products: []
      }
    };
  }
};
