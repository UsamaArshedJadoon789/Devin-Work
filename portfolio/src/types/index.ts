export type Category = 'all' | 'AI & ML' | 'Blockchain' | 'IoT' | 'Management Systems' | 'Real-time' | 'E-commerce';

export interface Implementation {
  frontend: string;
  backend: string;
  ml?: string;
  blockchain?: string;
  deployment: string;
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  features: string[];
  implementation: Implementation;
  demoUrl: string;
  githubUrl: string;
  imageUrl: string;
}
