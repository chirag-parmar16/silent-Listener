
import { Link } from 'react-router-dom';
import { MessageCircle, Info, Heart, X, Settings } from 'lucide-react';

interface MobileNavProps {
  isOpen: boolean;
  onToggle: () => void;
}

const MobileNav = ({ isOpen, onToggle }: MobileNavProps) => {
  return (
    <div 
      className={`fixed inset-0 z-50 transform transition-transform duration-300 lg:hidden ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onToggle} />
      <nav className="relative h-full w-4/5 max-w-sm float-right flex flex-col overflow-y-auto glass-effect p-6">
        <div className="flex items-center justify-between mb-8">
          <span className="text-lg font-medium">Menu</span>
          <button 
            onClick={onToggle} 
            className="rounded-full p-2 hover:bg-muted/50 transition-colors"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="flex flex-col space-y-5">
          <Link 
            to="/" 
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
            onClick={onToggle}
          >
            <MessageCircle size={20} />
            <span>Vent</span>
          </Link>
          
          <Link 
            to="/wall" 
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
            onClick={onToggle}
          >
            <Heart size={20} />
            <span>Community</span>
          </Link>
          
          <Link 
            to="/about" 
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
            onClick={onToggle}
          >
            <Info size={20} />
            <span>About</span>
          </Link>
          
          <Link 
            to="/settings" 
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
            onClick={onToggle}
          >
            <Settings size={20} />
            <span>Settings</span>
          </Link>
        </div>
        
        <div className="mt-auto pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Silent Listener © {new Date().getFullYear()}
          </p>
        </div>
      </nav>
    </div>
  );
};

export default MobileNav;
