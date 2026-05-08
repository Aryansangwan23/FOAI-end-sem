export interface ISSLocation {
  latitude: number;
  longitude: number;
  timestamp: number;
  speed: number;
}

export interface Astronaut {
  name: string;
  craft: string;
}

export interface NewsArticle {
  title: string;
  url: string;
  urlToImage: string;
  source: { name: string };
  author: string | null;
  publishedAt: string;
  description: string;
  category?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}
