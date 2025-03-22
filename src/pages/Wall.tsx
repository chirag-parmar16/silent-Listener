
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ConfessionWall from '@/components/ConfessionWall';
import VentHistory from '@/components/VentHistory';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { MessageSquare, History } from 'lucide-react';

const Wall = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="confessions" className="w-full">
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
