import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Me</h1>
            <p className="text-lg text-slate-600">
              Rutgers–Camden student building at the intersection of infrastructure, AI/ML, and civic tech.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold">My Journey</h2>
              <p className="text-slate-600">
                I’m interested in building systems end-to-end: infrastructure that runs reliably, ML/AI systems that are practical, and tools that help people make sense of complex information.
              </p>
              <p className="text-slate-600">
                Lately that’s looked like leading an environmental justice data platform (CEIP), building local-first AI workflows on a homelab, and shipping developer tools like an Obsidian graph plugin.
              </p>
              <p className="text-slate-600">
                Outside of coding, I spend a lot of time learning (papers/books/notes) and iterating on how I work — documenting progress and building in public.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-slate-100 p-6 rounded-lg"
            >
              <div className="aspect-square rounded-lg bg-white shadow-md flex items-center justify-center">
                <p className="text-slate-400">Photo coming soon</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills & Experience */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-12 text-center"
          >
            Skills & Experience
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-16">
            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6">Technical Skills</h3>
              <div className="space-y-4">
                {[
                  { name: 'Python', level: 90 },
                  { name: 'C++', level: 80 },
                  { name: 'TypeScript', level: 75 },
                  { name: 'Docker', level: 80 },
                  { name: 'PostgreSQL', level: 75 },
                  { name: 'Linux', level: 75 },
                ].map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-slate-500">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Experience */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6">Experience</h3>
              <div className="space-y-8">
                {[
                  {
                    role: 'President, ACM (Rutgers–Camden)',
                    company: 'Rutgers University–Camden',
                    period: '2025 - Present',
                    description:
                      'Leading campus tech community and organizing HackRUC 2025 (MLH-sanctioned) while running workshops and coordinating sponsors/logistics.',
                  },
                  {
                    role: 'Project Lead, CEIP',
                    company: 'Rutgers University–Camden',
                    period: '2025 - Present',
                    description:
                      'Leading an environmental justice data platform project, building data pipelines and application infrastructure in collaboration with community partners.',
                  },
                ].map((exp, index) => (
                  <div key={index} className="border-l-4 border-primary pl-4 py-1">
                    <h4 className="text-xl font-bold">{exp.role}</h4>
                    <p className="text-primary font-medium">{exp.company}</p>
                    <p className="text-slate-500 mb-2">{exp.period}</p>
                    <p className="text-slate-600">{exp.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-12 text-center"
          >
            Education
          </motion.h2>

          <div className="max-w-3xl mx-auto space-y-8">
            {[
              {
                degree: 'B.S. in Computer Science (Applied Math & CS)',
                institution: 'Rutgers University–Camden',
                period: 'Expected May 2026',
                description:
                  'Coursework spans algorithms, machine learning, databases, and applied mathematics.',
              },
              {
                degree: 'Current Focus',
                institution: 'US (ET)',
                period: '2025 - 2026',
                description:
                  'Shipping projects, writing about what I learn, and preparing for Summer 2026 internships.',
              },
            ].map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h4 className="text-xl font-bold">{edu.degree}</h4>
                <p className="text-primary font-medium">{edu.institution}</p>
                <p className="text-slate-500 mb-2">{edu.period}</p>
                <p className="text-slate-600">{edu.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
