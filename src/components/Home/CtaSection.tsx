
import { motion } from 'framer-motion';
import { Cpu, Gamepad, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const CtaSection = () => {
  return (
    <section className="section bg-gradient-to-r from-primary/40 via-accent/40 to-secondary/40 overflow-hidden relative">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 rounded-full bg-white/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-white hero-gradient"
          >
            Готовы узнать больше об Арсении?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-white/80"
          >
            Пройдите тест на совместимость, помогите собрать идеальный компьютер или пообщайтесь с цифровой версией Арсения!
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-4 mt-8"
          >
            <Link to="/test">
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)" }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-2 bg-white text-primary px-8 py-3 rounded-md font-medium shadow-lg transition-all duration-300"
              >
                <Cpu className="animate-pulse" />
                Тест на совместимость
              </motion.div>
            </Link>
            <Link to="/game">
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)" }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-2 bg-white/20 text-white border border-white/50 backdrop-blur-sm px-8 py-3 rounded-md font-medium shadow-lg hover:bg-white/30 transition-all duration-300"
              >
                <Gamepad className="animate-bounce" />
                Собрать компьютер мечты
              </motion.div>
            </Link>
            <Link to="/chat">
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)" }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-2 bg-white/10 text-white border border-white/30 backdrop-blur-sm px-8 py-3 rounded-md font-medium shadow-lg hover:bg-white/20 transition-all duration-300"
              >
                <MessageSquare className="animate-spin" style={{ animationDuration: '3s' }} />
                Чат с Арсением
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
