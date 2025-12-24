import { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';
import { projects, type ProjectCategory } from '../data/projects';

const Projects = () => {
  // Categories for filtering
  const categories: Array<'All' | ProjectCategory> = [
    'All',
    ...Array.from(new Set(projects.map((p) => p.category))),
  ];
  const [activeCategory, setActiveCategory] = useState<'All' | ProjectCategory>('All');

  // Filter projects by category
  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((project) => project.category === activeCategory);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-24 text-center relative">
        <div className="container mx-auto px-4 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-dark dark:text-light"
          >
            My Projects
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
          >
            A selection of things I’ve built across infrastructure, AI/ML, civic tech, and developer tooling.
          </motion.p>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-8 sticky top-20 bg-light/80 dark:bg-dark/80 backdrop-blur-sm z-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-slate-100 dark:bg-dark-200 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-dark-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="space-y-12 md:space-y-32">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                technologies={project.technologies}
                image={project.image}
                live={project.liveUrl}
                github={project.githubUrl}
                direction={index % 2 === 0 ? 'left' : 'right'}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary/10 dark:bg-primary/5 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-dark dark:text-light">Interested in working together?</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
            I'm always open to discussing new projects and opportunities. If you have an idea or need help with your project, feel free to get in touch.
          </p>
          <a
            href="/contact"
            className="px-8 py-3 bg-primary text-white font-medium rounded-md hover:bg-secondary transition-colors duration-300"
          >
            Contact Me
          </a>
        </div>
      </section>
    </div>
  );
};

export default Projects;