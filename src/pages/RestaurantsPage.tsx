
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../utils/languageUtils';
import { useLocation } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from "@/components/ui/separator";
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { restaurants } from '../data/mockData';
import RestaurantCard from '../components/RestaurantCard';

const RestaurantsPage: React.FC = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showOpenOnly, setShowOpenOnly] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');

  // Get all unique categories
  const allCategories = Array.from(
    new Set(restaurants.flatMap(restaurant => restaurant.categories))
  );

  // Initialize search from URL parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search');
    if (searchParam) {
      setSearchTerm(searchParam);
    }
  }, [location]);

  // Apply filters and search
  useEffect(() => {
    let results = [...restaurants];
    
    // Apply search
    if (searchTerm) {
      results = results.filter(restaurant => 
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.categories.some(category => 
          category.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    
    // Apply category filter
    if (selectedCategories.length > 0) {
      results = results.filter(restaurant =>
        restaurant.categories.some(category => selectedCategories.includes(category))
      );
    }
    
    // Apply open only filter
    if (showOpenOnly) {
      results = results.filter(restaurant => restaurant.isOpen);
    }
    
    // Apply sorting
    switch(sortBy) {
      case 'rating':
        results.sort((a, b) => b.rating - a.rating);
        break;
      case 'deliveryTime':
        results.sort((a, b) => {
          const timeA = parseInt(a.deliveryTime.split('-')[0]);
          const timeB = parseInt(b.deliveryTime.split('-')[0]);
          return timeA - timeB;
        });
        break;
      case 'deliveryFee':
        results.sort((a, b) => a.deliveryFee - b.deliveryFee);
        break;
      // default is 'recommended', no sorting needed
    }
    
    setFilteredRestaurants(results);
  }, [searchTerm, selectedCategories, showOpenOnly, sortBy]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is applied via the useEffect
  };

  const toggleCategoryFilter = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setShowOpenOnly(false);
    setSortBy('recommended');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-wang-brown mb-6">{t('restaurant.all')}</h1>
      
      {/* Search and Filters */}
      <div className="mb-8">
        <form onSubmit={handleSearch} className="flex mb-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
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
            className="bg-wang-orange hover:bg-wang-brown rounded-r-md ml-2"
          >
            {t('action.search')}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="ml-2 md:hidden"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-5 w-5" />
          </Button>
        </form>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters - Mobile Toggle */}
          <div className={`md:w-1/4 ${showFilters ? 'block' : 'hidden'} md:block`}>
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button 
                  variant="link" 
                  className="text-sm text-wang-orange p-0 h-auto"
                  onClick={clearFilters}
                >
                  Clear All
                </Button>
              </div>
              
              <Separator className="mb-4" />
              
              <div className="mb-6">
                <h3 className="font-medium mb-3">Categories</h3>
                <div className="space-y-2">
                  {allCategories.map(category => (
                    <div key={category} className="flex items-center">
                      <Checkbox
                        id={`category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => toggleCategoryFilter(category)}
                      />
                      <Label
                        htmlFor={`category-${category}`}
                        className="ml-2 text-sm font-normal"
                      >
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center">
                  <Checkbox
                    id="open-only"
                    checked={showOpenOnly}
                    onCheckedChange={(checked) => setShowOpenOnly(checked === true)}
                  />
                  <Label
                    htmlFor="open-only"
                    className="ml-2 font-medium"
                  >
                    Open Now
                  </Label>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Sort By</h3>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recommended">Recommended</SelectItem>
                    <SelectItem value="rating">Top Rated</SelectItem>
                    <SelectItem value="deliveryTime">Fastest Delivery</SelectItem>
                    <SelectItem value="deliveryFee">Lowest Delivery Fee</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          {/* Restaurant Results */}
          <div className="flex-1">
            {selectedCategories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedCategories.map(category => (
                  <Badge 
                    key={category} 
                    variant="secondary"
                    className="pl-2 flex items-center"
                  >
                    {category}
                    <button 
                      className="ml-1 p-1 hover:bg-gray-200 rounded-full"
                      onClick={() => toggleCategoryFilter(category)}
                    >
                      ×
                    </button>
                  </Badge>
                ))}
                <Button
                  variant="link"
                  className="text-sm h-auto p-0 text-wang-orange"
                  onClick={clearFilters}
                >
                  Clear all
                </Button>
              </div>
            )}
            
            <p className="text-gray-600 mb-4">
              {filteredRestaurants.length} {filteredRestaurants.length === 1 ? 'restaurant' : 'restaurants'} found
            </p>
            
            {filteredRestaurants.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRestaurants.map(restaurant => (
                  <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <h3 className="text-xl font-medium mb-2">No restaurants found</h3>
                <p className="text-gray-600">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantsPage;
