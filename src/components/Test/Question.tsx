
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Lightbulb } from 'lucide-react';

interface QuestionProps {
  question: string;
  options: string[];
  imageUrl?: string;
  explanation?: string;
  onAnswer: (answer: string) => void;
}

const Question = ({ question, options, imageUrl, explanation, onAnswer }: QuestionProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  
  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    
    // Show explanation if available
    if (explanation) {
      setShowExplanation(true);
      
      // After a delay, proceed to the next question
      setTimeout(() => {
        onAnswer(option);
      }, 2500);
    } else {
      // No explanation, proceed immediately
      setTimeout(() => {
        onAnswer(option);
      }, 500);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto p-8 bg-card rounded-xl shadow-lg border border-border"
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
            className="w-full h-60 object-cover"
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
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full text-left p-4 rounded-lg transition-all duration-300 border ${
              selectedOption === option
                ? 'bg-gradient-to-r from-primary to-secondary text-white border-primary'
                : index === options.length - 1 
                  ? 'bg-card hover:bg-accent/10 border-accent/50' // Highlight the funny answer
                  : 'bg-card hover:bg-muted/50 border-border'
            }`}
          >
            {option}
            {index === options.length - 1 && (
              <span className="text-xs ml-2 text-accent">👑</span>
            )}
          </motion.button>
        ))}
      </div>
      
      {showExplanation && explanation && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/20"
        >
          <div className="flex items-start">
            <Lightbulb className="text-accent mr-2 flex-shrink-0 mt-1" size={20} />
            <p className="text-muted-foreground italic">{explanation}</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Question;
