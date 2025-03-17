
import Layout from '../components/Layout/Layout';
import ChatInterface from '../components/Chat/ChatInterface';

const Chat = () => {
  return (
    <Layout>
      <div className="container-custom py-16">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="mb-4">Чат-бот</h1>
          <p className="text-xl text-muted-foreground">
            Пообщайтесь с нашим интерактивным чат-ботом, который ответит на ваши вопросы
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <ChatInterface />
          
          <div className="mt-12 bg-card p-8 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4">О чат-боте</h2>
            <p className="text-muted-foreground mb-4">
              Наш чат-бот создан для демонстрации возможностей современных интерфейсов общения.
              Он может отвечать на простые вопросы и поддерживать базовую беседу.
            </p>
            <p className="text-muted-foreground">
              Попробуйте спросить его о нашем сайте, тесте или игре!
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Chat;
