
import React, { useState } from 'react';
import { useLanguage } from '../utils/languageUtils';
import { activeOrder, pastOrders } from '../data/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';
import OrderTracker from '../components/OrderTracker';

const OrdersPage: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState('active');
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getStatusBadge = (status: string) => {
    let color;
    
    switch(status) {
      case 'pending':
        color = 'bg-yellow-100 text-yellow-800';
        break;
      case 'confirmed':
        color = 'bg-blue-100 text-blue-800';
        break;
      case 'preparing':
        color = 'bg-purple-100 text-purple-800';
        break;
      case 'ready':
        color = 'bg-indigo-100 text-indigo-800';
        break;
      case 'delivering':
        color = 'bg-orange-100 text-orange-800';
        break;
      case 'delivered':
        color = 'bg-green-100 text-green-800';
        break;
      case 'completed':
        color = 'bg-green-100 text-green-800';
        break;
      case 'cancelled':
        color = 'bg-red-100 text-red-800';
        break;
      default:
        color = 'bg-gray-100 text-gray-800';
    }
    
    return (
      <Badge className={color + ' capitalize'}>
        {t(`order.status.${status}`)}
      </Badge>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">{t('nav.orders')}</h1>
      
      <Tabs defaultValue={activePage} onValueChange={setActivePage} className="mb-8">
        <TabsList>
          <TabsTrigger value="active">Active Orders</TabsTrigger>
          <TabsTrigger value="past">Order History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active">
          {activeOrder ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Order #{activeOrder.id}</h2>
                    {getStatusBadge(activeOrder.status)}
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4">
                    Placed on {formatDate(activeOrder.createdAt)}
                  </p>
                  
                  <Separator className="mb-4" />
                  
                  <h3 className="font-medium mb-2">Items</h3>
                  <div className="space-y-3 mb-6">
                    {activeOrder.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between">
                        <div>
                          <span className="font-medium">{item.quantity}x</span> {item.item.name}
                        </div>
                        <div>฿{item.item.price * item.quantity}</div>
                      </div>
                    ))}
                  </div>
                  
                  <Separator className="mb-4" />
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('cart.subtotal')}</span>
                      <span>฿{activeOrder.subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('cart.deliveryFee')}</span>
                      <span>฿{activeOrder.deliveryFee}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-semibold">
                      <span>{t('cart.total')}</span>
                      <span>฿{activeOrder.total}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <OrderTracker order={activeOrder} />
              </div>
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-medium mb-2">No active orders</h3>
              <p className="text-gray-600 mb-6">You don't have any active orders at the moment.</p>
              <Button 
                onClick={() => navigate('/restaurants')}
                className="bg-wang-orange hover:bg-wang-brown"
              >
                Order Now
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="past">
          {pastOrders.length > 0 ? (
            <div className="space-y-6">
              {pastOrders.map(order => (
                <div key={order.id} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h2 className="text-lg font-semibold">Order #{order.id}</h2>
                      <p className="text-sm text-gray-600">
                        Placed on {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      {getStatusBadge(order.status)}
                      <p className="text-base font-medium mt-2">฿{order.total}</p>
                    </div>
                  </div>
                  
                  <Separator className="mb-4" />
                  
                  <div className="space-y-3 mb-4">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between">
                        <div>
                          <span className="font-medium">{item.quantity}x</span> {item.item.name}
                        </div>
                        <div>฿{item.item.price * item.quantity}</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between mt-4">
                    <Button 
                      variant="outline" 
                      onClick={() => navigate(`/restaurant/${order.restaurantId}`)}
                    >
                      Reorder
                    </Button>
                    <Button 
                      variant="ghost"
                      className="text-wang-orange"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-medium mb-2">No order history</h3>
              <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
              <Button 
                onClick={() => navigate('/restaurants')}
                className="bg-wang-orange hover:bg-wang-brown"
              >
                Order Now
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrdersPage;
