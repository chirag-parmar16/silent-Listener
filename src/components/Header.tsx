
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Info, Heart } from 'lucide-react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3 glass-effect shadow-soft' : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2 animate-hover"
        >
          <span className="text-primary text-xl font-medium">Silent Vent</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link 
            to="/" 
            className="text-foreground/80 hover:text-primary transition-colors animate-hover flex items-center gap-2"
          >
            <MessageCircle size={18} /> 
            <span>Vent</span>
          </Link>
          <Link 
            to="/wall" 
            className="text-foreground/80 hover:text-primary transition-colors animate-hover flex items-center gap-2"
          >
            <Heart size={18} /> 
            <span>Community</span>
          </Link>
          <Link 
            to="/about" 
            className="text-foreground/80 hover:text-primary transition-colors animate-hover flex items-center gap-2"
          >
            <Info size={18} /> 
            <span>About</span>
          </Link>
        </nav>
        
        <div className="md:hidden flex items-center">
          <button 
            className="glass-effect p-2 rounded-full"
            aria-label="Toggle mobile menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
