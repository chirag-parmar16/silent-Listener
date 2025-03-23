
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/hooks/use-theme';
import { Save, Sun, Moon, Volume2, VolumeX } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  
  // Auto-speak settings
  const [autoSpeak, setAutoSpeak] = useState(() => {
    const saved = localStorage.getItem('silent-listener-auto-speak');
    return saved !== null ? JSON.parse(saved) : true;
  });
  
  // Save settings
  const saveSettings = () => {
    localStorage.setItem('silent-listener-auto-speak', JSON.stringify(autoSpeak));
    
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated.",
    });
  };
  
  const handleAutoSpeakChange = (checked: boolean) => {
    setAutoSpeak(checked);
    localStorage.setItem('silent-listener-auto-speak', JSON.stringify(checked));
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-24 pb-16 px-6">
        <div className="container mx-auto max-w-3xl">
          <div className="space-y-10 animate-fade-in">
            <div className="text-center">
              <div className="chip mx-auto mb-2">Personalize</div>
              <h1 className="text-3xl font-medium mb-4">Your Settings</h1>
              <p className="text-muted-foreground">
                Customize your Silent Listener experience
              </p>
            </div>
            
            <div className="space-y-8">
              <div className="glass-card p-6 rounded-xl">
                <h2 className="text-xl font-medium mb-6">Appearance</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
                        <span className="font-medium">Theme</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Choose how Silent Listener looks to you
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => setTheme('light')}
                        className={`p-2 rounded-md transition-colors ${
                          theme === 'light' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                        }`}
                      >
                        Light
                      </button>
                      <button 
                        onClick={() => setTheme('dark')}
                        className={`p-2 rounded-md transition-colors ${
                          theme === 'dark' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                        }`}
                      >
                        Dark
                      </button>
                      <button 
                        onClick={() => setTheme('system')}
                        className={`p-2 rounded-md transition-colors ${
                          theme === 'system' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                        }`}
                      >
                        System
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="glass-card p-6 rounded-xl">
                <h2 className="text-xl font-medium mb-6">Accessibility</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {autoSpeak ? <Volume2 size={18} /> : <VolumeX size={18} />}
                        <Label htmlFor="auto-speak" className="font-medium">Automatic Speech</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Automatically speak motivational messages aloud
                      </p>
                    </div>
                    <Switch 
                      id="auto-speak"
                      checked={autoSpeak} 
                      onCheckedChange={handleAutoSpeakChange}
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button 
                  onClick={saveSettings}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Save size={16} />
                  <span>Save Settings</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Settings;
