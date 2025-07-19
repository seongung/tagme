export interface Env {
  // D1 Database
  DB: D1Database;
  
  // AI Gateway
  AI: any;
  
  // Environment variables
  CLAUDE_API_KEY?: string;
  CLAUDE_API_URL?: string;
  CLAUDE_MODEL?: string; // Optional: to override the default model
  
  // KV namespace for caching (optional)
  CACHE?: KVNamespace;
}

export interface Profile {
  id: string;
  name: string;
  age: string;
  instagram?: string;
  keywords: string[];
  intro: string;
  created_at?: string;
}