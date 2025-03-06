import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a product name'],
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a product description'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide a product price'],
    min: [0, 'Price cannot be negative'],
  },
  compareAtPrice: {
    type: Number,
    min: [0, 'Compare at price cannot be negative'],
  },
  image: {
    type: String,
    required: [true, 'Please provide a product image'],
  },
  images: [{
    type: String,
  }],
  keyFeatures: {
    type: [String],
    validate: {
      validator: function(features: string[]) {
        return features.length <= 4;
      },
      message: 'Maximum 4 key features allowed'
    },
    required: [true, 'Please provide at least one key feature'],
  },
  category: {
    type: String,
    required: [true, 'Please provide a product category'],
    index: true,
  },
  subcategory: {
    type: String,
    index: true,
  },
  brand: {
    type: String,
  },
  stock: {
    type: Number,
    required: [true, 'Please provide product stock'],
    default: 0,
    min: [0, 'Stock cannot be negative'],
  },
  isInStock: {
    type: Boolean,
    default: true,
  },
  lowStockThreshold: {
    type: Number,
    default: 5,
  },
  isFeatured: {
    type: Boolean,
    default: false,
    index: true,
  },
  isBanner: {
    type: Boolean,
    default: false,
  },
  isPublished: {
    type: Boolean,
    default: true,
    index: true,
  },
  sku: {
    type: String,
    unique: true,
    sparse: true,
  },
  weight: {
    value: {
      type: Number,
      min: [0, 'Weight cannot be negative'],
      required: false
    },
    unit: {
      type: String,
      enum: ['g', 'kg', 'oz', 'lb'],
      default: 'kg',
    },
  },
  dimensions: {
    length: {
      type: Number,
      min: [0, 'Length cannot be negative'],
      required: false
    },
    width: {
      type: Number,
      min: [0, 'Width cannot be negative'],
      required: false
    },
    height: {
      type: Number,
      min: [0, 'Height cannot be negative'],
      required: false
    },
    unit: {
      type: String,
      enum: ['cm', 'in'],
      default: 'cm',
    },
  },
  tags: [{
    type: String,
  }],
  ratings: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
  metadata: {
    type: Map,
    of: String,
  },
}, {
  timestamps: true
});

// Update the updatedAt timestamp before saving
productSchema.pre('save', function(next) {
  // Generate slug from name if not provided
  if (!this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }
  
  // Update isInStock based on stock quantity
  this.isInStock = this.stock > 0;
  
  next();
});

// Create text index for search
productSchema.index({ name: 'text', description: 'text' });

// Create compound index for category and subcategory
productSchema.index({ category: 1, subcategory: 1 });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
