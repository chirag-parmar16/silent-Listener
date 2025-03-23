import { pipeline } from '@huggingface/transformers';

// Cache the pipeline instance
let textGenerationPipeline: any = null;

// Initialize the text generation pipeline
const initializeAI = async () => {
  if (!textGenerationPipeline) {
    console.log('Initializing Hugging Face AI...');
    try {
      textGenerationPipeline = await pipeline(
        'text-generation',
        'gpt2', // Using a lightweight model for browser compatibility
        { max_length: 100 }
      );
      console.log('AI initialized successfully');
    } catch (error) {
      console.error('Failed to initialize AI:', error);
      // Fallback to the default response generation if AI fails
      return null;
    }
  }
  return textGenerationPipeline;
};

export const generateAIResponse = async (
  ventText: string, 
  target: string, 
  mode: string
): Promise<string[]> => {
  const pipeline = await initializeAI();
  
  if (!pipeline) {
    // Fallback to default responses if AI initialization fails
    return generateDefaultResponses(ventText, target, mode);
  }
  
  try {
    // Create prompts based on the mode
    const prompts = createPrompts(ventText, target, mode);
    
    // Generate responses
    const responses = await Promise.all(
      prompts.map(async (prompt) => {
        const result = await pipeline(prompt, {
          max_length: 100,
          num_return_sequences: 1,
        });
        
        // Extract and clean the generated text
        let generatedText = result[0]?.generated_text || '';
        if (generatedText) {
          // Remove the prompt from the response
          generatedText = generatedText.replace(prompt, '').trim();
          // Ensure the response is a complete sentence
          generatedText = sanitizeResponse(generatedText);
        }
        
        return generatedText || getRandomDefaultResponse(mode);
      })
    );
    
    return responses.filter(response => response.length > 0);
  } catch (error) {
    console.error('Error generating AI responses:', error);
    return generateDefaultResponses(ventText, target, mode);
  }
};

// Create prompts based on the venting text, target, and mode
const createPrompts = (ventText: string, target: string, mode: string): string[] => {
  const targetNormalized = target.toLowerCase();
  const shortVent = ventText.substring(0, 100); // Use a truncated version to avoid exceeding token limits
  
  switch (mode) {
    case 'sympathy':
      return [
        `The person is upset about ${targetNormalized} and said: "${shortVent}". Respond with sympathy:`,
        `Someone is venting about ${targetNormalized}: "${shortVent}". Give a supportive response:`,
        `Show understanding to someone who says: "${shortVent}". Sympathetic reply:`,
      ];
    case 'justification':
      return [
        `The person feels frustrated about ${targetNormalized} and wrote: "${shortVent}". Justify their feelings:`,
        `Validate these feelings about ${targetNormalized}: "${shortVent}". Justifying response:`,
        `Someone is expressing anger about ${targetNormalized}: "${shortVent}". Validate them:`,
      ];
    case 'argument':
      return [
        `Challenge this perspective about ${targetNormalized}: "${shortVent}". Alternative viewpoint:`,
        `Someone believes: "${shortVent}" about ${targetNormalized}. Present a different angle:`,
        `Offer a counterpoint to: "${shortVent}" regarding ${targetNormalized}:`,
      ];
    default:
      return [
        `Someone shared: "${shortVent}". Respond as a supportive listener:`,
        `Respond to this statement: "${shortVent}". As a good listener:`,
        `Be a silent listener to: "${shortVent}". Thoughtful response:`,
      ];
  }
};

// Clean and sanitize the generated response
const sanitizeResponse = (text: string): string => {
  // Keep only the first complete sentence if there are multiple
  let sentences = text.split(/(?<=[.!?])\s+/);
  
  // If no sentence endings found, just return the text as is (up to 150 chars)
  if (sentences.length === 1 && !sentences[0].match(/[.!?]$/)) {
    return text.substring(0, 150) + '.';
  }
  
  // Take the first complete sentence
  let response = sentences[0];
  
  // Ensure response ends with punctuation
  if (!response.match(/[.!?]$/)) {
    response += '.';
  }
  
  return response;
};

// Fallback responses if AI generation fails
const generateDefaultResponses = (ventText: string, target: string, mode: string): string[] => {
  const targetNormalized = target.toLowerCase();
  
  switch (mode) {
    case 'sympathy':
      return [
        `I understand how difficult your situation with ${targetNormalized} must be. It's completely normal to feel this way.`,
        "You're not alone in these feelings. Many people go through similar experiences.",
        "I hear you. Your feelings are valid, and it's okay to express them.",
        "Thank you for sharing this. It takes courage to express these emotions."
      ];
    case 'justification':
      return [
        `You have every right to feel this way about ${targetNormalized}. Your reaction makes sense.`,
        "Anyone in your position would likely feel the same way.",
        "Your perspective is completely justified given what you've experienced.",
        "These emotions are a natural response to your situation."
      ];
    case 'argument':
      return [
        `Have you considered looking at the situation with ${targetNormalized} from a different angle?`,
        "Sometimes challenging our initial reactions can lead to new insights.",
        "It might be worth exploring alternative interpretations of this situation.",
        "What would happen if you approached this from a different perspective?"
      ];
    default:
      return [
        "I'm here to listen. Please continue sharing your thoughts.",
        "Thank you for expressing yourself. Your feelings matter.",
        "I appreciate your honesty and openness.",
        "I'm listening attentively to everything you're saying."
      ];
  }
};

const getRandomDefaultResponse = (mode: string): string => {
  const responses = generateDefaultResponses('', '', mode);
  const randomIndex = Math.floor(Math.random() * responses.length);
  return responses[randomIndex];
};

export default generateAIResponse;
