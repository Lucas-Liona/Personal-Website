import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getAllMocs } from '../lib/moc';

const Moc = () => {
  const mocs = getAllMocs();

  return (
    <div className="pt-20">
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Maps of Content</h1>
            <p className="text-lg text-slate-600">
              High-level indexes of notes, projects, and ideas.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          {mocs.length === 0 ? (
            <div className="max-w-3xl mx-auto text-center text-slate-600">No MOCs yet.</div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-6">
              {mocs.map((moc, index) => (
                <motion.div
                  key={moc.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <Link to={`/moc/${moc.slug}`} className="block">
                    <h2 className="text-2xl font-bold text-dark hover:text-primary transition-colors">
                      {moc.title}
                    </h2>
                    {moc.date && <p className="text-slate-500 mt-1">{moc.date}</p>}
                    {moc.tags && moc.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {moc.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Moc;
