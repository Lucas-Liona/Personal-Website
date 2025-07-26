import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white py-12 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="text-2xl font-heading font-bold text-white">
              Portfolio
            </Link>
            <p className="mt-4 text-slate-300">
              Building modern web experiences with cutting-edge technologies.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'About', 'Projects', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-slate-300 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-slate-300">
              <li>example@example.com</li>
              <li>+1 (555) 123-4567</li>
              <li>City, Country</li>
            </ul>
          </div>

          {/* Social */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold mb-4">Social</h3>
            <div className="flex space-x-4">
              {['GitHub', 'LinkedIn', 'Twitter', 'Instagram'].map((social) => (
                <a 
                  key={social}
                  href="#" 
                  className="text-slate-300 hover:text-white transition-colors"
                  aria-label={social}
                >
                  {/* Icon would go here */}
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center hover:bg-primary transition-colors">
                    {social.charAt(0)}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-12 pt-8 text-center text-slate-400">
          <p>© {currentYear} Your Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;