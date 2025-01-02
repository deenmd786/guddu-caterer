// src/redux/cartSlice.ts
import { Product } from '../types/Products';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Save cart to localStorage
const saveCartToLocalStorage = (cartItems: Product[]) => {

  if (typeof window !== 'undefined') {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }
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
  },
});

export const { addToCart, removeFromCart, setCart } = cartSlice.actions;

export default cartSlice.reducer;