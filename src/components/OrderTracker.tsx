
import React from 'react';
import { Order } from '../types';
import { useLanguage } from '../utils/languageUtils';
import { Check, Clock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface OrderTrackerProps {
  order: Order;
}

const OrderTracker: React.FC<OrderTrackerProps> = ({ order }) => {
  const { t } = useLanguage();
  
  const statuses = [
    'pending', 
    'confirmed', 
    'preparing', 
    'ready', 
    'delivering', 
    'delivered', 
    'completed'
  ];
  
  const getCurrentStep = () => {
    const currentIdx = statuses.indexOf(order.status);
    return currentIdx >= 0 ? currentIdx : 0;
  };
  
  const currentStep = getCurrentStep();
  const progress = (currentStep / (statuses.length - 1)) * 100;
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-lg">{t('order.tracking')}</h3>
        <div className="text-sm bg-wang-cream text-wang-brown py-1 px-2 rounded-full">
          {order.orderType === 'delivery' ? t('home.delivery') : t('home.pickup')}
        </div>
      </div>
      
      <div className="mb-6">
        <p className="text-sm text-gray-500">Order #{order.id}</p>
        <div className="flex justify-between items-center mt-2">
          <p className="font-medium">{t(`order.status.${order.status}`)}</p>
          {order.deliveryTime && (
            <div className="flex items-center text-sm text-gray-700">
              <Clock className="w-4 h-4 mr-1" />
              <span>ETA: {order.deliveryTime}</span>
            </div>
          )}
        </div>
      </div>
      
      <Progress value={progress} className="h-2 mb-6" />
      
      <div className="space-y-4">
        {statuses.map((status, index) => {
          const isCompleted = index <= currentStep;
          const isCurrent = index === currentStep;
          
          return (
            <div 
              key={status}
              className={`flex items-center ${isCompleted ? 'text-gray-800' : 'text-gray-400'}`}
            >
              <div className={`
                w-6 h-6 rounded-full flex items-center justify-center mr-3
                ${isCompleted ? 'bg-wang-orange text-white' : 'bg-gray-200 text-gray-500'}
                ${isCurrent ? 'ring-2 ring-wang-orange ring-offset-2' : ''}
              `}>
                {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
              </div>
              <span className={isCurrent ? 'font-medium' : ''}>
                {t(`order.status.${status}`)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderTracker;
