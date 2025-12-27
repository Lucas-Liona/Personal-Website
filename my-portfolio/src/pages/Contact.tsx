import { useState } from 'react';
import { motion } from 'framer-motion';

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

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | ''>('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission with a timeout
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setSubmitMessage('Your message has been sent successfully!');
      
      // Reset the form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('');
        setSubmitMessage('');
      }, 5000);
    }, 1500);
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-slate-50 dark:bg-dark-100 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-dark dark:text-light">Get In Touch</h1>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Have a question or want to work together? Feel free to reach out!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-dark dark:text-light">Contact Information</h2>
              <p className="text-slate-600 dark:text-slate-300">
                Feel free to reach out to me through any of the following methods. 
                I typically respond within 24-48 hours.
              </p>

              <div className="space-y-4 mt-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary">
                    {/* Icon would go here */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-dark dark:text-light">Email</h3>
                    <a
                      href="mailto:lucas.s.liona@gmail.com"
                      className="text-slate-600 dark:text-slate-300 hover:underline"
                    >
                      lucas.s.liona@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full text-primary">
                    {/* Icon would go here */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-dark dark:text-light">Location</h3>
                    <p className="text-slate-600 dark:text-slate-300">US (ET)</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-bold mb-4 text-dark dark:text-light">Connect with me</h3>
                <div className="flex space-x-4">
                  {[
                    { label: 'GitHub', href: 'https://github.com/Lucas-Liona', Icon: GitHubIcon },
                    { label: 'LinkedIn', href: 'https://linkedin.com/in/lucas-liona', Icon: LinkedInIcon },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-slate-300 dark:border-dark-200 text-slate-700 dark:text-slate-200 hover:bg-primary hover:text-white hover:border-primary transition-colors"
                      aria-label={social.label}
                    >
                      <social.Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-dark-100 p-8 rounded-lg shadow-md dark:shadow-black/20"
            >
              <h2 className="text-2xl font-bold mb-6 text-dark dark:text-light">Send Me a Message</h2>

              {submitStatus && (
                <div 
                  className={`mb-6 p-4 rounded-md ${
                    submitStatus === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}
                >
                  {submitMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block mb-2 font-medium text-dark dark:text-light">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block mb-2 font-medium text-dark dark:text-light">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Your email"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block mb-2 font-medium text-dark dark:text-light">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Subject of your message"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block mb-2 font-medium text-dark dark:text-light">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Your message"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-primary text-white rounded-md hover:bg-secondary transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map or Additional Info */}
      <section className="py-16 bg-slate-50 dark:bg-dark-100">
        <div className="container mx-auto px-4">
          <div className="aspect-video bg-slate-200 dark:bg-dark-200 rounded-lg flex items-center justify-center text-slate-400 dark:text-slate-500">
            Prefer email or LinkedIn — I typically respond within 24-48 hours.
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;