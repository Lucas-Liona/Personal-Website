import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getAllNowEntries } from '../lib/now';

const NowArchive = () => {
  const entries = getAllNowEntries();

  return (
    <div className="pt-20">
      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <Link to="/now" className="text-primary hover:underline">
              ← Back to Now
            </Link>
            <h1 className="text-4xl font-bold mt-4">Now Archive</h1>
            <p className="text-slate-600 mt-2">Previous snapshots of what I was focused on.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-6">
            {entries.map((entry, index) => (
              <motion.div
                key={entry.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <Link to={`/now/${entry.slug}`} className="block">
                  <h2 className="text-2xl font-bold text-dark hover:text-primary transition-colors">
                    {entry.title}
                  </h2>
                  {entry.date && <p className="text-slate-500 mt-1">{entry.date}</p>}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default NowArchive;
