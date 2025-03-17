
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Rocket, Cpu, Code, Gamepad } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const funnyResponses = [
  "Конечно! А ты знаешь, что процессор Xeon стоит как моя почка?",
  "Мне нужна новая видеокарта... и новые друзья, которые будут мне завидовать!",
  "Я уже три дня не спал, пытаясь оптимизировать этот код!",
  "Да-да, у меня есть суперкомпьютер! По крайней мере, в моих мечтах...",
  "Это не баг, это фича! Я так задумал!",
  "Почему я не могу подключить 10 мониторов? Это дискриминация!",
  "БРРР! Моя клавиатура опять залипает от чипсов!",
  "Когда-нибудь я создам игру, которая будет лучше, чем Cyberpunk 2077!",
  "Мой код идеален! Просто компилятор меня не понимает...",
  "*звуки клавиатуры* Я ХАКЕР! *продолжает печатать*",
  "А ты пробовал перезагрузить?",
  "Мой любимый язык программирования? Конечно COBOL! ...шутка, я даже не знаю, что это такое."
];

const randomEmojis = ["🤖", "💻", "🎮", "🚀", "🔥", "⚡", "🤯", "🧠", "🤪", "😂"];

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Привет! Я чат-бот Арсений. Поговорим о компьютерах или играх?",
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
    
    // Play send sound
    const sendSound = new Audio("/message-sent.mp3");
    sendSound.play();
    
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
      // Play receive sound
      const receiveSound = new Audio("/message-received.mp3");
      receiveSound.play();
      
      const randomResponse = funnyResponses[Math.floor(Math.random() * funnyResponses.length)];
      const randomEmoji = randomEmojis[Math.floor(Math.random() * randomEmojis.length)];
      
      const botMessage: Message = {
        id: Date.now() + 1,
        text: `${randomEmoji} ${randomResponse}`,
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
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
  
  // Random bot icon selector
  const getBotIcon = () => {
    const icons = [<Bot size={16} />, <Rocket size={16} />, <Cpu size={16} />, <Code size={16} />, <Gamepad size={16} />];
    return icons[Math.floor(Math.random() * icons.length)];
  };
  
  return (
    <div className="flex flex-col h-[600px] max-h-[80vh] bg-card rounded-xl shadow-lg overflow-hidden border border-border relative">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 z-0"></div>
      
      <div className="p-4 bg-gradient-to-r from-primary to-secondary text-white flex items-center space-x-3 relative z-10">
        <motion.div
          animate={{ rotate: [0, 10, -10, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Bot size={24} />
        </motion.div>
        <h3 className="font-semibold">Чат-бот Арсений</h3>
      </div>
      
      <div className="flex-grow overflow-y-auto p-4 space-y-4 relative z-10">
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
                <motion.div 
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${message.isBot ? 'bg-primary text-white mr-2' : 'bg-secondary text-white ml-2'}`}
                >
                  {message.isBot ? getBotIcon() : <User size={16} />}
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`${message.isBot 
                    ? 'bg-gradient-to-r from-primary/10 to-primary/20 rounded-tl-none' 
                    : 'bg-gradient-to-r from-secondary/80 to-secondary rounded-tr-none'} 
                    rounded-2xl p-3 shadow-sm`}
                >
                  <p className={message.isBot ? 'text-foreground' : 'text-white'}>{message.text}</p>
                  <span className={`text-xs block mt-1 ${message.isBot ? 'text-muted-foreground' : 'text-white/70'}`}>
                    {formatTime(message.timestamp)}
                  </span>
                </motion.div>
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
                <motion.div 
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white mr-2 flex items-center justify-center"
                >
                  <Bot size={16} />
                </motion.div>
                
                <div className="bg-primary/10 rounded-2xl rounded-tl-none p-3 shadow-sm">
                  <div className="flex space-x-1">
                    <motion.div 
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
                      className="w-2 h-2 bg-primary rounded-full"
                    ></motion.div>
                    <motion.div 
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 0.6, delay: 0.2, repeat: Infinity, repeatType: "reverse" }}
                      className="w-2 h-2 bg-primary rounded-full"
                    ></motion.div>
                    <motion.div 
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 0.6, delay: 0.4, repeat: Infinity, repeatType: "reverse" }}
                      className="w-2 h-2 bg-primary rounded-full"
                    ></motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </AnimatePresence>
      </div>
      
      <div className="p-4 border-t border-border bg-card relative z-10">
        <div className="flex items-center space-x-2">
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Напишите сообщение..."
            className="flex-grow p-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSendMessage}
            disabled={inputText.trim() === ''}
            className={`p-3 rounded-lg ${
              inputText.trim() === '' 
                ? 'bg-muted text-muted-foreground' 
                : 'bg-gradient-to-r from-primary to-secondary text-white'
            } transition-all duration-300`}
          >
            <Send size={20} />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
