
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Obstacle {
  id: number;
  position: number;
}

const GameArea = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [character, setCharacter] = useState({
    y: 0,
    isJumping: false
  });
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(() => {
    const savedHighScore = localStorage.getItem('highScore');
    return savedHighScore ? parseInt(savedHighScore) : 0;
  });
  
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  const obstacleIntervalRef = useRef<NodeJS.Timeout>();
  const scoreIntervalRef = useRef<NodeJS.Timeout>();
  
  // Start the game
  const startGame = () => {
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    setObstacles([]);
    setCharacter({
      y: 0,
      isJumping: false
    });
    
    // Create obstacles at random intervals
    obstacleIntervalRef.current = setInterval(() => {
      setObstacles(prev => [
        ...prev,
        { id: Date.now(), position: 100 } // Start at 100% (right side)
      ]);
    }, 1500);
    
    // Increment score
    scoreIntervalRef.current = setInterval(() => {
      setScore(prev => prev + 1);
    }, 100);
  };
  
  // Handle jump
  const jump = () => {
    if (!character.isJumping && isPlaying && !gameOver) {
      setCharacter(prev => ({
        ...prev,
        isJumping: true
      }));
      
      // Reset jump after animation completes
      setTimeout(() => {
        setCharacter(prev => ({
          ...prev,
          isJumping: false
        }));
      }, 500);
    }
  };
  
  // Game loop
  useEffect(() => {
    if (!isPlaying || gameOver) return;
    
    const updateGameState = () => {
      setObstacles(prev => {
        const updatedObstacles = prev
          .map(obstacle => ({
            ...obstacle,
            position: obstacle.position - 1 // Move obstacles to the left
          }))
          .filter(obstacle => obstacle.position > -10); // Remove obstacles that have gone off screen
          
        // Check for collisions
        const characterElement = document.getElementById('game-character');
        const obstacleElements = document.querySelectorAll('.game-obstacle');
        
        if (characterElement) {
          const characterRect = characterElement.getBoundingClientRect();
          
          obstacleElements.forEach(obstacleEl => {
            const obstacleRect = obstacleEl.getBoundingClientRect();
            
            // Simple collision detection
            if (
              characterRect.right > obstacleRect.left &&
              characterRect.left < obstacleRect.right &&
              characterRect.bottom > obstacleRect.top &&
              characterRect.top < obstacleRect.bottom
            ) {
              // Collision detected
              endGame();
            }
          });
        }
        
        return updatedObstacles;
      });
      
      requestRef.current = requestAnimationFrame(updateGameState);
    };
    
    requestRef.current = requestAnimationFrame(updateGameState);
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isPlaying, gameOver]);
  
  // Handle keydown for jump
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.key === 'ArrowUp') {
        jump();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [character.isJumping, isPlaying, gameOver]);
  
  // End game and clean up
  const endGame = () => {
    setIsPlaying(false);
    setGameOver(true);
    
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('highScore', score.toString());
    }
    
    if (obstacleIntervalRef.current) {
      clearInterval(obstacleIntervalRef.current);
    }
    
    if (scoreIntervalRef.current) {
      clearInterval(scoreIntervalRef.current);
    }
    
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }
  };
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (obstacleIntervalRef.current) {
        clearInterval(obstacleIntervalRef.current);
      }
      
      if (scoreIntervalRef.current) {
        clearInterval(scoreIntervalRef.current);
      }
      
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="text-xl font-semibold">Score: {score}</div>
        <div className="text-xl font-semibold">High Score: {highScore}</div>
      </div>
      
      <div 
        ref={gameAreaRef}
        onClick={jump}
        className="relative w-full h-64 bg-muted rounded-lg border border-border overflow-hidden cursor-pointer"
      >
        {/* Ground */}
        <div className="absolute bottom-0 w-full h-1 bg-border"></div>
        
        {/* Character */}
        <motion.div
          id="game-character"
          animate={{ 
            y: character.isJumping ? -80 : 0
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 15
          }}
          className="absolute bottom-4 left-10 w-12 h-12 bg-primary rounded"
        >
          {/* Character face */}
          <div className="w-full h-full relative">
            <div className="absolute top-2 left-2 w-2 h-2 bg-white rounded-full"></div>
            <div className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full"></div>
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-white rounded-full"></div>
          </div>
        </motion.div>
        
        {/* Obstacles */}
        <AnimatePresence>
          {obstacles.map(obstacle => (
            <motion.div
              key={obstacle.id}
              initial={{ left: `${obstacle.position}%` }}
              animate={{ left: `-10%` }}
              exit={{ left: '-20%' }}
              transition={{ duration: 2, ease: 'linear' }}
              className="game-obstacle absolute bottom-4 w-8 h-16 bg-destructive rounded"
              style={{ left: `${obstacle.position}%` }}
            ></motion.div>
          ))}
        </AnimatePresence>
        
        {/* Game overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center">
            {gameOver ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center"
              >
                <h3 className="text-2xl font-bold mb-2">Game Over!</h3>
                <p className="text-muted-foreground mb-6">Your score: {score}</p>
                <button
                  onClick={startGame}
                  className="btn-primary"
                >
                  Play Again
                </button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center"
              >
                <h3 className="text-2xl font-bold mb-2">Мини-игра с пиксельным бегуном</h3>
                <p className="text-muted-foreground mb-6">Нажмите пробел или коснитесь экрана, чтобы прыгать и избегать препятствия</p>
                <button
                  onClick={startGame}
                  className="btn-primary"
                >
                  Начать игру
                </button>
              </motion.div>
            )}
          </div>
        )}
      </div>
      
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <h3 className="font-semibold mb-2">Как играть:</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Нажмите пробел или коснитесь экрана, чтобы прыгать</li>
          <li>Избегайте препятствий</li>
          <li>Чем дольше вы играете, тем выше ваш счет</li>
        </ul>
      </div>
    </div>
  );
};

export default GameArea;
