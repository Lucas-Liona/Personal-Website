import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  live?: string;
  github?: string;
  direction?: 'left' | 'right';
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  technologies,
  image,
  live,
  github,
  direction = 'left',
  index
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.2, // Visible when 20% of the card is in view
        rootMargin: '0px 0px -100px 0px' // Adjust when card becomes "visible"
      }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ 
        opacity: 0,
        x: direction === 'left' ? -100 : 100
      }}
      animate={isVisible ? { 
        opacity: 1,
        x: 0,
        transition: { 
          duration: 0.8,
          delay: index * 0.2 // Stagger effect
        }
      } : {}}
      className="relative z-10 mb-24 md:mb-32"
    >
      <div className={`flex flex-col ${direction === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 bg-white dark:bg-dark-100 rounded-lg shadow-lg overflow-hidden transition-colors duration-300`}>
        {/* Project Image */}
        <div className="md:w-2/5">
          {image ? (
            <img src={image} alt={title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full min-h-56 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-dark-200 dark:to-dark-300 flex items-center justify-center">
              <div className="text-center px-6">
                <div className="w-14 h-14 rounded-2xl bg-white/70 dark:bg-dark/60 backdrop-blur flex items-center justify-center mx-auto shadow-sm">
                  <span className="text-primary font-bold text-xl">{title.trim().charAt(0).toUpperCase()}</span>
                </div>
                <div className="mt-3 text-sm text-slate-500 dark:text-slate-400">Screenshot coming soon</div>
              </div>
            </div>
          )}
        </div>
        
        {/* Project Content */}
        <div className="p-6 md:w-3/5 flex flex-col justify-center">
          <h3 className="text-2xl font-bold mb-3 text-dark dark:text-light">{title}</h3>
          
          <p className="text-slate-600 dark:text-slate-300 mb-4">
            {description}
          </p>
          
          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-6">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="text-xs bg-slate-100 dark:bg-dark-200 text-slate-600 dark:text-slate-300 px-2 py-1 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
          
          {/* Links */}
          <div className="flex gap-4 mt-auto">
            {live && (
              <a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                Live Demo
              </a>
            )}
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 dark:text-slate-300 hover:underline font-medium"
              >
                Source Code
              </a>
            )}
          </div>
        </div>
      </div>
      
      {/* Decorative dot pattern */}
      <div className={`absolute -z-10 ${direction === 'right' ? '-left-4 bottom-4' : '-right-4 bottom-4'} w-24 h-24 opacity-20 dark:opacity-10 hidden md:block`}>
        <div className="grid grid-cols-5 grid-rows-5 gap-1">
          {[...Array(25)].map((_, i) => (
            <div key={i} className="w-1 h-1 rounded-full bg-primary"></div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;