import { createContext, useContext, useReducer } from "react";
import { getProductById } from "../data/products";

const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const existing = state.find((i) => i.id === action.payload.id);
      if (existing) {
        return state.map((i) =>
          i.id === action.payload.id ? { ...i, qty: i.qty + (action.payload.qty || 1) } : i
        );
      }
      return [...state, { ...action.payload, qty: action.payload.qty || 1 }];
    }
    case "REMOVE":
      return state.filter((i) => i.id !== action.payload);
    case "UPDATE_QTY": {
      if (action.payload.qty < 1) return state.filter((i) => i.id !== action.payload.id);
      return state.map((i) =>
        i.id === action.payload.id ? { ...i, qty: action.payload.qty } : i
      );
    }
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, []);

  const addToCart = (productId, qty = 1) => {
    const product = getProductById(productId);
    if (product) dispatch({ type: "ADD", payload: { ...product, qty } });
  };

  const removeFromCart = (id) => dispatch({ type: "REMOVE", payload: id });
  const updateQty = (id, qty) => dispatch({ type: "UPDATE_QTY", payload: { id, qty } });
  const clearCart = () => dispatch({ type: "CLEAR" });

  const totalItems = items.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  const value = {
    items,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
