
import React, { useState, useEffect } from 'react';
import { Save, Share2, Heart, RefreshCw, Volume2, VolumeX } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

interface MotivationalClosureProps {
  target: string;
  ventText: string;
  onReset: () => void;
}

const MotivationalClosure: React.FC<MotivationalClosureProps> = ({ target, ventText, onReset }) => {
  const [motivationalMessage, setMotivationalMessage] = useState('');
  const [showSaved, setShowSaved] = useState(false);
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    // Generate a motivational message based on sentiment analysis
    // This is a simplified implementation - in a real app you would use NLP or an API
    const messages = [
      "Every emotion you feel is valid. By expressing it, you've already begun healing.",
      "You've shown incredible strength by acknowledging your feelings. That's the first step toward inner peace.",
      "Remember that difficult emotions are temporary visitors. They pass through, but don't define you.",
      "Your ability to express yourself honestly reflects your emotional intelligence and self-awareness.",
      "This moment of vulnerability is actually a moment of courage. Be proud of yourself.",
      "Tomorrow brings new possibilities. Today's expression clears the path forward.",
      "You are stronger than any challenge that comes your way. Your honesty with yourself proves it.",
      "The fact that you took time to express yourself shows how much you value your own wellbeing.",
      "By releasing these emotions, you've made room for more positive energy in your life.",
      "Your journey toward emotional well-being matters. Today you took an important step."
    ];
    
    // Simple sentiment "analysis" - in a real app, you'd use NLP
    const determineMessageIndex = () => {
      const words = ventText.toLowerCase().split(/\s+/);
      const angryWords = ['angry', 'mad', 'furious', 'annoyed', 'frustrated', 'hate'];
      const sadWords = ['sad', 'depressed', 'unhappy', 'miserable', 'lonely', 'hurt'];
      const anxiousWords = ['anxious', 'worried', 'nervous', 'afraid', 'scared', 'stress'];
      
      let angryCount = 0, sadCount = 0, anxiousCount = 0;
      
      words.forEach(word => {
        if (angryWords.some(angry => word.includes(angry))) angryCount++;
        if (sadWords.some(sad => word.includes(sad))) sadCount++;
        if (anxiousWords.some(anxious => word.includes(anxious))) anxiousCount++;
      });
      
      if (angryCount > sadCount && angryCount > anxiousCount) return 0;
      if (sadCount > angryCount && sadCount > anxiousCount) return 1;
      if (anxiousCount > angryCount && anxiousCount > sadCount) return 2;
      
      // Default to a random message if no clear emotion detected
      return Math.floor(Math.random() * messages.length);
    };
    
    const messageIndex = determineMessageIndex();
    setMotivationalMessage(messages[messageIndex]);
  }, [ventText]);

  // Function to speak the motivational message
  const speakMessage = (text: string) => {
    if (!isSpeechEnabled) return;
    
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Set a voice that's likely available (this will be the browser's default otherwise)
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        // Try to find a female voice for better empathy (fallback to any available voice)
        const femaleVoice = voices.find(voice => voice.name.includes('female') || voice.name.includes('Female'));
        if (femaleVoice) {
          utterance.voice = femaleVoice;
        }
      }
      
      // Customize voice settings for more inspirational tone
      utterance.rate = 0.9; // Slightly slower for clarity
      utterance.pitch = 1.0; // Normal pitch for inspirational tone
      utterance.volume = 1.0; // Full volume
      
      window.speechSynthesis.speak(utterance);
    }
  };
  
  // Toggle speech feature
  const toggleSpeech = () => {
    setIsSpeechEnabled(!isSpeechEnabled);
    
    if (!isSpeechEnabled) {
      toast({
        title: "Text-to-Speech enabled",
        description: "The motivational message will now be spoken aloud",
      });
      
      // Speak the current motivational message
      speakMessage(motivationalMessage);
    } else {
      // Cancel any ongoing speech
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      
      toast({
        title: "Text-to-Speech disabled",
        description: "The message will no longer be spoken",
      });
    }
  };
  
  const handleSave = () => {
    // In a real app, you would save to localStorage or a database
    setShowSaved(true);
    toast({
      title: "Motivational message saved",
      description: "You can find it in your saved messages section.",
    });
    
    setTimeout(() => setShowSaved(false), 2000);
  };
  
  const handleShare = () => {
    // Fixed sharing functionality to include the actual quote text
    const shareText = `"${motivationalMessage}" - Silent Listener App`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Motivational Message from Silent Listener',
        text: shareText,
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing:', error));
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(shareText)
        .then(() => {
          toast({
            title: "Copied to clipboard",
            description: "You can now paste and share this motivational message.",
          });
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
        });
    }
  };
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center">
        <div className="chip mx-auto mb-2">Self-Care Moment</div>
        <h2 className="text-2xl font-medium mb-2">You've Been Heard</h2>
        <p className="text-muted-foreground">
          Expressing your feelings is an important step in emotional well-being
        </p>
      </div>
      
      <div className="glass-card p-8 mx-auto max-w-2xl rounded-2xl">
        <blockquote className="text-xl md:text-2xl font-light text-center italic text-balance">
          "{motivationalMessage}"
        </blockquote>
      </div>
      
      <div className="flex flex-col items-center gap-6">
        <div className="flex gap-4">
          <button 
            onClick={handleSave}
            className={`glass-card p-3 rounded-full transition-all ${
              showSaved ? 'text-primary' : 'text-muted-foreground hover:text-primary'
            }`}
            aria-label="Save motivational message"
          >
            {showSaved ? <Heart className="animate-scale-in" size={20} /> : <Save size={20} />}
          </button>
          
          <button 
            onClick={handleShare}
            className="glass-card p-3 rounded-full text-muted-foreground hover:text-primary transition-all"
            aria-label="Share motivational message"
          >
            <Share2 size={20} />
          </button>
          
          <button 
            onClick={toggleSpeech}
            className={`glass-card p-3 rounded-full transition-all ${
              isSpeechEnabled ? 'text-primary' : 'text-muted-foreground hover:text-primary'
            }`}
            aria-label={isSpeechEnabled ? "Disable voice" : "Enable voice"}
          >
            {isSpeechEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
          
          <button 
            onClick={onReset}
            className="glass-card p-3 rounded-full text-muted-foreground hover:text-primary transition-all"
            aria-label="Start over"
          >
            <RefreshCw size={20} />
          </button>
        </div>
        
        <button
          onClick={onReset}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-full transition-all animate-hover"
        >
          Start a New Vent Session
        </button>
      </div>
      
      <p className="text-sm text-muted-foreground text-center">
        Remember, it's important to seek professional help if you're experiencing ongoing emotional distress.
      </p>
    </div>
  );
};

export default MotivationalClosure;
