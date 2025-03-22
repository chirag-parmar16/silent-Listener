
interface ResponseOptions {
  ventText: string;
  target: string;
  mode: string;
}

// This utility generates more sophisticated AI-like responses
// In a real application, this would connect to an API like OpenAI
export function generateAIResponses({ ventText, target, mode }: ResponseOptions): string[] {
  const targetNormalized = target.toLowerCase();
  const ventLower = ventText.toLowerCase();
  
  // Extract sentiment and key topics from the vent text
  const negativeWords = ['hate', 'angry', 'upset', 'frustrated', 'annoyed', 'hate', 'dislike'];
  const positiveWords = ['like', 'love', 'appreciate', 'happy', 'glad', 'thankful'];
  
  const hasNegativeSentiment = negativeWords.some(word => ventLower.includes(word));
  const hasPositiveSentiment = positiveWords.some(word => ventLower.includes(word));
  
  // Extract length to determine response depth
  const isLongVent = ventText.length > 100;
  
  // Generate appropriate responses based on mode, sentiment, and length
  let responses: string[] = [];
  
  switch (mode) {
    case 'sympathy':
      if (hasNegativeSentiment) {
        responses.push(
          `I hear how difficult this situation with ${targetNormalized} is for you. Your feelings are completely valid.`,
          "It takes courage to express these emotions. Thank you for sharing them."
        );
        
        if (isLongVent) {
          responses.push(
            "I notice you've shared quite a lot about this situation. It seems like this has been weighing on you for some time.",
            `When you talk about ${targetNormalized}, I can sense how deeply this affects you. Would talking more about a specific aspect help?`
          );
        }
      } else if (hasPositiveSentiment) {
        responses.push(
          `I'm glad to hear you have some positive feelings about ${targetNormalized}, even in this challenging situation.`,
          "It's important to acknowledge these moments of appreciation."
        );
      } else {
        responses.push(
          `I understand your situation with ${targetNormalized}. It's perfectly normal to have mixed feelings.`,
          "Everyone processes their emotions differently, and however you feel is valid."
        );
      }
      
      responses.push(
        "You're not alone in experiencing this. Many people go through similar situations.",
        "Taking time to express yourself like this is an important step in processing your emotions."
      );
      break;
      
    case 'justification':
      if (hasNegativeSentiment) {
        responses.push(
          `Your feelings toward ${targetNormalized} are completely justified given what you've described.`,
          "Anyone in your position would likely feel the same way."
        );
        
        if (isLongVent) {
          responses.push(
            "The complexity of your situation absolutely warrants these feelings.",
            "You've clearly thought about this deeply, and your perspective is well-reasoned."
          );
        }
      } else {
        responses.push(
          `Your approach to the situation with ${targetNormalized} makes perfect sense.`,
          "Your reasoning is sound, and your reactions are appropriate given the circumstances."
        );
      }
      
      responses.push(
        "Your emotional response is a natural reaction to what you've experienced.",
        "You have every right to feel this way, and you don't need to justify yourself to anyone."
      );
      break;
      
    case 'argument':
      if (hasNegativeSentiment) {
        responses.push(
          `I understand your frustration with ${targetNormalized}, but perhaps there's another perspective to consider.`,
          "Sometimes our strongest emotions can cloud our view of the complete picture."
        );
        
        if (isLongVent) {
          responses.push(
            "You've shared a lot of details about this situation. I wonder if some aspects might look different with some distance.",
            "In complex situations like this, there are often multiple valid perspectives to consider."
          );
        }
      } else {
        responses.push(
          `While your view of ${targetNormalized} makes sense from your perspective, have you considered it from theirs?`,
          "It can be enlightening to temporarily step into the other person's shoes."
        );
      }
      
      responses.push(
        "What would happen if you approached this from a completely different angle?",
        "Sometimes challenging our initial reactions can lead to surprising insights and growth."
      );
      break;
      
    default:
      responses = [
        "I'm here to listen. Please continue sharing your thoughts.",
        "Thank you for expressing yourself. Your feelings matter.",
        "I appreciate your honesty and openness.",
        "I'm listening attentively to everything you're saying."
      ];
  }
  
  // Add some general concluding responses
  responses.push(
    "How are you feeling after expressing this?",
    "Would it help to explore this topic further?",
    "Sometimes just putting our thoughts into words can provide clarity."
  );
  
  return responses;
}
