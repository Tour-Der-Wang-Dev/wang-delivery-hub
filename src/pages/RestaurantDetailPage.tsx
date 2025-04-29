
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '../utils/languageUtils';
import { restaurants, menuItems } from '../data/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import MenuItemCard from '../components/MenuItemCard';
import { Restaurant as RestaurantType, MenuItem } from '../types';

const RestaurantDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  const [restaurant, setRestaurant] = useState<RestaurantType | null>(null);
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    if (id) {
      const restaurantData = restaurants.find(r => r.id === id);
      if (restaurantData) {
        setRestaurant(restaurantData);
        
        const restaurantMenu = menuItems[id] || [];
        setMenu(restaurantMenu);
        
        // Extract unique categories from menu items
        const uniqueCategories = Array.from(
          new Set(restaurantMenu.map(item => item.category))
        );
        setCategories(uniqueCategories);
        
        if (uniqueCategories.length > 0) {
          setActiveCategory(uniqueCategories[0]);
        }
      }
    }
  }, [id]);

  if (!restaurant) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p>Restaurant not found</p>
      </div>
    );
  }

  const filteredMenu = activeCategory === 'all' 
    ? menu 
    : menu.filter(item => item.category === activeCategory);

  return (
    <div>
      {/* Restaurant Header */}
      <div className="relative h-64 md:h-80 bg-gray-200">
        <img 
          src={restaurant.image} 
          alt={restaurant.name}
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{restaurant.name}</h1>
              <p className="text-white/90 mb-4">{restaurant.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {restaurant.categories.map((category, idx) => (
                  <Badge key={idx} className="bg-wang-orange/80 text-white">
                    {category}
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center space-x-4 text-white">
                <div className="flex items-center">
                  <span className="text-yellow-400 mr-1">★</span>
                  <span>{restaurant.rating}</span>
                </div>
                <div>
                  {restaurant.deliveryTime} min
                </div>
                <div>
                  ฿{restaurant.deliveryFee} delivery
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Restaurant Menu */}
      <div className="container mx-auto px-4 py-8">
        {/* Category tabs */}
        <Tabs defaultValue={activeCategory} onValueChange={setActiveCategory} className="mb-8">
          <TabsList className="mb-2 md:mb-0 overflow-x-auto flex flex-nowrap py-1 justify-start">
            {categories.map(category => (
              <TabsTrigger
                key={category}
                value={category}
                className="whitespace-nowrap"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {categories.map(category => (
            <TabsContent key={category} value={category} className="space-y-4">
              {menu
                .filter(item => item.category === category)
                .map(item => (
                  <MenuItemCard key={item.id} menuItem={item} />
                ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>
      
      {/* Restaurant Info */}
      <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4">Restaurant Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-2">Address</h3>
              <p className="text-gray-700">{restaurant.address}</p>
              
              <h3 className="font-semibold mt-4 mb-2">Hours</h3>
              <div className="space-y-1">
                <p className="text-gray-700">Monday - Friday: 10:00 AM - 10:00 PM</p>
                <p className="text-gray-700">Saturday - Sunday: 11:00 AM - 11:00 PM</p>
              </div>
              
              <h3 className="font-semibold mt-4 mb-2">Contact</h3>
              <p className="text-gray-700">Phone: +66 12 345 6789</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Delivery Information</h3>
              <div className="space-y-1">
                <p className="text-gray-700">Delivery Fee: ฿{restaurant.deliveryFee}</p>
                <p className="text-gray-700">Delivery Time: {restaurant.deliveryTime} min</p>
                <p className="text-gray-700">Minimum Order: ฿{restaurant.minOrder}</p>
              </div>
              
              {restaurant.selfDelivery && (
                <div className="mt-4">
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                    Self Delivery
                  </Badge>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailPage;
