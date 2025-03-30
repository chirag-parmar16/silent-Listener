
import { useCallback } from 'react';

/**
 * A hook to add a ripple effect to elements on click
 */
export const useRipple = () => {
  const createRipple = useCallback((event: React.MouseEvent<HTMLElement>) => {
    const button = event.currentTarget;
    
    // Remove any existing ripples
    const existingRipple = button.querySelector('.ripple');
    if (existingRipple) {
      existingRipple.remove();
    }
    
    // Create ripple element
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    button.appendChild(ripple);
    
    // Get button dimensions and position
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    // Position the ripple
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - (button.getBoundingClientRect().left + radius)}px`;
    ripple.style.top = `${event.clientY - (button.getBoundingClientRect().top + radius)}px`;
    
    // Add active class
    ripple.classList.add('active');
    
    // Remove ripple after animation
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }, []);

  return { createRipple };
};

// Add the CSS for the ripple effect to the component that uses it
// Example usage:
// <button 
//   className="relative overflow-hidden" 
//   onClick={(e) => { handleClick(); createRipple(e); }}
// >
//   Click me
//   <style jsx>{`
//     .ripple {
//       position: absolute;
//       background: rgba(255, 255, 255, 0.3);
//       border-radius: 50%;
//       transform: scale(0);
//       animation: ripple 0.6s linear;
//       pointer-events: none;
//     }
//     
//     @keyframes ripple {
//       to {
//         transform: scale(4);
//         opacity: 0;
//       }
//     }
//   `}</style>
// </button>
