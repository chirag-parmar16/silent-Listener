import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import { Heart, ThumbsUp, Frown, Smile, MehIcon } from 'lucide-react';

const FeedbackForm = () => {
  const [feeling, setFeeling] = useState<string>('');
  const [additionalFeedback, setAdditionalFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!feeling) {
      toast({
        title: "Selection required",
        description: "Please select how you feel about your experience.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('user_feedback' as any)
        .insert({
          user_id: user?.id || 'anonymous',
          feeling,
          additional_feedback: additionalFeedback
        } as any);
        
      if (error) throw error;
      
      toast({
        title: "Thank you for your feedback!",
        description: "Your input helps us improve the Silent Listener experience."
      });
      
      setFeeling('');
      setAdditionalFeedback('');
    } catch (error: any) {
      console.error('Error submitting feedback:', error);
      toast({
        title: "Something went wrong",
        description: error.message || "There was an error submitting your feedback.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const emotionOptions = [
    { value: 'very_positive', label: 'Very Positive', icon: <Heart size={18} /> },
    { value: 'positive', label: 'Positive', icon: <ThumbsUp size={18} /> },
    { value: 'neutral', label: 'Neutral', icon: <MehIcon size={18} /> },
    { value: 'negative', label: 'Negative', icon: <Frown size={18} /> }
  ];

  return (
    <motion.div
      className="w-full max-w-md mx-auto bg-card p-6 rounded-lg shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-xl font-semibold mb-4 text-center">How was your experience?</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="feeling">How do you feel after using Silent Listener?</Label>
          <Select value={feeling} onValueChange={setFeeling}>
            <SelectTrigger id="feeling" className="w-full mt-1">
              <SelectValue placeholder="Select how you feel" />
            </SelectTrigger>
            <SelectContent>
              {emotionOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <div className="flex items-center gap-2">
                    {option.icon}
                    <span>{option.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="additionalFeedback">Additional thoughts (optional)</Label>
          <Textarea
            id="additionalFeedback"
            value={additionalFeedback}
            onChange={(e) => setAdditionalFeedback(e.target.value)}
            placeholder="Share any additional thoughts you have about your experience..."
            className="mt-1"
            rows={4}
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
        </Button>
      </form>
    </motion.div>
  );
};

export default FeedbackForm;
