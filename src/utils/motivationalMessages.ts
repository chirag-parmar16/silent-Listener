
// A library of motivational messages categorized by emotion

export interface MotivationalMessage {
  text: string;
  emotion: 'anger' | 'sadness' | 'anxiety' | 'general';
}

export const motivationalMessages: MotivationalMessage[] = [
  // Anger-focused messages
  {
    text: "Your anger is a signal that something important to you has been violated. Honor that signal, then let it guide you toward constructive change.",
    emotion: 'anger'
  },
  {
    text: "It's okay to feel angry. Acknowledge it, express it safely, and then choose your next steps with intention rather than reaction.",
    emotion: 'anger'
  },
  {
    text: "Behind anger often lies hurt. By addressing that hurt with compassion, you reclaim your power over your emotions.",
    emotion: 'anger'
  },
  {
    text: "Your anger has been heard. Now, channel that energy into positive change that aligns with your true values.",
    emotion: 'anger'
  },
  {
    text: "Expressing anger is the first step to healing. Now take a deep breath and remember that you are in control of what happens next.",
    emotion: 'anger'
  },
  
  // Sadness-focused messages
  {
    text: "Sadness is not a sign of weakness, but a sign that you've cared deeply. That capacity for caring is your strength.",
    emotion: 'sadness'
  },
  {
    text: "Your tears water the seeds of your growth. Every moment of sadness carries within it the possibility of deeper understanding.",
    emotion: 'sadness'
  },
  {
    text: "Allow yourself to feel the sadness fully, knowing that emotions flow like water - they will not stay the same forever.",
    emotion: 'sadness'
  },
  {
    text: "In expressing your sadness, you've already begun the journey toward healing. Be gentle with yourself along the way.",
    emotion: 'sadness'
  },
  {
    text: "Sadness connects us to our humanity. By honoring yours, you deepen your capacity for joy when it returns - and it will return.",
    emotion: 'sadness'
  },
  
  // Anxiety-focused messages
  {
    text: "Anxiety is your body trying to protect you. Thank it for its concern, then remind yourself that you are safe in this moment.",
    emotion: 'anxiety'
  },
  {
    text: "When anxiety arises, remember that you've faced uncertainty before, and you've made it through. You have that same strength now.",
    emotion: 'anxiety'
  },
  {
    text: "Your worries have been expressed and released. Now take a moment to ground yourself in the present, where possibilities exist.",
    emotion: 'anxiety'
  },
  {
    text: "Beneath anxiety often lies great care for something important to you. Honor that care while being gentle with yourself.",
    emotion: 'anxiety'
  },
  {
    text: "By naming your anxieties, you've taken away some of their power. Remember that you are more than your worried thoughts.",
    emotion: 'anxiety'
  },
  
  // General supportive messages
  {
    text: "Expressing yourself honestly is an act of courage. That courage will serve you well beyond this moment.",
    emotion: 'general'
  },
  {
    text: "Your willingness to face your emotions shows remarkable strength. Carry that strength with you as you move forward.",
    emotion: 'general'
  },
  {
    text: "Every emotion you feel is valid and worthy of expression. Thank you for trusting yourself enough to be honest.",
    emotion: 'general'
  },
  {
    text: "This moment of vulnerability is actually a moment of growth. You're expanding your capacity for emotional awareness.",
    emotion: 'general'
  },
  {
    text: "You've taken an important step in your emotional well-being by expressing yourself. Be proud of that choice.",
    emotion: 'general'
  },
  {
    text: "Healing isn't linear, but expressing yourself is always a step in the right direction. Well done.",
    emotion: 'general'
  },
  {
    text: "Your emotions don't define you, but honoring them defines your relationship with yourself. That relationship is worth nurturing.",
    emotion: 'general'
  },
  {
    text: "By giving voice to your feelings, you've created space for new perspectives and possibilities to emerge.",
    emotion: 'general'
  },
  {
    text: "Sometimes the bravest thing we can do is admit how we really feel. You've shown that bravery today.",
    emotion: 'general'
  },
  {
    text: "Remember that you are not alone in these feelings. We all struggle, we all hurt, and we all have the capacity to heal.",
    emotion: 'general'
  }
];

// Function to get random messages based on emotion
export const getRandomMessageForEmotion = (emotion: 'anger' | 'sadness' | 'anxiety' | 'general'): string => {
  const filteredMessages = motivationalMessages.filter(message => message.emotion === emotion);
  const randomIndex = Math.floor(Math.random() * filteredMessages.length);
  return filteredMessages[randomIndex].text;
};

// Function to analyze text for emotional content and return appropriate message
export const analyzeTextAndGetMessage = (text: string): string => {
  const textLower = text.toLowerCase();
  
  // Simple keyword detection - in a real app, this would use NLP or sentiment analysis
  const angerKeywords = ['angry', 'mad', 'furious', 'rage', 'hate', 'frustrated', 'annoyed'];
  const sadnessKeywords = ['sad', 'depressed', 'unhappy', 'miserable', 'hurt', 'lonely', 'grief'];
  const anxietyKeywords = ['anxious', 'worried', 'nervous', 'afraid', 'fear', 'stress', 'panic'];
  
  let angerCount = 0, sadnessCount = 0, anxietyCount = 0;
  
  angerKeywords.forEach(keyword => {
    if (textLower.includes(keyword)) angerCount++;
  });
  
  sadnessKeywords.forEach(keyword => {
    if (textLower.includes(keyword)) sadnessCount++;
  });
  
  anxietyKeywords.forEach(keyword => {
    if (textLower.includes(keyword)) anxietyCount++;
  });
  
  // Determine dominant emotion
  if (angerCount > sadnessCount && angerCount > anxietyCount && angerCount > 0) {
    return getRandomMessageForEmotion('anger');
  } else if (sadnessCount > angerCount && sadnessCount > anxietyCount && sadnessCount > 0) {
    return getRandomMessageForEmotion('sadness');
  } else if (anxietyCount > angerCount && anxietyCount > sadnessCount && anxietyCount > 0) {
    return getRandomMessageForEmotion('anxiety');
  } else {
    return getRandomMessageForEmotion('general');
  }
};
