
import { motion } from 'framer-motion';
import { Play, Gamepad, MessageSquare, BookOpen, Cpu, Code, Rocket, Pizza } from 'lucide-react';

const features = [
  {
    icon: <BookOpen className="h-10 w-10 text-primary" />,
    title: 'Статья про Арсения',
    description: 'Узнайте больше о нашем друге Арсении и его увлечениях.',
  },
  {
    icon: <Play className="h-10 w-10 text-secondary" />,
    title: 'Тест на Арсения',
    description: 'Насколько вы похожи на Арсения? Пройдите наш шутливый тест!',
  },
  {
    icon: <Gamepad className="h-10 w-10 text-accent" />,
    title: 'Мини-игра',
    description: 'Веселая мини-игра с персонажем, похожим на Арсения.',
  },
  {
    icon: <MessageSquare className="h-10 w-10 text-primary" />,
    title: 'Чат-бот Арсений',
    description: 'Общайтесь с нашим шутливым чат-ботом от имени Арсения.',
  },
  {
    icon: <Cpu className="h-10 w-10 text-secondary" />,
    title: 'Суперкомпьютер Арсения',
    description: 'Узнайте о мечте Арсения - суперсборке на процессоре Xeon!',
  },
  {
    icon: <Code className="h-10 w-10 text-accent" />,
    title: 'Код Арсения',
    description: 'Посмотрите на "особенный" стиль программирования нашего друга.',
  },
  {
    icon: <Rocket className="h-10 w-10 text-primary" />,
    title: 'Мечты Арсения',
    description: 'Куда хочет полететь наш друг и о чем он мечтает?',
  },
  {
    icon: <Pizza className="h-10 w-10 text-secondary" />,
    title: 'Вкусы Арсения',
    description: 'Любимая еда, напитки и другие предпочтения нашего друга.',
  },
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
    <section id="features" className="section bg-muted/50">
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
            Исследуйте разнообразные особенности и увлечения нашего друга Арсения
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
              whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)" }}
              className="card-hover rounded-xl bg-card p-8 text-center border border-border/50 backdrop-blur-sm"
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
