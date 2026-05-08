import { ShoppingCart, Tag } from 'lucide-react';
import { Tool } from '../types';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const { addToCart, items } = useCart();
  const [added, setAdded] = useState(false);

  const inCart = items.find(i => i.tool.id === tool.id);

  const handleAdd = () => {
    addToCart(tool);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      {/* Image */}
      <div className="relative bg-gray-50 overflow-hidden aspect-[4/3]">
        <img
          src={tool.image}
          alt={tool.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              `https://placehold.co/400x300/f1f5f9/94a3b8?text=${encodeURIComponent(tool.name)}`;
          }}
        />
        <span
          className="absolute top-2 left-2 inline-flex items-center gap-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-600 px-2 py-0.5 rounded-full border border-gray-200"
          data-qa="tool-title"
        >
          <Tag size={10} />
          {tool.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-base leading-snug mb-1">
            {tool.name}
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
            {tool.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-xl font-bold text-gray-900">
            ${tool.price.toFixed(2)}
          </span>
          <button
            data-qa="product-button"
            onClick={handleAdd}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
              added
                ? "bg-green-500 text-white scale-95"
                : "bg-blue-600 hover:bg-blue-700 text-white active:scale-95"
            }`}
          >
            <ShoppingCart size={15} />
            {added ? "Added!" : inCart ? "Add More" : "Add to Basket"}
          </button>
        </div>
      </div>
    </div>
  );
}
