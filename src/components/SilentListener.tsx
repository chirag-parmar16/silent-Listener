
import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, User, Clock, ThumbsUp, Share2, RefreshCw, Send, Volume2, VolumeX } from 'lucide-react';
import { generateAIResponses } from '@/utils/aiResponseGenerator';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SilentListenerProps {
  ventText: string;
  target: string;
  mode: string;
  onComplete: () => void;
  onReset: () => void;
}

interface Message {
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const SilentListener: React.FC<SilentListenerProps> = ({ 
  ventText, 
  target, 
  mode,
  onComplete,
  onReset
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [currentResponse, setCurrentResponse] = useState('');
  const [typingIndex, setTypingIndex] = useState(0);
  const [responseIndex, setResponseIndex] = useState(0);
  const [currentAIResponses, setCurrentAIResponses] = useState<string[]>([]);
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Improved scroll to bottom with smooth behavior but only within the chat container
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };
  
  // Enhanced effect for scrolling - will run on all message changes and current response changes
  // But only scrolls within the container, not the whole page
  useEffect(() => {
    const scrollTimer = setTimeout(() => {
      scrollToBottom();
    }, 50); // Small delay to ensure DOM has updated
    
    return () => clearTimeout(scrollTimer);
  }, [messages, currentResponse]);
  
  // Initialize conversation with the initial vent
  useEffect(() => {
    if (ventText) {
      // Add user's initial message
      setMessages([{
        text: ventText,
        sender: 'user',
        timestamp: new Date()
      }]);
      
      // Get AI response to initial message
      handleAIResponse(ventText);
    }
  }, [ventText, target, mode]);
  
  // Handle getting AI response for a message
  const handleAIResponse = async (userMessage: string) => {
    setIsTyping(true);
    setResponseIndex(0);
    
    try {
      // Get conversation history for context
      const conversationHistory = messages.map(m => m.text);
      
      console.log("Getting AI responses with history:", conversationHistory);
      
      // Get AI responses
      const responses = await generateAIResponses({ 
        ventText: userMessage, 
        target, 
        mode,
        conversationHistory
      });
      
      console.log("Received AI responses:", responses);
      
      if (Array.isArray(responses) && responses.length > 0) {
        setCurrentAIResponses(responses);
      } else {
        console.error("Expected array of responses but got:", responses);
        toast({
          title: "Connection issue",
          description: "Using backup responses while we reconnect",
          variant: "destructive"
        });
        setCurrentAIResponses(["I'm listening...", "Please share more about how you feel."]);
      }
    } catch (error) {
      console.error("Error generating responses:", error);
      toast({
        title: "Connection issue",
        description: "Using backup responses while we reconnect",
        variant: "destructive"
      });
      setCurrentAIResponses(["I'm here to listen.", "Please tell me more."]);
    }
  };
  
  // Handle speaking the message using Text-to-Speech
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
      
      // Customize voice settings for better empathy
      utterance.rate = 0.9; // Slightly slower for a more empathetic tone
      utterance.pitch = 1.1; // Slightly higher pitch
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
        description: "AI responses will now be spoken aloud",
      });
      
      // If we have a current response, speak it
      if (messages.length > 0) {
        const lastAIMessage = [...messages].reverse().find(m => m.sender === 'ai');
        if (lastAIMessage) {
          speakMessage(lastAIMessage.text);
        }
      }
    } else {
      // Cancel any ongoing speech
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      
      toast({
        title: "Text-to-Speech disabled",
        description: "AI responses will no longer be spoken",
      });
    }
  };
  
  // Handle user sending a new message
  const handleSendMessage = () => {
    if (!currentInput.trim()) return;
    
    // Add user message
    const newMessage: Message = {
      text: currentInput,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Get AI response to the new message
    handleAIResponse(currentInput);
    
    // Clear input
    setCurrentInput('');
  };
  
  // Handle typing animation for AI responses
  useEffect(() => {
    if (currentAIResponses.length === 0) return;
    
    if (responseIndex < currentAIResponses.length) {
      const fullResponse = currentAIResponses[responseIndex];
      
      if (typingIndex === 0) {
        setCurrentResponse('');
      }
      
      if (typingIndex < fullResponse.length) {
        const typingTimer = setTimeout(() => {
          setCurrentResponse(fullResponse.substring(0, typingIndex + 1));
          setTypingIndex(typingIndex + 1);
        }, 30); // Adjust typing speed
        
        return () => clearTimeout(typingTimer);
      } else {
        // Add completed response to messages
        const newMessage: Message = {
          text: fullResponse,
          sender: 'ai',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, newMessage]);
        
        // Speak the message if speech is enabled
        if (isSpeechEnabled) {
          speakMessage(fullResponse);
        }
        
        // Move to next response after delay
        const nextResponseTimer = setTimeout(() => {
          setResponseIndex(responseIndex + 1);
          setTypingIndex(0);
        }, 1000);
        
        return () => clearTimeout(nextResponseTimer);
      }
    } else {
      // All responses completed
      setIsTyping(false);
    }
  }, [currentAIResponses, responseIndex, typingIndex, isSpeechEnabled]);
  
  // Handle key press (Enter to send)
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-medium">Silent Listener</h2>
          <p className="text-muted-foreground mt-1">
            {isTyping 
              ? "The listener is reflecting on your words..." 
              : "What else would you like to share?"
            }
          </p>
        </div>
        <button
          onClick={toggleSpeech}
          className={`p-2 rounded-full transition-all ${
            isSpeechEnabled ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
          }`}
          title={isSpeechEnabled ? "Disable voice" : "Enable voice"}
        >
          {isSpeechEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>
      </div>
      
      <ScrollArea className="h-[50vh] pr-4 overflow-y-auto">
        <div className="flex flex-col space-y-6 pb-4">
          {/* Messages history */}
          {messages.map((message, idx) => (
            <div 
              key={idx} 
              className={`flex items-start gap-3 ${message.sender === 'user' ? 'self-end max-w-[80%]' : 'self-start max-w-[80%]'} animate-slide-up`}
            >
              {message.sender === 'ai' && (
                <div className="bg-primary/10 h-10 w-10 rounded-full flex items-center justify-center">
                  <MessageCircle size={18} className="text-primary" />
                </div>
              )}
              
              <div className={`glass-card p-4 ${message.sender === 'user' 
                ? 'rounded-tl-xl rounded-tr-xl rounded-bl-xl' 
                : 'rounded-tr-xl rounded-bl-xl rounded-br-xl'}`}
              >
                <p className="text-foreground">{message.text}</p>
                <div className="mt-2 flex items-center justify-end gap-2 text-xs text-muted-foreground">
                  <Clock size={12} />
                  <span>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
              
              {message.sender === 'user' && (
                <div className="bg-accent/50 h-10 w-10 rounded-full flex items-center justify-center">
                  <User size={18} className="text-accent-foreground" />
                </div>
              )}
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
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      {/* Input area for ongoing conversation */}
      <div className="flex gap-2 mt-4">
        <Input
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message..."
          className="flex-1"
          disabled={isTyping}
        />
        <button
          onClick={handleSendMessage}
          disabled={isTyping || !currentInput.trim()}
          className="bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-primary-foreground p-2 rounded-full transition-all"
        >
          <Send size={20} />
        </button>
      </div>
      
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
    </div>
  );
};

export default SilentListener;
