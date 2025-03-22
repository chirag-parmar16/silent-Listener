
import React, { useState, useEffect } from 'react';
import { Heart, Share2, Clock, Filter } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

interface Confession {
  id: string;
  text: string;
  target: string;
  timestamp: number;
  likes: number;
  liked?: boolean;
}

const ConfessionWall: React.FC = () => {
  const [confessions, setConfessions] = useState<Confession[]>([]);
  const [filter, setFilter] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Mock confessions - in a real app, these would come from an API
  useEffect(() => {
    const mockConfessions: Confession[] = [
      {
        id: '1',
        text: "My boss keeps taking credit for my work and it's making me feel undervalued and frustrated. I've put so much effort into these projects.",
        target: 'work',
        timestamp: Date.now() - 1000 * 60 * 15, // 15 minutes ago
        likes: 24
      },
      {
        id: '2',
        text: "I can't stop thinking about my ex even though it's been months since we broke up. I know I should move on but it's so difficult.",
        target: 'relationship',
        timestamp: Date.now() - 1000 * 60 * 45, // 45 minutes ago
        likes: 38
      },
      {
        id: '3',
        text: "My parents never understand my career choices and keep pressuring me to follow their path. I wish they could see how happy I am.",
        target: 'family',
        timestamp: Date.now() - 1000 * 60 * 120, // 2 hours ago
        likes: 52
      },
      {
        id: '4',
        text: "I feel like I'm always the one initiating conversations with my friends. It makes me wonder if they actually care about me at all.",
        target: 'friends',
        timestamp: Date.now() - 1000 * 60 * 180, // 3 hours ago
        likes: 41
      },
      {
        id: '5',
        text: "Social media gives me so much anxiety. Everyone seems to be living their best life while I'm struggling to just get through the day.",
        target: 'social',
        timestamp: Date.now() - 1000 * 60 * 240, // 4 hours ago
        likes: 67
      }
    ];
    
    setConfessions(mockConfessions);
  }, []);
  
  const handleLike = (id: string) => {
    setConfessions(prevConfessions => 
      prevConfessions.map(confession => 
        confession.id === id
          ? {
              ...confession,
              likes: confession.liked 
                ? confession.likes - 1 
                : confession.likes + 1,
              liked: !confession.liked
            }
          : confession
      )
    );
  };
  
  const handleShare = (confession: Confession) => {
    // In a real app, implement sharing functionality
    toast({
      title: "Share feature",
      description: "You can share this confession with others.",
    });
    
    if (navigator.share) {
      navigator.share({
        title: 'Anonymous Confession from Silent Vent',
        text: confession.text,
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing:', error));
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(confession.text)
        .then(() => {
          toast({
            title: "Copied to clipboard",
            description: "You can now paste and share this confession.",
          });
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
        });
    }
  };
  
  const formatTime = (timestamp: number) => {
    const now = Date.now();
    const diffMs = now - timestamp;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} h ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} d ago`;
  };
  
  const filteredConfessions = filter 
    ? confessions.filter(confession => confession.target === filter)
    : confessions;
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-2xl font-medium mb-2">Community Confessions</h2>
        <p className="text-muted-foreground">
          Read anonymous confessions from others and know you're not alone
        </p>
      </div>
      
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setFilter(null)}
          className={`rounded-full px-4 py-2 text-sm transition-all ${
            filter === null 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/70'
          }`}
        >
          All
        </button>
        
        <button
          onClick={() => setFilter('work')}
          className={`rounded-full px-4 py-2 text-sm transition-all ${
            filter === 'work' 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/70'
          }`}
        >
          Work
        </button>
        
        <button
          onClick={() => setFilter('relationship')}
          className={`rounded-full px-4 py-2 text-sm transition-all ${
            filter === 'relationship' 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/70'
          }`}
        >
          Relationship
        </button>
        
        <button
          onClick={() => setFilter('family')}
          className={`rounded-full px-4 py-2 text-sm transition-all ${
            filter === 'family' 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/70'
          }`}
        >
          Family
        </button>
        
        <button
          onClick={() => setFilter('friends')}
          className={`rounded-full px-4 py-2 text-sm transition-all ${
            filter === 'friends' 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/70'
          }`}
        >
          Friends
        </button>
        
        <button
          onClick={() => setFilter('social')}
          className={`rounded-full px-4 py-2 text-sm transition-all ${
            filter === 'social' 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/70'
          }`}
        >
          Social
        </button>
      </div>
      
      <div className="space-y-6">
        {filteredConfessions.length === 0 ? (
          <div className="text-center p-8">
            <p className="text-muted-foreground">No confessions to display.</p>
          </div>
        ) : (
          filteredConfessions.map(confession => (
            <div key={confession.id} className="glass-card p-6 rounded-xl animate-fade-in">
              <div className="flex items-center gap-2 mb-3">
                <div className="chip bg-secondary/50">{confession.target.charAt(0).toUpperCase() + confession.target.slice(1)}</div>
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock size={12} />
                  {formatTime(confession.timestamp)}
                </div>
              </div>
              
              <p className="text-balance mb-4">{confession.text}</p>
              
              <div className="flex justify-between items-center">
                <button 
                  onClick={() => handleLike(confession.id)}
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Heart size={18} className={confession.liked ? "fill-primary text-primary" : ""} />
                  <span>{confession.likes}</span>
                </button>
                
                <button 
                  onClick={() => handleShare(confession)}
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Share2 size={18} />
                  <span>Share</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ConfessionWall;
