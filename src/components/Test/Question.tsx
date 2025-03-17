
import { motion } from 'framer-motion';
import { useState } from 'react';

interface QuestionProps {
  question: string;
  options: string[];
  imageUrl?: string;
  onAnswer: (answer: string) => void;
}

const Question = ({ question, options, imageUrl, onAnswer }: QuestionProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setTimeout(() => {
      onAnswer(option);
    }, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto p-8 bg-card rounded-xl shadow-lg"
    >
      <h3 className="text-2xl font-semibold mb-6 text-center">{question}</h3>
      
      {imageUrl && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 rounded-lg overflow-hidden shadow-md"
        >
          <img 
            src={imageUrl} 
            alt="Question illustration" 
            className="w-full h-auto object-cover"
          />
        </motion.div>
      )}
      
      <div className="space-y-4">
        {options.map((option, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
            onClick={() => handleOptionClick(option)}
            disabled={selectedOption !== null}
            className={`w-full text-left p-4 rounded-lg transition-all duration-300 border ${
              selectedOption === option
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-card hover:bg-muted/50 border-border'
            }`}
          >
            {option}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default Question;
