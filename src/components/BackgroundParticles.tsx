
import { useEffect, useState } from 'react';

interface ParticlePosition {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  color: string;
}

const BackgroundParticles = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    // Create random particles
    const particleCount = window.innerWidth < 768 ? 25 : 50;
    const particles: ParticlePosition[] = [];
    
    // Clean up any existing particles
    const existingParticles = document.querySelectorAll('.bg-particle');
    existingParticles.forEach(particle => particle.remove());
    
    // Create color palette
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
    
    // Animation loop
    let animationFrameId: number;
    
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
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    // Mouse move effect
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Handle window resize
    const handleResize = () => {
      // Adjust particles for new window size
      const particleElements = document.querySelectorAll('.bg-particle');
      particleElements.forEach((particle, index) => {
        const p = particles[index];
        if (p.x > window.innerWidth) p.x = Math.random() * window.innerWidth;
        if (p.y > window.innerHeight) p.y = Math.random() * window.innerHeight;
      });
    };
    
    window.addEventListener('resize', handleResize);
    
    // Clean up function
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      document.querySelectorAll('.bg-particle').forEach(particle => particle.remove());
    };
  }, []);
  
  return null; // This component doesn't render anything visible
};

export default BackgroundParticles;
