
import { motion } from 'framer-motion';
import { ArrowRight, Cpu, Code } from 'lucide-react';
import { Link } from 'react-router-dom';

const ArticlePreview = () => {
  return (
    <section className="section bg-gradient-to-r from-primary/5 via-secondary/5 to-background">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="mb-4 hero-gradient">Статьи об Арсении</h2>
          <p className="text-muted-foreground text-lg">
            Погрузитесь в удивительный мир Арсения через наши увлекательные статьи
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="neo-card overflow-hidden"
          >
            <div className="h-64 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10"></div>
              <img
                src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2420&q=80"
                alt="Компьютер мечты Арсения"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="p-8">
              <div className="flex items-center mb-4">
                <Cpu className="h-6 w-6 text-primary mr-2" />
                <span className="text-sm font-medium text-primary">Технологии</span>
              </div>
              <h3 className="text-2xl font-semibold mb-3">Мечта о суперкомпьютере</h3>
              <p className="text-muted-foreground mb-6">
                Детальное исследование увлечения Арсения процессорами Xeon и его мечты о создании
                идеального суперкомпьютера для решения сложнейших вычислительных задач.
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
            className="neo-card overflow-hidden"
          >
            <div className="h-64 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10"></div>
              <img
                src="https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
                alt="Код Арсения"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="p-8">
              <div className="flex items-center mb-4">
                <Code className="h-6 w-6 text-secondary mr-2" />
                <span className="text-sm font-medium text-secondary">Программирование</span>
              </div>
              <h3 className="text-2xl font-semibold mb-3">Уникальный стиль кодирования</h3>
              <p className="text-muted-foreground mb-6">
                Погружение в необычный мир программирования Арсения, где традиционные правила
                переосмысливаются, а код становится произведением искусства с уникальным почерком.
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
