
interface ResponseOptions {
  ventText: string;
  target: string;
  mode: string;
  conversationHistory?: string[]; // Add conversation history
}

// Function to get response from Hugging Face API
async function getAIResponse(prompt: string): Promise<string> {
  try {
    const API_KEY = "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";
    const response = await fetch("https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_length: 100,
          temperature: 0.7,
          top_p: 0.9,
          repetition_penalty: 1.2
        }
      })
    });

    if (!response.ok) {
      console.error("Error response from Hugging Face API:", await response.text());
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    // Check if the response has the expected format
    if (data && data.generated_text) {
      return data.generated_text;
    } else {
      console.error("Unexpected API response format:", data);
      throw new Error("Unexpected API response format");
    }
  } catch (error) {
    console.error("Error calling Hugging Face API:", error);
    // Return fallback response in case of error
    return "I'm here to listen and support you. Would you like to share more about how you're feeling?";
  }
}

// Helper function to split response into sentences
function splitIntoSentences(text: string): string[] {
  // This regex splits on periods, exclamation marks, or question marks followed by a space or end of string
  const sentences = text.split(/(?<=[.!?])\s+|(?<=[.!?])$/);
  // Filter out empty strings and trim each sentence
  return sentences.filter(sentence => sentence.trim().length > 0).map(sentence => sentence.trim());
}

// Function to generate AI response based on vent text, target, mode, and conversation history
async function generateAIResponse(ventText: string, target: string, mode: string, conversationHistory: string[] = []): Promise<string[]> {
  // Construct conversation context from history
  const conversationContext = conversationHistory.length > 0 
    ? `Previous conversation: ${conversationHistory.join(" ")}. `
    : "";
  
  let prompt = "";
  
  switch (mode) {
    case 'sympathy':
      prompt = `${conversationContext}As someone who deeply cares about you, I want to respond to your concern about ${target}: "${ventText}". I should express empathy and understanding.`;
      break;
    case 'justification':
      prompt = `${conversationContext}I want to validate your feelings about ${target}: "${ventText}". I should affirm that your feelings are justified and reasonable.`;
      break;
    case 'argument':
      prompt = `${conversationContext}I want to offer a different perspective on your concern about ${target}: "${ventText}". I should gently challenge your viewpoint while being respectful.`;
      break;
    default:
      prompt = `${conversationContext}Respond with empathy to this message: "${ventText}"`;
  }
  
  try {
    const response = await getAIResponse(prompt);
    const sentences = splitIntoSentences(response);
    
    // Return at least 2 sentences, or the fallback if we couldn't split properly
    return sentences.length >= 2 ? sentences : [
      "I understand how you feel.",
      "Would you like to share more about your experience?"
    ];
  } catch (error) {
    console.error("Error generating AI response:", error);
    // Return fallback responses
    return [
      "I'm here for you.",
      "Your feelings are valid.",
      "Would you like to tell me more about this situation?"
    ];
  }
}

// Main function to generate AI responses
export function generateAIResponses({ ventText, target, mode, conversationHistory = [] }: ResponseOptions): Promise<string[]> {
  // Now this function will return a Promise instead of immediate responses
  return generateAIResponse(ventText, target, mode, conversationHistory);
}
