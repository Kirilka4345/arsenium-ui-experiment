
import { motion } from 'framer-motion';
import { Play, GameController, MessageSquare, BookOpen } from 'lucide-react';

const features = [
  {
    icon: <BookOpen className="h-10 w-10 text-primary" />,
    title: 'Интересные статьи',
    description: 'Узнайте больше об объектах, связанных с аутизмом и многом другом.',
  },
  {
    icon: <Play className="h-10 w-10 text-secondary" />,
    title: 'Тестирование',
    description: 'Пройдите тест с интерактивными вопросами и получите результат.',
  },
  {
    icon: <GameController className="h-10 w-10 text-accent" />,
    title: 'Мини-игра',
    description: 'Попробуйте нашу мини-игру с пиксельным героем и препятствиями.',
  },
  {
    icon: <MessageSquare className="h-10 w-10 text-primary" />,
    title: 'Чат-бот',
    description: 'Общайтесь с нашим интерактивным чат-ботом для развлечения.',
  },
];

const FeaturesSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
    <section id="features" className="section bg-muted/50">
      <div className="container-custom">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="mb-4">Особенности нашего сайта</h2>
          <p className="text-muted-foreground text-lg">
            Исследуйте разнообразные интерактивные функции и контент, доступные на нашем сайте
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
              className="card-hover rounded-xl bg-card p-8 text-center"
            >
              <div className="flex justify-center mb-6">
                {feature.icon}
              </div>
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
