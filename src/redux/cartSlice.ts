// src/redux/cartSlice.ts
import { Product } from '../types/Products';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Save cart to localStorage
const saveCartToLocalStorage = (cartItems: Product[]) => {

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error("Could not save cart to localStorage", error);
    }  }
};

interface CartState {
  items: Product[];
}

const initialState: CartState = {
  items: [], // Start with an empty cart
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const newItem = action.payload;
      state.items.push(newItem);
      saveCartToLocalStorage(state.items); // Save updated cart to localStorage
    },
    removeFromCart: (state, action: PayloadAction<Product>) => {
      state.items = state.items.filter(item => item._id !== action.payload._id);
      saveCartToLocalStorage(state.items); // Save updated cart to localStorage
    },
    setCart: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload; // Set cart items from local storage
    },
    clearCart: (state) => {
      state.items = []; // Clear cart
      localStorage.removeItem('cart'); // Remove cart from localStorage
    }
  },
});

export const { addToCart, removeFromCart, setCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;