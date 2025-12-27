import { Link } from 'react-router-dom';

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

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white py-12 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="text-2xl font-heading font-bold text-white">
              Lucas Liona
            </Link>
            <p className="mt-4 text-slate-300">
              Building at the intersection of infrastructure, AI/ML, and civic tech.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[{ label: 'Home', to: '/' }, { label: 'About', to: '/about' }, { label: 'Projects', to: '/projects' }, { label: 'Docs', to: '/docs' }, { label: 'Now', to: '/now' }, { label: 'Contact', to: '/contact' }].map((item) => (
                <li key={item.label}>
                  <Link 
                    to={item.to}
                    className="text-slate-300 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-slate-300">
              <li>
                <a href="mailto:lucas.s.liona@gmail.com" className="hover:text-white transition-colors">
                  lucas.s.liona@gmail.com
                </a>
              </li>
              <li>US (ET)</li>
            </ul>
          </div>

          {/* Social */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold mb-4">Social</h3>
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
                  className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-slate-300/30 dark:border-dark-200 text-slate-200 hover:bg-primary hover:text-white hover:border-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-12 pt-8 text-center text-slate-400">
          <p>© {currentYear} Lucas Liona. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;