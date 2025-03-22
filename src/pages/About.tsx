
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Shield, Heart, MessageCircle, RefreshCw } from 'lucide-react';

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        <div className="pt-24 pb-16 px-6">
          <div className="max-w-3xl mx-auto space-y-12">
            <div className="text-center space-y-4 animate-fade-in">
              <div className="chip bg-primary/10 text-primary mx-auto">About Us</div>
              <h1 className="text-3xl md:text-4xl font-medium">Our Mission</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Creating a safe space for emotional expression and healing
              </p>
            </div>
            
            <div className="space-y-6 animate-fade-in">
              <p className="text-lg">
                Silent Vent was created with a simple but powerful purpose: to provide a secure, judgment-free environment where people can express their emotions openly, without fear or hesitation.
              </p>
              
              <p className="text-lg">
                In our fast-paced world, many of us bottle up our feelings, leading to stress, anxiety, and emotional strain. We believe that expressing these emotions is an essential step toward emotional well-being and mental health.
              </p>
              
              <p className="text-lg">
                Our platform offers a unique approach to emotional release - providing both private venting options and a supportive community that understands what you're going through.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 pt-8">
              <div className="glass-card p-6 rounded-xl space-y-4 animate-slide-up">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-medium">Privacy First</h3>
                <p className="text-muted-foreground">
                  Your vents are private and secure. We prioritize anonymity and protect your personal information.
                </p>
              </div>
              
              <div className="glass-card p-6 rounded-xl space-y-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-medium">Emotional Support</h3>
                <p className="text-muted-foreground">
                  We believe in the power of expression and the importance of feeling heard and validated.
                </p>
              </div>
              
              <div className="glass-card p-6 rounded-xl space-y-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <MessageCircle size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-medium">Community Connection</h3>
                <p className="text-muted-foreground">
                  Sometimes knowing others share similar struggles can make all the difference in how we cope.
                </p>
              </div>
            </div>
            
            <div className="space-y-6 pt-8 animate-fade-in">
              <h2 className="text-2xl font-medium">How It Works</h2>
              
              <div className="space-y-8">
                <div className="flex gap-6 items-start">
                  <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <span className="font-medium">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Select Your Target</h3>
                    <p className="text-muted-foreground">
                      Choose what's bothering you - whether it's work, relationships, family, friends, or something else entirely. This helps personalize your venting experience.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-6 items-start">
                  <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <span className="font-medium">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Express Yourself</h3>
                    <p className="text-muted-foreground">
                      Write your thoughts and feelings in our secure venting area. Say exactly what you need to say without filters or censorship.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-6 items-start">
                  <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <span className="font-medium">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Silent Listener Experience</h3>
                    <p className="text-muted-foreground">
                      Our AI-powered Silent Listener responds to your vent in your chosen mode - providing sympathy, justification, or constructive arguments to help you process your emotions.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-6 items-start">
                  <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <span className="font-medium">4</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Motivational Closure</h3>
                    <p className="text-muted-foreground">
                      End your session with a personalized motivational message that helps you move forward with a positive mindset.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6 pt-8 animate-fade-in">
              <h2 className="text-2xl font-medium">Our Values</h2>
              
              <div className="space-y-4">
                <p className="text-lg">
                  <strong>Safety:</strong> We've built Silent Vent with your emotional and data safety as our top priority.
                </p>
                
                <p className="text-lg">
                  <strong>Empathy:</strong> We understand that everyone faces struggles, and we believe in the power of compassion.
                </p>
                
                <p className="text-lg">
                  <strong>Growth:</strong> Emotional expression is just the first step - we aim to help you grow from your experiences.
                </p>
                
                <p className="text-lg">
                  <strong>Community:</strong> While venting is personal, knowing you're not alone can be incredibly powerful.
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-radial from-secondary/50 to-transparent p-8 rounded-2xl text-center space-y-6 animate-fade-in">
              <h2 className="text-2xl font-medium">Ready to Start Your Journey?</h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                Express your emotions freely and take the first step toward emotional well-being.
              </p>
              <a 
                href="/" 
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-full transition-colors animate-hover"
              >
                <RefreshCw size={18} />
                <span>Start Venting Now</span>
              </a>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
