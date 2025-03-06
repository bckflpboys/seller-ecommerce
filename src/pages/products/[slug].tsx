// import { useState } from 'react';
// import { GetStaticPaths, GetStaticProps } from 'next';
// import Image from 'next/image';
// import Head from 'next/head';
// import { ShoppingCart, ChevronRight } from 'lucide-react';
// import { useCart } from '@/context/CartContext';
// import { Button } from '@/components/ui/button';
// import connectDB from '@/lib/mongodb';
// import Product from '@/models/Product';

// interface ProductData {
//   _id: string;
//   name: string;
//   description: string;
//   longDescription: string;
//   price: number;
//   image: string;
//   gallery?: string[];
//   category: string;
//   subcategory: string;
//   brand: string;
//   stock: number;
//   isInStock: boolean;
//   features: string[];
//   slug: string;
// }

// interface ProductPageProps {
//   product: ProductData;
// }

// export default function ProductPage({ product }: ProductPageProps) {
//   const { state, addItem } = useCart();
//   const [selectedImage, setSelectedImage] = useState(product.image);

//   const handleAddToCart = () => {
//     addItem({
//       _id: product._id,
//       name: product.name,
//       price: product.price,
//       image: product.image,
//       quantity: 1,
//       category: product.category,
//     });
//   };

//   if (!product) {
//     return (
//       <div className="container mx-auto px-4 py-16 text-center">
//         <h1 className="text-2xl font-bold text-gray-900">Product not found</h1>
//         <p className="mt-4 text-gray-600">The product you're looking for doesn't exist.</p>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Head>
//         <title>{product.name} | Soil Solution</title>
//         <meta name="description" content={product.description} />
//       </Head>

//       <div className="container mx-auto px-4 py-8">
//         {/* Breadcrumb */}
//         <nav className="mb-8 flex items-center space-x-1 text-sm text-gray-500">
//           <a href="/" className="hover:text-gray-900">Home</a>
//           <ChevronRight className="h-4 w-4" />
//           <a href="/products" className="hover:text-gray-900">Products</a>
//           <ChevronRight className="h-4 w-4" />
//           <span className="font-medium text-gray-900">{product.name}</span>
//         </nav>

//         <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2">
//           {/* Product Gallery */}
//           <div className="space-y-4">
//             <div className="aspect-square overflow-hidden rounded-lg border bg-gray-100">
//               <Image
//                 src={selectedImage}
//                 alt={product.name}
//                 width={800}
//                 height={800}
//                 className="h-full w-full object-cover object-center"
//                 priority
//               />
//             </div>
//             {product.gallery && product.gallery.length > 0 && (
//               <div className="grid grid-cols-4 gap-4">
//                 {[product.image, ...product.gallery].map((image, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setSelectedImage(image)}
//                     className={`aspect-square overflow-hidden rounded-lg border ${
//                       selectedImage === image ? 'border-earth-dark' : 'border-gray-200'
//                     }`}
//                   >
//                     <Image
//                       src={image}
//                       alt={`${product.name} ${index + 1}`}
//                       width={200}
//                       height={200}
//                       className="h-full w-full object-cover object-center"
//                     />
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Product Info */}
//           <div>
//             <div className="mb-6">
//               <h1 className="font-display text-3xl font-bold text-gray-900">{product.name}</h1>
//               <p className="mt-2 text-lg text-gray-500">{product.description}</p>
//             </div>

//             <div className="mb-6 space-y-2">
//               <p className="text-sm text-gray-500">Brand: <span className="font-medium text-gray-900">{product.brand}</span></p>
//               <p className="text-sm text-gray-500">Category: <span className="font-medium text-gray-900">{product.category} / {product.subcategory}</span></p>
//               <p className="text-sm text-gray-500">Stock: <span className={`font-medium ${product.isInStock ? 'text-green-600' : 'text-red-600'}`}>
//                 {product.isInStock ? 'In Stock' : 'Out of Stock'}
//               </span></p>
//             </div>

//             <div className="mb-8">
//               <h2 className="font-display text-2xl font-bold text-earth-dark">
//                 ${product.price.toFixed(2)}
//               </h2>
//               <Button
//                 onClick={handleAddToCart}
//                 disabled={!product.isInStock}
//                 size="lg"
//                 className="mt-4 w-full bg-earth-dark text-white hover:bg-earth-dark/90"
//               >
//                 <ShoppingCart className="mr-2 h-5 w-5" />
//                 {product.isInStock ? 'Add to Cart' : 'Out of Stock'}
//               </Button>
//             </div>

//             {product.features && product.features.length > 0 && (
//               <div className="mb-8">
//                 <h3 className="font-display text-lg font-semibold text-gray-900">Key Features</h3>
//                 <ul className="mt-4 space-y-2">
//                   {product.features.map((feature, index) => (
//                     <li key={index} className="flex items-start">
//                       <div className="mr-2 mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-earth-dark" />
//                       <span className="text-gray-600">{feature}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             <div className="prose prose-earth max-w-none">
//               <h3 className="font-display text-lg font-semibold text-gray-900">Description</h3>
//               <div className="mt-4 whitespace-pre-wrap text-gray-600">{product.longDescription}</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export const getStaticPaths: GetStaticPaths = async () => {
//   await connectDB();
//   const products = await Product.find({ isPublished: true }).select('slug').lean();

//   return {
//     paths: products.map((product) => ({
//       params: { slug: product.slug },
//     })),
//     fallback: 'blocking',
//   };
// };

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   if (!params?.slug || typeof params.slug !== 'string') {
//     return {
//       notFound: true,
//     };
//   }

//   try {
//     await connectDB();
//     const product = await Product.findOne({ 
//       slug: params.slug,
//       isPublished: true,
//     }).lean();

//     if (!product) {
//       return {
//         notFound: true,
//       };
//     }

//     return {
//       props: {
//         product: JSON.parse(JSON.stringify(product)),
//       },
//       revalidate: 60,
//     };
//   } catch (error) {
//     console.error('Error fetching product:', error);
//     return {
//       notFound: true,
//     };
//   }
// };
