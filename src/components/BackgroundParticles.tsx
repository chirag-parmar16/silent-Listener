import { useEffect, useState } from 'react';
import { useTheme } from '@/hooks/use-theme';

interface ParticlePosition {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  color: string;
  rotation?: number;
  rotationSpeed?: number;
  shape?: 'circle' | 'square' | 'triangle';
}

const BackgroundParticles = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { theme } = useTheme();
  
  useEffect(() => {
    // Clean up any existing particles
    const existingParticles = document.querySelectorAll('.bg-particle');
    existingParticles.forEach(particle => particle.remove());
    
    // Create particles based on theme
    if (theme === 'dark') {
      createDarkModeParticles();
    } else {
      createLightModeParticles();
    }
    
    // Mouse move effect
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Handle window resize
    const handleResize = () => {
      // Reapply the animation on resize
      if (theme === 'dark') {
        createDarkModeParticles();
      } else {
        createLightModeParticles();
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    // Clean up function
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      document.querySelectorAll('.bg-particle').forEach(particle => particle.remove());
      if (window.particleAnimationId) {
        cancelAnimationFrame(window.particleAnimationId);
      }
    };
  }, [theme]); // Re-run when theme changes
  
  const createDarkModeParticles = () => {
    // Create random particles for dark mode
    const particleCount = window.innerWidth < 768 ? 25 : 50;
    const particles: ParticlePosition[] = [];
    
    // Clean up any existing particles
    const existingParticles = document.querySelectorAll('.bg-particle');
    existingParticles.forEach(particle => particle.remove());
    
    // Create color palette for dark mode
    const colors = [
      'rgba(var(--primary), VAR_OPACITY)',
      'rgba(var(--accent), VAR_OPACITY)',
      'rgba(214, 188, 250, VAR_OPACITY)',
      'rgba(211, 228, 253, VAR_OPACITY)',
    ];
    
    // Create new particles
    for (let i = 0; i < particleCount; i++) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const opacity = Math.random() * 0.5 + 0.1;
      const colorWithOpacity = randomColor.replace('VAR_OPACITY', opacity.toString());
      
      particles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 6 + 2,
        speed: Math.random() * 1.5 + 0.5,
        opacity,
        color: colorWithOpacity,
      });
      
      const particle = document.createElement('div');
      particle.className = 'bg-particle';
      particle.style.position = 'fixed';
      particle.style.width = `${particles[i].size}px`;
      particle.style.height = `${particles[i].size}px`;
      particle.style.borderRadius = '50%';
      particle.style.backgroundColor = particles[i].color;
      particle.style.left = `${particles[i].x}px`;
      particle.style.top = `${particles[i].y}px`;
      particle.style.pointerEvents = 'none';
      particle.style.zIndex = '-1';
      particle.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
      particle.style.boxShadow = '0 0 10px 2px ' + particles[i].color;
      document.body.appendChild(particle);
    }
    
    // Animation loop for dark mode
    if (window.particleAnimationId) {
      cancelAnimationFrame(window.particleAnimationId);
    }
    
    const animate = () => {
      // Update particle positions
      const particleElements = document.querySelectorAll('.bg-particle');
      
      particleElements.forEach((particle, index) => {
        const p = particles[index];
        p.y -= p.speed;
        
        // Reset particle if it goes off screen
        if (p.y < -10) {
          p.y = window.innerHeight + 10;
          p.x = Math.random() * window.innerWidth;
        }
        
        // Add subtle horizontal movement
        p.x += Math.sin(Date.now() * 0.001 + p.id) * 0.5;
        
        (particle as HTMLElement).style.transform = `translate(${p.x}px, ${p.y}px) scale(${
          mousePosition.x > 0 ? 
          1 + Math.max(0, (1 - Math.hypot(mousePosition.x - p.x, mousePosition.y - p.y) / 150) * 0.5) : 
          1
        })`;
        
        // Change opacity based on mouse proximity
        if (mousePosition.x > 0) {
          const distance = Math.hypot(mousePosition.x - p.x, mousePosition.y - p.y);
          const glowFactor = Math.max(0, 1 - distance / 150);
          
          if (glowFactor > 0) {
            (particle as HTMLElement).style.opacity = (p.opacity + glowFactor * 0.5).toString();
            (particle as HTMLElement).style.boxShadow = `0 0 ${10 + glowFactor * 15}px ${3 + glowFactor * 7}px ${p.color}`;
          } else {
            (particle as HTMLElement).style.opacity = p.opacity.toString();
            (particle as HTMLElement).style.boxShadow = '0 0 10px 2px ' + p.color;
          }
        }
      });
      
      window.particleAnimationId = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
  };
  
  const createLightModeParticles = () => {
    // Clean up any existing particles
    const existingParticles = document.querySelectorAll('.bg-particle');
    existingParticles.forEach(particle => particle.remove());
    
    // Create particles for light mode - different style than dark mode
    const particleCount = window.innerWidth < 768 ? 30 : 60;
    const particles: ParticlePosition[] = [];
    
    // Light mode color palette - pastel colors
    const colors = [
      'rgba(245, 169, 184, VAR_OPACITY)', // soft pink
      'rgba(173, 216, 230, VAR_OPACITY)', // light blue
      'rgba(152, 251, 152, VAR_OPACITY)', // pale green
      'rgba(221, 160, 221, VAR_OPACITY)', // plum
      'rgba(255, 222, 173, VAR_OPACITY)', // navajo white
    ];
    
    // Create particles with different shapes
    for (let i = 0; i < particleCount; i++) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const opacity = Math.random() * 0.4 + 0.1;
      const colorWithOpacity = randomColor.replace('VAR_OPACITY', opacity.toString());
      const shape = Math.random() > 0.7 ? 'square' : (Math.random() > 0.5 ? 'circle' : 'triangle');
      
      particles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * (shape === 'circle' ? 8 : 12) + 3,
        speed: Math.random() * 0.8 + 0.2, // Slower than dark mode
        opacity,
        color: colorWithOpacity,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2,
        shape,
      });
      
      const particle = document.createElement('div');
      particle.className = 'bg-particle';
      particle.style.position = 'fixed';
      
      if (shape === 'circle') {
        particle.style.width = `${particles[i].size}px`;
        particle.style.height = `${particles[i].size}px`;
        particle.style.borderRadius = '50%';
        particle.style.backgroundColor = particles[i].color;
      } else if (shape === 'square') {
        particle.style.width = `${particles[i].size}px`;
        particle.style.height = `${particles[i].size}px`;
        particle.style.backgroundColor = particles[i].color;
        particle.style.transform = `rotate(${particles[i].rotation}deg)`;
      } else {
        // Create triangle with CSS
        const size = particles[i].size;
        particle.style.width = '0';
        particle.style.height = '0';
        particle.style.borderLeft = `${size/2}px solid transparent`;
        particle.style.borderRight = `${size/2}px solid transparent`;
        particle.style.borderBottom = `${size}px solid ${particles[i].color}`;
        particle.style.backgroundColor = 'transparent';
        particle.style.transform = `rotate(${particles[i].rotation}deg)`;
      }
      
      particle.style.left = `${particles[i].x}px`;
      particle.style.top = `${particles[i].y}px`;
      particle.style.pointerEvents = 'none';
      particle.style.zIndex = '-1';
      particle.style.transition = 'transform 0.5s ease-out'; 
      
      // Add subtle light shadow instead of glow for light mode
      if (shape !== 'triangle') {
        particle.style.boxShadow = `0 0 ${particles[i].size}px 0 ${particles[i].color}`;
      }
      
      document.body.appendChild(particle);
    }
    
    // Animation loop for light mode
    if (window.particleAnimationId) {
      cancelAnimationFrame(window.particleAnimationId);
    }
    
    const animate = () => {
      const particleElements = document.querySelectorAll('.bg-particle');
      
      particleElements.forEach((particle, index) => {
        const p = particles[index];
        
        // In light mode, particles move in a more floating, swirling pattern
        p.y += Math.sin(Date.now() * 0.001 + p.id) * 0.5; // Move up and down in a sine wave
        p.x += Math.cos(Date.now() * 0.002 + p.id) * 0.5; // Move left and right in a cosine wave
        
        // Update rotation for squares and triangles
        if (p.shape !== 'circle' && p.rotationSpeed) {
          p.rotation = (p.rotation || 0) + p.rotationSpeed;
        }
        
        // Keep particles on screen by bouncing off edges
        if (p.x < 0 || p.x > window.innerWidth) {
          p.x = Math.max(0, Math.min(p.x, window.innerWidth));
          if (p.rotationSpeed) p.rotationSpeed = -p.rotationSpeed;
        }
        
        if (p.y < 0 || p.y > window.innerHeight) {
          p.y = Math.max(0, Math.min(p.y, window.innerHeight));
          if (p.rotationSpeed) p.rotationSpeed = -p.rotationSpeed;
        }
        
        let transform = `translate(${p.x}px, ${p.y}px)`;
        
        // Add rotation for non-circle shapes
        if (p.shape !== 'circle' && p.rotation !== undefined) {
          transform += ` rotate(${p.rotation}deg)`;
        }
        
        // Add subtle mouse interaction for light mode too, but different than dark mode
        if (mousePosition.x > 0) {
          const distance = Math.hypot(mousePosition.x - p.x, mousePosition.y - p.y);
          // Light particles get pushed away from cursor slightly
          if (distance < 150) {
            const pushFactor = Math.max(0, (1 - distance / 150)) * 20;
            const angle = Math.atan2(p.y - mousePosition.y, p.x - mousePosition.x);
            p.x += Math.cos(angle) * pushFactor * 0.1;
            p.y += Math.sin(angle) * pushFactor * 0.1;
          }
        }
        
        (particle as HTMLElement).style.transform = transform;
        
        // Subtle opacity changes based on position
        const opacityVariation = Math.sin(Date.now() * 0.001 + p.id) * 0.2;
        (particle as HTMLElement).style.opacity = Math.max(0.1, Math.min(1, p.opacity + opacityVariation)).toString();
      });
      
      window.particleAnimationId = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
  };
  
  return null;
};

// Add this to make the animationId available on window
declare global {
  interface Window {
    particleAnimationId: number;
  }
}

export default BackgroundParticles;
