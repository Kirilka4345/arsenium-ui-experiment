
import { useState } from 'react';
import Layout from '../components/Layout/Layout';
import GameArea from '../components/Game/GameArea';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Trophy, Crown, Star } from 'lucide-react';

const Game = () => {
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  
  // Fake leaderboard data
  const leaderboard = [
    { name: "Арсений", score: 9999, rank: 1 },
    { name: "Геймер2000", score: 550, rank: 2 },
    { name: "Мастер", score: 420, rank: 3 },
    { name: "КодерБой", score: 370, rank: 4 },
    { name: "ПКэшник", score: 330, rank: 5 },
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
          <h1 className="mb-4 hero-gradient">Мини-игра Арсения</h1>
          <p className="text-xl text-muted-foreground">
            Помогите Арсению собрать все комплектующие для его мечты - суперкомпьютера!
          </p>
          
          <div className="flex justify-center mt-6 space-x-4">
            <Button 
              variant="outline" 
              onClick={() => setShowLeaderboard(!showLeaderboard)}
              className="group"
            >
              <Trophy className="mr-2 group-hover:text-yellow-500 transition-colors" />
              {showLeaderboard ? "Скрыть рекорды" : "Показать рекорды"}
            </Button>
          </div>
          
          {showLeaderboard && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-8 bg-card rounded-xl p-6 shadow-lg border border-border"
            >
              <h3 className="text-xl font-bold mb-4 flex items-center justify-center">
                <Crown className="text-yellow-500 mr-2" /> Таблица рекордов
              </h3>
              <div className="space-y-3">
                {leaderboard.map((player, index) => (
                  <motion.div 
                    key={index}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex justify-between items-center p-3 rounded-lg ${
                      index === 0 ? "bg-gradient-to-r from-yellow-500/20 to-yellow-300/20 border border-yellow-500/30" : "bg-muted/50"
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                        {index === 0 ? <Crown className="text-yellow-500" /> : <Star className="text-primary" />}
                      </div>
                      <span className="font-medium">{player.name}</span>
                    </div>
                    <span className="text-secondary font-bold">{player.score}</span>
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
          <div className="bg-card p-8 rounded-xl shadow-md border border-border">
            <h2 className="text-2xl font-semibold mb-4">О игре</h2>
            <p className="text-muted-foreground mb-4">
              В этой игре вы играете за Арсения, который мечтает о суперкомпьютере. Ваша задача — собрать все комплектующие, избегая препятствий на пути.
              Чем дольше вы продержитесь, тем выше будет ваш счёт!
            </p>
            <p className="text-muted-foreground">
              Используйте пробел или стрелку вверх для прыжка. На мобильных устройствах просто нажмите на экран.
              Соберите процессор Xeon для бонусных очков!
            </p>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Game;
