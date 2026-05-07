import { ShoppingCart, Wrench, User, LayoutGrid, LogOut } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

type Page = 'account' | 'tools' | 'basket';
type NavItem = { page: Page; label: string; path: string; icon: React.ReactNode, dataId: string };

export default function Header() {
  const { logout } = useAuth();
  const { totalCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems: NavItem[] = [
    { page: 'account', label: 'Account', path: '/account', icon: <User size={16} /> , dataId: "nav-account"},
    { page: 'tools', label: 'My Tools', path: '/tools', icon: <LayoutGrid size={16} />, dataId: "" },
    { page: 'basket', label: 'Basket', path: '/basket', icon: <ShoppingCart size={16} />, dataId: "nav-basket" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => navigate('/tools')}
            className="flex items-center gap-2 text-blue-600 font-bold text-xl tracking-tight hover:text-blue-700 transition-colors"
          >
            <Wrench size={24} />
            <span>ToolShop</span>
          </button>

          {/* Nav */}
          <nav className="flex items-center gap-1">
            {navItems.map(({ page, label, path, icon, dataId }) => (
              <button
              data-qa={dataId}
                key={page}
                onClick={() => navigate(path)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 relative ${
                  location.pathname === path
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {icon}
                <span className="hidden sm:inline">{label}</span>
                {page === 'basket' && totalCount > 0 && (
                  <span data-qa="nav-basket-count" className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-semibold leading-none">
                    {totalCount > 9 ? '9+' : totalCount}
                  </span>
                )}
              </button>
            ))}
            <div className="w-px h-6 bg-gray-200 mx-1" />
            <button
              onClick={logout}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all duration-150"
              title="Logout"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
