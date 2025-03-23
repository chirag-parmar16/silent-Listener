
// Simple text-to-speech utility using the Web Speech API

class TextToSpeech {
  private static instance: TextToSpeech;
  private speechSynthesis: SpeechSynthesis;
  private voices: SpeechSynthesisVoice[] = [];
  private isVoicesLoaded = false;
  private preferredVoice: SpeechSynthesisVoice | null = null;

  private constructor() {
    this.speechSynthesis = window.speechSynthesis;
    
    // Load voices
    this.loadVoices();
    
    // Some browsers need an event to get voices
    if (this.speechSynthesis.onvoiceschanged !== undefined) {
      this.speechSynthesis.onvoiceschanged = this.loadVoices.bind(this);
    }
  }

  public static getInstance(): TextToSpeech {
    if (!TextToSpeech.instance) {
      TextToSpeech.instance = new TextToSpeech();
    }
    return TextToSpeech.instance;
  }

  private loadVoices(): void {
    this.voices = this.speechSynthesis.getVoices();
    
    if (this.voices.length > 0) {
      this.isVoicesLoaded = true;
      
      // Try to find a good default voice (preferably female and English)
      this.preferredVoice = this.voices.find(
        voice => voice.name.includes('Female') && voice.lang.includes('en')
      ) || this.voices[0];
      
      console.log('TTS voices loaded:', this.voices.length);
    }
  }

  public speak(text: string, rate = 1, pitch = 1): void {
    if (!text) return;
    
    // Cancel any ongoing speech
    this.stop();
    
    if (!this.isVoicesLoaded) {
      this.loadVoices();
    }
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set voice if available
    if (this.preferredVoice) {
      utterance.voice = this.preferredVoice;
    }
    
    // Set properties
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = 1;
    
    // Speak
    this.speechSynthesis.speak(utterance);
  }

  public stop(): void {
    if (this.speechSynthesis.speaking) {
      this.speechSynthesis.cancel();
    }
  }

  public isPaused(): boolean {
    return this.speechSynthesis.paused;
  }

  public isSpeaking(): boolean {
    return this.speechSynthesis.speaking;
  }

  public pause(): void {
    this.speechSynthesis.pause();
  }

  public resume(): void {
    this.speechSynthesis.resume();
  }
}

export default TextToSpeech.getInstance();
