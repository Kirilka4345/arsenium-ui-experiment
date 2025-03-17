
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-muted py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">MyWebsite</h3>
            <p className="text-muted-foreground">
              Современный интерактивный сайт с анимациями и играми.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">Навигация</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Главная
                </Link>
              </li>
              <li>
                <Link to="/test" className="text-muted-foreground hover:text-primary transition-colors">
                  Тест
                </Link>
              </li>
              <li>
                <Link to="/game" className="text-muted-foreground hover:text-primary transition-colors">
                  Игра
                </Link>
              </li>
              <li>
                <Link to="/chat" className="text-muted-foreground hover:text-primary transition-colors">
                  Чат
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">Ресурсы</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Документация
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Поддержка
                </a>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">Связаться</h4>
            <ul className="space-y-2">
              <li>
                <a href="mailto:info@example.com" className="text-muted-foreground hover:text-primary transition-colors">
                  info@example.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-center text-muted-foreground">
            © 2023 MyWebsite. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
