
import { motion } from 'framer-motion';
import { Cpu, Gamepad, MessageSquare, BookOpen, Code, Rocket, Pizza, Headphones } from 'lucide-react';

const features = [
  {
    icon: <Cpu className="h-10 w-10 text-primary" />,
    title: 'Мечта о Xeon',
    description: 'Изучите страсть Арсения к процессорам Xeon и его мечту о суперкомпьютере.',
  },
  {
    icon: <Code className="h-10 w-10 text-secondary" />,
    title: 'Код Арсения',
    description: 'Узнайте об уникальном стиле программирования и творческом подходе к задачам.',
  },
  {
    icon: <Gamepad className="h-10 w-10 text-accent" />,
    title: 'Игровые увлечения',
    description: 'Познакомьтесь с игровыми предпочтениями и любимыми жанрами Арсения.',
  },
  {
    icon: <Pizza className="h-10 w-10 text-primary" />,
    title: 'Кулинарные пристрастия',
    description: 'Откройте для себя особенные вкусы и предпочтения в еде нашего героя.',
  },
  {
    icon: <MessageSquare className="h-10 w-10 text-secondary" />,
    title: 'Общение с Арсением',
    description: 'Пообщайтесь с чат-ботом, имитирующим манеру общения Арсения.',
  },
  {
    icon: <BookOpen className="h-10 w-10 text-accent" />,
    title: 'Биография',
    description: 'Прочитайте увлекательную статью о жизни, интересах и достижениях.',
  },
  {
    icon: <Rocket className="h-10 w-10 text-primary" />,
    title: 'Амбиции',
    description: 'Узнайте о технологических амбициях и планах на будущее.',
  },
  {
    icon: <Headphones className="h-10 w-10 text-secondary" />,
    title: 'Музыкальные вкусы',
    description: 'Исследуйте музыкальные предпочтения и любимые композиции Арсения.',
  }
];

const FeaturesSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="features" className="section bg-muted/10">
      <div className="container-custom">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="mb-4 hero-gradient text-4xl font-bold">Мир Арсения</h2>
          <p className="text-muted-foreground text-lg">
            Исследуйте разнообразные увлечения, технические пристрастия и уникальные особенности нашего друга
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)" }}
              className="neo-card text-center p-8"
            >
              <motion.div 
                className="flex justify-center mb-6"
                whileHover={{ rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
