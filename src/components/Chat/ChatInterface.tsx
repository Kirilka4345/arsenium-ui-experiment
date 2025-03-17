
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Привет! Я чат-бот. Как я могу помочь вам сегодня?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = () => {
    if (inputText.trim() === '') return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);
    
    // Simulate bot response after a delay
    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now() + 1,
        text: generateBotResponse(inputText),
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };
  
  const generateBotResponse = (input: string): string => {
    const lowercaseInput = input.toLowerCase();
    
    if (lowercaseInput.includes('привет')) {
      return 'Привет! Как я могу помочь вам сегодня?';
    }
    
    if (lowercaseInput.includes('как дела') || lowercaseInput.includes('как ты')) {
      return 'У меня всё хорошо, спасибо! Я всегда готов помочь.';
    }
    
    if (lowercaseInput.includes('кто ты')) {
      return 'Я чат-бот, созданный для демонстрации возможностей сайта.';
    }
    
    if (lowercaseInput.includes('игра') || lowercaseInput.includes('поиграть')) {
      return 'На нашем сайте есть мини-игра. Вы можете поиграть в неё на странице "Игра".';
    }
    
    if (lowercaseInput.includes('тест')) {
      return 'У нас есть интерактивный тест на странице "Тест". Попробуйте его пройти!';
    }
    
    // Default responses
    const defaultResponses = [
      'Интересно. Расскажите подробнее об этом.',
      'Я понимаю. Чем ещё я могу помочь?',
      'Это очень интересная тема. Что вы хотели бы узнать ещё?',
      'Я продолжаю учиться. Спасибо за ваше сообщение!',
      'Хотели бы вы узнать о других функциях нашего сайта?'
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className="flex flex-col h-[600px] max-h-[80vh] bg-card rounded-xl shadow-lg overflow-hidden border border-border">
      <div className="p-4 bg-primary text-white flex items-center space-x-3">
        <Bot size={24} />
        <h3 className="font-semibold">Чат-бот</h3>
      </div>
      
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map(message => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
            >
              <div className={`flex max-w-[80%] ${message.isBot ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${message.isBot ? 'bg-primary text-white mr-2' : 'bg-secondary text-white ml-2'}`}>
                  {message.isBot ? <Bot size={16} /> : <User size={16} />}
                </div>
                
                <div className={`${message.isBot 
                  ? 'bg-muted rounded-tl-none' 
                  : 'bg-primary text-white rounded-tr-none'} 
                  rounded-2xl p-3 shadow-sm`}
                >
                  <p>{message.text}</p>
                  <span className={`text-xs block mt-1 ${message.isBot ? 'text-muted-foreground' : 'text-white/70'}`}>
                    {formatTime(message.timestamp)}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex max-w-[80%] flex-row">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white mr-2 flex items-center justify-center">
                  <Bot size={16} />
                </div>
                
                <div className="bg-muted rounded-2xl rounded-tl-none p-3 shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </AnimatePresence>
      </div>
      
      <div className="p-4 border-t border-border bg-card">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Напишите сообщение..."
            className="flex-grow p-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <button
            onClick={handleSendMessage}
            disabled={inputText.trim() === ''}
            className={`p-3 rounded-lg ${
              inputText.trim() === '' 
                ? 'bg-muted text-muted-foreground' 
                : 'bg-primary text-white'
            } transition-colors duration-300`}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
