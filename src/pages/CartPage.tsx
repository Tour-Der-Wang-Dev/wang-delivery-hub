
import React, { useState } from 'react';
import { useLanguage } from '../utils/languageUtils';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { Trash, Plus, Minus, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const CartPage: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { items, restaurant, removeItem, updateQuantity, subtotal, deliveryFee, total } = useCart();
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('promptpay');

  const continueToCheckout = () => {
    // In a real app, we would save the order details and navigate to checkout
    // For this prototype, we'll just navigate to a success page
    navigate('/order-success');
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-lg mx-auto text-center">
          <ShoppingCart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold mb-2">{t('cart.empty')}</h1>
          <p className="text-gray-600 mb-6">Add items from restaurants to get started</p>
          <Button 
            className="bg-wang-orange hover:bg-wang-brown"
            onClick={() => navigate('/restaurants')}
          >
            Browse Restaurants
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">{t('cart.title')}</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          {restaurant && (
            <div className="mb-4 bg-white p-4 rounded-lg shadow-sm">
              <h2 className="font-semibold text-lg">{restaurant.name}</h2>
              <p className="text-sm text-gray-600">{restaurant.address}</p>
            </div>
          )}
          
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            {items.map((cartItem) => (
              <div key={cartItem.item.id} className="py-4 border-b last:border-b-0">
                <div className="flex justify-between">
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium">
                        {cartItem.item.name} <span className="text-gray-500">×{cartItem.quantity}</span>
                      </h3>
                      <p className="font-medium">฿{cartItem.item.price * cartItem.quantity}</p>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">{cartItem.item.description}</p>
                    
                    {cartItem.selectedOptions && Object.entries(cartItem.selectedOptions).length > 0 && (
                      <div className="text-sm text-gray-700 mb-2">
                        {Object.entries(cartItem.selectedOptions).map(([optionName, value]) => (
                          <div key={optionName}>
                            <span className="font-medium">{optionName}:</span>{' '}
                            {Array.isArray(value) ? value.join(', ') : value}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex items-center mt-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8 rounded-full"
                        onClick={() => updateQuantity(cartItem.item.id, cartItem.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="mx-3">{cartItem.quantity}</span>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-8 w-8 rounded-full"
                        onClick={() => updateQuantity(cartItem.item.id, cartItem.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="ml-4 text-red-500 hover:text-red-700"
                        onClick={() => removeItem(cartItem.item.id)}
                      >
                        <Trash className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <h2 className="font-semibold mb-3">Special Instructions</h2>
            <Textarea
              placeholder="Add any special instructions for your order..."
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              className="w-full"
              rows={3}
            />
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-sm p-4 sticky top-24">
            <h2 className="font-bold text-lg mb-4">Order Summary</h2>
            
            <div className="mb-4">
              <h3 className="font-medium mb-2">Delivery Options</h3>
              <RadioGroup value={orderType} onValueChange={(value) => setOrderType(value as 'delivery' | 'pickup')}>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="delivery" id="delivery" />
                  <Label htmlFor="delivery">{t('home.delivery')}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pickup" id="pickup" />
                  <Label htmlFor="pickup">{t('home.pickup')}</Label>
                </div>
              </RadioGroup>
            </div>
            
            {orderType === 'delivery' && (
              <div className="mb-4">
                <h3 className="font-medium mb-2">Delivery Address</h3>
                <Select defaultValue="home">
                  <SelectTrigger>
                    <SelectValue placeholder="Choose address" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="home">Home - 123 Main St</SelectItem>
                    <SelectItem value="work">Work - 456 Office Blvd</SelectItem>
                    <SelectItem value="new">+ Add New Address</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            
            <div className="mb-4">
              <h3 className="font-medium mb-2">Payment Method</h3>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="promptpay" id="promptpay" />
                  <Label htmlFor="promptpay">PromptPay</Label>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="credit_card" id="credit_card" />
                  <Label htmlFor="credit_card">Credit Card</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cash" id="cash" />
                  <Label htmlFor="cash">Cash on Delivery</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">{t('cart.subtotal')}</span>
                <span>฿{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t('cart.deliveryFee')}</span>
                <span>฿{deliveryFee}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-semibold">
                <span>{t('cart.total')}</span>
                <span>฿{total}</span>
              </div>
            </div>
            
            <Button 
              className="w-full bg-wang-orange hover:bg-wang-brown"
              onClick={continueToCheckout}
            >
              {t('action.checkout')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
