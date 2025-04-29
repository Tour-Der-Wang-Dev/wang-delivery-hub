
import React from 'react';
import { useLanguage, Language } from '../utils/languageUtils';
import { NavLink } from 'react-router-dom';
import { ShoppingCart, Menu, Globe, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

const Header = () => {
  const { currentLanguage, setLanguage, t } = useLanguage();
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleLanguage = () => {
    setLanguage(currentLanguage === 'en' ? 'th' : 'en');
  };

  return (
    <header className="sticky top-0 z-10 bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <NavLink to="/" className="flex items-center space-x-2">
          <img 
            src="/lovable-uploads/a28038b5-ca0b-453d-9731-8d2a770a7196.png" 
            alt="Tour Der Wang" 
            className="h-12 w-auto" 
          />
          <span className="hidden md:block font-bold text-wang-brown text-xl">
            Tour Der Wang
          </span>
        </NavLink>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <NavLink to="/" className="text-gray-700 hover:text-wang-orange transition-colors">
            {t('nav.home')}
          </NavLink>
          <NavLink to="/restaurants" className="text-gray-700 hover:text-wang-orange transition-colors">
            {t('nav.restaurants')}
          </NavLink>
          <NavLink to="/orders" className="text-gray-700 hover:text-wang-orange transition-colors">
            {t('nav.orders')}
          </NavLink>
          
          <Button variant="ghost" onClick={toggleLanguage} className="flex items-center">
            <Globe className="h-5 w-5 mr-1" />
            {currentLanguage === 'en' ? 'TH' : 'EN'}
          </Button>
          
          <NavLink to="/cart" className="relative text-gray-700 hover:text-wang-orange transition-colors">
            <ShoppingCart className="h-6 w-6" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-wang-orange text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </NavLink>
          
          <NavLink to="/profile">
            <Button variant="outline" className="flex items-center border-wang-orange text-wang-orange hover:bg-wang-cream">
              <User className="h-5 w-5 mr-2" />
              {t('nav.profile')}
            </Button>
          </NavLink>
        </nav>
        
        {/* Mobile Navigation Toggle */}
        <div className="flex items-center space-x-4 md:hidden">
          <NavLink to="/cart" className="relative text-gray-700">
            <ShoppingCart className="h-6 w-6" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-wang-orange text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </NavLink>
          
          <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Menu">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-2">
          <nav className="flex flex-col space-y-2">
            <NavLink 
              to="/" 
              className="py-2 px-4 rounded-md hover:bg-wang-cream"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.home')}
            </NavLink>
            <NavLink 
              to="/restaurants" 
              className="py-2 px-4 rounded-md hover:bg-wang-cream"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.restaurants')}
            </NavLink>
            <NavLink 
              to="/orders" 
              className="py-2 px-4 rounded-md hover:bg-wang-cream"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.orders')}
            </NavLink>
            <NavLink 
              to="/profile" 
              className="py-2 px-4 rounded-md hover:bg-wang-cream"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.profile')}
            </NavLink>
            <Button 
              variant="ghost" 
              onClick={() => {
                toggleLanguage();
                setIsMenuOpen(false);
              }} 
              className="py-2 px-4 flex items-center justify-start"
            >
              <Globe className="h-5 w-5 mr-2" />
              {currentLanguage === 'en' ? 'Switch to Thai' : 'เปลี่ยนเป็นภาษาอังกฤษ'}
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
