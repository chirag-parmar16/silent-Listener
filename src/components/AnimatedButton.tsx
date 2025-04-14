
import React from 'react';
import { Button } from '@/components/ui/button';
import { useRipple } from '@/hooks/use-ripple';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

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
  
  // Animation variants for dark mode
  const motionVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
    transition: { type: "spring", stiffness: 400, damping: 17 }
  };
  
  return (
    <motion.div
      whileHover={motionVariants.hover}
      whileTap={motionVariants.tap}
      transition={motionVariants.transition}
    >
      <Button
        variant={variant}
        size={size}
        className={cn(
          'relative overflow-hidden transition-all btn-hover-effect shadow-md',
          className
        )}
        onClick={handleClick}
        {...props}
      >
        <span className="relative z-10">{children}</span>
        <span className={cn(
          "absolute inset-0 -translate-x-full z-0",
          "bg-gradient-to-r from-transparent via-white/20 to-transparent hover:animate-shimmer"
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
            
            .ripple {
              background: rgba(255, 255, 255, 0.3);
            }
          `
        }} />
      </Button>
    </motion.div>
  );
};

export default AnimatedButton;
