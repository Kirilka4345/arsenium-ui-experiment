
import Layout from '../components/Layout/Layout';
import GameArea from '../components/Game/GameArea';

const Game = () => {
  return (
    <Layout>
      <div className="container-custom py-16">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="mb-4">Мини-игра</h1>
          <p className="text-xl text-muted-foreground">
            Попробуйте нашу простую, но увлекательную мини-игру с пиксельным персонажем
          </p>
        </div>
        
        <GameArea />
        
        <div className="max-w-4xl mx-auto mt-16">
          <div className="bg-card p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Об игре</h2>
            <p className="text-muted-foreground mb-4">
              Эта простая игра вдохновлена классическими платформерами. Ваша задача — управлять персонажем и избегать препятствий на пути.
              Чем дольше вы продержитесь, тем выше будет ваш счёт!
            </p>
            <p className="text-muted-foreground">
              Игра использует современные веб-технологии и анимации для создания плавного и отзывчивого игрового процесса.
              Наслаждайтесь игрой и попробуйте побить свой рекорд!
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Game;
