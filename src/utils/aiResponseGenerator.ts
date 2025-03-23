
import textToSpeech from './textToSpeech';

// Function to analyze the sentiment and length of a vent
const analyzeSentiment = (text: string) => {
  const words = text.split(/\s+/).length;
  const isLong = words > 100;
  const isNegative = /hate|angry|upset|sad|terrible|awful|worst|never|bad|hurt|pain/i.test(text);
  const isPositive = /love|happy|good|great|best|wonderful|amazing|excellent|perfect/i.test(text);
  
  return { isLong, isNegative, isPositive };
};

// Generate AI response with Hugging Face Inference API
const getAIResponse = async (prompt: string) => {
  try {
    // Use a model that's well-suited for conversational responses
    const response = await fetch('https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 100,
          temperature: 0.7,
          top_p: 0.9,
          repetition_penalty: 1.2
        }
      }),
    });
    
    const result = await response.json();
    if (result.generated_text) {
      return result.generated_text;
    } else if (result[0]?.generated_text) {
      return result[0].generated_text;
    } else {
      console.error('Unexpected API response format:', result);
      return generateFallbackResponse(prompt);
    }
  } catch (error) {
    console.error('Error calling Hugging Face API:', error);
    return generateFallbackResponse(prompt);
  }
};

// Generate a fallback response when the API fails
const generateFallbackResponse = (prompt: string) => {
  const { isLong, isNegative, isPositive } = analyzeSentiment(prompt);
  
  if (isNegative) {
    return "I understand that must be really difficult for you. It's okay to feel this way, and I'm here to listen.";
  } else if (isPositive) {
    return "That's wonderful to hear! I'm glad you're feeling positive about this. Would you like to share more?";
  } else {
    return "Thank you for sharing that with me. I'm here to listen if you'd like to continue.";
  }
};

// Generate personalized AI response based on the vent text, target and mode
const generateAIResponse = async (ventText: string, target: string, mode: string) => {
  if (!ventText) return '';
  
  const { isLong, isNegative, isPositive } = analyzeSentiment(ventText);
  let prompt = '';
  
  // Craft the prompt based on the mode
  switch (mode) {
    case 'sympathy':
      prompt = `As someone who deeply cares about you, I want to respond to your concern about ${target}: "${ventText}". I should express empathy and understanding.`;
      break;
    case 'justification':
      prompt = `I need to respond to this concern about ${target}: "${ventText}". I should provide possible justifications or explanations for the situation.`;
      break;
    case 'argument':
      prompt = `I disagree with this perspective about ${target}: "${ventText}". I should provide counterarguments while remaining respectful.`;
      break;
    default:
      prompt = `I want to respond thoughtfully to this: "${ventText}". I should be supportive and understanding.`;
  }
  
  const response = await getAIResponse(prompt);
  
  // Use text-to-speech to speak the response
  textToSpeech.speak(response);
  
  return response;
};

export default generateAIResponse;
