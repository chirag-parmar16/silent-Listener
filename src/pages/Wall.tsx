
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ConfessionWall from '@/components/ConfessionWall';
import VentHistory from '@/components/VentHistory';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { MessageSquare, History } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Wall = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('confessions');
  
  useEffect(() => {
    // Check if there's a tab parameter in the URL
    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams.get('tab');
    if (tab === 'history') {
      setActiveTab('history');
    }
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-medium mb-2">Community Wall</h1>
            <p className="text-muted-foreground">
              Discover shared experiences and know you're not alone
            </p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="confessions" className="flex items-center gap-2">
                <MessageSquare size={16} />
                <span>Confession Wall</span>
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <History size={16} />
                <span>Vent History</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="confessions">
              <ConfessionWall />
            </TabsContent>
            <TabsContent value="history">
              <VentHistory />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Wall;
