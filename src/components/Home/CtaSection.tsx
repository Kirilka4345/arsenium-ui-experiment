
import { motion } from 'framer-motion';

const CtaSection = () => {
  return (
    <section className="section bg-gradient-to-r from-primary to-secondary text-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-white"
          >
            Готовы начать пользоваться нашим сайтом?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-white/80"
          >
            Присоединяйтесь к нам и откройте для себя мир интерактивных возможностей, тестов и игр.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-4 mt-8"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/test"
              className="bg-white text-primary px-8 py-3 rounded-md font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Пройти тест
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/game"
              className="bg-white/20 text-white border border-white/50 backdrop-blur-sm px-8 py-3 rounded-md font-medium shadow-lg hover:bg-white/30 transition-all duration-300"
            >
              Играть в игру
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
