
import { motion } from 'framer-motion';

const ArticleContent = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="prose prose-lg max-w-none"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl font-bold mb-6"
        >
          Интересная статья о современных технологиях
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center mb-8 text-muted-foreground"
        >
          <span>Опубликовано: 15 мая 2023</span>
          <span className="mx-2">•</span>
          <span>Время чтения: 5 минут</span>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mb-8 rounded-xl overflow-hidden"
        >
          <img 
            src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
            alt="Article header" 
            className="w-full h-auto object-cover"
          />
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="lead text-xl mb-8"
        >
          В современном мире технологии развиваются с невероятной скоростью, меняя нашу жизнь и открывая новые возможности. В этой статье мы рассмотрим несколько интересных технологических тенденций и их влияние на общество.
        </motion.p>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-2xl font-semibold mb-4"
        >
          Искусственный интеллект в повседневной жизни
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          Искусственный интеллект (ИИ) становится всё более распространенным в нашей повседневной жизни. От голосовых помощников в наших телефонах до рекомендательных систем в стриминговых сервисах — ИИ улучшает пользовательский опыт и делает технологии более интуитивными.
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          Однако вместе с преимуществами ИИ возникают и этические вопросы. Как обеспечить прозрачность алгоритмов? Как предотвратить предвзятость в системах машинного обучения? Эти вопросы становятся всё более актуальными по мере того, как ИИ получает всё большее распространение.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="p-6 bg-muted rounded-xl my-8"
        >
          <blockquote className="text-xl italic">
            "Искусственный интеллект — это не будущее, это настоящее, которое уже меняет нашу жизнь, часто незаметно для нас."
          </blockquote>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="text-2xl font-semibold mb-4"
        >
          Виртуальная и дополненная реальность
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          Виртуальная реальность (VR) и дополненная реальность (AR) также продолжают развиваться. Эти технологии находят применение не только в игровой индустрии, но и в образовании, медицине, архитектуре и многих других областях.
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          Например, медицинские студенты могут практиковаться в проведении операций в виртуальной среде, а архитекторы могут показывать клиентам, как будет выглядеть здание ещё до начала строительства. Возможности этих технологий поистине безграничны.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8"
        >
          <img 
            src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7" 
            alt="VR technology" 
            className="w-full h-auto rounded-xl"
          />
          <img 
            src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6" 
            alt="Coding" 
            className="w-full h-auto rounded-xl"
          />
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.4 }}
          className="text-2xl font-semibold mb-4"
        >
          Заключение
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          Технологии продолжают развиваться с невероятной скоростью, открывая новые возможности и создавая новые вызовы. Важно не только следить за этими изменениями, но и активно участвовать в обсуждении того, как эти технологии должны интегрироваться в общество.
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.6 }}
        >
          В конечном счёте, технологии — это инструмент, и его влияние зависит от того, как мы его используем. Давайте стремиться использовать технологии для создания лучшего, более справедливого и более устойчивого мира для всех.
        </motion.p>
      </motion.article>
    </div>
  );
};

export default ArticleContent;
