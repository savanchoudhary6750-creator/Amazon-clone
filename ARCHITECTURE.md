# Architecture & Design Patterns

## 🏗️ Overall Architecture

This Amazon Clone follows a **Clean Architecture** pattern with clear separation of concerns:

```
User Interface (React Components)
         ↓
    API Client Layer
         ↓
    Context API (State Management)
         ↓
    Custom Hooks
         ↓
    HTTP Requests (Fetch API)
         ↓
    Express Backend
         ↓
    Service Layer (Business Logic)
         ↓
    Database Models (Mongoose)
         ↓
    MongoDB Database
```

## 🎯 Design Patterns Used

### 1. Context API Pattern
**Purpose**: Global state management without Redux

**Implementation**:
```javascript
// Create context
const AuthContext = createContext(null);

// Create provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return <AuthContext.Provider value={{user}}>{children}</AuthContext.Provider>;
};

// Use hook
const { user } = useAuth();
```

**Benefits**:
- Lightweight and built-in to React
- No additional dependencies
- Easy to understand and maintain
- Perfect for medium-sized applications

### 2. Custom Hooks Pattern
**Purpose**: Encapsulate logic and state management

**Example**:
```javascript
export const useAsync = (asyncFunction) => {
  const [status, setStatus] = useState('idle');
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);
  
  const execute = useCallback(async (...params) => {
    // Logic
  }, [asyncFunction]);
  
  return { execute, status, value, error };
};
```

**Use Cases**:
- useAsync: Handle async operations
- useFetch: Fetch data on mount
- useLocalStorage: Persist state to localStorage
- useDebounce: Debounce user input
- usePagination: Manage pagination

### 3. Service Layer Pattern (Backend)
**Purpose**: Encapsulate business logic, separate from controllers

**Structure**:
```
Controller (HTTP handling)
    ↓
Service (Business logic)
    ↓
Model (Database operations)
```

**Example**:
```javascript
// Controller
export const createProduct = asyncHandler(async (req, res) => {
  const product = await productService.createProduct(req.body, req.user.id);
  return sendResponse(res, HTTP_STATUS.CREATED, "Success", product);
});

// Service
async createProduct(productData, userId) {
  const product = new Product({ ...productData, seller: userId });
  await product.save();
  return product;
}
```

**Benefits**:
- Easy to test
- Reusable logic
- Clear responsibilities
- Easy to maintain

### 4. Middleware Pattern (Backend)
**Purpose**: Process requests before they reach controllers

**Types**:
1. **Authentication Middleware**: Verify JWT tokens
2. **Authorization Middleware**: Check user roles
3. **Error Handling Middleware**: Catch and format errors
4. **Validation Middleware**: Validate input data

### 5. API Client Pattern
**Purpose**: Centralize all API requests

**Implementation**:
```javascript
class ApiClient {
  async request(endpoint, options) {
    // Handle request/response
  }
  
  get(endpoint) { ... }
  post(endpoint, body) { ... }
  put(endpoint, body) { ... }
  delete(endpoint) { ... }
}

export default new ApiClient();
```

**Benefits**:
- Single source for API calls
- Consistent error handling
- Easy to add authentication
- Easy to change API base URL

### 6. Endpoint Aggregation Pattern
**Purpose**: Organize API calls by feature

```javascript
// api/endpoints.js
export const authAPI = { register, login, logout, ... };
export const productAPI = { getAll, getById, create, ... };
export const cartAPI = { get, add, remove, ... };
```

**Benefits**:
- Easy to find endpoints
- Organized by feature
- Easy to refactor

## 🔄 Data Flow

### Authentication Flow
```
User fills login form
        ↓
Form submission → authService.login()
        ↓
API request → POST /auth/login
        ↓
Backend validates credentials
        ↓
JWT token generated
        ↓
Token stored in localStorage
        ↓
AuthContext updated with user data
        ↓
User redirected to home page
```

### Product Search Flow
```
User enters search query
        ↓
useDebounce hook waits 500ms
        ↓
ProductContext.searchProducts()
        ↓
API request → GET /products/search?q=...
        ↓
Backend searches MongoDB
        ↓
Results returned with pagination
        ↓
ProductContext state updated
        ↓
Components re-render with results
```

### Cart Management Flow
```
User clicks "Add to Cart"
        ↓
CartContext.addToCart(productId, quantity)
        ↓
API request → POST /cart/add
        ↓
Backend creates/updates cart in DB
        ↓
Returns updated cart with totals
        ↓
CartContext state updated
        ↓
Components re-render
```

## 🛡️ Error Handling Strategy

### Frontend Error Handling
```javascript
try {
  const data = await apiClient.post('/endpoint', body);
  // Handle success
} catch (error) {
  // error.data.message - from server
  // error.message - from fetch
  // Display user-friendly error
}
```

### Backend Error Handling
```javascript
try {
  // Logic
} catch (error) {
  if (error.status === 404) {
    throw new ApiError(404, "Not found");
  }
  throw new ApiError(500, "Internal error");
}

// Global error handler catches all errors
app.use(errorHandler);
```

## 📊 State Management Strategy

### Local State
```javascript
const [isLoading, setIsLoading] = useState(false);
```

### Context State (Global)
```javascript
const { user, isAuthenticated } = useAuth();
```

### URL State
```javascript
// /products?page=2&category=electronics
const { page, category } = useSearchParams();
```

### Local Storage State
```javascript
const [authToken, setAuthToken] = useLocalStorage('authToken', null);
```

## 🎯 Best Practices Implemented

### Frontend
1. **Component Composition**: Small, reusable components
2. **Prop Validation**: Props match expected structure
3. **Custom Hooks**: Extract logic into hooks
4. **Context Optimization**: Only update when necessary
5. **Error Boundaries**: Catch React errors
6. **Lazy Loading**: Code splitting for performance
7. **Memoization**: useCallback, useMemo for optimization

### Backend
1. **Separation of Concerns**: Controllers, services, models
2. **Input Validation**: Validate all inputs
3. **Error Handling**: Consistent error responses
4. **Security**: Password hashing, JWT, CORS
5. **Database Indexes**: For fast queries
6. **Environment Variables**: No hardcoded secrets
7. **Logging**: Log errors for debugging
8. **Pagination**: Handle large datasets
9. **API Versioning**: Prepare for v2 API

## 📈 Scalability Considerations

### Current Approach
- Context API for state management
- Single database for all operations
- JWT for stateless authentication

### Future Improvements
- Add Redux for complex state
- Implement caching (Redis)
- Add message queue (RabbitMQ)
- Implement microservices
- Add GraphQL for flexible queries
- Implement pagination and filtering
- Add search with Elasticsearch

## 🧪 Testing Strategy

### Frontend Testing
```javascript
// Unit tests for components
test('ProductCard renders correctly', () => {
  render(<ProductCard product={mockProduct} />);
  expect(screen.getByText('Product Name')).toBeInTheDocument();
});

// Integration tests for flows
test('User can add product to cart', async () => {
  // Test complete flow
});
```

### Backend Testing
```javascript
// Unit tests for services
test('authService.login validates credentials', async () => {
  const result = await authService.login('test@test.com', 'password');
  expect(result).toHaveProperty('user');
});

// Integration tests for routes
test('POST /auth/login returns token', async () => {
  const response = await request(app).post('/api/auth/login');
  expect(response.status).toBe(200);
});
```

## 🔒 Security Best Practices

1. **Password Security**
   - Hashed with bcrypt
   - Salt rounds: 10
   - Never stored in plain text

2. **JWT Security**
   - Signed with secret
   - Expires after 7 days
   - Verified on protected routes

3. **Input Validation**
   - Email format validation
   - Password strength check
   - Sanitization of inputs

4. **Authorization**
   - Role-based access control
   - User can only access own data
   - Admin endpoints require admin role

5. **CORS**
   - Configured for frontend URL
   - Prevents unauthorized cross-origin requests

## 📦 Dependency Management

### Backend
- **Express**: Web framework
- **Mongoose**: MongoDB ODM
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT authentication
- **dotenv**: Environment variables
- **cors**: Cross-origin handling

### Frontend
- **React**: UI library
- **React Router DOM**: Routing
- **Fetch API**: HTTP client (built-in)

## 🚀 Performance Optimizations

1. **Frontend**
   - Code splitting with Vite
   - Lazy loading components
   - Memoization of expensive computations
   - Debouncing user input

2. **Backend**
   - Database indexing
   - Pagination for large datasets
   - Lean queries (.lean())
   - Selective field projection

3. **General**
   - CDN for static assets
   - Gzip compression
   - Caching strategies
   - Monitoring and profiling

---

**This architecture is designed for:**
- ✅ Scalability
- ✅ Maintainability
- ✅ Testability
- ✅ Security
- ✅ Performance
- ✅ Developer Experience
