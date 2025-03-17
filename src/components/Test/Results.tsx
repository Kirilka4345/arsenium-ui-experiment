
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ResultsProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

const Results = ({ score, totalQuestions, onRestart }: ResultsProps) => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="mb-8">
          <video 
            className="w-full max-w-md h-auto rounded-lg shadow-lg"
            autoPlay 
            muted 
            loop
          >
            <source src="https://media.tenor.com/Nkj7_lWM6eQAAAAd/loading.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <h3 className="text-2xl font-semibold mb-2">Обрабатываем результаты...</h3>
        <p className="text-muted-foreground">Пожалуйста, подождите</p>
      </div>
    );
  }
  
  const percentage = Math.round((score / totalQuestions) * 100);
  
  let resultText = "";
  let resultDescription = "";
  
  if (percentage >= 80) {
    resultText = "Отличный результат!";
    resultDescription = "Вы проявили исключительное понимание темы. Поздравляем!";
  } else if (percentage >= 60) {
    resultText = "Хороший результат!";
    resultDescription = "У вас хорошие знания по теме, но есть куда стремиться.";
  } else if (percentage >= 40) {
    resultText = "Средний результат";
    resultDescription = "У вас базовое понимание темы, но требуется дополнительное изучение.";
  } else {
    resultText = "Требуется улучшение";
    resultDescription = "Рекомендуем уделить больше времени изучению данной темы.";
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto p-8 bg-card rounded-xl shadow-lg text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
        className="w-32 h-32 mx-auto mb-6 rounded-full flex items-center justify-center bg-gradient-to-r from-primary to-secondary text-white text-3xl font-bold"
      >
        {percentage}%
      </motion.div>
      
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-2xl md:text-3xl font-bold mb-4"
      >
        {resultText}
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-muted-foreground mb-8"
      >
        {resultDescription}
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="p-6 bg-muted rounded-lg mb-8"
      >
        <p className="font-medium">Ваш результат: {score} правильных ответов из {totalQuestions}</p>
      </motion.div>
      
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onRestart}
        className="btn-primary"
      >
        Пройти тест снова
      </motion.button>
    </motion.div>
  );
};

export default Results;
