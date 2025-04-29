
import React from 'react';
import { useLanguage } from '../utils/languageUtils';
import { Globe } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const LanguageSwitcher: React.FC = () => {
  const { currentLanguage, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-1">
          <Globe className="h-4 w-4" />
          {currentLanguage === 'en' ? 'EN' : 'TH'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white">
        <DropdownMenuItem onClick={() => setLanguage('en')} className="flex items-center">
          <span className={currentLanguage === 'en' ? 'font-bold' : ''}>English</span>
          {currentLanguage === 'en' && (
            <Badge variant="secondary" className="ml-2 bg-wang-cream text-wang-brown">Active</Badge>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage('th')} className="flex items-center">
          <span className={currentLanguage === 'th' ? 'font-bold' : ''}>ไทย</span>
          {currentLanguage === 'th' && (
            <Badge variant="secondary" className="ml-2 bg-wang-cream text-wang-brown">Active</Badge>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
