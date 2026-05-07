import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import Header from './components/Header';
import AccountPage from './pages/AccountPage';
import ToolsPage from './pages/ToolsPage';
import BasketPage from './pages/BasketPage';
import { CartProvider } from './context/CartContext';

function AppShell() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return <LoginPage />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <Routes>
          <Route path="/account" element={<AccountPage />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/basket" element={<BasketPage onShop={() => navigate('/tools')} />} />
          <Route path="*" element={<Navigate to="/tools" replace />} />
        </Routes>
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
