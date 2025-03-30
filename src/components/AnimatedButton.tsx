
import React from 'react';
import { Button } from '@/components/ui/button';
import { useRipple } from '@/hooks/use-ripple';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/use-theme';

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
  const { theme } = useTheme();
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    createRipple(e);
    if (onClick) {
      onClick(e);
    }
  };
  
  // Different animation variants based on theme
  const motionVariants = {
    light: {
      hover: { scale: 1.05, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' },
      tap: { scale: 0.97 },
      transition: { type: "spring", stiffness: 400, damping: 17 }
    },
    dark: {
      hover: { scale: 1.05 },
      tap: { scale: 0.95 },
      transition: { type: "spring", stiffness: 400, damping: 17 }
    }
  };
  
  const currentMotion = theme === 'light' ? motionVariants.light : motionVariants.dark;
  
  return (
    <motion.div
      whileHover={currentMotion.hover}
      whileTap={currentMotion.tap}
      transition={currentMotion.transition}
    >
      <Button
        variant={variant}
        size={size}
        className={cn(
          'relative overflow-hidden transition-all btn-hover-effect shadow-md', 
          theme === 'light' ? 'light-button-effect' : '',
          className
        )}
        onClick={handleClick}
        {...props}
      >
        <span className="relative z-10">{children}</span>
        <span className={cn(
          "absolute inset-0 -translate-x-full z-0",
          theme === 'light' 
            ? "bg-gradient-to-r from-white/5 via-white/40 to-white/5 hover:animate-shimmer" 
            : "bg-gradient-to-r from-transparent via-white/20 to-transparent hover:animate-shimmer"
        )} />
        <style dangerouslySetInnerHTML={{
          __html: `
            .ripple {
              position: absolute;
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
            
            @keyframes shimmer {
              0% {
                transform: translateX(-100%);
              }
              100% {
                transform: translateX(100%);
              }
            }
            
            .hover\\:animate-shimmer:hover {
              animation: shimmer 1.5s infinite;
            }
            
            /* Light mode specific effects */
            .light-button-effect:before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: linear-gradient(45deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%);
              transform: translateX(-100%);
              transition: transform 0.6s;
              z-index: 0;
            }
            
            .light-button-effect:hover:before {
              transform: translateX(100%);
            }
            
            /* Different ripple effects for different themes */
            .light .ripple {
              background: rgba(0, 0, 0, 0.1);
            }
            
            .dark .ripple {
              background: rgba(255, 255, 255, 0.3);
            }
          `
        }} />
      </Button>
    </motion.div>
  );
};

export default AnimatedButton;
