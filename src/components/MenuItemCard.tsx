
import React, { useState } from 'react';
import { MenuItem } from '../types';
import { useLanguage } from '../utils/languageUtils';
import { Plus, Minus, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/CartContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface MenuItemCardProps {
  menuItem: MenuItem;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ menuItem }) => {
  const { t } = useLanguage();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string | string[]>>({});

  const handleAddToCart = () => {
    if (menuItem.options && menuItem.options.length > 0) {
      setIsDialogOpen(true);
    } else {
      addItem(menuItem, quantity);
    }
  };

  const handleIncreaseQuantity = () => {
    setQuantity(q => q + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity(q => (q > 1 ? q - 1 : 1));
  };

  const handleOptionChange = (
    optionName: string,
    value: string,
    multiSelect: boolean
  ) => {
    if (multiSelect) {
      // Handle multi-select options
      const currentSelection = selectedOptions[optionName] as string[] || [];
      if (currentSelection.includes(value)) {
        // Remove if already selected
        setSelectedOptions({
          ...selectedOptions,
          [optionName]: currentSelection.filter(item => item !== value),
        });
      } else {
        // Add to selection
        setSelectedOptions({
          ...selectedOptions,
          [optionName]: [...currentSelection, value],
        });
      }
    } else {
      // Handle single select options
      setSelectedOptions({
        ...selectedOptions,
        [optionName]: value,
      });
    }
  };

  const handleSubmitOptions = () => {
    addItem(menuItem, quantity, selectedOptions);
    setIsDialogOpen(false);
    // Reset for next time
    setQuantity(1);
    setSelectedOptions({});
  };

  const calculateTotalPrice = () => {
    let basePrice = menuItem.price;
    
    // Add prices from selected options
    if (menuItem.options && Object.keys(selectedOptions).length > 0) {
      Object.entries(selectedOptions).forEach(([optionName, selection]) => {
        const option = menuItem.options?.find(opt => opt.name === optionName);
        
        if (option) {
          if (Array.isArray(selection)) {
            // Multi-select option
            selection.forEach(choice => {
              const choiceObj = option.choices.find(c => c.name === choice);
              if (choiceObj && choiceObj.price) {
                basePrice += choiceObj.price;
              }
            });
          } else {
            // Single-select option
            const choiceObj = option.choices.find(c => c.name === selection);
            if (choiceObj && choiceObj.price) {
              basePrice += choiceObj.price;
            }
          }
        }
      });
    }
    
    return basePrice * quantity;
  };

  return (
    <>
      <div className="border rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow p-4 flex">
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium text-lg">{menuItem.name}</h3>
              {menuItem.popular && (
                <Badge className="bg-wang-orange text-white mt-1">Popular</Badge>
              )}
            </div>
            <div className="text-wang-orange font-semibold">฿{menuItem.price}</div>
          </div>

          <p className="text-gray-600 text-sm mt-2 line-clamp-2">{menuItem.description}</p>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8 rounded-full border-gray-300"
                onClick={handleDecreaseQuantity}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="text-gray-700">{quantity}</span>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8 rounded-full border-gray-300"
                onClick={handleIncreaseQuantity}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            
            <Button 
              onClick={handleAddToCart}
              className="bg-wang-orange hover:bg-wang-brown"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {t('action.addToCart')}
            </Button>
          </div>
        </div>
        
        {menuItem.image && (
          <div className="ml-4 w-24 h-24 flex-shrink-0">
            <img 
              src={menuItem.image || '/placeholder.svg'} 
              alt={menuItem.name} 
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        )}
      </div>

      {/* Options Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{menuItem.name}</DialogTitle>
            <DialogDescription>
              {menuItem.description}
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col space-y-4 max-h-[60vh] overflow-auto py-4">
            {menuItem.options?.map((option, idx) => (
              <div key={idx} className="border-b pb-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{option.name}</h4>
                  {option.required && (
                    <span className="text-xs text-red-500">Required</span>
                  )}
                </div>
                
                <div className="space-y-2">
                  {option.choices.map((choice, choiceIdx) => (
                    <label 
                      key={choiceIdx} 
                      className="flex items-center justify-between p-2 border rounded-md hover:bg-gray-50 cursor-pointer"
                    >
                      <div className="flex items-center">
                        <input 
                          type={option.multiSelect ? "checkbox" : "radio"}
                          name={option.name}
                          value={choice.name}
                          checked={
                            option.multiSelect 
                              ? (selectedOptions[option.name] as string[] || []).includes(choice.name)
                              : selectedOptions[option.name] === choice.name
                          }
                          onChange={() => handleOptionChange(option.name, choice.name, option.multiSelect)}
                          className="mr-2"
                        />
                        <span>{choice.name}</span>
                      </div>
                      {choice.price && <span>+฿{choice.price}</span>}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <DialogFooter className="sm:justify-between">
            <div className="font-medium">Total: ฿{calculateTotalPrice()}</div>
            <Button
              type="button"
              onClick={handleSubmitOptions}
              className="bg-wang-orange hover:bg-wang-brown"
            >
              {t('action.addToCart')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MenuItemCard;
