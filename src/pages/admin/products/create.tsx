import { useState } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '@/components/AdminLayout';
import { toast } from 'react-hot-toast';
import MultiImageUpload from '@/components/MultiImageUpload';
import { X } from 'lucide-react';

type NestedFormData = {
  weight: {
    value: string;
    unit: string;
  };
  dimensions: {
    length: string;
    width: string;
    height: string;
    unit: string;
  };
};

interface FormData extends NestedFormData {
  name: string;
  description: string;
  price: string;
  category: string;
  stockQuantity: string;
  keyFeatures: string[];
  lowStockThreshold: string;
  isFeatured: boolean;
  isBanner: boolean;
  isPublished: boolean;
  tags: string[];
}

export default function CreateProduct() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [keyFeature, setKeyFeature] = useState('');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    price: '',
    category: '',
    stockQuantity: '',
    keyFeatures: [],
    lowStockThreshold: '5',
    isFeatured: false,
    isBanner: false,
    isPublished: true,
    weight: {
      value: '',
      unit: 'kg'
    },
    dimensions: {
      length: '',
      width: '',
      height: '',
      unit: 'cm'
    },
    tags: [],
  });

  const handleImagesChange = (newImages: File[]) => {
    setImages(newImages);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name.includes('.')) {
      const [parent, child] = name.split('.') as [keyof NestedFormData, string];
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent] as Record<string, string>),
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const uploadImages = async () => {
    const uploadedImages: { url: string; public_id: string }[] = [];

    for (const image of images) {
      const formData = new FormData();
      formData.append('file', image);

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Failed to upload image');
        }

        const data = await response.json();
        uploadedImages.push({ url: data.url, public_id: data.public_id });
      } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
      }
    }

    return uploadedImages;
  };

  const moveImagesToProductFolder = async (productId: string, images: { url: string; public_id: string }[]) => {
    try {
      const response = await fetch('/api/products/move-images', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          images,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to move images');
      }

      const data = await response.json();
      return data.urls;
    } catch (error) {
      console.error('Error moving images:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (formData.keyFeatures.length === 0) {
        toast.error('Please add at least one key feature');
        setLoading(false);
        return;
      }

      // First upload all images to temp folder
      const uploadedImages = await uploadImages();

      // Then create the product with the temporary image URLs
      const weightValue = formData.weight.value ? parseFloat(formData.weight.value) : undefined;
      const dimensionsLength = formData.dimensions.length ? parseFloat(formData.dimensions.length) : undefined;
      const dimensionsWidth = formData.dimensions.width ? parseFloat(formData.dimensions.width) : undefined;
      const dimensionsHeight = formData.dimensions.height ? parseFloat(formData.dimensions.height) : undefined;

      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stockQuantity),
        lowStockThreshold: parseInt(formData.lowStockThreshold),
        keyFeatures: formData.keyFeatures,
        images: uploadedImages.map(img => img.url),
        image: uploadedImages[0].url,
        gallery: uploadedImages.map(img => img.url),
        ...(weightValue && {
          weight: {
            value: weightValue,
            unit: formData.weight.unit
          }
        }),
        ...(dimensionsLength || dimensionsWidth || dimensionsHeight ? {
          dimensions: {
            ...(dimensionsLength && { length: dimensionsLength }),
            ...(dimensionsWidth && { width: dimensionsWidth }),
            ...(dimensionsHeight && { height: dimensionsHeight }),
            unit: formData.dimensions.unit
          }
        } : {}),
        ratings: {
          average: 0,
          count: 0
        },
        reviews: []
      };

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create product');
      }

      const product = await response.json();

      // Move images to the product's folder
      const updatedUrls = await moveImagesToProductFolder(
        product._id,
        uploadedImages
      );

      // Update the product with the new image URLs
      const updateResponse = await fetch(`/api/products/${product._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          images: updatedUrls,
          image: updatedUrls[0],
          gallery: updatedUrls,
        }),
      });

      if (!updateResponse.ok) {
        console.error('Failed to update product with new image URLs');
      }

      toast.success('Product created successfully');
      router.push(`/products/${product._id}`);
    } catch (error: any) {
      console.error('Error creating product:', error);
      toast.error(error.message || 'Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  const handleAddFeature = () => {
    if (keyFeature.trim() && formData.keyFeatures.length < 4) {
      setFormData(prev => ({
        ...prev,
        keyFeatures: [...prev.keyFeatures, keyFeature.trim()]
      }));
      setKeyFeature('');
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      keyFeatures: prev.keyFeatures.filter((_, i) => i !== index)
    }));
  };

  return (
    <AdminLayout activeTab="products">
      <div className="max-w-4xl mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Create New Product</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg border-2 border-gray-300">
          <div className="grid grid-cols-1 gap-6">
            {/* Product Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage focus:border-sage"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                required
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage focus:border-sage"
              />
            </div>

            {/* Price and Stock */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price (R)
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  required
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage focus:border-sage"
                />
              </div>
              <div>
                <label htmlFor="stockQuantity" className="block text-sm font-medium text-gray-700">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  name="stockQuantity"
                  id="stockQuantity"
                  required
                  min="0"
                  value={formData.stockQuantity}
                  onChange={handleChange}
                  className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage focus:border-sage"
                />
              </div>
            </div>

            {/* Low Stock Threshold */}
            <div>
              <label htmlFor="lowStockThreshold" className="block text-sm font-medium text-gray-700">
                Low Stock Threshold
              </label>
              <input
                type="number"
                name="lowStockThreshold"
                id="lowStockThreshold"
                min="0"
                value={formData.lowStockThreshold}
                onChange={handleChange}
                className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage focus:border-sage"
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                name="category"
                id="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage focus:border-sage"
              >
                <option value="">Select a category</option>
                <option value="fertilizers">Fertilizers</option>
                <option value="pesticides">Pesticides</option>
                <option value="seeds">Seeds</option>
                <option value="tools">Tools</option>
                <option value="equipment">Equipment</option>
              </select>
            </div>

            {/* Weight */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Weight (optional)
              </label>
              <div className="grid grid-cols-2 gap-4 mt-1">
                <div>
                  <input
                    type="number"
                    name="weight.value"
                    id="weight.value"
                    min="0"
                    step="0.01"
                    value={formData.weight.value}
                    onChange={handleChange}
                    className="block w-full border-2 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage focus:border-sage"
                    placeholder="Enter weight"
                  />
                </div>
                <div>
                  <select
                    name="weight.unit"
                    id="weight.unit"
                    value={formData.weight.unit}
                    onChange={handleChange}
                    className="block w-full border-2 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage focus:border-sage"
                  >
                    <option value="g">Grams (g)</option>
                    <option value="kg">Kilograms (kg)</option>
                    <option value="oz">Ounces (oz)</option>
                    <option value="lb">Pounds (lb)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Dimensions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dimensions (optional)
              </label>
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <input
                    type="number"
                    name="dimensions.length"
                    placeholder="Length"
                    min="0"
                    step="0.1"
                    value={formData.dimensions.length}
                    onChange={handleChange}
                    className="block w-full border-2 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage focus:border-sage"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    name="dimensions.width"
                    placeholder="Width"
                    min="0"
                    step="0.1"
                    value={formData.dimensions.width}
                    onChange={handleChange}
                    className="block w-full border-2 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage focus:border-sage"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    name="dimensions.height"
                    placeholder="Height"
                    min="0"
                    step="0.1"
                    value={formData.dimensions.height}
                    onChange={handleChange}
                    className="block w-full border-2 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage focus:border-sage"
                  />
                </div>
                <div>
                  <select
                    name="dimensions.unit"
                    value={formData.dimensions.unit}
                    onChange={handleChange}
                    className="block w-full border-2 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage focus:border-sage"
                  >
                    <option value="cm">Centimeters (cm)</option>
                    <option value="in">Inches (in)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Product Options */}
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isFeatured"
                  id="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleChange}
                  className="h-4 w-4 text-sage focus:ring-sage border-gray-300 rounded"
                />
                <label htmlFor="isFeatured" className="ml-2 block text-sm text-gray-700">
                  Featured Product
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isBanner"
                  id="isBanner"
                  checked={formData.isBanner}
                  onChange={handleChange}
                  className="h-4 w-4 text-sage focus:ring-sage border-gray-300 rounded"
                />
                <label htmlFor="isBanner" className="ml-2 block text-sm text-gray-700">
                  Show in Banner
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isPublished"
                  id="isPublished"
                  checked={formData.isPublished}
                  onChange={handleChange}
                  className="h-4 w-4 text-sage focus:ring-sage border-gray-300 rounded"
                />
                <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-700">
                  Publish Product
                </label>
              </div>
            </div>

            {/* Key Features */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Key Features (min 1, max 4)
              </label>
              <div className="space-y-4">
                {/* Feature Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={keyFeature}
                    onChange={(e) => setKeyFeature(e.target.value)}
                    placeholder="Enter a key feature"
                    className="flex-1 border-2 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage focus:border-sage"
                  />
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    disabled={formData.keyFeatures.length >= 4}
                    className={`px-4 py-2 bg-sage text-white rounded-md hover:bg-sage/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage ${
                      formData.keyFeatures.length >= 4 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    Add
                  </button>
                </div>

                {/* Features List */}
                {formData.keyFeatures.length > 0 && (
                  <div className="space-y-2">
                    {formData.keyFeatures.map((feature, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                        <span className="text-sm text-gray-700">{feature}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveFeature(index)}
                          className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                        >
                          <X className="w-4 h-4 text-gray-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {formData.keyFeatures.length === 0 && (
                  <div className="text-sm text-red-500">
                    Please add at least one key feature
                  </div>
                )}
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Images (max 4)
              </label>
              <MultiImageUpload onImagesChange={handleImagesChange} maxImages={4} />
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => router.push('/admin')}
              className="px-4 py-2 border-2 border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || images.length === 0 || formData.keyFeatures.length === 0}
              className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sage hover:bg-sage/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage ${
                (loading || images.length === 0 || formData.keyFeatures.length === 0) && 'opacity-50 cursor-not-allowed'
              }`}
            >
              {loading ? 'Creating...' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
