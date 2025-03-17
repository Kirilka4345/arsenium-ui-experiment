
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ArticlePreview = () => {
  return (
    <section className="section bg-gradient-to-r from-primary/5 to-secondary/5">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="mb-4">Статьи на нашем сайте</h2>
          <p className="text-muted-foreground text-lg">
            Ознакомьтесь с нашими интересными статьями по различным темам
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="card-hover rounded-xl bg-card overflow-hidden shadow-lg"
          >
            <img
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
              alt="Article thumbnail"
              className="w-full h-64 object-cover"
            />
            <div className="p-8">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 rounded-full text-primary mb-4">
                Статья
              </span>
              <h3 className="text-2xl font-semibold mb-3">Интересная статья</h3>
              <p className="text-muted-foreground mb-6">
                В этой статье вы узнаете много интересного и познавательного о мире вокруг нас.
                Мы рассмотрим различные аспекты и поделимся полезной информацией.
              </p>
              <Link 
                to="/article" 
                className="group inline-flex items-center text-primary font-medium hover:underline"
              >
                Читать полностью 
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="card-hover rounded-xl bg-card overflow-hidden shadow-lg"
          >
            <img
              src="https://images.unsplash.com/photo-1518770660439-4636190af475"
              alt="Article thumbnail"
              className="w-full h-64 object-cover"
            />
            <div className="p-8">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-secondary/10 rounded-full text-secondary mb-4">
                Исследование
              </span>
              <h3 className="text-2xl font-semibold mb-3">Аналитическая статья</h3>
              <p className="text-muted-foreground mb-6">
                В этой статье представлен анализ и сравнение различных аспектов современного мира.
                Мы рассмотрим факты и сделаем интересные выводы о текущих тенденциях.
              </p>
              <Link 
                to="/article" 
                className="group inline-flex items-center text-secondary font-medium hover:underline"
              >
                Читать полностью 
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ArticlePreview;
