# 🛒 Amazon Clone - Professional MERN Stack E-Commerce Application

A production-ready, fully-featured e-commerce platform built with React, Node.js, Express, and MongoDB. Designed following industry best practices and SOLID principles for senior-level code quality.

![Architecture](https://img.shields.io/badge/Architecture-Clean%20Architecture-blue)
![Code Style](https://img.shields.io/badge/Code%20Style-Professional-green)
![License](https://img.shields.io/badge/License-ISC-yellow)

## ✨ Key Features

### 🔐 **Authentication & Security**
- JWT-based authentication with secure token handling
- bcryptjs password hashing (10 salt rounds)
- Role-based access control (User, Admin, Seller)
- Protected routes and API endpoints
- Comprehensive input validation

### 📦 **Product Management**
- Full CRUD operations for products
- Advanced search and filtering
- Product categories and subcategories
- Rating and review system
- Stock management
- Featured products showcase

### 🛒 **Shopping Features**
- Persistent shopping cart
- Wishlist management
- Cart calculations (tax, shipping, totals)
- Secure checkout process
- Order history and tracking

### 📋 **Order Management**
- Order creation from cart
- Order status tracking
- Order history for users
- Admin order management
- Return request handling
- Order cancellation

### 👥 **Admin Dashboard**
- Manage products, orders, and users
- View analytics and statistics
- Order status updates
- User account management

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    React Frontend                        │
│  (Context API, Custom Hooks, React Router v7)           │
├─────────────────────────────────────────────────────────┤
│                    Fetch API Client                      │
│              (Centralized API Layer)                     │
├─────────────────────────────────────────────────────────┤
│                Express.js Backend                        │
│  (Controllers, Services, Models, Middleware)             │
├─────────────────────────────────────────────────────────┤
│              MongoDB with Mongoose                       │
│         (Database & Schema Management)                   │
└─────────────────────────────────────────────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- Node.js v16+ and npm
- MongoDB Atlas account (or local MongoDB)
- Modern web browser

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd Amazon
```

2. **Backend Setup**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm run dev
```

3. **Frontend Setup**
```bash
cd Amazon_clone
npm install
cp .env.example .env.local
npm run dev
```

4. **Access the application**
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

## 📚 Project Structure

### Backend
```
backend/
├── config/              # Database configuration
├── constants/           # Application constants
├── controllers/         # Request handlers
├── middleware/          # Auth, error handling, validation
├── models/              # Database schemas
├── routes/              # API routes
├── services/            # Business logic
├── utils/               # Helper utilities
├── validators/          # Input validation
├── .env                 # Environment variables
└── server.js            # Entry point
```

### Frontend
```
Amazon_clone/src/
├── api/                 # API client and endpoints
├── components/          # Reusable components
├── context/             # State management contexts
├── hooks/               # Custom React hooks
├── layouts/             # Page layouts
├── pages/               # Page components
├── routes/              # Route configuration
├── styles/              # Global styles
├── utils/               # Helper functions
├── App.jsx              # Root component
└── main.jsx             # Entry point
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Create new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile
- `POST /api/auth/change-password` - Change password

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product (admin/seller)
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `GET /api/products/search?q=...` - Search products
- `POST /api/products/:id/reviews` - Add review

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update quantity
- `DELETE /api/cart/:productId` - Remove item
- `DELETE /api/cart` - Clear cart

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id/cancel` - Cancel order
- `POST /api/orders/:id/return` - Request return

### Wishlist
- `GET /api/wishlist` - Get wishlist
- `POST /api/wishlist/add` - Add to wishlist
- `DELETE /api/wishlist/:productId` - Remove from wishlist
- `DELETE /api/wishlist` - Clear wishlist

## 🎯 State Management

The application uses **Context API** for global state management with the following contexts:

1. **AuthContext** - User authentication and authorization
2. **CartContext** - Shopping cart state
3. **ProductContext** - Products and search results
4. **WishlistContext** - Wishlist management
5. **OrderContext** - Orders and order history

Each context provides:
- State variables
- Action functions (async operations)
- Loading and error states
- Custom hooks for easy access

## 🔐 Security Implementation

### Password Security
- Hashed with bcryptjs (10 salt rounds)
- Minimum 6 characters required
- Change password functionality

### JWT Authentication
- Signed with secret key
- 7-day expiration
- Token refresh mechanism
- Verified on protected routes

### Authorization
- Role-based access control (RBAC)
- User can only access own data
- Admin endpoints protected
- Seller can manage own products

### Input Validation
- Server-side validation
- Email format validation
- Password strength requirements
- Data sanitization

## 📊 Database Models

### User Model
```javascript
{
  firstName, lastName, email, password (hashed),
  phone, address, role, profileImage,
  isEmailVerified, isActive, lastLogin,
  wishlist: [ProductIds],
  timestamps
}
```

### Product Model
```javascript
{
  name, description, price, originalPrice, discount,
  category, brand, stock, images, thumbnail,
  rating, reviews, numReviews,
  seller, tags, isFeatured, isActive,
  timestamps
}
```

### Cart Model
```javascript
{
  userId, 
  items: [{
    productId, quantity, price, discount
  }],
  totalItems, totalPrice, totalDiscount,
  tax, shippingCost, finalPrice,
  timestamps
}
```

### Order Model
```javascript
{
  orderNumber, userId, items, shippingAddress,
  paymentMethod, paymentStatus, orderStatus,
  subTotal, tax, shippingCost, discount, totalAmount,
  trackingNumber, statusHistory,
  timestamps
}
```

## 🧪 Development Workflow

### Running Both Servers
```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend  
cd Amazon_clone && npm run dev
```

### Adding New Features

1. **Backend API Endpoint**
   - Create controller in `controllers/`
   - Create service in `services/`
   - Add route in `routes/`

2. **Frontend Integration**
   - Add endpoint to `api/endpoints.js`
   - Create context if global state needed
   - Create components to display data
   - Add route if new page

## 📈 Performance Optimizations

- **Database Indexing**: Optimized queries
- **Pagination**: Handle large datasets efficiently
- **Lazy Loading**: Load components on demand
- **Memoization**: Prevent unnecessary re-renders
- **API Caching**: Cache frequently accessed data
- **Debouncing**: Optimize search input

## 🚢 Deployment

### Frontend Deployment (Vercel/Netlify)
1. Build: `npm run build`
2. Deploy built `dist/` folder
3. Set `VITE_API_URL` environment variable

### Backend Deployment (Heroku/Railway/Render)
1. Push to GitHub
2. Connect repository
3. Set environment variables
4. Deploy

## 🛠️ Tech Stack Details

| Layer | Technology | Version |
|-------|-----------|---------|
| Frontend | React | 19+ |
| Routing | React Router | 7+ |
| Bundler | Vite | 8+ |
| Backend | Express.js | 5+ |
| Database | MongoDB | 4.4+ |
| ODM | Mongoose | 8+ |
| Auth | JWT | 9+ |
| Security | bcryptjs | 2.4+ |

## 📚 Documentation

- [Setup Guide](./SETUP_GUIDE.md) - Detailed installation and setup
- [Architecture](./ARCHITECTURE.md) - Design patterns and architecture
- [API Documentation](./SETUP_GUIDE.md#-api-documentation) - Complete API reference

## 🤝 Contributing

1. Follow the established code structure
2. Use meaningful naming conventions
3. Add error handling to new features
4. Test endpoints with API client
5. Keep components modular and reusable

## ✅ Code Quality Standards

- ✅ Clean, readable code
- ✅ Proper error handling
- ✅ Input validation
- ✅ Security best practices
- ✅ SOLID principles
- ✅ DRY (Don't Repeat Yourself)
- ✅ Proper comments (when necessary)
- ✅ Consistent naming conventions

## 🎓 Learning Resources

This project demonstrates:
- Modern React patterns (Context API, hooks)
- RESTful API design
- Authentication & authorization
- Database modeling
- Error handling strategies
- Clean code principles
- Professional project structure

## 📄 License

This project is open source under the ISC License.

## 🎉 Ready for Production

This application is production-ready and suitable for:
- Portfolio projects
- Job applications
- Internship demonstrations
- Learning MERN stack
- Foundation for real e-commerce platform

---

## 📞 Support

For questions or issues:
1. Check the [Setup Guide](./SETUP_GUIDE.md)
2. Review the [Architecture](./ARCHITECTURE.md)
3. Check existing code examples
4. Review error messages carefully

---

**Built with professional standards following industry best practices** ✨

**Perfect for demonstrating advanced MERN development skills** 🚀
