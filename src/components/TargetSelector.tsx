
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

const TargetSelector: React.FC<TargetSelectorProps> = ({
  onSelect
}) => {
  const [selectedTarget, setSelectedTarget] = useState<string | null>(null);
  const [customTarget, setCustomTarget] = useState('');
  const [showCustom, setShowCustom] = useState(false);
  
  const targets: TargetOption[] = [
    {
      id: 'work',
      label: 'Work',
      icon: <Briefcase size={24} />,
      description: 'Boss, colleague, or workplace issues'
    }, 
    {
      id: 'relationship',
      label: 'Relationship',
      icon: <Heart size={24} />,
      description: 'Partner, ex, or dating troubles'
    }, 
    {
      id: 'family',
      label: 'Family',
      icon: <Home size={24} />,
      description: 'Parents, siblings, or relatives'
    }, 
    {
      id: 'friends',
      label: 'Friends',
      icon: <Users size={24} />,
      description: 'Friend group or specific friendships'
    }, 
    {
      id: 'social',
      label: 'Social',
      icon: <UserMinus size={24} />,
      description: 'Social anxiety or pressure'
    }, 
    {
      id: 'custom',
      label: 'Custom',
      icon: <PenLine size={24} />,
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
      
      // Speech feedback for option selection
      const speechFeedback = new SpeechSynthesisUtterance(`${targetId} selected. Please share your feelings.`);
      speechFeedback.volume = 0.8;
      window.speechSynthesis.speak(speechFeedback);
    }
  };

  const handleCustomTargetSubmit = () => {
    if (customTarget.trim()) {
      onSelect(customTarget.trim());
      
      // Speech feedback for custom target submission
      const speechFeedback = new SpeechSynthesisUtterance(`Custom target ${customTarget} selected. Please share your feelings.`);
      speechFeedback.volume = 0.8;
      window.speechSynthesis.speak(speechFeedback);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-medium mb-3">What's bothering you today?</h2>
        <p className="text-muted-foreground text-lg">Select what you want to vent about</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
        {targets.map(target => (
          <div 
            key={target.id} 
            onClick={() => handleTargetSelect(target.id)} 
            className={`
              bg-card hover:bg-secondary/70 rounded-xl shadow-soft p-6
              transition-all duration-300 cursor-pointer
              ${selectedTarget === target.id ? 'ring-2 ring-primary shadow-md transform scale-105' : ''}
            `}
          >
            <div className="flex flex-col h-full justify-center items-center text-center gap-4">
              <div className={`${selectedTarget === target.id ? 'text-primary bg-primary/10' : 'text-muted-foreground'} p-3 rounded-full`}>
                {target.icon}
              </div>
              <span className="font-medium text-lg">{target.label}</span>
              <p className="text-sm text-muted-foreground">{target.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      {showCustom && (
        <div className="animate-slide-up space-y-4 mt-8 p-6 bg-card rounded-xl shadow-soft">
          <div className="modern-form flex flex-col md:flex-row gap-4">
            <input 
              type="text" 
              value={customTarget} 
              onChange={e => setCustomTarget(e.target.value)} 
              placeholder="Enter what/who is bothering you..." 
              className="flex-1 px-4 py-3 rounded-md border bg-background focus:ring-2 focus:ring-primary"
              autoFocus 
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
