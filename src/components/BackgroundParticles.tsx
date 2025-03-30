
import { useEffect } from 'react';

interface ParticlePosition {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

const BackgroundParticles = () => {
  useEffect(() => {
    // Create random particles
    const particleCount = window.innerWidth < 768 ? 15 : 30;
    const particles: ParticlePosition[] = [];
    
    // Clean up any existing particles
    const existingParticles = document.querySelectorAll('.bg-particle');
    existingParticles.forEach(particle => particle.remove());
    
    // Create new particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 6 + 2,
        speed: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      });
      
      const particle = document.createElement('div');
      particle.className = 'bg-particle';
      particle.style.position = 'fixed';
      particle.style.width = `${particles[i].size}px`;
      particle.style.height = `${particles[i].size}px`;
      particle.style.borderRadius = '50%';
      particle.style.backgroundColor = `rgba(var(--primary), ${particles[i].opacity})`;
      particle.style.left = `${particles[i].x}px`;
      particle.style.top = `${particles[i].y}px`;
      particle.style.pointerEvents = 'none';
      particle.style.zIndex = '-1';
      particle.style.transition = 'transform 0.2s ease';
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
        
        (particle as HTMLElement).style.transform = `translate(${p.x}px, ${p.y}px)`;
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    // Mouse move effect
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      particleElements.forEach((particle, index) => {
        const p = particles[index];
        const particleX = p.x;
        const particleY = p.y;
        
        // Calculate distance between mouse and particle
        const dx = mouseX - particleX;
        const dy = mouseY - particleY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // If mouse is close to particle, move particle away slightly
        if (distance < 100) {
          const angle = Math.atan2(dy, dx);
          const pushX = Math.cos(angle) * (100 - distance) * 0.05;
          const pushY = Math.sin(angle) * (100 - distance) * 0.05;
          
          p.x -= pushX;
          p.y -= pushY;
          
          (particle as HTMLElement).style.transform = `translate(${p.x}px, ${p.y}px)`;
        }
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Clean up function
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.querySelectorAll('.bg-particle').forEach(particle => particle.remove());
    };
  }, []);
  
  return null; // This component doesn't render anything visible
};

export default BackgroundParticles;
