import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import { skills } from '../data/skills';

const GitHubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.58 2 12.23c0 4.52 2.865 8.354 6.839 9.708.5.095.682-.22.682-.49 0-.242-.009-.883-.014-1.733-2.782.62-3.369-1.37-3.369-1.37-.455-1.18-1.11-1.495-1.11-1.495-.908-.64.069-.627.069-.627 1.004.072 1.532 1.056 1.532 1.056.892 1.56 2.341 1.11 2.91.85.091-.67.35-1.11.636-1.365-2.22-.26-4.555-1.14-4.555-5.07 0-1.12.389-2.04 1.029-2.76-.103-.26-.446-1.31.098-2.73 0 0 .84-.275 2.75 1.054A9.18 9.18 0 0 1 12 7.07c.82.004 1.647.114 2.419.333 1.909-1.329 2.748-1.054 2.748-1.054.545 1.42.202 2.47.1 2.73.64.72 1.028 1.64 1.028 2.76 0 3.94-2.339 4.807-4.566 5.062.36.318.68.944.68 1.904 0 1.374-.012 2.483-.012 2.82 0 .272.18.59.688.489C19.138 20.58 22 16.75 22 12.23 22 6.58 17.523 2 12 2Z"
    />
  </svg>
);

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.66H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.27 2.38 4.27 5.47v6.27ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45Z" />
  </svg>
);

const Home = () => {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
  const coreSkills = skills.filter((s) => s.group === 'Core');
  const learningSkills = skills.filter((s) => s.group === 'Learning');

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center relative">
        <div className="container mx-auto px-4 z-10 pt-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative z-10"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-dark dark:text-light">
                Hi, I'm <span className="text-primary">Lucas!</span>
              </h1>
              <h2 className="text-2xl md:text-3xl text-slate-600 dark:text-slate-300 mb-6">
                Applied Math & Computer Science Student
              </h2>
              <p className="text-slate-700 dark:text-slate-300 mb-8 text-lg max-w-xl">
		I am interested in learning new technologies! This website exists 
		to display what I am currently working on. It was freely hosted with 
		Github Pages and it is <Link to="https://github.com/Lucas-Liona/Personal-Website" className="text-emerald-600">open-source.</Link>
		<br></br>
		<br></br>
		If you are interested in my professional work, see my projects. If
		you curious about what I'm working on and how I work, see my blog.

		</p>
              <div className="flex flex-wrap gap-4">
                <Link to="/projects" className="btn btn-primary">
                  View My Work
                </Link>
                <Link to="/contact" className="btn btn-outline">
                  Contact Me
                </Link>

                <a
                  href="https://github.com/Lucas-Liona"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-slate-300 dark:border-dark-200 text-slate-700 dark:text-slate-200 hover:bg-primary hover:text-white hover:border-primary transition-colors"
                >
                  <GitHubIcon className="w-5 h-5" />
                </a>

                <a
                  href="https://linkedin.com/in/lucasliona"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-slate-300 dark:border-dark-200 text-slate-700 dark:text-slate-200 hover:bg-primary hover:text-white hover:border-primary transition-colors"
                >
                  <LinkedInIcon className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="hidden md:block relative z-10"
            >
              {/* Profile image or illustration */}
              <div className="aspect-square rounded-full bg-primary/10 dark:bg-primary/5 p-1 max-w-md mx-auto">
                <div className="bg-white dark:bg-dark-100 h-full w-full rounded-full flex items-center justify-center shadow-lg">
                  <p className="text-lg text-slate-400 dark:text-slate-500">Your Image Here</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-24 bg-white dark:bg-dark-100 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-dark dark:text-light">My Skills</h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              A snapshot of what I use most and what I’m actively learning.
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <h3 className="text-lg font-bold text-dark dark:text-light mb-4">Core</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {coreSkills.map((skill, index) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="bg-light dark:bg-dark-200 rounded-lg p-6 text-center hover:shadow-lg dark:hover:shadow-black/20 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="text-primary text-2xl mb-3">
                    <div className="w-16 h-16 bg-primary/10 dark:bg-primary/5 rounded-full mx-auto flex items-center justify-center">
                      <span className="text-primary font-bold text-xl">{skill.name.charAt(0)}</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-dark dark:text-light">{skill.name}</h3>
                  {skill.tags && skill.tags.length > 0 && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                      {skill.tags.slice(0, 3).join(' • ')}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>

            <h3 className="text-lg font-bold text-dark dark:text-light mt-10 mb-4">Learning</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {learningSkills.map((skill, index) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="bg-light dark:bg-dark-200 rounded-lg p-6 text-center hover:shadow-lg dark:hover:shadow-black/20 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="text-primary text-2xl mb-3">
                    <div className="w-16 h-16 bg-primary/10 dark:bg-primary/5 rounded-full mx-auto flex items-center justify-center">
                      <span className="text-primary font-bold text-xl">{skill.name.charAt(0)}</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-dark dark:text-light">{skill.name}</h3>
                  {skill.tags && skill.tags.length > 0 && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                      {skill.tags.slice(0, 3).join(' • ')}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-dark dark:text-light">Featured Projects</h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Here are some of my recent projects. Check out my Projects page for more.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="bg-white dark:bg-dark-100 rounded-lg overflow-hidden shadow-lg dark:shadow-black/20 hover:-translate-y-2 transition-all duration-300"
              >
                <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 dark:from-dark-200 dark:to-dark-300 relative">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 dark:text-slate-400">
                      <div className="w-14 h-14 rounded-2xl bg-white/70 dark:bg-dark/60 backdrop-blur flex items-center justify-center shadow-sm">
                        <span className="text-primary font-bold text-xl">
                          {project.title.trim().charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="mt-3 text-sm">Screenshot coming soon</div>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-dark dark:text-light">{project.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-xs bg-primary/10 dark:bg-primary/5 text-primary px-2 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <Link to="/projects" className="text-primary font-medium hover:underline">View Details →</Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/projects" className="btn btn-primary">
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-white relative z-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to work together?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-primary-50">
            I'm currently available for freelance work and open to new opportunities.
          </p>
          <Link to="/contact" className="btn bg-white text-primary hover:bg-slate-100">
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
