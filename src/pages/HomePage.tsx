
import React, { useState } from 'react';
import { useLanguage } from '../utils/languageUtils';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { restaurants } from '../data/mockData';
import RestaurantCard from '../components/RestaurantCard';
import { Icon } from '@/components/ui/icon';

const HomePage: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/restaurants?search=${searchTerm}`);
  };

  const featuredRestaurants = restaurants.filter(r => r.isOpen).slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-wang-cream to-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-wang-brown mb-4 font-kanit">
              {t('home.title')}
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8">
              {t('home.subtitle')}
            </p>
            
            <form onSubmit={handleSearch} className="relative">
              <div className="flex">
                <div className="relative flex-grow">
                  <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder={t('home.search')}
                    className="pl-10 pr-4 py-6 rounded-l-md w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button 
                  type="submit" 
                  className="bg-wang-orange hover:bg-wang-brown rounded-r-md"
                >
                  {t('action.search')}
                </Button>
              </div>
              
              <div className="flex mt-4 space-x-2">
                <Button
                  type="button"
                  variant={deliveryType === 'delivery' ? 'default' : 'outline'}
                  className={deliveryType === 'delivery' ? 'bg-wang-orange hover:bg-wang-brown' : ''}
                  onClick={() => setDeliveryType('delivery')}
                >
                  {t('home.delivery')}
                </Button>
                <Button
                  type="button"
                  variant={deliveryType === 'pickup' ? 'default' : 'outline'}
                  className={deliveryType === 'pickup' ? 'bg-wang-orange hover:bg-wang-brown' : ''}
                  onClick={() => setDeliveryType('pickup')}
                >
                  {t('home.pickup')}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      {/* Featured Restaurants */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-wang-brown">{t('restaurant.featured')}</h2>
            <Button 
              variant="link"
              className="text-wang-orange"
              onClick={() => navigate('/restaurants')}
            >
              {t('action.seeAll')}
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRestaurants.map(restaurant => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Local Favorites */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-wang-brown mb-6">Local Favorites</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card-wang p-4 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-wang-cream flex items-center justify-center mb-4">
                <Icon name="MapPin" className="h-12 w-12 text-wang-orange" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Local Delivery</h3>
              <p className="text-gray-600">Fast delivery from your favorite local restaurants straight to your door</p>
            </div>
            
            <div className="card-wang p-4 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-wang-cream flex items-center justify-center mb-4">
                <Icon name="Clock" className="h-12 w-12 text-wang-orange" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Real-time Tracking</h3>
              <p className="text-gray-600">Know exactly when your food will arrive with our real-time order tracking</p>
            </div>
            
            <div className="card-wang p-4 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-wang-cream flex items-center justify-center mb-4">
                <Icon name="Clock" className="h-12 w-12 text-wang-orange" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Scheduled Orders</h3>
              <p className="text-gray-600">Plan ahead and schedule your orders for the perfect timing</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Send Food Home */}
      <section className="py-16 bg-wang-orange text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Send Food to Your Family Back Home</h2>
            <p className="text-lg mb-8">Working overseas? You can still take care of your loved ones by ordering delicious food delivered right to their doorstep.</p>
            <Button className="bg-white text-wang-orange hover:bg-wang-cream hover:text-wang-brown">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
