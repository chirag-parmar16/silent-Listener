
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface VentRecord {
  id: string;
  text: string;
  target: string;
  mode: string;
  timestamp: number;
}

const VentHistory: React.FC = () => {
  const [ventHistory, setVentHistory] = useState<VentRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Load vent history from sessionStorage
  useEffect(() => {
    const loadVentHistory = () => {
      try {
        const storedVents = sessionStorage.getItem('ventHistory');
        if (storedVents) {
          setVentHistory(JSON.parse(storedVents));
        }
      } catch (error) {
        console.error('Error loading vent history:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadVentHistory();

    // Add event listener for when the window/tab is about to close
    const handleBeforeUnload = () => {
      // This won't actually clear sessionStorage immediately
      // The browser handles that when the session ends
      // We're just adding this event listener for completeness
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // Clear vent history
  const clearVentHistory = () => {
    try {
      sessionStorage.removeItem('ventHistory');
      setVentHistory([]);
      toast({
        title: "History cleared",
        description: "Your vent history has been successfully cleared.",
      });
    } catch (error) {
      console.error('Error clearing vent history:', error);
      toast({
        title: "Error clearing history",
        description: "There was a problem clearing your vent history.",
        variant: "destructive",
      });
    }
  };

  const formatTimestamp = (timestamp: number) => {
    return format(new Date(timestamp), 'MMM d, yyyy h:mm a');
  };

  const getModeBadgeClass = (mode: string) => {
    switch (mode) {
      case 'sympathy':
        return 'bg-blue-100 text-blue-800';
      case 'justification':
        return 'bg-green-100 text-green-800';
      case 'argument':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Your Vent History</h2>
          <p className="text-muted-foreground">
            Records of your venting sessions during this browser session
          </p>
        </div>
        <Button 
          variant="destructive" 
          onClick={clearVentHistory}
          className="flex items-center gap-2"
          disabled={ventHistory.length === 0}
        >
          <Trash2 size={16} />
          Clear History
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : ventHistory.length > 0 ? (
        <div className="grid gap-4">
          {ventHistory.map((vent) => (
            <Card key={vent.id} className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="capitalize text-xl">{vent.target}</CardTitle>
                    <CardDescription>{formatTimestamp(vent.timestamp)}</CardDescription>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getModeBadgeClass(vent.mode)}`}>
                    {vent.mode.charAt(0).toUpperCase() + vent.mode.slice(1)} Mode
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm whitespace-pre-wrap">{vent.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center p-12 border rounded-lg bg-muted/30">
          <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
          <h3 className="mt-4 text-lg font-medium">No vent history</h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
            Your vent history will appear here once you've expressed your feelings using the vent feature.
          </p>
        </div>
      )}

      <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
        <p className="flex items-center gap-2">
          <AlertCircle size={16} />
          Your vent history is only stored temporarily in this browser session and will be automatically cleared when you close this tab or browser.
        </p>
      </div>
    </div>
  );
};

export default VentHistory;
