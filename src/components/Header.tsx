
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Info, Heart, Settings, Menu } from 'lucide-react';
import { useTheme } from '../hooks/use-theme';
import MobileNav from './MobileNav';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme } = useTheme();
  
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
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'py-3 glass-effect shadow-soft' : 'py-5 bg-transparent'
      }`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 animate-hover">
            <span className="text-primary text-xl font-medium">Silent Listener</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link to="/" className="text-foreground/80 hover:text-primary transition-colors animate-hover flex items-center gap-2">
              <MessageCircle size={18} /> 
              <span>Vent</span>
            </Link>
            <Link to="/wall" className="text-foreground/80 hover:text-primary transition-colors animate-hover flex items-center gap-2">
              <Heart size={18} /> 
              <span>Community</span>
            </Link>
            <Link to="/about" className="text-foreground/80 hover:text-primary transition-colors animate-hover flex items-center gap-2">
              <Info size={18} /> 
              <span>About</span>
            </Link>
            <Link to="/settings" className="text-foreground/80 hover:text-primary transition-colors animate-hover flex items-center gap-2">
              <Settings size={18} /> 
              <span>Settings</span>
            </Link>
            
            <ThemeToggle />
          </nav>
          
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button 
              className="glass-effect p-2 rounded-full" 
              aria-label="Toggle mobile menu"
              onClick={toggleMobileMenu}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>
      
      <MobileNav isOpen={mobileMenuOpen} onToggle={toggleMobileMenu} />
    </>
  );
};

export default Header;
