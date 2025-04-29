
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, MenuItem, Restaurant } from '../types';
import { toast } from "sonner";
import { useLanguage } from '../utils/languageUtils';

interface CartContextType {
  items: CartItem[];
  restaurant: Restaurant | null;
  addItem: (item: MenuItem, quantity?: number, options?: Record<string, string | string[]>) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  deliveryFee: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { t } = useLanguage();
  const [items, setItems] = useState<CartItem[]>([]);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [totalItems, setTotalItems] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Calculate cart totals whenever items change
    const itemCount = items.reduce((count, item) => count + item.quantity, 0);
    setTotalItems(itemCount);

    const subtotalAmount = items.reduce((sum, item) => {
      return sum + (item.item.price * item.quantity);
    }, 0);
    setSubtotal(subtotalAmount);

    // Set delivery fee from restaurant if available
    const fee = restaurant ? restaurant.deliveryFee : 0;
    setDeliveryFee(fee);

    setTotal(subtotalAmount + fee);
  }, [items, restaurant]);

  const addItem = (item: MenuItem, quantity = 1, selectedOptions?: Record<string, string | string[]>) => {
    // If adding item from a different restaurant, confirm with user
    if (restaurant && item.restaurantId !== restaurant.id) {
      // Create a new cart with the new restaurant
      clearCart();
    }

    // If this is the first item, set the restaurant
    if (!restaurant) {
      // Find the restaurant from the restaurantId
      // In a real app, you'd fetch this from API/context
      import('../data/mockData').then(({ restaurants }) => {
        const newRestaurant = restaurants.find(r => r.id === item.restaurantId);
        if (newRestaurant) {
          setRestaurant(newRestaurant);
          setDeliveryFee(newRestaurant.deliveryFee);
        }
      });
    }

    // Check if item already exists in cart
    const existingItemIndex = items.findIndex(cartItem => cartItem.item.id === item.id);

    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      const updatedItems = [...items];
      updatedItems[existingItemIndex].quantity += quantity;
      if (selectedOptions) {
        updatedItems[existingItemIndex].selectedOptions = selectedOptions;
      }
      setItems(updatedItems);
      toast.success(`${item.name} quantity updated`);
    } else {
      // Add new item to cart
      const newCartItem: CartItem = {
        item,
        quantity,
        selectedOptions
      };
      setItems(prev => [...prev, newCartItem]);
      toast.success(`${item.name} added to cart`);
    }
  };

  const removeItem = (itemId: string) => {
    setItems(prev => prev.filter(item => item.item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }

    setItems(prev => 
      prev.map(item => 
        item.item.id === itemId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setRestaurant(null);
    setDeliveryFee(0);
  };

  return (
    <CartContext.Provider value={{
      items,
      restaurant,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      subtotal,
      deliveryFee,
      total
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
