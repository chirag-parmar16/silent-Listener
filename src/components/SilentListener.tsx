
import React, { useState, useEffect } from 'react';
import { MessageCircle, User, Clock, ThumbsUp, Share2, RefreshCw, Volume2, VolumeX } from 'lucide-react';
import generateAIResponse from '../utils/aiResponseGenerator';
import textToSpeech from '../utils/textToSpeech';

interface SilentListenerProps {
  ventText: string;
  target: string;
  mode: string;
  onComplete: () => void;
  onReset: () => void;
}

const SilentListener: React.FC<SilentListenerProps> = ({ 
  ventText, 
  target, 
  mode,
  onComplete,
  onReset
}) => {
  const [responses, setResponses] = useState<string[]>([]);
  const [currentResponse, setCurrentResponse] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [typingIndex, setTypingIndex] = useState(0);
  const [responseIndex, setResponseIndex] = useState(0);
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(true);
  const [isAILoading, setIsAILoading] = useState(true);
  
  // Generate responses based on vent and mode using AI
  useEffect(() => {
    const fetchAIResponses = async () => {
      setIsAILoading(true);
      try {
        const aiResponses = await generateAIResponse(ventText, target, mode);
        setResponses(aiResponses);
      } catch (error) {
        console.error('Error generating AI responses:', error);
        // Fallback to simple responses if AI fails
        setResponses([
          `I understand how you feel about ${target}. It's okay to express these emotions.`,
          "Thank you for sharing. Your feelings are valid.",
          "I'm here to listen without judgment.",
          "Sometimes just expressing these thoughts can help process them."
        ]);
      } finally {
        setIsAILoading(false);
      }
    };
    
    fetchAIResponses();
  }, [ventText, target, mode]);
  
  // Simulate typing effect
  useEffect(() => {
    if (responses.length === 0 || isAILoading) return;
    
    if (responseIndex < responses.length) {
      const fullResponse = responses[responseIndex];
      
      if (typingIndex < fullResponse.length) {
        const typingTimer = setTimeout(() => {
          setCurrentResponse(fullResponse.substring(0, typingIndex + 1));
          setTypingIndex(typingIndex + 1);
        }, 30); // Adjust typing speed
        
        return () => clearTimeout(typingTimer);
      } else {
        // Speak the complete response if speech is enabled
        if (isSpeechEnabled && typingIndex === fullResponse.length) {
          textToSpeech.speak(fullResponse);
        }
        
        // Move to next response after delay
        const nextResponseTimer = setTimeout(() => {
          setResponseIndex(responseIndex + 1);
          setTypingIndex(0);
          setCurrentResponse('');
        }, 2000);
        
        return () => clearTimeout(nextResponseTimer);
      }
    } else {
      // All responses completed
      setIsTyping(false);
      
      // Move to motivation screen after a delay
      const completeTimer = setTimeout(() => {
        textToSpeech.stop(); // Stop any ongoing speech before moving on
        onComplete();
      }, 2000);
      
      return () => clearTimeout(completeTimer);
    }
  }, [responses, responseIndex, typingIndex, isAILoading, isSpeechEnabled, onComplete]);

  // Stop TTS when component unmounts
  useEffect(() => {
    return () => {
      textToSpeech.stop();
    };
  }, []);
  
  const toggleSpeech = () => {
    if (isSpeechEnabled) {
      textToSpeech.stop();
    }
    setIsSpeechEnabled(!isSpeechEnabled);
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-medium">Silent Listener</h2>
          <p className="text-muted-foreground mt-1">
            {isTyping 
              ? "The listener is reflecting on your words..." 
              : "The listener has heard you completely"
            }
          </p>
        </div>
        <button 
          onClick={toggleSpeech} 
          className="glass-card p-2 rounded-full hover:bg-primary/10 transition-all"
          aria-label={isSpeechEnabled ? "Disable speech" : "Enable speech"}
        >
          {isSpeechEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>
      </div>
      
      <div className="flex flex-col space-y-6">
        {/* User's vent message */}
        <div className="flex items-start gap-3 self-end max-w-[80%]">
          <div className="glass-card p-4 rounded-tl-xl rounded-tr-xl rounded-bl-xl">
            <p className="text-foreground">{ventText}</p>
            <div className="mt-2 flex items-center justify-end gap-2 text-xs text-muted-foreground">
              <Clock size={12} />
              <span>Just now</span>
            </div>
          </div>
          <div className="bg-accent/50 h-10 w-10 rounded-full flex items-center justify-center">
            <User size={18} className="text-accent-foreground" />
          </div>
        </div>
        
        {/* Silent Listener responses */}
        {responses.slice(0, responseIndex).map((response, index) => (
          <div key={index} className="flex items-start gap-3 self-start max-w-[80%] animate-slide-up">
            <div className="bg-primary/10 h-10 w-10 rounded-full flex items-center justify-center">
              <MessageCircle size={18} className="text-primary" />
            </div>
            <div className="glass-card p-4 rounded-tr-xl rounded-bl-xl rounded-br-xl">
              <p className="text-foreground">{response}</p>
              <div className="mt-2 flex items-center justify-end gap-2 text-xs text-muted-foreground">
                <Clock size={12} />
                <span>Just now</span>
              </div>
            </div>
          </div>
        ))}
        
        {/* Currently typing message */}
        {isTyping && currentResponse && (
          <div className="flex items-start gap-3 self-start max-w-[80%] animate-slide-up">
            <div className="bg-primary/10 h-10 w-10 rounded-full flex items-center justify-center">
              <MessageCircle size={18} className="text-primary" />
            </div>
            <div className="glass-card p-4 rounded-tr-xl rounded-bl-xl rounded-br-xl">
              <p className="text-foreground">{currentResponse}<span className="animate-pulse">|</span></p>
            </div>
          </div>
        )}
      </div>
      
      {!isTyping && (
        <div className="flex flex-col items-center gap-4 animate-fade-in pt-4">
          <div className="flex gap-4">
            <button className="glass-card p-2 rounded-full text-muted-foreground hover:text-primary transition-all">
              <ThumbsUp size={20} />
            </button>
            <button className="glass-card p-2 rounded-full text-muted-foreground hover:text-primary transition-all">
              <Share2 size={20} />
            </button>
            <button 
              onClick={onReset} 
              className="glass-card p-2 rounded-full text-muted-foreground hover:text-primary transition-all"
            >
              <RefreshCw size={20} />
            </button>
          </div>
          <button
            onClick={onComplete}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-full transition-all"
          >
            Continue to Motivation
          </button>
        </div>
      )}
    </div>
  );
};

export default SilentListener;
