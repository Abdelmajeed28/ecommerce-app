// function CartItem() {
//   const { items, totalQuantity, totalPrice } = useSelector(
//     (state) => state.cart,
//   );
//   return <div>CartItem</div>;
// }

// export default CartItem;
import { Minus, Plus, Trash2 } from "lucide-react";

function CartItem({ item, onRemove, onUpdateQuantity }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 flex gap-4 items-center">
      {/* img */}
      <img
        src={item.image}
        alt={item.title}
        className="w-20 h-20 object-cover rounded-xl flex-shrink-0"
      />

      {/* name , category and price*/}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-800 truncate">{item.title}</p>
        <p className="text-xs text-gray-400 uppercase tracking-wider mt-0.5">
          {item.category} Edition
        </p>
        <p className="text-blue-600 font-bold text-lg mt-1">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>

      {/* quantity and deleting */}
      <div className="flex flex-col items-end gap-3 flex-shrink-0">
        {/* quantity */}
        <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-1.5">
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            className="text-gray-500 hover:text-blue-600 transition-colors active:scale-95"
          >
            <Minus size={14} />
          </button>
          <span className="font-bold text-gray-800 w-5 text-center text-sm">
            {item.quantity}
          </span>
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="text-gray-500 hover:text-blue-600 transition-colors active:scale-95"
          >
            <Plus size={14} />
          </button>
        </div>

        {/* delete */}
        <button
          onClick={() => onRemove(item.id)}
          className="flex items-center gap-1 text-red-400 hover:text-red-600 text-xs transition-colors active:scale-95"
        >
          <Trash2 size={14} />
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;
