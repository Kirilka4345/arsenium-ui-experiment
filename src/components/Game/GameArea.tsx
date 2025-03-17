
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, MemoryStick, HardDrive, Fan, Maximize2, Trophy, Zap, Shield, Heart, Flame, Skull } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

interface GameObject {
  id: number;
  type: 'obstacle' | 'coin' | 'platform' | 'powerup' | 'enemy';
  position: { x: number; y: number };
  width: number;
  height: number;
  value?: number;
  coinType?: 'cpu' | 'ram' | 'ssd' | 'cooler';
  powerupType?: 'shield' | 'speed' | 'jump';
  velocity?: { x: number; y: number };
  isMoving?: boolean;
  movementRange?: number;
  movementDirection?: number;
}

interface CharacterState {
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  isJumping: boolean;
  isOnGround: boolean;
  hasShield: boolean;
  lives: number;
  jumpBoost: number;
  invincible: boolean;
}

const GAME_WIDTH = 800;
const GAME_HEIGHT = 400;
const GRAVITY = 0.6;
const BASE_JUMP_FORCE = -15;
const COIN_TYPES = ['cpu', 'ram', 'ssd', 'cooler'];
const POWERUP_TYPES = ['shield', 'speed', 'jump'];
const OBSTACLE_PHRASES = [
  "Ой-ой! Арсений запутался в проводах!",
  "Ба-бах! Арсений перепутал RAM и ROM!",
  "Упс! Арсений думал, что скачать RAM - это хорошая идея!",
  "Бум! Арсений подключил монитор к видеокарте... через HDMI в USB!",
  "Ай! Арсений пытался установить Windows на калькулятор!"
];

const GameArea = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [character, setCharacter] = useState<CharacterState>({
    position: { x: 100, y: GAME_HEIGHT - 100 },
    velocity: { x: 0, y: 0 },
    isJumping: false,
    isOnGround: true,
    hasShield: false,
    lives: 3,
    jumpBoost: 0,
    invincible: false
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
  const [combo, setCombo] = useState(0);
  const [comboTimer, setComboTimer] = useState<NodeJS.Timeout | null>(null);
  const [highScore, setHighScore] = useState(() => {
    const savedHighScore = localStorage.getItem('highScore');
    return savedHighScore ? parseInt(savedHighScore) : 0;
  });
  
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const gameLoopRef = useRef<number>();
  const objectGenIntervalRef = useRef<NodeJS.Timeout>();
  const distanceIntervalRef = useRef<NodeJS.Timeout>();
  const levelUpIntervalRef = useRef<NodeJS.Timeout>();
  const powerupTimerRef = useRef<NodeJS.Timeout | null>(null);
  const invincibilityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [gameSpeed, setGameSpeed] = useState(5);
  const [backgroundPos, setBackgroundPos] = useState(0);
  const [lastHitObstacleTime, setLastHitObstacleTime] = useState(0);
  const [showCombo, setShowCombo] = useState(false);
  
  const startGame = () => {
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    setDistance(0);
    setLevel(1);
    setGameSpeed(5);
    setCombo(0);
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
      isOnGround: true,
      hasShield: false,
      lives: 3,
      jumpBoost: 0,
      invincible: false
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
    }, 2000 - (level * 100 > 1500 ? 1500 : level * 100));
    
    distanceIntervalRef.current = setInterval(() => {
      setDistance(prevDistance => {
        if ((prevDistance + 1) % 100 === 0) {
          setScore(score => score + 10);
          
          // Show toast every 500 meters
          if ((prevDistance + 1) % 500 === 0) {
            toast({
              title: `${prevDistance + 1} метров пройдено!`,
              description: "Арсений: \"Я не знал, что компьютеры считают в метрах!\"",
              variant: "default",
            });
          }
        }
        return prevDistance + 1;
      });
    }, 100);
    
    levelUpIntervalRef.current = setInterval(() => {
      setLevel(prev => {
        const newLevel = prev + 1;
        const newSpeed = 5 + newLevel * 1.2;
        setGameSpeed(newSpeed);
        
        toast({
          title: `Уровень ${newLevel}!`,
          description: `Скорость увеличена до ${newSpeed.toFixed(1)}! Арсений: "Я не писал этот код!"`,
          variant: "default",
        });
        
        return newLevel;
      });
    }, 20000); // Level up every 20 seconds
    
    startGameLoop();
  };
  
  const generateGameObjects = () => {
    const newObjects: GameObject[] = [];
    
    // Generate platforms with varying width and gaps
    const platformWidth = Math.floor(Math.random() * 250) + (150 - level * 5);
    const platformGap = Math.floor(Math.random() * 150) + (100 + level * 10);
    const platformY = Math.random() > 0.6 ? GAME_HEIGHT - 20 : 
                     Math.random() > 0.5 ? GAME_HEIGHT - 120 : GAME_HEIGHT - 200;
    
    newObjects.push({
      id: Date.now() + 1,
      type: 'platform',
      position: { x: GAME_WIDTH, y: platformY },
      width: platformWidth,
      height: 20
    });
    
    // Add coins with higher chance on platforms that are not at ground level
    if (Math.random() < (platformY < GAME_HEIGHT - 30 ? 0.8 : 0.5)) {
      const coinType = COIN_TYPES[Math.floor(Math.random() * COIN_TYPES.length)] as 'cpu' | 'ram' | 'ssd' | 'cooler';
      const coinX = GAME_WIDTH + platformWidth / 2 - 12.5;
      const coinY = platformY - 40;
      
      newObjects.push({
        id: Date.now() + 2,
        type: 'coin',
        position: { x: coinX, y: coinY },
        width: 25,
        height: 25,
        value: coinType === 'cpu' ? 10 : 5,
        coinType
      });
    }
    
    // Add obstacles with increasing probability based on level
    if (Math.random() < (0.4 + level * 0.05 > 0.8 ? 0.8 : 0.4 + level * 0.05)) {
      const obstacleHeight = Math.floor(Math.random() * 40) + 30;
      const obstacleX = GAME_WIDTH + Math.floor(Math.random() * platformWidth * 0.7);
      
      newObjects.push({
        id: Date.now() + 3,
        type: 'obstacle',
        position: { x: obstacleX, y: platformY - obstacleHeight },
        width: 30,
        height: obstacleHeight
      });
    }
    
    // Add moving enemies on higher levels (3+)
    if (level >= 3 && Math.random() < 0.3) {
      const enemyY = platformY - 35;
      newObjects.push({
        id: Date.now() + 4,
        type: 'enemy',
        position: { x: GAME_WIDTH + platformWidth / 2, y: enemyY },
        width: 30,
        height: 30,
        isMoving: true,
        movementRange: 100,
        movementDirection: 1,
        velocity: { x: 2, y: 0 }
      });
    }
    
    // Add power-ups occasionally (more rare on higher levels)
    if (Math.random() < (0.15 - level * 0.01 > 0.05 ? 0.15 - level * 0.01 : 0.05)) {
      const powerupType = POWERUP_TYPES[Math.floor(Math.random() * POWERUP_TYPES.length)] as 'shield' | 'speed' | 'jump';
      newObjects.push({
        id: Date.now() + 5,
        type: 'powerup',
        position: { x: GAME_WIDTH + Math.random() * platformWidth, y: platformY - 60 },
        width: 30,
        height: 30,
        powerupType
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
    
    // Move background
    setBackgroundPos(prev => prev - gameSpeed * 0.5);
    
    // Update character
    setCharacter(prev => {
      // Calculate new velocity and position
      let newVelocityY = prev.isOnGround ? 0 : prev.velocity.y + GRAVITY;
      
      let isOnPlatform = false;
      let newPosition = {
        x: prev.position.x,
        y: prev.position.y + newVelocityY
      };
      
      // Check for platform collisions
      for (const obj of gameObjects) {
        if (obj.type === 'platform') {
          // Check if character will land on platform
          if (
            newPosition.y + 60 >= obj.position.y &&
            prev.position.y + 60 <= obj.position.y &&
            newPosition.x + 40 > obj.position.x &&
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
      
      // Check if character is on ground
      const isOnGround = isOnPlatform || newPosition.y >= GAME_HEIGHT - 80;
      
      // If character goes below ground, place back on ground
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
    
    // Update game objects
    setGameObjects(prev => {
      let updatedObjects = [...prev];
      
      // Handle each game object
      updatedObjects = updatedObjects.map(obj => {
        if (obj.type === 'enemy' && obj.isMoving) {
          // Handle moving enemies
          const newX = obj.position.x - gameSpeed;
          let newDirection = obj.movementDirection || 1;
          
          if (obj.movementRange) {
            const rangeLimit = 50;
            if (obj.velocity && Math.abs(obj.velocity.x) > 0) {
              if ((obj.velocity.x > 0 && obj.movementDirection === 1 && obj.position.x > obj.position.x + rangeLimit) ||
                  (obj.velocity.x < 0 && obj.movementDirection === -1 && obj.position.x < obj.position.x - rangeLimit)) {
                newDirection *= -1;
              }
            }
          }
          
          return {
            ...obj,
            position: {
              ...obj.position,
              x: newX + (obj.velocity?.x || 0) * newDirection
            },
            movementDirection: newDirection
          };
        }
        
        // Move all objects with game speed
        return {
          ...obj,
          position: {
            ...obj.position,
            x: obj.position.x - gameSpeed
          }
        };
      });
      
      // Filter out objects that are now off-screen
      return updatedObjects.filter(obj => obj.position.x + obj.width > -100);
    });
    
    checkCollisions();
  };
  
  const checkCollisions = () => {
    setGameObjects(prev => {
      const updatedObjects = [...prev];
      const characterRect = {
        x: character.position.x + 10,  // Adjust for visual hitbox
        y: character.position.y + 5,   // Adjust for visual hitbox
        width: 40,                     // Smaller hitbox for better gameplay feel
        height: 50                     // Smaller hitbox for better gameplay feel
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
            const baseValue = obj.value || 5;
            const comboMultiplier = combo > 0 ? combo * 0.2 + 1 : 1;
            const pointsEarned = Math.floor(baseValue * comboMultiplier);
            
            setScore(prev => prev + pointsEarned);
            
            // Update combo
            setCombo(prev => {
              const newCombo = prev + 1;
              setShowCombo(true);
              
              // Reset combo timer
              if (comboTimer) clearTimeout(comboTimer);
              
              const newTimer = setTimeout(() => {
                setCombo(0);
                setShowCombo(false);
              }, 2000);
              
              setComboTimer(newTimer);
              
              // Show combo toast for significant combos
              if (newCombo > 0 && newCombo % 5 === 0) {
                toast({
                  title: `Комбо x${newCombo}!`,
                  description: "Арсений: \"Я и не знал, что так умею!\"",
                  variant: "default",
                });
              }
              
              return newCombo;
            });
            
            if (obj.coinType) {
              setCollectedItems(prev => ({
                ...prev,
                [obj.coinType as string]: prev[obj.coinType as keyof typeof prev] + 1
              }));
              
              if (obj.coinType === 'cpu' && Math.random() > 0.7) {
                toast({
                  title: "Процессор Xeon!",
                  description: "Арсений: \"Теперь я смогу скачать больше RAM!\"",
                  variant: "default",
                });
              }
            }
            
            updatedObjects.splice(i, 1);
          } else if (obj.type === 'powerup') {
            if (obj.powerupType === 'shield') {
              setCharacter(prev => ({ ...prev, hasShield: true }));
              
              toast({
                title: "Щит активирован!",
                description: "Защита от одного препятствия!",
                variant: "default",
              });
              
              // Set timer to remove shield
              if (powerupTimerRef.current) clearTimeout(powerupTimerRef.current);
              powerupTimerRef.current = setTimeout(() => {
                setCharacter(prev => ({ ...prev, hasShield: false }));
              }, 15000);
            } else if (obj.powerupType === 'speed') {
              setGameSpeed(prev => prev - 3);
              
              toast({
                title: "Замедление времени!",
                description: "Арсений: \"Как в Матрице!\"",
                variant: "default",
              });
              
              // Set timer to reset speed
              if (powerupTimerRef.current) clearTimeout(powerupTimerRef.current);
              powerupTimerRef.current = setTimeout(() => {
                setGameSpeed(5 + level * 1.2);
              }, 5000);
            } else if (obj.powerupType === 'jump') {
              setCharacter(prev => ({ ...prev, jumpBoost: 5 }));
              
              toast({
                title: "Супер-прыжок!",
                description: "Арсений: \"Я как Супермен!\"",
                variant: "default",
              });
              
              // Set timer to reset jump boost
              if (powerupTimerRef.current) clearTimeout(powerupTimerRef.current);
              powerupTimerRef.current = setTimeout(() => {
                setCharacter(prev => ({ ...prev, jumpBoost: 0 }));
              }, 10000);
            }
            
            updatedObjects.splice(i, 1);
          } else if ((obj.type === 'obstacle' || obj.type === 'enemy') && !character.invincible) {
            // Current time for obstacle hit cooldown
            const currentTime = Date.now();
            if (currentTime - lastHitObstacleTime < 1000) {
              // Skip if hit recently (prevents multiple hits at once)
              continue;
            }
            setLastHitObstacleTime(currentTime);
            
            if (character.hasShield) {
              // Use shield instead of losing life
              setCharacter(prev => ({ ...prev, hasShield: false }));
              
              toast({
                title: "Щит использован!",
                description: "Арсений: \"Фух, еле успел!\"",
                variant: "default",
              });
              
              if (powerupTimerRef.current) {
                clearTimeout(powerupTimerRef.current);
                powerupTimerRef.current = null;
              }
              
              // Don't remove obstacle, just consume shield
            } else {
              // Lose a life and get temporary invincibility
              setCharacter(prev => ({ 
                ...prev, 
                lives: prev.lives - 1,
                invincible: true
              }));
              
              // Show random funny fail message
              const randomPhrase = OBSTACLE_PHRASES[Math.floor(Math.random() * OBSTACLE_PHRASES.length)];
              toast({
                title: `Потеряна жизнь! Осталось: ${character.lives - 1}`,
                description: randomPhrase,
                variant: "destructive",
              });
              
              // Set invincibility timer
              if (invincibilityTimerRef.current) {
                clearTimeout(invincibilityTimerRef.current);
              }
              invincibilityTimerRef.current = setTimeout(() => {
                setCharacter(prev => ({ ...prev, invincible: false }));
              }, 1500);
              
              // End game if no lives left
              if (character.lives <= 1) {
                endGame();
              }
              
              // Only remove enemy on collision, not obstacles
              if (obj.type === 'enemy') {
                updatedObjects.splice(i, 1);
              }
            }
          }
        }
      }
      
      return updatedObjects;
    });
  };
  
  const jump = () => {
    if (character.isOnGround && isPlaying && !gameOver) {
      const jumpForce = BASE_JUMP_FORCE - character.jumpBoost;
      setCharacter(prev => ({
        ...prev,
        velocity: { ...prev.velocity, y: jumpForce },
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
      
      toast({
        title: "Новый рекорд!",
        description: `Вы набрали ${score} очков!`,
        variant: "default",
      });
    }
    
    // Clear all intervals and timers
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
    
    if (powerupTimerRef.current) {
      clearTimeout(powerupTimerRef.current);
    }
    
    if (invincibilityTimerRef.current) {
      clearTimeout(invincibilityTimerRef.current);
    }
    
    if (comboTimer) {
      clearTimeout(comboTimer);
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
      // Clean up all timers and intervals
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
      
      if (powerupTimerRef.current) {
        clearTimeout(powerupTimerRef.current);
      }
      
      if (invincibilityTimerRef.current) {
        clearTimeout(invincibilityTimerRef.current);
      }
      
      if (comboTimer) {
        clearTimeout(comboTimer);
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
  
  const getPowerupIcon = (type: string) => {
    switch (type) {
      case 'shield':
        return <Shield className="text-blue-400" />;
      case 'speed':
        return <Zap className="text-purple-400" />;
      case 'jump':
        return <Flame className="text-orange-400" />;
      default:
        return <Shield className="text-blue-400" />;
    }
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <div className="text-xl font-semibold">Счет: {score}</div>
          <div className="text-md text-muted-foreground">Расстояние: {distance}м</div>
          {showCombo && combo > 1 && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-md bg-primary/20 text-primary px-3 py-1 rounded-full font-bold"
            >
              Комбо x{combo}
            </motion.div>
          )}
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
          <div className="text-sm">Скорость: {gameSpeed.toFixed(1)}</div>
        </div>
      </div>
      
      <div className="flex mb-2 space-x-2">
        {[...Array(character.lives)].map((_, index) => (
          <Heart 
            key={index} 
            className="text-red-500 drop-shadow-md" 
            fill="#ef4444" 
            size={24} 
          />
        ))}
      </div>
      
      <div 
        ref={gameAreaRef}
        onClick={jump}
        className="relative w-full h-[400px] bg-gradient-to-b from-muted/10 to-muted/30 rounded-lg border border-primary/20 overflow-hidden cursor-pointer shadow-inner"
        style={{ 
          width: '100%', 
          maxWidth: '800px', 
          margin: '0 auto',
          backgroundPosition: `${backgroundPos}px 0`,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%239C92AC\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")'
        }}
      >
        <motion.div
          className="game-character absolute"
          style={{
            left: character.position.x,
            top: character.position.y,
            transition: 'none'
          }}
          animate={{ 
            opacity: character.invincible ? [1, 0.5, 1] : 1,
            rotate: character.isJumping ? [0, 10, 0, -10, 0] : 0
          }}
          transition={{ 
            opacity: { duration: 0.2, repeat: character.invincible ? Infinity : 0 },
            rotate: { duration: 0.5, repeat: character.isJumping ? Infinity : 0 }
          }}
        >
          {/* More complex character model */}
          <div className="w-full h-full relative flex flex-col items-center justify-center">
            {/* Head */}
            <div className="w-40 h-40 absolute" style={{ top: '-30px', left: '-10px' }}>
              {/* Face */}
              <div className="absolute top-2 left-2 w-4 h-4 bg-white rounded-full"></div>
              <div className="absolute top-2 right-2 w-4 h-4 bg-white rounded-full"></div>
              
              {/* Confused expression */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-8 h-3 bg-white rounded-full"></div>
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 rotate-12 w-10 h-1 bg-white"></div>
              
              {/* "A" initial */}
              <div className="absolute top-1 left-1/2 transform -translate-x-1/2 text-xs text-white font-bold">А</div>
            </div>
            
            {/* Shield effect */}
            {character.hasShield && (
              <motion.div 
                className="absolute inset-0 rounded-lg border-2 border-blue-400"
                animate={{ 
                  boxShadow: ['0 0 5px 2px rgba(59, 130, 246, 0.5)', '0 0 15px 5px rgba(59, 130, 246, 0.7)', '0 0 5px 2px rgba(59, 130, 246, 0.5)'],
                  opacity: [0.7, 1, 0.7] 
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              />
            )}
            
            {/* Jump boost effect */}
            {character.jumpBoost > 0 && (
              <motion.div 
                className="absolute -bottom-5 left-0 right-0 flex justify-center"
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{ 
                  duration: 1, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              >
                <Flame className="text-orange-500" />
              </motion.div>
            )}
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
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Skull className="text-white/70" />
                  </div>
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
                  animate={{ 
                    rotate: 360, 
                    y: [0, -5, 0] 
                  }}
                  transition={{ 
                    rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                    y: { duration: 1, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  {obj.coinType && getCoinIcon(obj.coinType)}
                </motion.div>
              );
            } else if (obj.type === 'powerup') {
              return (
                <motion.div
                  key={`powerup-${obj.id}`}
                  className="absolute"
                  style={{
                    left: obj.position.x,
                    top: obj.position.y,
                    width: 30,
                    height: 30,
                    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, rgba(209, 213, 219, 0) 70%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'none'
                  }}
                  animate={{ 
                    scale: [1, 1.2, 1],
                    boxShadow: [
                      '0 0 5px 2px rgba(139, 92, 246, 0.3)',
                      '0 0 10px 5px rgba(139, 92, 246, 0.5)',
                      '0 0 5px 2px rgba(139, 92, 246, 0.3)'
                    ]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {obj.powerupType && getPowerupIcon(obj.powerupType)}
                </motion.div>
              );
            } else if (obj.type === 'enemy') {
              return (
                <motion.div
                  key={`enemy-${obj.id}`}
                  className="absolute flex items-center justify-center"
                  style={{
                    left: obj.position.x,
                    top: obj.position.y,
                    width: 30,
                    height: 30,
                    background: 'rgba(239, 68, 68, 0.7)',
                    borderRadius: '50%',
                    transition: 'none'
                  }}
                  animate={{ rotate: [0, 360] }}
                  transition={{ 
                    rotate: { duration: 3, repeat: Infinity, ease: "linear" }
                  }}
                >
                  <div className="w-4 h-4 bg-red-300 rounded-full"></div>
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
                <h3 className="text-2xl font-bold mb-2 hero-gradient">Компьютер Арсения перегрелся!</h3>
                <p className="text-muted-foreground mb-4">Арсений говорит: "Я не понимаю, почему он перегрелся. Я же установил цветную подсветку для охлаждения!"</p>
                
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
                  Собрать новый компьютер Арсения
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center max-w-md p-6 arseny-card"
              >
                <h3 className="text-2xl font-bold mb-4 hero-gradient">Супер-комп Арсения</h3>
                <p className="text-muted-foreground mb-2">
                  Арсений говорит: "Мне нужен процессор Xeon, потому что он звучит круто! А ещё RAM... много RAM... я думаю, чем больше, тем лучше!"
                </p>
                <p className="text-muted-foreground italic mb-6">
                  "Я слышал, что компьютеры бывают 64-битные! Значит мне нужно 64 SSD, верно?" - Арсений
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
                
                <div className="bg-muted/20 p-3 rounded-lg mb-6 text-left">
                  <h4 className="font-semibold mb-1">Улучшения в игре:</h4>
                  <ul className="text-sm text-muted-foreground list-disc pl-5">
                    <li>Собирайте щиты для защиты</li>
                    <li>Усилители прыжка помогут достичь высоких платформ</li>
                    <li>Замедление времени для сложных участков</li>
                    <li>Комбо-множитель для больших очков</li>
                  </ul>
                </div>
                
                <motion.button
                  onClick={startGame}
                  className="btn-primary w-full flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Cpu className="mr-2" />
                  Начать сборку компьютера Арсения
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
          <li>Получайте бонусы для особых способностей</li>
          <li>Избегайте препятствий и не падайте с платформ</li>
          <li>У вас есть 3 жизни, используйте их с умом!</li>
        </ul>
      </div>
    </div>
  );
};

export default GameArea;
