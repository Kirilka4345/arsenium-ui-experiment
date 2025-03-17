
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface ContentSectionProps {
  imageUrl: string;
  gifUrl: string;
  isReversed?: boolean;
}

const ContentSection = ({ imageUrl, gifUrl, isReversed = false }: ContentSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="section">
      <div className="container-custom">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
          <motion.div
            initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isReversed ? 50 : -50 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 rounded-full text-primary"
            >
              Познакомьтесь с нашим проектом
            </motion.div>
            <h2>Интересный и полезный контент</h2>
            <p className="text-muted-foreground leading-relaxed">
              На нашем сайте вы найдете множество интересных статей, игр и тестов, которые помогут вам лучше понять окружающий мир.
              Мы стремимся предоставить уникальный и познавательный контент, чтобы сделать ваше время на сайте приятным и полезным.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Исследуйте нашу коллекцию, участвуйте в тестировании, играйте в мини-игру или общайтесь с чат-ботом. 
              Всё это доступно в одном месте!
            </p>
            <div>
              <motion.a
                href="/article"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary mr-4"
              >
                Читать статью
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: isReversed ? -50 : 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isReversed ? -50 : 50 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={imageUrl || "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"} 
                alt="Content image" 
                className="w-full h-auto object-cover rounded-2xl transition-transform duration-500 hover:scale-105"
              />
            </div>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="absolute -bottom-10 -right-10 w-48 h-48 rounded-2xl overflow-hidden shadow-xl border-4 border-background"
            >
              <img 
                src={gifUrl || "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGJlNDRmM2EyN2Q0ZDY2OTFkNzQzNjVhMTgxYTlmZDY2ZDc1MDdlZiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/3oKIPnAiaMCws8nOsE/giphy.gif"} 
                alt="GIF animation" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContentSection;
