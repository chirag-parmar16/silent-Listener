
import React, { useState, useEffect } from 'react';
import { Send, Trash2, Volume2, VolumeX, RefreshCw } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

interface VentingFormProps {
  target: string;
  onSubmit: (vent: string, mode: string) => void;
  onReset: () => void;
}

const VentingForm: React.FC<VentingFormProps> = ({ target, onSubmit, onReset }) => {
  const [ventText, setVentText] = useState('');
  const [mode, setMode] = useState('sympathy');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [charactersLeft, setCharactersLeft] = useState(2000);
  const { toast } = useToast();

  const MAX_CHARS = 2000;

  useEffect(() => {
    setCharactersLeft(MAX_CHARS - ventText.length);
  }, [ventText]);

  const handleVentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ventText.trim()) {
      setIsSubmitting(true);
      // Simulate API call delay
      setTimeout(() => {
        onSubmit(ventText, mode);
        setIsSubmitting(false);
      }, 1000);
    } else {
      toast({
        title: "Can't submit empty vent",
        description: "Please share what's on your mind.",
        variant: "destructive",
      });
    }
  };

  const toggleRecording = () => {
    // In a real implementation, this would use the Web Speech API
    if (isRecording) {
      setIsRecording(false);
      toast({
        title: "Voice recording stopped",
        description: "Your spoken words have been converted to text.",
      });
      // Simulating voice-to-text result
      setVentText(ventText + " [Voice recording converted to text would appear here]");
    } else {
      setIsRecording(true);
      toast({
        title: "Voice recording started",
        description: "Speak clearly to vent your feelings.",
      });
    }
  };

  const clearVent = () => {
    if (ventText) {
      setVentText('');
      toast({
        title: "Vent cleared",
        description: "Start fresh with a clean slate.",
      });
    }
  };

  const targetDisplay = target.charAt(0).toUpperCase() + target.slice(1);

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="chip mb-2 bg-primary/10 text-primary">{targetDisplay}</div>
          <h2 className="text-xl font-medium">Express your feelings safely</h2>
          <p className="text-muted-foreground mt-1">This is your private space to vent</p>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={toggleRecording}
            className={`p-3 rounded-full transition-all ${
              isRecording 
                ? 'bg-destructive text-destructive-foreground animate-pulse-soft' 
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
            aria-label={isRecording ? "Stop recording" : "Start voice recording"}
            title={isRecording ? "Stop recording" : "Start voice recording"}
          >
            {isRecording ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          
          <button
            onClick={clearVent}
            disabled={!ventText}
            className="p-3 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all disabled:opacity-50"
            aria-label="Clear vent"
            title="Clear vent"
          >
            <Trash2 size={18} />
          </button>
          
          <button
            onClick={onReset}
            className="p-3 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all"
            aria-label="Start over"
            title="Start over"
          >
            <RefreshCw size={18} />
          </button>
        </div>
      </div>
      
      <form onSubmit={handleVentSubmit} className="space-y-4 modern-form">
        <div className="relative">
          <textarea
            value={ventText}
            onChange={(e) => setVentText(e.target.value.substring(0, MAX_CHARS))}
            placeholder={`Tell us how you feel about ${target}... This is a safe space.`}
            className="w-full h-60 p-4 rounded-lg border resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            disabled={isSubmitting}
          />
          <div className={`absolute bottom-3 right-3 text-xs ${
            charactersLeft < 100 ? 'text-destructive' : 'text-muted-foreground'
          }`}>
            {charactersLeft} characters left
          </div>
        </div>
        
        <div className="space-y-3">
          <p className="font-medium">How would you like the Silent Listener to respond?</p>
          
          <div className="flex flex-wrap gap-3">
            <label className={`flex items-center gap-2 rounded-full px-4 py-2 cursor-pointer transition-all ${
              mode === 'sympathy' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/70'
            }`}>
              <input
                type="radio"
                name="mode"
                value="sympathy"
                checked={mode === 'sympathy'}
                onChange={() => setMode('sympathy')}
                className="sr-only"
              />
              <span>Sympathy Mode</span>
            </label>
            
            <label className={`flex items-center gap-2 rounded-full px-4 py-2 cursor-pointer transition-all ${
              mode === 'justification' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/70'
            }`}>
              <input
                type="radio"
                name="mode"
                value="justification"
                checked={mode === 'justification'}
                onChange={() => setMode('justification')}
                className="sr-only"
              />
              <span>Justification Mode</span>
            </label>
            
            <label className={`flex items-center gap-2 rounded-full px-4 py-2 cursor-pointer transition-all ${
              mode === 'argument' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/70'
            }`}>
              <input
                type="radio"
                name="mode"
                value="argument"
                checked={mode === 'argument'}
                onChange={() => setMode('argument')}
                className="sr-only"
              />
              <span>Argument Mode</span>
            </label>
          </div>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting || !ventText.trim()}
          className="w-full py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md flex items-center justify-center gap-2 transition-all disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
              <span>Processing...</span>
            </>
          ) : (
            <>
              <Send size={18} />
              <span>Express Your Feelings</span>
            </>
          )}
        </button>
      </form>
      
      <p className="text-sm text-muted-foreground italic text-center">
        Your vent is completely private and secure. You can delete it at any time.
      </p>
    </div>
  );
};

export default VentingForm;
