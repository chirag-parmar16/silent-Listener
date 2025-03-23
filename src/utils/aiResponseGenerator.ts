
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
    
    console.log("Sending request to Hugging Face API with prompt:", prompt);
    
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
      const errorText = await response.text();
      console.error("Error response from Hugging Face API:", errorText);
      return generateFallbackResponse(prompt);
    }

    const data = await response.json();
    
    // Check for different response formats from the API
    if (data && data.generated_text) {
      console.log("Received AI response:", data.generated_text);
      return data.generated_text;
    } else if (Array.isArray(data) && data[0] && data[0].generated_text) {
      // Handle array format response
      console.log("Received AI response (array format):", data[0].generated_text);
      return data[0].generated_text;
    } else {
      console.error("Unexpected API response format:", data);
      return generateFallbackResponse(prompt);
    }
  } catch (error) {
    console.error("Error calling Hugging Face API:", error);
    // Return fallback response in case of error
    return generateFallbackResponse(prompt);
  }
}

// Generate language-aware fallback responses based on the input
function generateFallbackResponse(prompt: string): string {
  // Detect if the prompt is likely not in English
  const isLikelyNotEnglish = !isEnglishText(prompt);
  
  // Extract context from the prompt
  const promptLower = prompt.toLowerCase();
  
  if (isLikelyNotEnglish) {
    // For non-English input, provide a generic response that acknowledges
    // we understood they're expressing feelings
    return "I understand your message. Please continue sharing your thoughts and feelings. I'm here to listen.";
  }
  else if (promptLower.includes("feel") || promptLower.includes("emotion")) {
    return "I understand that your feelings are important. Would you like to tell me more about how this situation is affecting you emotionally?";
  } 
  else if (promptLower.includes("friend") || promptLower.includes("relationship") || promptLower.includes("partner")) {
    return "Relationships can be complicated. It sounds like this situation with this person is important to you. Would you like to share more about what happened?";
  }
  else if (promptLower.includes("work") || promptLower.includes("job") || promptLower.includes("career")) {
    return "Work challenges can be really stressful. I'm here to listen as you work through these professional difficulties. What aspects of this situation are most concerning to you?";
  }
  else if (promptLower.includes("family") || promptLower.includes("parent") || promptLower.includes("child")) {
    return "Family dynamics can be complex and emotionally charged. I'm here to listen without judgment about your family situation. Would you like to tell me more about what's happening?";
  }
  else if (promptLower.includes("alone") || promptLower.includes("lonely") || promptLower.includes("abandoned")) {
    return "Feeling alone can be really painful. I'm here with you right now, listening and caring about what you're going through. Would you like to share more about these feelings?";
  }
  else if (promptLower.includes("angry") || promptLower.includes("frustrat") || promptLower.includes("upset")) {
    return "It's completely valid to feel angry in this situation. I appreciate you sharing these strong emotions with me. What aspects of this make you feel most frustrated?";
  }
  else if (promptLower.includes("sad") || promptLower.includes("depress") || promptLower.includes("unhappy")) {
    return "I hear that you're feeling down right now. These feelings are valid, and I'm here to listen. Would you like to share more about what's contributing to these feelings?";
  }
  else {
    return "I'm listening attentively to what you're sharing. Your experiences and feelings matter. Would you like to tell me more about this situation and how it's affecting you?";
  }
}

// Simple function to detect if text is likely in English
function isEnglishText(text: string): boolean {
  // This is a simple heuristic - counting common English words
  const commonEnglishWords = ['the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'I', 
                             'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at'];
  
  const words = text.toLowerCase().split(/\s+/);
  let englishWordCount = 0;
  
  words.forEach(word => {
    if (commonEnglishWords.includes(word)) {
      englishWordCount++;
    }
  });
  
  // If more than 10% of words are common English words, it's likely English
  return (englishWordCount / words.length) > 0.1;
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
  console.log("Generating AI response with:", { ventText, target, mode, conversationHistory });
  
  // Construct conversation context from history - limit to last 3 exchanges for context
  const recentHistory = conversationHistory.slice(-6);
  const conversationContext = recentHistory.length > 0 
    ? `Previous conversation: ${recentHistory.join(" ")}. `
    : "";
  
  let prompt = "";
  
  switch (mode) {
    case 'sympathy':
      prompt = `${conversationContext}As someone who deeply cares, respond with empathy to: "${ventText}" regarding ${target}. Be supportive and understanding.`;
      break;
    case 'justification':
      prompt = `${conversationContext}Respond to: "${ventText}" about ${target}. Validate their feelings and show them their reactions are reasonable.`;
      break;
    case 'argument':
      prompt = `${conversationContext}Regarding: "${ventText}" about ${target}, offer a gentle alternative perspective while remaining supportive.`;
      break;
    default:
      prompt = `${conversationContext}Respond with empathy and understanding to: "${ventText}"`;
  }
  
  try {
    const response = await getAIResponse(prompt);
    let sentences = splitIntoSentences(response);
    
    // Ensure we have reasonable responses
    if (sentences.length < 2) {
      // Add some contextual fallback sentences if we didn't get enough from the API
      sentences = sentences.concat([
        `I hear your concerns about ${target}.`,
        "Would you like to share more about how this situation is affecting you?"
      ]);
    }
    
    // Remove any sentences that sound too generic or AI-like
    sentences = sentences.filter(sentence => 
      !sentence.includes("I am an AI") && 
      !sentence.includes("As an AI") &&
      !sentence.includes("language model")
    );
    
    // Return at least 2 sentences
    return sentences.length >= 2 ? sentences : [
      `I understand how you feel about ${target}.`,
      "Would you like to share more about your experience?"
    ];
  } catch (error) {
    console.error("Error generating AI response:", error);
    // Return fallback responses that are contextual
    return [
      `I'm here for you regarding this situation with ${target}.`,
      "Your feelings about this are completely valid.",
      "Would you like to tell me more about what happened?"
    ];
  }
}

// Main function to generate AI responses
export function generateAIResponses({ ventText, target, mode, conversationHistory = [] }: ResponseOptions): Promise<string[]> {
  // Now this function will return a Promise instead of immediate responses
  return generateAIResponse(ventText, target, mode, conversationHistory);
}
