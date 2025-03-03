# 🌱 EcoStore - Sustainable Agriculture E-commerce Platform

EcoStore is a modern e-commerce platform specializing in eco-friendly agricultural products and soil solutions. Built with Next.js and designed with sustainability in mind.

![EcoStore Preview](public/images/preview.png)

## ✨ Features

- 🛍️ **Product Management**
  - Dynamic product listings
  - Detailed product pages with image galleries
  - Category filtering and search
  - Cart and wishlist functionality

- 🔐 **User Authentication**
  - Secure login and registration
  - OAuth integration (Google, GitHub)
  - Protected routes and user profiles

- 💳 **Payment Integration**
  - Secure payment processing with Paystack
  - Order history and tracking
  - Invoice generation

- 📱 **Responsive Design**
  - Mobile-first approach
  - Optimized for all screen sizes
  - Progressive Web App (PWA) support

## 🚀 Tech Stack

- **Frontend**
  - Next.js 14
  - React 18
  - TypeScript
  - TailwindCSS
  - Lucide Icons

- **Authentication**
  - NextAuth.js
  - JWT

- **Database**
  - MongoDB Atlas
  - Mongoose ODM

- **Payment**
  - Paystack Integration

- **Deployment**
  - Vercel

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ecostore.git
   cd ecostore
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Fill in your environment variables:
   ```env
   MONGODB_URI=your_mongodb_uri
   NEXTAUTH_SECRET=your_nextauth_secret
   PAYSTACK_SECRET_KEY=your_paystack_secret
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Database Setup
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Add your connection string to `.env.local`

### Authentication Setup
1. Configure NextAuth providers in `pages/api/auth/[...nextauth].ts`
2. Add OAuth credentials to `.env.local`

### Payment Setup
1. Create a Paystack account
2. Add your API keys to `.env.local`
3. Configure webhook endpoints

## 📝 Environment Variables

```env
# Database
MONGODB_URI=

# Authentication
NEXTAUTH_SECRET=
NEXTAUTH_URL=
GOOGLE_ID=
GOOGLE_SECRET=
GITHUB_ID=
GITHUB_SECRET=

# Payment
PAYSTACK_SECRET_KEY=
PAYSTACK_PUBLIC_KEY=

# API
NEXT_PUBLIC_API_URL=
```

## 🗂️ Project Structure

```
ecostore/
├── src/
│   ├── components/    # Reusable components
│   ├── pages/         # Next.js pages
│   ├── styles/        # Global styles
│   ├── lib/          # Utility functions
│   └── types/        # TypeScript types
├── public/           # Static assets
├── prisma/          # Database schema
└── tests/           # Test files
```

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

# Run test coverage
npm run test:coverage
```

## 📈 Performance

- Lighthouse Score: 95+
- Core Web Vitals compliant
- Optimized images and assets
- Implemented caching strategies

## 🔒 Security

- Input validation
- XSS protection
- CSRF protection
- Rate limiting
- Secure headers

## 🤝 Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

Please read our [Contributing Guidelines](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- Project Lead - [Your Name](https://github.com/yourusername)
- UI/UX Design - [Designer Name](https://github.com/designerusername)
- Backend Development - [Developer Name](https://github.com/developerusername)

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [TailwindCSS](https://tailwindcss.com)
- [MongoDB Atlas](https://www.mongodb.com/atlas)
- [Paystack](https://paystack.com)

## 📞 Support

For support, email support@ecostore.com or join our Slack channel.

---

Made with 💚 by [Your Company Name]
