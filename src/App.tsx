import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/useAuth";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Header from "./components/Header";
import AccountPage from "./pages/AccountPage";
import ToolsPage from "./pages/ToolsPage";
import BasketPage from "./pages/BasketPage";
import { CartProvider } from "./context/CartContext";

function AuthRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

function AppShell() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  // Show loading state while checking auth
  if (isLoading && !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) return <AuthRoutes />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <Routes>
          <Route path="/account" element={<AccountPage />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route
            path="/basket"
            element={<BasketPage onShop={() => navigate("/tools")} />}
          />
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
