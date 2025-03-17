
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout/Layout';
import Question from '../components/Test/Question';
import Results from '../components/Test/Results';

interface QuestionType {
  id: number;
  question: string;
  options: string[];
  imageUrl?: string;
  correctAnswer: string;
}

const Test = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);
  
  // Sample questions - replace with your actual questions
  const questions: QuestionType[] = [
    {
      id: 1,
      question: "Вопрос 1: Какой из этих цветов чаще всего ассоциируется с аутизмом?",
      options: ["Красный", "Синий", "Зеленый", "Желтый"],
      imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      correctAnswer: "Синий"
    },
    {
      id: 2,
      question: "Вопрос 2: Что из перечисленного может быть признаком аутизма?",
      options: [
        "Избегание зрительного контакта", 
        "Чрезмерная общительность", 
        "Боязнь высоты", 
        "Любовь к спорту"
      ],
      imageUrl: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
      correctAnswer: "Избегание зрительного контакта"
    },
    {
      id: 3,
      question: "Вопрос 3: Аутизм — это:",
      options: [
        "Психическое заболевание", 
        "Нарушение развития нервной системы", 
        "Вирусная инфекция", 
        "Генетическое заболевание крови"
      ],
      imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      correctAnswer: "Нарушение развития нервной системы"
    },
    {
      id: 4,
      question: "Вопрос 4: Что НЕ характерно для людей с аутизмом?",
      options: [
        "Особые интересы", 
        "Агрессия к окружающим", 
        "Сложности в социальном взаимодействии", 
        "Повторяющееся поведение"
      ],
      correctAnswer: "Агрессия к окружающим"
    },
    {
      id: 5,
      question: "Вопрос 5: Какой месяц является месяцем информирования об аутизме?",
      options: ["Январь", "Апрель", "Июнь", "Октябрь"],
      correctAnswer: "Апрель"
    }
  ];
  
  const handleAnswer = (answer: string) => {
    // Save the answer
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);
    
    // Check if answer is correct
    if (answer === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
    
    // Move to next question or show results
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setShowResults(true);
      }
    }, 500);
  };
  
  const restartTest = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResults(false);
    setAnswers([]);
  };
  
  return (
    <Layout>
      <div className="container-custom py-16">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="mb-4">Тест на знание об аутизме</h1>
          <p className="text-xl text-muted-foreground">
            Проверьте свои знания о расстройствах аутистического спектра
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {!showResults ? (
            <div className="mb-8">
              <div className="w-full bg-muted rounded-full h-2 mb-6">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-500"
                  style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
              
              <div className="text-right mb-8">
                <span className="text-muted-foreground">
                  Вопрос {currentQuestionIndex + 1} из {questions.length}
                </span>
              </div>
              
              <AnimatePresence mode="wait">
                <Question
                  key={currentQuestionIndex}
                  question={questions[currentQuestionIndex].question}
                  options={questions[currentQuestionIndex].options}
                  imageUrl={questions[currentQuestionIndex].imageUrl}
                  onAnswer={handleAnswer}
                />
              </AnimatePresence>
            </div>
          ) : (
            <Results
              score={score}
              totalQuestions={questions.length}
              onRestart={restartTest}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Test;
