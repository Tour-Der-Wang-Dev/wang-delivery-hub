
import React from 'react';
import { Restaurant } from '../types';
import { useLanguage } from '../utils/languageUtils';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { Icon } from '@/components/ui/icon';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/restaurant/${restaurant.id}`);
  };

  return (
    <div 
      className="card-wang cursor-pointer group"
      onClick={handleClick}
    >
      <div className="relative h-40 overflow-hidden">
        <OptimizedImage 
          src={restaurant.image} 
          alt={restaurant.name} 
          className="w-full h-full"
          loadingStrategy={restaurant.featured ? 'eager' : 'lazy'}
        />
        {!restaurant.isOpen && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-semibold uppercase tracking-wider">
              Closed
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg group-hover:text-wang-orange transition-colors">{restaurant.name}</h3>
          <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-md">
            <Icon name="Star" className="w-4 h-4 text-yellow-600" />
            <span className="text-gray-700 text-sm ml-1">{restaurant.rating}</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">{restaurant.description}</p>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {restaurant.categories.slice(0, 3).map((category, idx) => (
            <Badge key={idx} variant="outline" className="bg-wang-cream text-wang-brown">
              {category}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mt-2">
          <div>
            {restaurant.deliveryFee > 0 ? (
              <div className="flex items-center">
                <Icon name="Truck" className="w-4 h-4 mr-1" />
                <span>฿{restaurant.deliveryFee} {t('cart.deliveryFee')}</span>
              </div>
            ) : (
              <span className="text-green-600">Free Delivery</span>
            )}
          </div>
          <div className="flex items-center">
            <Icon name="Clock" className="w-4 h-4 mr-1" />
            <span>{restaurant.deliveryTime} {t('restaurant.min')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(RestaurantCard);
