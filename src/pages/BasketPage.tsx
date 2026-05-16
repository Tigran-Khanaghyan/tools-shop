import { useState } from "react";
import { Trash2, Plus, Minus, ShoppingBag, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import PaymentModal from "../components/PaymentModal";

interface BasketPageProps {
  onShop: () => void;
}

export default function BasketPage({ onShop }: BasketPageProps) {
  const { items, removeFromCart, updateQuantity, clearCart, subtotal } =
    useCart();
  const [showPayment, setShowPayment] = useState(false);

  const shipping = subtotal >= 100 ? 0 : 9.99;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col items-center text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-3xl flex items-center justify-center mb-5">
          <ShoppingCart size={36} className="text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Your basket is empty
        </h2>
        <p className="text-gray-500 mb-6 max-w-xs">
          Looks like you haven't added any tools yet. Start browsing our
          collection.
        </p>
        <button
          onClick={onShop}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          Browse Tools
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Your Basket</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {items.length} item{items.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={clearCart}
          className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-700 font-medium transition-colors"
        >
          <Trash2 size={14} />
          Clear all
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Items */}
        <div className="lg:col-span-2 flex flex-col gap-3">
          {items.map(({ tool, quantity }) => (
            <div
              data-qa="basket-card"
              key={tool.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex gap-4 items-center group hover:border-gray-200 transition-colors"
            >
              {/* Image */}
              <div className="w-20 h-20 rounded-xl bg-gray-50 overflow-hidden flex-shrink-0">
                <img
                  src={tool.image}
                  alt={tool.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      `https://placehold.co/80x80/f1f5f9/94a3b8?text=${encodeURIComponent(tool.name.charAt(0))}`;
                  }}
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 text-sm leading-snug">
                  {tool.name}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{tool.category}</p>
                <p className="text-sm font-bold text-gray-900 mt-1">
                  ${tool.price.toFixed(2)}
                </p>
              </div>

              {/* Qty controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(tool.id, -1)}
                  className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors"
                >
                  <Minus size={13} />
                </button>
                <span className="w-6 text-center text-sm font-semibold text-gray-900">
                  {quantity}
                </span>
                <button
                  onClick={() => updateQuantity(tool.id, 1)}
                  className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors"
                >
                  <Plus size={13} />
                </button>
              </div>

              {/* Line total */}
              <div className="text-right flex-shrink-0 ml-2">
                <p
                  className="text-sm font-bold text-gray-900"
                  data-qa="basket-card-price"
                >
                  ${(tool.price * quantity).toFixed(2)}
                </p>
                <button
                  data-qa="remove-basket-card"
                  onClick={() => removeFromCart(tool.id)}
                  className="mt-1 text-gray-300 hover:text-red-500 transition-colors"
                  title="Remove"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24">
            <h2 className="font-semibold text-gray-900 mb-5 text-lg">
              Order Summary
            </h2>

            <div className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span
                  className={`font-medium ${shipping === 0 ? "text-green-600" : "text-gray-900"}`}
                >
                  {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-gray-400">
                  Free shipping on orders over $100
                </p>
              )}
              <div className="border-t border-gray-100 pt-3 flex justify-between">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="font-bold text-gray-900 text-lg">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              data-qa="proceed-to-payment"
              onClick={() => setShowPayment(true)}
              className="mt-6 w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition-colors active:scale-[0.98]"
            >
              <ShoppingBag size={17} />
              Proceed to Payment
            </button>

            <button
              onClick={onShop}
              className="mt-3 w-full text-sm text-gray-500 hover:text-gray-700 py-2 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>

      {showPayment && (
        <PaymentModal total={total} onClose={() => setShowPayment(false)} />
      )}
    </div>
  );
}
