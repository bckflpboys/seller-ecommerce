import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Plus, Search } from 'lucide-react';
import Image from 'next/image';
import toast from 'react-hot-toast';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image: string;
  createdAt: string;
}

export default function TabProducts() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/admin/products?page=${currentPage}&search=${searchTerm}&category=${categoryFilter === 'all' ? '' : categoryFilter}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();
      setProducts(data.products);
      setTotalPages(data.pagination.totalPages);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  // Delete product
  const deleteProduct = async (productId: string) => {
    toast(
      (t) => (
        <div className="flex items-center gap-4 min-w-[300px]">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">Delete Product</p>
            <p className="text-sm text-gray-500">Are you sure you want to delete this product?</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                handleDeleteConfirm(productId);
              }}
              className="px-3 py-2 text-xs font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-2 text-xs font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        duration: 5000,
        position: 'top-center',
        style: {
          background: 'white',
          padding: '16px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        },
      }
    );
  };

  const handleDeleteConfirm = async (productId: string) => {
    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      toast.success('Product deleted successfully');
      fetchProducts(); // Refresh the products list
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage, searchTerm, categoryFilter]);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">Products</h2>
        <button
          onClick={() => router.push('/admin/products/create')}
          className="inline-flex items-center px-5 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-sage transition-all duration-200 hover:bg-sage/90 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage transform hover:scale-105"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 relative group">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent transition-all duration-200 group-hover:border-sage/50"
          />
          <Search className="h-5 w-5 text-gray-400 absolute left-4 top-3.5 group-hover:text-sage transition-colors duration-200" />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => {
            setCategoryFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="border-2 border-gray-200 rounded-xl px-6 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent hover:border-sage/50 transition-all duration-200 cursor-pointer"
        >
          <option value="all">All Categories</option>
          <option value="muthi-products">Muthi Products</option>
          <option value="poultry-products">Poultry Products</option>
          <option value="livestock">Livestock</option>
          <option value="cleaning-products">Cleaning Products</option>
          <option value="sanitary-products">Sanitary Products</option>
          <option value="vegetables">Vegetables</option>
        </select>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md">
        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sage mx-auto"></div>
            <p className="mt-4 text-gray-500">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-gray-400 mb-3">No products found</div>
            <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div>
            {/* Table for larger screens */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Stock</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {products.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50/50 transition-colors duration-150">
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-12 w-12 flex-shrink-0">
                            <div className="h-12 w-12 rounded-lg relative overflow-hidden border border-gray-200">
                              <Image src={product.image} alt={product.name} fill className="object-cover" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-semibold text-gray-900">{product.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-sage/10 text-sage">{product.category}</span>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-700">R{product.price.toFixed(2)}</td>
                      <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-700">{product.stock}</td>
                      <td className="px-6 py-5 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-4">
                          <button onClick={() => router.push(`/admin/products/edit/${product._id}`)} className="text-earth hover:text-earth-dark transition-colors duration-200">Edit</button>
                          <button onClick={() => deleteProduct(product._id)} className="text-red-600 hover:text-red-800 transition-colors duration-200">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cards for smaller screens */}
            <div className="md:hidden space-y-4 px-4 py-4">
              {products.map((product) => (
                <div key={product._id} className="bg-white p-4 rounded-lg border-2 border-gray-200 shadow-sm">
                  <div className="flex gap-4">
                    <div className="h-20 w-20 flex-shrink-0 rounded-lg relative overflow-hidden border border-gray-200">
                      <Image src={product.image} alt={product.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">{product.name}</p>
                      <span className="mt-1 px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-sage/10 text-sage">{product.category}</span>
                      <p className="text-lg font-bold text-gray-900 mt-1">R{product.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <p className="text-sm text-gray-600">Stock: <span className="font-medium text-gray-800">{product.stock}</span></p>
                    <div className="flex items-center gap-4">
                      <button onClick={() => router.push(`/admin/products/edit/${product._id}`)} className="text-earth hover:text-earth-dark transition-colors duration-200 text-sm font-medium">Edit</button>
                      <button onClick={() => deleteProduct(product._id)} className="text-red-600 hover:text-red-800 transition-colors duration-200 text-sm font-medium">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pagination */}
        {!loading && products.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-sm"
            >
              Previous
            </button>
            <div className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </div>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-sm"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
