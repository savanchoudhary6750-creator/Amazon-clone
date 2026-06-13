import dotenv from "dotenv";
import Product from "./models/Product.js";
import connectDB from "./config/db.js";

dotenv.config();

const sampleProducts = [
  {
    name: "Wireless Bluetooth Headphones",
    description: "High-quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music, calls, and gaming.",
    price: 79.99,
    originalPrice: 99.99,
    discount: 20,
    category: "electronics",
    subcategory: "audio",
    brand: "SoundMax",
    stock: 50,
    images: [
      { url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop", alt: "Wireless Headphones" }
    ],
    thumbnail: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    rating: 4.5,
    numReviews: 128,
    tags: ["wireless", "bluetooth", "audio", "headphones"],
    isFeatured: true,
    isActive: true
  },
  {
    name: "Smart Watch Pro",
    description: "Advanced smartwatch with heart rate monitoring, GPS tracking, and 7-day battery life. Water-resistant up to 50m.",
    price: 199.99,
    originalPrice: 249.99,
    discount: 20,
    category: "electronics",
    subcategory: "wearables",
    brand: "TechFit",
    stock: 30,
    images: [
      { url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop", alt: "Smart Watch" }
    ],
    thumbnail: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    rating: 4.7,
    numReviews: 256,
    tags: ["smartwatch", "fitness", "gps", "wearable"],
    isFeatured: true,
    isActive: true
  },
  {
    name: "Laptop Backpack 15.6 inch",
    description: "Durable and water-resistant laptop backpack with USB charging port, multiple compartments, and padded shoulder straps.",
    price: 39.99,
    originalPrice: 49.99,
    discount: 20,
    category: "electronics",
    subcategory: "accessories",
    brand: "TravelPro",
    stock: 100,
    images: [
      { url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop", alt: "Laptop Backpack" }
    ],
    thumbnail: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    rating: 4.3,
    numReviews: 89,
    tags: ["backpack", "laptop", "travel", "accessories"],
    isFeatured: false,
    isActive: true
  },
  {
    name: "Men's Classic Fit Cotton T-Shirt",
    description: "Comfortable 100% cotton t-shirt with classic fit. Available in multiple colors. Machine washable.",
    price: 19.99,
    originalPrice: 24.99,
    discount: 20,
    category: "clothing",
    subcategory: "men",
    brand: "ComfortWear",
    stock: 200,
    images: [
      { url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop", alt: "Men's T-Shirt" }
    ],
    thumbnail: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    rating: 4.2,
    numReviews: 345,
    tags: ["clothing", "men", "t-shirt", "cotton"],
    isFeatured: false,
    isActive: true
  },
  {
    name: "Women's Running Shoes",
    description: "Lightweight running shoes with breathable mesh upper, cushioned sole, and excellent traction for all terrains.",
    price: 59.99,
    originalPrice: 79.99,
    discount: 25,
    category: "clothing",
    subcategory: "women",
    brand: "SpeedRun",
    stock: 75,
    images: [
      { url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop", alt: "Women's Running Shoes" }
    ],
    thumbnail: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    rating: 4.6,
    numReviews: 178,
    tags: ["shoes", "running", "women", "athletic"],
    isFeatured: true,
    isActive: true
  },
  {
    name: "JavaScript: The Complete Guide",
    description: "Comprehensive guide to JavaScript programming from beginner to advanced. Includes practical examples and projects.",
    price: 29.99,
    originalPrice: 39.99,
    discount: 25,
    category: "books",
    subcategory: "programming",
    brand: "TechBooks",
    stock: 50,
    images: [
      { url: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=400&fit=crop", alt: "JavaScript Book" }
    ],
    thumbnail: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=400&fit=crop",
    rating: 4.8,
    numReviews: 412,
    tags: ["javascript", "programming", "book", "education"],
    isFeatured: true,
    isActive: true
  },
  {
    name: "The Great Gatsby",
    description: "Classic American novel by F. Scott Fitzgerald. A timeless story of love, wealth, and the American Dream.",
    price: 12.99,
    originalPrice: 15.99,
    discount: 19,
    category: "books",
    subcategory: "fiction",
    brand: "ClassicLit",
    stock: 100,
    images: [
      { url: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop", alt: "The Great Gatsby" }
    ],
    thumbnail: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop",
    rating: 4.5,
    numReviews: 567,
    tags: ["fiction", "classic", "literature", "novel"],
    isFeatured: false,
    isActive: true
  },
  {
    name: "Stainless Steel Water Bottle",
    description: "Insulated water bottle keeps drinks cold for 24 hours or hot for 12 hours. BPA-free and eco-friendly.",
    price: 24.99,
    originalPrice: 29.99,
    discount: 17,
    category: "home",
    subcategory: "kitchen",
    brand: "EcoLife",
    stock: 150,
    images: [
      { url: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop", alt: "Water Bottle" }
    ],
    thumbnail: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
    rating: 4.4,
    numReviews: 234,
    tags: ["water", "bottle", "insulated", "eco-friendly"],
    isFeatured: false,
    isActive: true
  },
  {
    name: "LED Desk Lamp with Wireless Charger",
    description: "Modern LED desk lamp with adjustable brightness, color temperature control, and built-in wireless phone charger.",
    price: 44.99,
    originalPrice: 59.99,
    discount: 25,
    category: "home",
    subcategory: "lighting",
    brand: "BrightHome",
    stock: 60,
    images: [
      { url: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop", alt: "LED Desk Lamp" }
    ],
    thumbnail: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop",
    rating: 4.6,
    numReviews: 145,
    tags: ["lamp", "LED", "wireless", "charger"],
    isFeatured: true,
    isActive: true
  },
  {
    name: "4K Ultra HD Smart TV 55 inch",
    description: "55-inch 4K Smart TV with HDR, built-in streaming apps, and voice control. Perfect for home entertainment.",
    price: 499.99,
    originalPrice: 599.99,
    discount: 17,
    category: "electronics",
    subcategory: "tv",
    brand: "ViewTech",
    stock: 25,
    images: [
      { url: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&h=600&fit=crop", alt: "4K Smart TV" }
    ],
    thumbnail: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&h=600&fit=crop",
    rating: 4.7,
    numReviews: 89,
    tags: ["tv", "4k", "smart", "entertainment"],
    isFeatured: true,
    isActive: true
  },
  {
    name: "Organic Coffee Beans 1kg",
    description: "Premium organic Arabica coffee beans, medium roast. Rich flavor with hints of chocolate and caramel.",
    price: 18.99,
    originalPrice: 22.99,
    discount: 17,
    category: "home",
    subcategory: "kitchen",
    brand: "BrewMaster",
    stock: 80,
    images: [
      { url: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop", alt: "Coffee Beans" }
    ],
    thumbnail: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop",
    rating: 4.8,
    numReviews: 312,
    tags: ["coffee", "organic", "beans", "kitchen"],
    isFeatured: false,
    isActive: true
  },
  {
    name: "Yoga Mat Premium",
    description: "Extra thick yoga mat with non-slip surface. Includes carrying strap. Perfect for yoga, pilates, and meditation.",
    price: 29.99,
    originalPrice: 39.99,
    discount: 25,
    category: "home",
    subcategory: "fitness",
    brand: "ZenFit",
    stock: 90,
    images: [
      { url: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop", alt: "Yoga Mat" }
    ],
    thumbnail: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop",
    rating: 4.5,
    numReviews: 198,
    tags: ["yoga", "fitness", "mat", "exercise"],
    isFeatured: false,
    isActive: true
  }
];

const seedProducts = async () => {
  try {
    await connectDB();
    
    // Clear existing products to force re-seeding with new images
    console.log("Clearing existing products...");
    await Product.deleteMany({});
    
    console.log("Seeding products to database...");
    
    await Product.insertMany(sampleProducts);
    
    console.log("✅ Successfully seeded 12 sample products with Unsplash images!");
    console.log("Product categories: electronics, clothing, books, home");
    console.log("Featured products: 5");
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding products:", error.message);
    process.exit(1);
  }
};

seedProducts();
