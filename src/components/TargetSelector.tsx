
import React, { useState } from 'react';
import { Users, Briefcase, Heart, Home, UserMinus, PenLine } from 'lucide-react';

interface TargetOption {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
}

interface TargetSelectorProps {
  onSelect: (target: string) => void;
}

const TargetSelector: React.FC<TargetSelectorProps> = ({ onSelect }) => {
  const [selectedTarget, setSelectedTarget] = useState<string | null>(null);
  const [customTarget, setCustomTarget] = useState('');
  const [showCustom, setShowCustom] = useState(false);

  const targets: TargetOption[] = [
    { 
      id: 'work', 
      label: 'Work', 
      icon: <Briefcase size={20} />,
      description: 'Boss, colleague, or workplace issues'
    },
    { 
      id: 'relationship', 
      label: 'Relationship', 
      icon: <Heart size={20} />,
      description: 'Partner, ex, or dating troubles'
    },
    { 
      id: 'family', 
      label: 'Family', 
      icon: <Home size={20} />,
      description: 'Parents, siblings, or relatives'
    },
    { 
      id: 'friends', 
      label: 'Friends', 
      icon: <Users size={20} />,
      description: 'Friend group or specific friendships'
    },
    { 
      id: 'social', 
      label: 'Social', 
      icon: <UserMinus size={20} />,
      description: 'Social anxiety or pressure'
    },
    { 
      id: 'custom', 
      label: 'Custom', 
      icon: <PenLine size={20} />,
      description: 'Enter your own target'
    }
  ];

  const handleTargetSelect = (targetId: string) => {
    setSelectedTarget(targetId);
    
    if (targetId === 'custom') {
      setShowCustom(true);
    } else {
      setShowCustom(false);
      onSelect(targetId);
    }
  };

  const handleCustomTargetSubmit = () => {
    if (customTarget.trim()) {
      onSelect(customTarget.trim());
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl font-medium mb-2">What's bothering you today?</h2>
        <p className="text-muted-foreground">Select what you want to vent about</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {targets.map((target) => (
          <div
            key={target.id}
            className={`
              relative glass-card p-4 h-28 cursor-pointer transition-all duration-300 animate-hover
              ${selectedTarget === target.id 
                ? 'border-primary border-2 shadow-neon ring-2 ring-primary/20' 
                : 'hover:shadow-soft hover:-translate-y-1'
              }
            `}
            onClick={() => handleTargetSelect(target.id)}
          >
            <div className="flex flex-col h-full justify-center items-center text-center gap-2">
              <div className={`${selectedTarget === target.id ? 'text-primary' : 'text-muted-foreground'}`}>
                {target.icon}
              </div>
              <span className="font-medium">{target.label}</span>
              <p className="text-xs text-muted-foreground line-clamp-1">{target.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      {showCustom && (
        <div className="animate-slide-up space-y-4">
          <div className="modern-form flex flex-col md:flex-row gap-3">
            <input
              type="text"
              value={customTarget}
              onChange={(e) => setCustomTarget(e.target.value)}
              placeholder="Enter what/who is bothering you..."
              className="flex-1 px-4 py-3 rounded-md border"
            />
            <button
              onClick={handleCustomTargetSubmit}
              disabled={!customTarget.trim()}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-md transition-colors disabled:opacity-50"
            >
              Continue
            </button>
          </div>
          <p className="text-sm text-muted-foreground italic">
            Don't worry, this is completely private and won't be shared with anyone.
          </p>
        </div>
      )}
    </div>
  );
};

export default TargetSelector;
