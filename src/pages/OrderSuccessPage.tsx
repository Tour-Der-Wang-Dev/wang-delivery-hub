
import React from 'react';
import { useLanguage } from '../utils/languageUtils';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Check, Clock, Home } from 'lucide-react';

const OrderSuccessPage: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">
            Your order has been placed successfully. You can track your order status on the orders page.
          </p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-8">
          <div className="flex items-center justify-center mb-2">
            <Clock className="h-5 w-5 text-wang-orange mr-2" />
            <span className="font-medium">Estimated delivery time:</span>
          </div>
          <p className="text-xl font-bold">30-45 minutes</p>
        </div>
        
        <div className="space-y-4">
          <Button 
            className="w-full bg-wang-orange hover:bg-wang-brown"
            onClick={() => navigate('/orders')}
          >
            {t('action.track')}
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => navigate('/')}
          >
            <Home className="h-4 w-4 mr-2" />
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
