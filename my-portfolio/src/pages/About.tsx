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
              Frontend developer passionate about creating beautiful and functional web experiences.
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
                I'm a passionate frontend developer with a focus on creating user-friendly, accessible, 
                and visually appealing web applications. With expertise in modern frontend technologies 
                like React, TypeScript, and Tailwind CSS, I strive to build responsive and performant 
                web solutions.
              </p>
              <p className="text-slate-600">
                My journey began in [your starting year] when I first discovered my passion for web development. 
                Since then, I've been constantly improving my skills and staying up-to-date with the latest 
                trends and technologies in the field.
              </p>
              <p className="text-slate-600">
                When I'm not coding, you can find me [your hobbies/interests]. I believe that these activities 
                help me maintain a balanced life and provide fresh perspectives that enhance my creativity as a developer.
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
                <p className="text-slate-400">Your Photo Here</p>
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
                  { name: 'React', level: 90 },
                  { name: 'TypeScript', level: 85 },
                  { name: 'JavaScript', level: 95 },
                  { name: 'HTML & CSS', level: 90 },
                  { name: 'Tailwind CSS', level: 80 },
                  { name: 'Node.js', level: 70 },
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
                    role: 'Frontend Developer',
                    company: 'Company Name',
                    period: '2021 - Present',
                    description:
                      'Developed and maintained responsive web applications using React, TypeScript, and Tailwind CSS. Collaborated with design and backend teams to implement new features.',
                  },
                  {
                    role: 'Web Developer Intern',
                    company: 'Company Name',
                    period: '2020 - 2021',
                    description:
                      'Assisted in the development of web applications, focusing on frontend implementation and UI improvements.',
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
                degree: 'Bachelor of Science in Computer Science',
                institution: 'University Name',
                period: '2016 - 2020',
                description:
                  'Focused on web development, software engineering, and user interface design.',
              },
              {
                degree: 'Web Development Bootcamp',
                institution: 'Bootcamp Name',
                period: '2020',
                description:
                  'Intensive program covering modern frontend and backend technologies.',
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
