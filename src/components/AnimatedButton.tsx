
import React from 'react';
import { Button } from '@/components/ui/button';
import { useRipple } from '@/hooks/use-ripple';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  children: React.ReactNode;
}

const AnimatedButton = ({
  variant = 'default',
  size = 'default',
  className,
  children,
  onClick,
  ...props
}: AnimatedButtonProps) => {
  const { createRipple } = useRipple();
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    createRipple(e);
    if (onClick) {
      onClick(e);
    }
  };
  
  return (
    <Button
      variant={variant}
      size={size}
      className={cn(
        'relative overflow-hidden transition-all btn-hover-effect', 
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
      <style dangerouslySetInnerHTML={{
        __html: `
          .ripple {
            position: absolute;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            z-index: 0;
          }
          
          @keyframes ripple {
            to {
              transform: scale(4);
              opacity: 0;
            }
          }
        `
      }} />
    </Button>
  );
};

export default AnimatedButton;
