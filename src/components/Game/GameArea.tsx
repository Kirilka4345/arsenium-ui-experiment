import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, MemoryStick, HardDrive, Fan, Maximize2, Trophy } from 'lucide-react';

interface GameObject {
  id: number;
  type: 'obstacle' | 'coin' | 'platform';
  position: { x: number; y: number };
  width: number;
  height: number;
  value?: number;
  coinType?: 'cpu' | 'ram' | 'ssd' | 'cooler';
}

interface CharacterState {
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  isJumping: boolean;
  isOnGround: boolean;
}

const GAME_WIDTH = 800;
const GAME_HEIGHT = 400;
const GRAVITY = 0.6;
const JUMP_FORCE = -15;
const COIN_TYPES = ['cpu', 'ram', 'ssd', 'cooler'];

const GameArea = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [character, setCharacter] = useState<CharacterState>({
    position: { x: 100, y: GAME_HEIGHT - 100 },
    velocity: { x: 0, y: 0 },
    isJumping: false,
    isOnGround: true
  });
  const [gameObjects, setGameObjects] = useState<GameObject[]>([]);
  const [score, setScore] = useState(0);
  const [distance, setDistance] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [level, setLevel] = useState(1);
  const [collectedItems, setCollectedItems] = useState({
    cpu: 0,
    ram: 0,
    ssd: 0,
    cooler: 0
  });
  const [highScore, setHighScore] = useState(() => {
    const savedHighScore = localStorage.getItem('highScore');
    return savedHighScore ? parseInt(savedHighScore) : 0;
  });
  
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const gameLoopRef = useRef<number>();
  const objectGenIntervalRef = useRef<NodeJS.Timeout>();
  const distanceIntervalRef = useRef<NodeJS.Timeout>();
  const levelUpIntervalRef = useRef<NodeJS.Timeout>();
  const [gameSpeed, setGameSpeed] = useState(5);
  
  const startGame = () => {
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    setDistance(0);
    setLevel(1);
    setGameSpeed(5);
    setCollectedItems({
      cpu: 0,
      ram: 0,
      ssd: 0,
      cooler: 0
    });
    setCharacter({
      position: { x: 100, y: GAME_HEIGHT - 100 },
      velocity: { x: 0, y: 0 },
      isJumping: false,
      isOnGround: true
    });
    setGameObjects([
      {
        id: Date.now(),
        type: 'platform',
        position: { x: 0, y: GAME_HEIGHT - 20 },
        width: GAME_WIDTH,
        height: 20
      }
    ]);
    
    objectGenIntervalRef.current = setInterval(() => {
      generateGameObjects();
    }, 2000);
    
    distanceIntervalRef.current = setInterval(() => {
      setDistance(prevDistance => {
        if ((prevDistance + 1) % 100 === 0) {
          setScore(score => score + 10);
        }
        return prevDistance + 1;
      });
    }, 100);
    
    levelUpIntervalRef.current = setInterval(() => {
      setLevel(prev => {
        const newLevel = prev + 1;
        setGameSpeed(5 + newLevel);
        return newLevel;
      });
    }, 30000);
    
    startGameLoop();
  };
  
  const generateGameObjects = () => {
    const newObjects: GameObject[] = [];
    
    const platformWidth = Math.floor(Math.random() * 300) + 100;
    const platformGap = Math.floor(Math.random() * 200) + 100;
    const platformY = Math.random() > 0.5 ? GAME_HEIGHT - 20 : GAME_HEIGHT - 120;
    
    newObjects.push({
      id: Date.now() + 1,
      type: 'platform',
      position: { x: GAME_WIDTH, y: platformY },
      width: platformWidth,
      height: 20
    });
    
    if (Math.random() < 0.7) {
      const coinType = COIN_TYPES[Math.floor(Math.random() * COIN_TYPES.length)] as 'cpu' | 'ram' | 'ssd' | 'cooler';
      newObjects.push({
        id: Date.now() + 2,
        type: 'coin',
        position: { 
          x: GAME_WIDTH + platformWidth / 2, 
          y: platformY - 40
        },
        width: 30,
        height: 30,
        value: 5,
        coinType
      });
    }
    
    if (Math.random() < 0.5) {
      const obstacleHeight = Math.floor(Math.random() * 30) + 30;
      newObjects.push({
        id: Date.now() + 3,
        type: 'obstacle',
        position: { 
          x: GAME_WIDTH + Math.floor(Math.random() * platformWidth), 
          y: platformY - obstacleHeight
        },
        width: 30,
        height: obstacleHeight
      });
    }
    
    setGameObjects(prev => [...prev, ...newObjects]);
  };
  
  const startGameLoop = () => {
    const gameLoop = () => {
      updateGameState();
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };
    gameLoopRef.current = requestAnimationFrame(gameLoop);
  };
  
  const updateGameState = () => {
    if (!isPlaying || gameOver) return;
    
    setCharacter(prev => {
      let newVelocityY = prev.isOnGround ? 0 : prev.velocity.y + GRAVITY;
      
      let isOnPlatform = false;
      let newPosition = {
        x: prev.position.x,
        y: prev.position.y + newVelocityY
      };
      
      for (const obj of gameObjects) {
        if (obj.type === 'platform') {
          if (
            newPosition.y + 60 >= obj.position.y &&
            prev.position.y + 60 <= obj.position.y &&
            newPosition.x + 60 > obj.position.x &&
            newPosition.x < obj.position.x + obj.width &&
            newVelocityY > 0
          ) {
            newPosition.y = obj.position.y - 60;
            newVelocityY = 0;
            isOnPlatform = true;
            break;
          }
        }
      }
      
      const isOnGround = isOnPlatform || newPosition.y >= GAME_HEIGHT - 80;
      
      if (newPosition.y > GAME_HEIGHT - 80) {
        newPosition.y = GAME_HEIGHT - 80;
        newVelocityY = 0;
      }
      
      return {
        ...prev,
        position: newPosition,
        velocity: { ...prev.velocity, y: newVelocityY },
        isOnGround: isOnGround,
        isJumping: !isOnGround
      };
    });
    
    setGameObjects(prev => {
      const updatedObjects = prev
        .map(obj => ({
          ...obj,
          position: {
            ...obj.position,
            x: obj.position.x - gameSpeed
          }
        }))
        .filter(obj => obj.position.x + obj.width > -100);
      
      return updatedObjects;
    });
    
    checkCollisions();
  };
  
  const checkCollisions = () => {
    setGameObjects(prev => {
      const updatedObjects = [...prev];
      const characterRect = {
        x: character.position.x,
        y: character.position.y,
        width: 60,
        height: 60
      };
      
      for (let i = updatedObjects.length - 1; i >= 0; i--) {
        const obj = updatedObjects[i];
        const objRect = {
          x: obj.position.x,
          y: obj.position.y,
          width: obj.width,
          height: obj.height
        };
        
        if (
          characterRect.x < objRect.x + objRect.width &&
          characterRect.x + characterRect.width > objRect.x &&
          characterRect.y < objRect.y + objRect.height &&
          characterRect.y + characterRect.height > objRect.y
        ) {
          if (obj.type === 'coin') {
            setScore(prev => prev + (obj.value || 5));
            
            if (obj.coinType) {
              setCollectedItems(prev => ({
                ...prev,
                [obj.coinType as string]: prev[obj.coinType as keyof typeof prev] + 1
              }));
            }
            
            updatedObjects.splice(i, 1);
          } else if (obj.type === 'obstacle') {
            endGame();
          }
        }
      }
      
      return updatedObjects;
    });
  };
  
  const jump = () => {
    if (character.isOnGround && isPlaying && !gameOver) {
      setCharacter(prev => ({
        ...prev,
        velocity: { ...prev.velocity, y: JUMP_FORCE },
        isJumping: true,
        isOnGround: false
      }));
    }
  };
  
  const endGame = () => {
    setIsPlaying(false);
    setGameOver(true);
    
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('highScore', score.toString());
    }
    
    if (objectGenIntervalRef.current) {
      clearInterval(objectGenIntervalRef.current);
    }
    
    if (distanceIntervalRef.current) {
      clearInterval(distanceIntervalRef.current);
    }
    
    if (levelUpIntervalRef.current) {
      clearInterval(levelUpIntervalRef.current);
    }
    
    if (gameLoopRef.current) {
      cancelAnimationFrame(gameLoopRef.current);
    }
  };
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.code === 'Space' || e.key === 'ArrowUp') && isPlaying) {
        jump();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [character.isOnGround, isPlaying, gameOver]);
  
  useEffect(() => {
    return () => {
      if (objectGenIntervalRef.current) {
        clearInterval(objectGenIntervalRef.current);
      }
      
      if (distanceIntervalRef.current) {
        clearInterval(distanceIntervalRef.current);
      }
      
      if (levelUpIntervalRef.current) {
        clearInterval(levelUpIntervalRef.current);
      }
      
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, []);
  
  const getCoinIcon = (type: string) => {
    switch (type) {
      case 'cpu':
        return <Cpu className="text-yellow-400" />;
      case 'ram':
        return <MemoryStick className="text-blue-400" />;
      case 'ssd':
        return <HardDrive className="text-green-400" />;
      case 'cooler':
        return <Fan className="text-red-400" />;
      default:
        return <Cpu className="text-yellow-400" />;
    }
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <div className="text-xl font-semibold">Счет: {score}</div>
          <div className="text-md text-muted-foreground">Расстояние: {distance}м</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="text-md bg-muted px-3 py-1 rounded-full">Уровень: {level}</div>
          <div className="text-xl font-semibold flex items-center">
            <Trophy className="text-yellow-400 mr-2" />
            {highScore}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-5 gap-2 mb-4">
        <div className="arseny-card flex flex-col items-center p-2">
          <Cpu className="text-primary mb-1" />
          <div className="text-sm">CPU: {collectedItems.cpu}</div>
        </div>
        <div className="arseny-card flex flex-col items-center p-2">
          <MemoryStick className="text-secondary mb-1" />
          <div className="text-sm">RAM: {collectedItems.ram}</div>
        </div>
        <div className="arseny-card flex flex-col items-center p-2">
          <HardDrive className="text-accent mb-1" />
          <div className="text-sm">SSD: {collectedItems.ssd}</div>
        </div>
        <div className="arseny-card flex flex-col items-center p-2">
          <Fan className="text-destructive mb-1" />
          <div className="text-sm">Кулер: {collectedItems.cooler}</div>
        </div>
        <div className="arseny-card flex flex-col items-center p-2">
          <Maximize2 className="text-primary mb-1" />
          <div className="text-sm">Скорость: {gameSpeed}</div>
        </div>
      </div>
      
      <div 
        ref={gameAreaRef}
        onClick={jump}
        className="relative w-full h-[400px] bg-muted/30 rounded-lg border border-primary/20 overflow-hidden cursor-pointer shadow-inner"
        style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}
      >
        <motion.div
          className="game-character absolute"
          style={{
            left: character.position.x,
            top: character.position.y,
            transition: 'none'
          }}
        >
          <div className="w-full h-full relative flex flex-col items-center justify-center">
            <div className="absolute top-2 left-2 w-3 h-3 bg-white rounded-full"></div>
            <div className="absolute top-2 right-2 w-3 h-3 bg-white rounded-full"></div>
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-white rounded-full"></div>
            <div className="absolute top-1 left-1/2 transform -translate-x-1/2 text-xs text-white font-bold">A</div>
          </div>
        </motion.div>
        
        <AnimatePresence>
          {gameObjects.map((obj) => {
            if (obj.type === 'platform') {
              return (
                <motion.div
                  key={`platform-${obj.id}`}
                  className="game-platform absolute"
                  style={{
                    left: obj.position.x,
                    top: obj.position.y,
                    width: obj.width,
                    transition: 'none'
                  }}
                />
              );
            } else if (obj.type === 'obstacle') {
              return (
                <motion.div
                  key={`obstacle-${obj.id}`}
                  className="game-obstacle absolute"
                  style={{
                    left: obj.position.x,
                    top: obj.position.y,
                    height: obj.height,
                    transition: 'none'
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-50">⚠️</div>
                </motion.div>
              );
            } else if (obj.type === 'coin') {
              return (
                <motion.div
                  key={`coin-${obj.id}`}
                  className="game-coin absolute flex items-center justify-center"
                  style={{
                    left: obj.position.x,
                    top: obj.position.y,
                    transition: 'none'
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  {obj.coinType && getCoinIcon(obj.coinType)}
                </motion.div>
              );
            }
            return null;
          })}
        </AnimatePresence>
        
        {!isPlaying && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center">
            {gameOver ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center max-w-md p-6 arseny-card"
              >
                <h3 className="text-2xl font-bold mb-2 hero-gradient">Компьютер перегрелся!</h3>
                <p className="text-muted-foreground mb-4">Вы собрали компоненты для компьютера Арсения, но наткнулись на препятствие!</p>
                
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="flex flex-col items-center p-2 bg-muted/50 rounded-lg">
                    <Cpu className="text-primary mb-1" />
                    <div>CPU: {collectedItems.cpu}</div>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-muted/50 rounded-lg">
                    <MemoryStick className="text-secondary mb-1" />
                    <div>RAM: {collectedItems.ram}</div>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-muted/50 rounded-lg">
                    <HardDrive className="text-accent mb-1" />
                    <div>SSD: {collectedItems.ssd}</div>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-muted/50 rounded-lg">
                    <Fan className="text-destructive mb-1" />
                    <div>Кулер: {collectedItems.cooler}</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <span className="block text-sm text-muted-foreground">Счет</span>
                    <span className="text-2xl font-bold">{score}</span>
                  </div>
                  <div>
                    <span className="block text-sm text-muted-foreground">Рекорд</span>
                    <span className="text-2xl font-bold">{highScore}</span>
                  </div>
                  <div>
                    <span className="block text-sm text-muted-foreground">Уровень</span>
                    <span className="text-2xl font-bold">{level}</span>
                  </div>
                </div>
                
                <motion.button
                  onClick={startGame}
                  className="btn-primary w-full flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Cpu className="mr-2" />
                  Собрать новый компьютер
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center max-w-md p-6 arseny-card"
              >
                <h3 className="text-2xl font-bold mb-4 hero-gradient">Соберите компьютер мечты Арсения</h3>
                <p className="text-muted-foreground mb-6">
                  Помогите Арсению собрать компоненты для его идеального компьютера на базе процессора Xeon. Избегайте препятствий и собирайте детали!
                </p>
                
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="flex items-center p-2 bg-muted/50 rounded-lg">
                    <Cpu className="text-primary mr-2" />
                    <div>Процессор Xeon</div>
                  </div>
                  <div className="flex items-center p-2 bg-muted/50 rounded-lg">
                    <MemoryStick className="text-secondary mr-2" />
                    <div>Оперативная память</div>
                  </div>
                  <div className="flex items-center p-2 bg-muted/50 rounded-lg">
                    <HardDrive className="text-accent mr-2" />
                    <div>SSD накопитель</div>
                  </div>
                  <div className="flex items-center p-2 bg-muted/50 rounded-lg">
                    <Fan className="text-destructive mr-2" />
                    <div>Система охлаждения</div>
                  </div>
                </div>
                
                <motion.button
                  onClick={startGame}
                  className="btn-primary w-full flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Cpu className="mr-2" />
                  Начать сборку компьютера
                </motion.button>
              </motion.div>
            )}
          </div>
        )}
      </div>
      
      <div className="mt-6 p-4 neo-card">
        <h3 className="font-semibold mb-2">Управление:</h3>
        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
          <li>Нажмите <kbd className="px-2 py-1 bg-muted rounded text-xs">Пробел</kbd> или <kbd className="px-2 py-1 bg-muted rounded text-xs">↑</kbd> чтобы прыгать</li>
          <li>Коснитесь экрана для прыжка на мобильных устройствах</li>
          <li>Собирайте компоненты компьютера для очков</li>
          <li>Избегайте препятствий и не падайте с платформ</li>
          <li>Скорость будет увеличиваться с каждым уровнем</li>
        </ul>
      </div>
    </div>
  );
};

export default GameArea;
