export type SkillCategory =
  | 'Languages'
  | 'Data'
  | 'ML'
  | 'Systems'
  | 'Math'
  | 'Visualization'
  | 'Geo'
  | 'Methods'
  | 'Tools';

export type SkillGroup = 'Core' | 'Learning';

export type Skill = {
  id: string;
  name: string;
  category: SkillCategory;
  group: SkillGroup;
  tags?: string[];
  note?: string;
};

export const skills: Skill[] = [
  {
    id: 'python',
    name: 'Python',
    category: 'Languages',
    group: 'Core',
    tags: ['pandas', 'numpy', 'jupyter'],
  },
  {
    id: 'sql',
    name: 'SQL',
    category: 'Data',
    group: 'Core',
  },
  {
    id: 'cpp',
    name: 'C++',
    category: 'Languages',
    group: 'Core',
  },
  {
    id: 'pytorch',
    name: 'PyTorch',
    category: 'ML',
    group: 'Core',
  },
  {
    id: 'sklearn',
    name: 'scikit-learn',
    category: 'ML',
    group: 'Core',
  },
  {
    id: 'algorithms',
    name: 'Algorithms',
    category: 'Methods',
    group: 'Core',
  },
  {
    id: 'analysis',
    name: 'Analysis',
    category: 'Math',
    group: 'Core',
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    category: 'Math',
    group: 'Core',
  },
  {
    id: 'timeseries',
    name: 'Time Series Analysis',
    category: 'Methods',
    group: 'Core',
  },
  {
    id: 'geospatial',
    name: 'Geospatial Analysis',
    category: 'Geo',
    group: 'Core',
  },
  {
    id: 'bokeh',
    name: 'Bokeh',
    category: 'Visualization',
    group: 'Core',
  },
  {
    id: 'holoviews',
    name: 'HoloViews',
    category: 'Visualization',
    group: 'Core',
  },
  {
    id: 'linux',
    name: 'Linux',
    category: 'Systems',
    group: 'Learning',
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'Tools',
    group: 'Learning',
  },
  {
    id: 'terraform',
    name: 'Terraform',
    category: 'Tools',
    group: 'Learning',
  },
  {
    id: 'ansible',
    name: 'Ansible',
    category: 'Tools',
    group: 'Learning',
  },
  {
    id: 'github-actions',
    name: 'GitHub Actions',
    category: 'Tools',
    group: 'Learning',
  },
  {
    id: 'neovim',
    name: 'Neovim',
    category: 'Tools',
    group: 'Learning',
  },
  {
    id: 'proxmox',
    name: 'Proxmox',
    category: 'Systems',
    group: 'Learning',
  },
];
