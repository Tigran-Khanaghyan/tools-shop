import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import Header from './components/Header';
import AccountPage from './pages/AccountPage';
import ToolsPage from './pages/ToolsPage';
import BasketPage from './pages/BasketPage';
import { CartProvider } from './context/CartContext';

type Page = 'account' | 'tools' | 'basket';

function AppShell() {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>('tools');

  if (!user) return <LoginPage />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      <main>
        {currentPage === 'account' && <AccountPage />}
        {currentPage === 'tools' && <ToolsPage />}
        {currentPage === 'basket' && <BasketPage onShop={() => setCurrentPage('tools')} />}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppShell />
      </CartProvider>
    </AuthProvider>
  );
}
