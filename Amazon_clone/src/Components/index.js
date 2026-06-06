/**
 * Placeholder Components
 * These are templates for reusable components
 */

export const Header = () => (
  <header className="bg-white shadow-md py-4">
    <div className="container mx-auto px-4">Header - to be implemented</div>
  </header>
);

export const Footer = () => (
  <footer className="bg-gray-900 text-white py-8">
    <div className="container mx-auto px-4">Footer - to be implemented</div>
  </footer>
);

export const ProductCard = ({ product }) => (
  <div className="border rounded-lg p-4">
    <div className="mb-4 h-48 bg-gray-200">Image</div>
    <h3 className="font-semibold mb-2">{product?.name}</h3>
    <p className="text-gray-600 text-sm mb-2">{product?.price}</p>
    <button className="bg-blue-600 text-white py-2 px-4 rounded">Add to Cart</button>
  </div>
);

export const AdminSidebar = () => (
  <aside className="bg-gray-800 text-white w-64 p-4">
    <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
    <nav>
      <p className="py-2">Sidebar - to be implemented</p>
    </nav>
  </aside>
);

export default {
  Header,
  Footer,
  ProductCard,
  AdminSidebar,
};
