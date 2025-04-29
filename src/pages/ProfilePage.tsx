
import React, { useState } from 'react';
import { useLanguage } from '../utils/languageUtils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MapPin, CreditCard, Clock, User, Settings } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { t } = useLanguage();
  const [isOverseasWorker, setIsOverseasWorker] = useState(false);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">{t('profile.title')}</h1>
      
      <Tabs defaultValue="account" className="mb-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="account" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Account</span>
          </TabsTrigger>
          <TabsTrigger value="addresses" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span className="hidden sm:inline">Addresses</span>
          </TabsTrigger>
          <TabsTrigger value="payment" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">Payment</span>
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Preferences</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Account Tab */}
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                Update your personal details and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Your name" defaultValue="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Your email" defaultValue="john@example.com" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="Your phone number" defaultValue="+66 12 345 6789" />
                </div>
              </div>
              
              <div className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Overseas Worker</h3>
                    <p className="text-sm text-gray-500">Enable to order food for family members in Thailand</p>
                  </div>
                  <Switch checked={isOverseasWorker} onCheckedChange={setIsOverseasWorker} />
                </div>
                
                {isOverseasWorker && (
                  <div className="mt-4 p-4 bg-wang-cream rounded-lg">
                    <h4 className="font-medium mb-2">Family Member Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="recipient-name">Recipient Name</Label>
                        <Input id="recipient-name" placeholder="Family member name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="recipient-phone">Recipient Phone</Label>
                        <Input id="recipient-phone" placeholder="Family member phone" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-wang-orange hover:bg-wang-brown">Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Addresses Tab */}
        <TabsContent value="addresses">
          <Card>
            <CardHeader>
              <CardTitle>Delivery Addresses</CardTitle>
              <CardDescription>
                Manage your delivery locations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Default Address */}
                <div className="p-4 border rounded-md border-wang-orange bg-wang-cream/30">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-semibold">Home</h3>
                        <Badge className="bg-wang-orange ml-2 text-white text-xs">Default</Badge>
                      </div>
                      <p className="text-gray-600">123 Main Street, District Name</p>
                      <p className="text-gray-600">Wang Sam Mo, 12345</p>
                      <p className="text-gray-600">Phone: +66 12 345 6789</p>
                    </div>
                    <div className="flex">
                      <Button variant="ghost" className="text-wang-orange">Edit</Button>
                      <Button variant="ghost" className="text-gray-500">Delete</Button>
                    </div>
                  </div>
                </div>
                
                {/* Other Address */}
                <div className="p-4 border rounded-md">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">Work</h3>
                      <p className="text-gray-600">456 Office Boulevard, Business District</p>
                      <p className="text-gray-600">Wang Sam Mo, 12346</p>
                      <p className="text-gray-600">Phone: +66 98 765 4321</p>
                    </div>
                    <div className="flex">
                      <Button variant="ghost" className="text-wang-orange">Edit</Button>
                      <Button variant="ghost" className="text-gray-500">Delete</Button>
                      <Button variant="ghost" className="text-gray-500">Set Default</Button>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full mt-4">+ Add New Address</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Payment Tab */}
        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>
                Manage your payment options
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Thai Payment Methods */}
                <div>
                  <h3 className="font-semibold mb-3">Thai Payment Methods</h3>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-md">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="bg-blue-100 text-blue-800 p-2 rounded-md mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg>
                          </div>
                          <div>
                            <div className="font-medium">PromptPay</div>
                            <div className="text-sm text-gray-500">Linked to 098-765-4321</div>
                          </div>
                        </div>
                        <Button variant="ghost" className="text-wang-orange">Edit</Button>
                      </div>
                    </div>
                    
                    <div className="p-3 border rounded-md">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="bg-green-100 text-green-800 p-2 rounded-md mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M16 8h-6a2 2 0 100 4h4a2 2 0 110 4H8" /><path d="M12 18V6" /></svg>
                          </div>
                          <div>
                            <div className="font-medium">Mobile Banking</div>
                            <div className="text-sm text-gray-500">Bank App</div>
                          </div>
                        </div>
                        <Button variant="ghost" className="text-wang-orange">Edit</Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* International Payment Methods */}
                <div className="mt-6">
                  <h3 className="font-semibold mb-3">International Payment Methods</h3>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-md">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="bg-red-100 text-red-800 p-2 rounded-md mr-3">
                            <CreditCard className="h-6 w-6" />
                          </div>
                          <div>
                            <div className="font-medium">Visa •••• 4242</div>
                            <div className="text-sm text-gray-500">Expires 12/25</div>
                          </div>
                        </div>
                        <Button variant="ghost" className="text-wang-orange">Edit</Button>
                      </div>
                    </div>
                    
                    <div className="p-3 border rounded-md">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="bg-blue-100 text-blue-800 p-2 rounded-md mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 6h-5l-6 6 6 6h5a1 1 0 001-1V7a1 1 0 00-1-1z" /></svg>
                          </div>
                          <div>
                            <div className="font-medium">PayPal</div>
                            <div className="text-sm text-gray-500">john@example.com</div>
                          </div>
                        </div>
                        <Button variant="ghost" className="text-wang-orange">Edit</Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full mt-4">+ Add Payment Method</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Preferences Tab */}
        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>
                Customize your experience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Email Notifications</h3>
                    <p className="text-sm text-gray-500">Receive order updates and promotions via email</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">SMS Notifications</h3>
                    <p className="text-sm text-gray-500">Receive order updates via SMS</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Language Preference</h3>
                    <p className="text-sm text-gray-500">Select your preferred language</p>
                  </div>
                  <Select defaultValue="en">
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="th">Thai</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Default Order Type</h3>
                    <p className="text-sm text-gray-500">Choose default order method</p>
                  </div>
                  <Select defaultValue="delivery">
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="delivery">Delivery</SelectItem>
                      <SelectItem value="pickup">Pickup</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-wang-orange hover:bg-wang-brown">Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage;
