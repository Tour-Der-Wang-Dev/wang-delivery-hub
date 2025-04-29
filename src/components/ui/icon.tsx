
import React, { memo } from 'react';
import { LucideProps, icons } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface IconProps extends LucideProps {
  name: keyof typeof icons;
  className?: string;
}

/**
 * Optimized Icon Component
 * - Centralized icon management
 * - Consistent styling
 * - Memoized for performance
 */
const Icon = memo(({ name, className, ...props }: IconProps) => {
  const LucideIcon = icons[name];

  if (!LucideIcon) {
    console.warn(`Icon "${name}" does not exist in lucide-react`);
    return null;
  }

  return (
    <LucideIcon 
      className={cn("h-5 w-5", className)} 
      aria-hidden="true" 
      {...props} 
    />
  );
});

Icon.displayName = 'Icon';

export { Icon };
