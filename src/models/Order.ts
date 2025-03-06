import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  items: [{
    productId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  }],
  total: {
    type: Number,
    required: true,
  },
  paymentReference: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  shippingAddress: {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
  },
  status: {
    type: String,
    enum: ['pending', 'paid', 'shipped', 'delivered'],
    default: 'pending',
  },
}, {
  timestamps: true, // This will add createdAt and updatedAt fields
});

// Delete the model if it exists to prevent the OverwriteModelError
if (mongoose.models.Order) {
  delete mongoose.models.Order;
}

const Order = mongoose.model('Order', orderSchema);

export default Order;
