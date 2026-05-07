import { ShoppingCart, Wrench, User, LayoutGrid, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

type Page = 'account' | 'tools' | 'basket';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const { logout } = useAuth();
  const { totalCount } = useCart();

  const navItems: { page: Page; label: string; icon: React.ReactNode }[] = [
    { page: 'account', label: 'Account', icon: <User size={16} /> },
    { page: 'tools', label: 'My Tools', icon: <LayoutGrid size={16} /> },
    { page: 'basket', label: 'Basket', icon: <ShoppingCart size={16} /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => onNavigate('tools')}
            className="flex items-center gap-2 text-blue-600 font-bold text-xl tracking-tight hover:text-blue-700 transition-colors"
          >
            <Wrench size={24} />
            <span>ToolShop</span>
          </button>

          {/* Nav */}
          <nav className="flex items-center gap-1">
            {navItems.map(({ page, label, icon }) => (
              <button
                key={page}
                onClick={() => onNavigate(page)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 relative ${
                  currentPage === page
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {icon}
                <span className="hidden sm:inline">{label}</span>
                {page === 'basket' && totalCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-semibold leading-none">
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
