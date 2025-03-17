
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Layout from '../components/Layout/Layout';
import Question from '../components/Test/Question';
import Results from '../components/Test/Results';
import { Lightbulb, Brain, Laugh } from 'lucide-react';

interface QuestionType {
  id: number;
  question: string;
  options: string[];
  imageUrl?: string;
  explanation?: string;
}

const Test = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);
  
  // Fun questions about tech preferences and habits
  const questions: QuestionType[] = [
    {
      id: 1,
      question: "Что важнее при выборе процессора?",
      options: [
        "Количество ядер и частота", 
        "Цвет коробки и логотип", 
        "Цена и скидка", 
        "Чтобы Xeon было написано"
      ],
      imageUrl: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea",
      explanation: "Конечно, любой настоящий энтузиаст знает, что главное - это логотип Xeon!"
    },
    {
      id: 2,
      question: "Сколько мониторов нужно для счастья?",
      options: [
        "Один большой", 
        "Два стандартных", 
        "Три или больше", 
        "Они должны занимать всю стену"
      ],
      imageUrl: "https://images.unsplash.com/photo-1547119957-637f8679db1e",
      explanation: "Правильных ответов не существует, но если у вас меньше трех мониторов - вы еще не познали счастья!"
    },
    {
      id: 3,
      question: "Что делать, если код не работает?",
      options: [
        "Проверить на ошибки", 
        "Спросить в Stack Overflow", 
        "Перезагрузить компьютер", 
        "Обвинить компилятор"
      ],
      imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      explanation: "Настоящие программисты знают, что всегда виноват компилятор или интерпретатор!"
    },
    {
      id: 4,
      question: "Сколько времени нужно проводить за компьютером?",
      options: [
        "2-3 часа в день", 
        "5-6 часов в день", 
        "8-10 часов в день", 
        "Выключать компьютер нельзя никогда"
      ],
      explanation: "Правильный ответ: компьютер - это жизнь, сон переоценивают!"
    },
    {
      id: 5,
      question: "Как часто нужно обновлять компьютер?",
      options: [
        "Раз в 5 лет", 
        "Раз в 2-3 года", 
        "Ежегодно", 
        "При выходе любой новой детали"
      ],
      explanation: "Настоящие энтузиасты обновляют компьютер при малейшем анонсе новой детали!"
    },
    {
      id: 6,
      question: "Сколько игр в Steam считается нормальным?",
      options: [
        "10-20", 
        "50-100", 
        "200-500", 
        "Больше 1000, большинство не запускал"
      ],
      imageUrl: "https://images.unsplash.com/photo-1616677434756-4f6ed6f3c414",
      explanation: "Настоящий геймер покупает игры на распродажах и никогда в них не играет!"
    },
    {
      id: 7,
      question: "Какой язык программирования лучший?",
      options: [
        "Python", 
        "JavaScript", 
        "C++", 
        "Тот, на котором я пишу"
      ],
      explanation: "Истинное правило программиста: лучший язык - это тот, который ты используешь!"
    },
    {
      id: 8,
      question: "Сколько часов сна достаточно программисту?",
      options: [
        "8 часов как всем людям", 
        "6 часов вполне хватит", 
        "4 часа в рабочие дни", 
        "Сон для слабаков"
      ],
      explanation: "Сон для слабаков. Настоящие программисты работают на кофеине и энтузиазме!"
    }
  ];
  
  const handleAnswer = (answer: string) => {
    // Save the answer
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);
    
    // Increment score for funny answers (last options)
    if (answer === questions[currentQuestionIndex].options[3]) {
      setScore(score + 10); // Extra points for funny answers
    } else if (answer === questions[currentQuestionIndex].options[2]) {
      setScore(score + 5); // Medium points
    } else {
      setScore(score + 2); // Low points
    }
    
    // Move to next question or show results
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setShowResults(true);
      }
    }, 800);
  };
  
  const restartTest = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResults(false);
    setAnswers([]);
  };
  
  // Calculate Arseny similarity percentage
  const calculateArsenySimilarity = () => {
    const maxScore = questions.length * 10; // Maximum possible score
    const percentage = Math.min(100, Math.round((score / maxScore) * 100));
    return percentage;
  };
  
  return (
    <Layout>
      <div className="container-custom py-16">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h1 className="mb-4 hero-gradient">Тест "Насколько вы Арсений?"</h1>
          <p className="text-xl text-muted-foreground">
            Пройдите наш шуточный тест и узнайте, насколько ваши предпочтения похожи на Арсения!
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          {!showResults ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="w-full bg-muted rounded-full h-2 mb-6 overflow-hidden">
                <motion.div 
                  initial={{ width: "0%" }}
                  animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                  className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500"
                ></motion.div>
              </div>
              
              <div className="flex justify-between mb-8">
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2"
                >
                  <Lightbulb size={18} className="text-primary" />
                  <span>Вопрос {currentQuestionIndex + 1}/{questions.length}</span>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center space-x-2 bg-secondary/10 rounded-full px-4 py-2"
                >
                  <Brain size={18} className="text-secondary" />
                  <span>Очки: {score}</span>
                </motion.div>
              </div>
              
              <AnimatePresence mode="wait">
                <Question
                  key={currentQuestionIndex}
                  question={questions[currentQuestionIndex].question}
                  options={questions[currentQuestionIndex].options}
                  imageUrl={questions[currentQuestionIndex].imageUrl}
                  explanation={questions[currentQuestionIndex].explanation}
                  onAnswer={handleAnswer}
                />
              </AnimatePresence>
            </motion.div>
          ) : (
            <Results
              score={calculateArsenySimilarity()}
              totalQuestions={questions.length}
              onRestart={restartTest}
              customMessage={
                calculateArsenySimilarity() >= 80 
                  ? "Поздравляем! Вы практически Арсений! Возможно, вам тоже стоит задуматься о процессоре Xeon?"
                  : calculateArsenySimilarity() >= 50 
                    ? "Вы неплохо разбираетесь в мире Арсения! Еще немного практики и вы станете настоящим энтузиастом!"
                    : "Похоже, вам еще предстоит многое узнать о мире Арсения и его предпочтениях!"
              }
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Test;
