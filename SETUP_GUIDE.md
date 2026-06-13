# Amazon Clone - Production Ready MERN Application

A comprehensive, scalable, and professional e-commerce platform built with modern web technologies following industry best practices.

## 🏗️ Project Architecture

### Backend Structure
```
server/
├── config/              # Database and environment configuration
├── controllers/         # Route handlers and business logic
├── middleware/          # Authentication, error handling, validation
├── models/              # Database schemas (User, Product, Cart, Order, Wishlist)
├── routes/              # API route definitions
├── services/            # Business logic and database operations
├── validators/          # Input validation schemas
├── utils/               # Helper functions (JWT, password, response formatting)
├── constants/           # Application constants
├── .env                 # Environment variables
└── server.js            # Express server entry point
```

### Frontend Structure
```
client/
├── src/
│   ├── api/             # API client and endpoints
│   ├── components/      # Reusable React components
│   ├── context/         # Context API for state management
│   ├── hooks/           # Custom React hooks
│   ├── layouts/         # Page layout components
│   ├── pages/           # Page components
│   ├── routes/          # Route configuration and protection
│   ├── services/        # Business logic services
│   ├── styles/          # Global styles
│   ├── utils/           # Helper functions
│   ├── assets/          # Images and static files
│   ├── App.jsx          # Main app component
│   └── main.jsx         # React entry point
├── .env.local           # Environment variables
└── vite.config.js       # Vite configuration
```

## 🚀 Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js (v5+)
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken)
- **Password Security**: bcryptjs
- **Environment**: dotenv

### Frontend
- **Library**: React 19+
- **Routing**: React Router DOM v7+
- **State Management**: Context API
- **Bundler**: Vite
- **HTTP Client**: Fetch API
- **Styling**: Tailwind CSS (via class names)

## 📋 Features Implemented

### Authentication & Authorization
- ✅ User Registration with validation
- ✅ User Login with JWT tokens
- ✅ Protected routes (user/admin)
- ✅ Password hashing with bcrypt
- ✅ Role-based access control (User, Admin, Seller)
- ✅ Profile management
- ✅ Password change functionality

### Product Management
- ✅ Create/Read/Update/Delete products
- ✅ Product search and filtering
- ✅ Product pagination
- ✅ Category organization
- ✅ Product ratings and reviews
- ✅ Stock management
- ✅ Product images support
- ✅ Featured products

### Shopping Features
- ✅ Shopping cart (add, remove, update quantity)
- ✅ Cart persistence in database
- ✅ Wishlist management
- ✅ Order creation from cart
- ✅ Order history and tracking
- ✅ Order cancellation
- ✅ Return requests

### Admin Features
- ✅ Admin dashboard
- ✅ Product management
- ✅ Order management
- ✅ Order status updates
- ✅ User management
- ✅ Analytics (foundation)

## 🔧 Installation & Setup

### Prerequisites
- Node.js v16+ and npm
- MongoDB Atlas account or local MongoDB
- Git

### Backend Setup

1. **Navigate to backend directory**
```bash
cd server
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
# Copy the .env.example
cp .env.example .env

# Edit .env with your values:
# MONGODB_URI=your_mongodb_connection_string
# JWT_SECRET=your_secret_key
# PORT=5000
```

4. **Start the server**
```bash
npm run dev          # Development mode with nodemon
# or
npm start            # Production mode
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd client
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
# Copy the .env.example
cp .env.example .env.local

# Edit .env.local with your values:
# VITE_API_URL=http://localhost:5000/api
```

4. **Start development server**
```bash
npm run dev          # Development mode
# or
npm run build        # Build for production
npm run preview      # Preview production build
```

The frontend will run on `http://localhost:5173`

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register
```
POST /auth/register
Body: {
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string"
}
```

#### Login
```
POST /auth/login
Body: {
  "email": "string",
  "password": "string"
}
```

#### Get Profile
```
GET /auth/profile
Headers: { Authorization: "Bearer {token}" }
```

### Product Endpoints

#### Get All Products
```
GET /products?page=1&limit=10&category=electronics&minPrice=100&maxPrice=5000
```

#### Get Product by ID
```
GET /products/{id}
```

#### Create Product (Admin/Seller)
```
POST /products
Headers: { Authorization: "Bearer {token}" }
Body: {
  "name": "string",
  "description": "string",
  "price": "number",
  "category": "string",
  "stock": "number"
}
```

### Cart Endpoints

#### Get Cart
```
GET /cart
Headers: { Authorization: "Bearer {token}" }
```

#### Add to Cart
```
POST /cart/add
Headers: { Authorization: "Bearer {token}" }
Body: {
  "productId": "string",
  "quantity": "number"
}
```

#### Remove from Cart
```
DELETE /cart/{productId}
Headers: { Authorization: "Bearer {token}" }
```

### Order Endpoints

#### Create Order
```
POST /orders
Headers: { Authorization: "Bearer {token}" }
Body: {
  "shippingAddress": {...},
  "paymentMethod": "credit_card",
  "billingAddress": {...}
}
```

#### Get User Orders
```
GET /orders/user/orders
Headers: { Authorization: "Bearer {token}" }
```

#### Get Order Details
```
GET /orders/{orderId}
Headers: { Authorization: "Bearer {token}" }
```

### Wishlist Endpoints

#### Get Wishlist
```
GET /wishlist
Headers: { Authorization: "Bearer {token}" }
```

#### Add to Wishlist
```
POST /wishlist/add
Headers: { Authorization: "Bearer {token}" }
Body: { "productId": "string" }
```

## 🎨 Component Structure

### Context Providers
- **AuthContext**: User authentication and authorization
- **CartContext**: Shopping cart state management
- **ProductContext**: Product data and search
- **WishlistContext**: Wishlist management
- **OrderContext**: Order management

### Key Components
- **Header**: Navigation and user menu
- **Footer**: Footer information
- **ProductCard**: Product display card
- **AdminSidebar**: Admin navigation

### Protected Routes
- `/cart` - Shopping cart (authenticated users)
- `/checkout` - Checkout page (authenticated users)
- `/orders` - Order history (authenticated users)
- `/profile` - User profile (authenticated users)
- `/admin/*` - Admin pages (admin users only)

## 🔐 Security Features

1. **JWT Authentication**: Secure token-based authentication
2. **Password Hashing**: bcrypt with salt rounds
3. **Input Validation**: Server-side validation for all inputs
4. **Authorization**: Role-based access control
5. **CORS**: Cross-origin resource sharing configured
6. **Environment Variables**: Sensitive data in .env files

## 📊 Database Models

### User
```javascript
{
  firstName, lastName, email, password,
  phone, address, role, profileImage,
  isEmailVerified, isActive, lastLogin, wishlist,
  timestamps
}
```

### Product
```javascript
{
  name, description, price, originalPrice, discount,
  category, subcategory, brand, stock,
  images, thumbnail, rating, reviews, numReviews,
  sku, weight, dimensions, seller, tags,
  isFeatured, isActive, viewCount, purchaseCount,
  timestamps
}
```

### Cart
```javascript
{
  userId, items: [{
    productId, quantity, price, discount
  }],
  totalItems, totalPrice, totalDiscount,
  tax, shippingCost, finalPrice, timestamps
}
```

### Order
```javascript
{
  orderNumber, userId, items, shippingAddress,
  paymentMethod, paymentStatus, orderStatus,
  subTotal, tax, shippingCost, discount, totalAmount,
  trackingNumber, estimatedDelivery, statusHistory,
  timestamps
}
```

### Wishlist
```javascript
{
  userId, products: [{
    productId, addedAt
  }],
  totalItems, timestamps
}
```

## 🧪 Development Tips

### Running Both Servers
```bash
# Terminal 1 - Backend
cd server && npm run dev

# Terminal 2 - Frontend
cd client && npm run dev
```

### Common Tasks

#### Add a new API endpoint
1. Create controller in `controllers/`
2. Create service in `services/`
3. Add route in `routes/`
4. Add endpoint to `api/endpoints.js`
5. Use in context or component

#### Add a new page
1. Create page component in `pages/`
2. Add route in `routes/index.jsx`
3. Create layout if needed in `layouts/`

#### Add global state
1. Create context in `context/`
2. Create provider component
3. Wrap app in `App.jsx`
4. Use custom hook in components

## 🚢 Deployment

### Backend (Heroku/Railway/Render)
1. Push to GitHub
2. Connect repository
3. Set environment variables
4. Deploy

### Frontend (Vercel/Netlify)
1. Build: `npm run build`
2. Push to GitHub
3. Connect repository
4. Set API URL in environment
5. Deploy

## 📝 Code Standards

- **ES Modules**: All files use `import/export`
- **Async/Await**: Modern async operations
- **Error Handling**: Try-catch with proper error responses
- **Comments**: Added only when necessary
- **Naming**: camelCase for variables, PascalCase for components
- **SOLID Principles**: Single responsibility, DRY code

## 🤝 Contributing

1. Follow the established code structure
2. Use meaningful variable and function names
3. Add error handling to new features
4. Test endpoints with API client (Postman/Thunder Client)
5. Keep components reusable and modular

## 📄 License

This project is open source and available under the ISC License.

## 🎯 Next Steps

1. **Implement full UI**: Replace placeholder components with complete designs
2. **Add payment gateway**: Integrate Stripe or Razorpay
3. **Add email notifications**: Send order confirmations
4. **Add image upload**: Implement file upload service
5. **Add analytics**: Track user behavior and sales
6. **Add caching**: Implement Redis for performance
7. **Add testing**: Unit and integration tests
8. **Deploy**: Set up CI/CD pipeline

---

**Built with ❤️ following MERN best practices for production-ready applications**
