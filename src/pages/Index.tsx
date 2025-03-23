import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TargetSelector from '@/components/TargetSelector';
import VentingForm from '@/components/VentingForm';
import SilentListener from '@/components/SilentListener';
import MotivationalClosure from '@/components/MotivationalClosure';
import ConfessionWall from '@/components/ConfessionWall';
import { ChevronDown } from 'lucide-react';
enum VentStage {
  Welcome,
  TargetSelection,
  Venting,
  Listening,
  Motivation,
}
const Index = () => {
  const [stage, setStage] = useState<VentStage>(VentStage.Welcome);
  const [selectedTarget, setSelectedTarget] = useState('');
  const [ventText, setVentText] = useState('');
  const [listenerMode, setListenerMode] = useState('sympathy');
  const handleTargetSelect = (target: string) => {
    setSelectedTarget(target);
    setStage(VentStage.Venting);

    // Remove automatic scrolling behavior
    // We'll let the user scroll manually
  };
  const handleVentSubmit = (vent: string, mode: string) => {
    setVentText(vent);
    setListenerMode(mode);
    setStage(VentStage.Listening);

    // Remove automatic scrolling behavior
    // We'll let the user scroll manually
  };
  const handleReset = () => {
    setStage(VentStage.TargetSelection);
    setVentText('');

    // Remove automatic scrolling behavior
    // We'll let the user scroll manually
  };
  const scrollToVent = () => {
    setStage(VentStage.TargetSelection);

    // Add a small delay before scrolling to ensure component update
    setTimeout(() => {
      // Get the target element instead of using window.scrollTo
      const ventArea = document.getElementById('vent-area');
      if (ventArea) {
        ventArea.scrollIntoView({
          behavior: 'smooth'
        });
      }
    }, 100);
  };
  const renderStageContent = () => {
    switch (stage) {
      case VentStage.Welcome:
        return <div className="min-h-screen flex flex-col">
            <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-16">
              <div className="space-y-6 max-w-3xl animate-fade-in py-[76px]">
                <div className="chip bg-primary/10 text-primary mx-auto">Express Without Fear</div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight">Silent Listener </h1>
                <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto my-[70px]">
                  A safe, anonymous space where you can express your emotions freely without judgment.
                </p>
                
                <div className="pt-6">
                  <button onClick={scrollToVent} className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-full text-lg transition-all animate-hover">
                    Start Venting
                  </button>
                </div>
                
                <div className="pt-12 animate-pulse-soft">
                  <ChevronDown size={32} className="mx-auto text-muted-foreground" />
                </div>
              </div>
            </div>
            
            <div className="py-16 px-6" id="features">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                  <div className="chip bg-secondary mb-2">Features</div>
                  <h2 className="text-3xl font-medium">Your Silent Listener Space</h2>
                  <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                    Designed to provide emotional release in a secure, private environment
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                  <div className="glass-card p-6 rounded-xl space-y-4 animate-hover">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                        <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" />
                        <path d="M7 10L12 15L17 10" />
                        <path d="M12 15V3" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium">Venting Mode</h3>
                    <p className="text-muted-foreground">
                      Target your frustration and release it in a personalized environment designed for stress release.
                    </p>
                  </div>
                  
                  <div className="glass-card p-6 rounded-xl space-y-4 animate-hover">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                        <path d="M19 21A2 2 0 0 0 21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14" />
                        <path d="M15 9h.01" />
                        <path d="M11 9h.01" />
                        <path d="M15 13h.01" />
                        <path d="M11 13h.01" />
                        <path d="M15 17h.01" />
                        <path d="M7 17h.01" />
                        <path d="M7 13h.01" />
                        <path d="M7 9h.01" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium">No Judgment Zone</h3>
                    <p className="text-muted-foreground">
                      Express yourself in an anonymous, secure space with self-destruct options for total privacy.
                    </p>
                  </div>
                  
                  <div className="glass-card p-6 rounded-xl space-y-4 animate-hover">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                        <path d="M12 2v1" />
                        <path d="M21 12h-1" />
                        <path d="M12 21v1" />
                        <path d="M3 12h1" />
                        <path d="m18.364 5.636-.707.707" />
                        <path d="m6.343 17.657-.707.707" />
                        <path d="m5.636 5.636.707.707" />
                        <path d="m17.657 17.657.707.707" />
                        <path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium">Silent Listener</h3>
                    <p className="text-muted-foreground">
                      Receive simulated responses based on your target in Sympathy, Justification, or Argument modes.
                    </p>
                  </div>
                  
                  <div className="glass-card p-6 rounded-xl space-y-4 animate-hover">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium">Motivational Closure</h3>
                    <p className="text-muted-foreground">
                      End each session with a heartfelt, encouraging message tailored to your current emotional state.
                    </p>
                  </div>
                  
                  <div className="glass-card p-6 rounded-xl space-y-4 animate-hover">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                        <path d="M22 12L16 9V12V22L22 19V12Z" />
                        <path d="M2 1 8 4V14V4L2 7V17" />
                        <path d="M14 0 8 2V22L14 20V0Z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium">Save & Share</h3>
                    <p className="text-muted-foreground">
                      Keep motivational messages that resonated with you or share them with friends who need support.
                    </p>
                  </div>
                  
                  <div className="glass-card p-6 rounded-xl space-y-4 animate-hover">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                        <rect width="18" height="18" x="3" y="3" rx="2" />
                        <path d="M7 7h.01" />
                        <path d="M17 7h.01" />
                        <path d="M7 17h.01" />
                        <path d="M17 17h.01" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium">Community Wall</h3>
                    <p className="text-muted-foreground">
                      Discover anonymous confessions from others and realize you're not alone in your feelings.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="py-16 px-6 bg-gradient-to-b from-background to-secondary/30">
              <div className="max-w-3xl mx-auto text-center space-y-6">
                <div className="chip bg-accent text-accent-foreground mx-auto">Start Now</div>
                <h2 className="text-3xl font-medium">Ready to Express Yourself?</h2>
                <p className="text-muted-foreground">
                  Take the first step toward emotional release and begin your venting journey
                </p>
                <div className="pt-4">
                  <button onClick={scrollToVent} className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-full text-lg transition-all animate-hover">
                    Start Venting
                  </button>
                </div>
              </div>
            </div>
            
            <div className="py-16 px-6" id="vent-area">
              <div className="max-w-3xl mx-auto">
                <TargetSelector onSelect={handleTargetSelect} />
              </div>
            </div>
          </div>;
      case VentStage.TargetSelection:
        return <div className="min-h-screen flex flex-col pt-24 py-0">
            <div className="max-w-3xl mx-auto w-full">
              <TargetSelector onSelect={handleTargetSelect} />
            </div>
          </div>;
      case VentStage.Venting:
        return <div className="min-h-screen flex flex-col pt-40 pb-16 px-6">
            <div className="max-w-3xl mx-auto w-full">
              <VentingForm target={selectedTarget} onSubmit={handleVentSubmit} onReset={handleReset} />
            </div>
          </div>;
      case VentStage.Listening:
        return <div className="min-h-screen flex flex-col pt-24 pb-16 px-6">
            <div className="max-w-3xl mx-auto w-full">
              <SilentListener ventText={ventText} target={selectedTarget} mode={listenerMode} onComplete={() => setStage(VentStage.Motivation)} onReset={handleReset} />
            </div>
          </div>;
      case VentStage.Motivation:
        return <div className="min-h-screen flex flex-col pt-24 pb-16 px-6">
            <div className="max-w-3xl mx-auto w-full">
              <MotivationalClosure ventText={ventText} target={selectedTarget} onReset={handleReset} />
            </div>
          </div>;
      default:
        return null;
    }
  };
  return <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {renderStageContent()}
      </main>
      <Footer />
    </div>;
};
export default Index;