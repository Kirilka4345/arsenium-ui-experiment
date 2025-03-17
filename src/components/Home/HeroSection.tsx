import { motion } from 'framer-motion';
import { ChevronDown, Cpu } from 'lucide-react';
interface HeroSectionProps {
  videoUrl: string;
}
const HeroSection = ({
  videoUrl
}: HeroSectionProps) => {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };
  return <div className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video className="w-full h-full object-cover" autoPlay loop muted playsInline src={videoUrl}>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/70 z-10"></div>
      </div>

      <div className="relative z-20 h-full flex flex-col items-center justify-center text-white container-custom">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8,
        delay: 0.2
      }} className="text-center space-y-6">
          <motion.div initial={{
          scale: 0.8,
          opacity: 0
        }} animate={{
          scale: 1,
          opacity: 1
        }} transition={{
          duration: 0.5
        }} className="mb-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium bg-primary/20 backdrop-blur-sm rounded-full">
              <Cpu className="h-4 w-4 animate-pulse" />
              Погрузитесь в мир Арсения
            </span>
          </motion.div>
          
          <motion.h1 initial={{
          y: 20,
          opacity: 0
        }} animate={{
          y: 0,
          opacity: 1
        }} transition={{
          duration: 0.5,
          delay: 0.3
        }} className="hero-gradient text-4xl md:text-6xl lg:text-7xl font-bold leading-tight max-w-5xl mx-auto text-balance">Каков мир глазами аутиста Арсения?</motion.h1>
          
          <motion.p initial={{
          y: 20,
          opacity: 0
        }} animate={{
          y: 0,
          opacity: 1
        }} transition={{
          duration: 0.5,
          delay: 0.5
        }} className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto">Я вообще в рот ебал пенисом по губам сись сись </motion.p>
          
          <motion.div initial={{
          y: 20,
          opacity: 0
        }} animate={{
          y: 0,
          opacity: 1
        }} transition={{
          duration: 0.5,
          delay: 0.7
        }} className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <motion.a href="#features" whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }} className="btn-primary flex items-center justify-center gap-2">
              <Cpu className="h-5 w-5" />
              Открыть мир Арсения
            </motion.a>
            <motion.a href="/test" whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }} className="btn-secondary">
              Пройти тест на совместимость
            </motion.a>
          </motion.div>
        </motion.div>
        
        <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        duration: 0.5,
        delay: 1.5
      }} className="absolute bottom-8">
          <button onClick={scrollToContent} className="text-white p-2 rounded-full border border-white/30 bg-white/10 hover:bg-white/20 transition-colors duration-300" aria-label="Scroll down">
            <ChevronDown className="animate-bounce" size={24} />
          </button>
        </motion.div>
      </div>
    </div>;
};
export default HeroSection;