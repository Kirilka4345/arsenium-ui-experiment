
import { useState } from 'react';
import Layout from '../components/Layout/Layout';
import GameArea from '../components/Game/GameArea';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Trophy, Crown, Star, Cpu, Zap, BrainCircuit } from 'lucide-react';

const Game = () => {
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  
  // Fake leaderboard data with funny names
  const leaderboard = [
    { name: "Арсений", score: 9999, rank: 1, comment: "Случайно нажал все кнопки сразу" },
    { name: "ПрофессорКомп", score: 550, rank: 2, comment: "Знает, что делает" },
    { name: "НоутбукМастер", score: 420, rank: 3, comment: "Путает RAM с ROM" },
    { name: "КодерБой", score: 370, rank: 4, comment: "Думает, что HTML это язык программирования" },
    { name: "ТехноАрсений", score: 330, rank: 5, comment: "Скачал больше оперативки" },
  ];
  
  return (
    <Layout>
      <div className="container-custom py-16">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h1 className="mb-4 hero-gradient">Супер-пупер Мини-игра Арсения</h1>
          <p className="text-xl text-muted-foreground">
            Помогите Арсению, который не особо понимает в компьютерах, собрать все комплектующие для его мечты - "супер-компьютера на базе Xeon"!
          </p>
          <p className="text-md text-muted-foreground mt-2">
            Он думает, что если собрать все детали, то сможет <i>скачать больше оперативной памяти</i>.
          </p>
          
          <div className="flex justify-center mt-6 space-x-4">
            <Button 
              variant="outline" 
              onClick={() => setShowLeaderboard(!showLeaderboard)}
              className="group"
            >
              <Trophy className="mr-2 group-hover:text-yellow-500 transition-colors" />
              {showLeaderboard ? "Скрыть таблицу лидеров" : "Показать таблицу лидеров"}
            </Button>
          </div>
          
          {showLeaderboard && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-8 bg-gradient-to-br from-card/70 to-card/30 rounded-xl p-6 shadow-lg border border-primary/20"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center justify-center">
                <Crown className="text-yellow-500 mr-2" /> Таблица лидеров по сборке компьютера
              </h3>
              <div className="space-y-3">
                {leaderboard.map((player, index) => (
                  <motion.div 
                    key={index}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex flex-col md:flex-row md:justify-between items-start md:items-center p-3 rounded-lg ${
                      index === 0 ? "bg-gradient-to-r from-yellow-500/20 to-yellow-300/20 border border-yellow-500/30" : "bg-muted/50"
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                        {index === 0 ? <Crown className="text-yellow-500" /> : <Star className="text-primary" />}
                      </div>
                      <span className="font-medium">{player.name}</span>
                    </div>
                    <div className="flex items-center mt-2 md:mt-0">
                      <span className="text-xs text-muted-foreground italic mr-4">{player.comment}</span>
                      <span className="text-secondary font-bold">{player.score}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
        
        <GameArea />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-4xl mx-auto mt-16"
        >
          <div className="bg-gradient-to-br from-card/70 to-card/30 p-8 rounded-xl shadow-md border border-primary/20">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <BrainCircuit className="mr-2 text-primary" /> 
              О игре и Арсении-"программисте"
            </h2>
            <p className="text-muted-foreground mb-4">
              В этой игре вы играете за Арсения, который мечтает о "супер-компьютере", хотя плохо понимает как он работает. 
              Ваша задача — собрать все комплектующие, избегая препятствий, которые Арсений называет "багами в его коде".
            </p>
            <p className="text-muted-foreground mb-4">
              <span className="text-secondary font-semibold">ОСТОРОЖНО:</span> Игра становится сложнее с каждым уровнем! Арсений случайно перепутал переменные в своем коде, и теперь скорость увеличивается быстрее, чем он ожидал!
            </p>
            <p className="text-muted-foreground">
              Используйте <kbd className="px-2 py-1 bg-muted rounded text-xs">пробел</kbd> или <kbd className="px-2 py-1 bg-muted rounded text-xs">стрелку вверх</kbd> для прыжка. На мобильных устройствах просто нажмите на экран.
              Соберите процессор Xeon для бонусных очков! Арсений думает, что он сможет майнить биткоины, если соберет достаточно процессоров.
            </p>
            
            <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-primary/10">
              <h3 className="font-semibold mb-2 flex items-center">
                <Zap className="mr-2 text-yellow-500" />
                Цитата Арсения:
              </h3>
              <p className="italic text-muted-foreground">
                "Я почти уверен, что если собрать достаточно оперативок, то компьютер будет работать быстрее. А ещё я слышал, что Xeon - это какая-то крутая штука, поэтому хочу себе три штуки... или четыре? А они поместятся в мой корпус от старого Pentium?"
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Game;
