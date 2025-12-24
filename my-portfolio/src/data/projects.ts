export type ProjectCategory =
  | 'Infrastructure'
  | 'AI/ML'
  | 'Civic Tech'
  | 'Developer Tools'
  | 'Research'
  | 'Games'
  | 'Leadership';

export type Project = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  category: ProjectCategory;
  featured?: boolean;
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
};

export const projects: Project[] = [
  {
    id: 'ceip',
    title: 'Camden Environmental Intelligence Platform (CEIP)',
    description:
      'Environmental justice data platform that turns fragmented EPA + sensor data into actionable insights for community advocacy.',
    technologies: ['Python', 'PostgreSQL', 'Flask', 'scikit-learn', 'Docker'],
    category: 'Civic Tech',
    featured: true,
    githubUrl: 'https://github.com/Lucas-Liona',
  },
  {
    id: 'pulsar',
    title: 'Pulsar Graph (Obsidian Plugin)',
    description:
      'Graph visualization plugin for Obsidian focused on exploring connected knowledge with better filtering and navigation.',
    technologies: ['TypeScript', 'Obsidian API', 'Graph Algorithms'],
    category: 'Developer Tools',
    featured: true,
    githubUrl: 'https://github.com/Lucas-Liona',
  },
  {
    id: 'obsidian-rag',
    title: 'Obsidian Agentic RAG System',
    description:
      'Self-hosted RAG pipeline for a personal knowledge base with local inference and vector search — built to understand systems end-to-end.',
    technologies: ['Python', 'Qdrant', 'Ollama', 'LangGraph', 'Proxmox'],
    category: 'AI/ML',
    featured: true,
    githubUrl: 'https://github.com/Lucas-Liona',
  },
  {
    id: 'redline',
    title: 'Redline (C++/WebAssembly Game)',
    description:
      'C++ game project compiled to WebAssembly — focused on performance, tooling, and shipping a real build pipeline.',
    technologies: ['C++', 'SDL2', 'Emscripten', 'WebAssembly'],
    category: 'Games',
    githubUrl: 'https://github.com/Lucas-Liona',
  },
  {
    id: 'benford',
    title: "Benford's Law Financial Analysis",
    description:
      'Statistical analysis of long-range financial data using Benford’s Law and goodness-of-fit testing, with a research/publication mindset.',
    technologies: ['Python', 'Pandas', 'NumPy', 'SciPy'],
    category: 'Research',
    githubUrl: 'https://github.com/Lucas-Liona',
  },
  {
    id: 'hackruc',
    title: 'HackRUC 2025 (Organizing)',
    description:
      'Leading Rutgers–Camden\'s first MLH hackathon: sponsors, logistics, budget, and building a campus tech community.',
    technologies: ['Leadership', 'Project Management'],
    category: 'Leadership',
  },
];
