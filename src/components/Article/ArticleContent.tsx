
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Cpu, Gamepad, Code, Pizza } from 'lucide-react';

const ArticleContent = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="prose prose-invert max-w-none"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hero-gradient text-4xl font-bold mb-6"
        >
          Загадочный мир Арсения: кто он такой?
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center mb-8 text-muted-foreground"
        >
          <span>Опубликовано: сегодня</span>
          <span className="mx-2">•</span>
          <span>Время чтения: 5 минут</span>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mb-8 rounded-xl overflow-hidden shadow-lg arseny-border-glow"
        >
          <img 
            src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2420&q=80" 
            alt="Компьютер мечты Арсения" 
            className="w-full h-auto object-cover"
          />
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="lead text-xl mb-8"
        >
          Арсений — легендарная личность в нашем кругу. Его страсть к компьютерам, уникальный стиль программирования и особое отношение к процессорам Xeon известны всем. В этой статье мы совершим увлекательное путешествие в мир Арсения.
        </motion.p>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-2xl font-semibold mb-4 flex items-center gap-2"
        >
          <Cpu className="text-primary animate-pulse" />
          Мечта о суперкомпьютере
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          Главная мечта Арсения — собрать суперкомпьютер на процессоре Xeon. Не просто компьютер, а настоящего монстра производительности, способного решать самые сложные задачи. Для Арсения процессор Xeon — это не просто набор транзисторов, это философия, образ жизни и предмет поклонения.
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          Когда большинство людей обсуждают видеокарты и RGB-подсветку, Арсений погружен в изучение технических характеристик серверных процессоров, сравнивая количество ядер и частоты. Его знания в этой области настолько обширны, что он может назвать все модели Xeon последних пяти поколений по памяти.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="p-6 neo-card my-8"
        >
          <blockquote className="text-xl italic">
            "Настоящая производительность начинается с Xeon. Всё остальное — компромисс." — Арсений
          </blockquote>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="text-2xl font-semibold mb-4 flex items-center gap-2"
        >
          <Code className="text-secondary animate-spin" style={{ animationDuration: '4s' }} />
          Уникальный стиль программирования
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          Программирование для Арсения — это искусство. Его код узнаваем с первого взгляда: особое форматирование, неожиданные решения и комментарии, которые могут поставить в тупик даже опытного разработчика. Когда Арсений пишет код, обычные правила и конвенции часто отходят на второй план, уступая место его творческому видению.
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          Коллеги шутят, что читать код Арсения — всё равно что разгадывать древние рукописи. Но за этой необычной формой всегда скрывается глубокое понимание алгоритмов и неординарный подход к решению задач.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8"
        >
          <div className="neo-card overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2506&q=80" 
              alt="Рабочее место Арсения" 
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="neo-card overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
              alt="Код Арсения" 
              className="w-full h-auto object-cover"
            />
          </div>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.4 }}
          className="text-2xl font-semibold mb-4 flex items-center gap-2"
        >
          <Gamepad className="text-accent animate-bounce" style={{ animationDuration: '2s' }} />
          Игры и развлечения
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          Несмотря на серьезное увлечение технологиями, Арсений находит время для игр и развлечений. Его подход к играм так же уникален, как и к программированию. Он может часами настраивать графические параметры, добиваясь идеального баланса производительности и качества картинки, прежде чем начать саму игру.
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.6 }}
        >
          Любимые игры Арсения — те, что требуют мощного "железа" и хорошо масштабируются на многоядерных процессорах. Неудивительно, что в его коллекции преобладают стратегии и симуляторы с сложными физическими моделями.
        </motion.p>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.7 }}
          className="text-2xl font-semibold mb-4 flex items-center gap-2"
        >
          <Pizza className="text-primary animate-spin" style={{ animationDuration: '4s' }} />
          Вкусовые предпочтения Арсения
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.8 }}
        >
          Отдельного внимания заслуживают кулинарные предпочтения нашего героя. Любимая еда Арсения — такая же особенная, как и он сам. Его идеальный обед должен быть сбалансирован по вкусу, текстуре и питательной ценности, как хорошо спроектированная компьютерная система.
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.9 }}
        >
          Арсений может вести многочасовые дискуссии о преимуществах определенных блюд, приводя аргументы, достойные научной конференции. И горе тому, кто посмеет называть неправильное блюдо его любимым!
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2.0 }}
          className="mt-12 p-6 neo-card"
        >
          <h3 className="text-xl font-semibold mb-4">Узнайте больше об Арсении</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link to="/test" className="arseny-card flex flex-col items-center p-6 transition-all hover:bg-muted">
              <h4 className="font-semibold mb-2">Тест на совместимость</h4>
              <p className="text-sm text-muted-foreground">Проверьте, насколько вы похожи на Арсения</p>
            </Link>
            <Link to="/game" className="arseny-card flex flex-col items-center p-6 transition-all hover:bg-muted">
              <h4 className="font-semibold mb-2">Мини-игра Арсения</h4>
              <p className="text-sm text-muted-foreground">Соберите компоненты для идеального компьютера</p>
            </Link>
          </div>
        </motion.div>
      </motion.article>
    </div>
  );
};

export default ArticleContent;
