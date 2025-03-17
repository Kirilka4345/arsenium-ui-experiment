
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: 'Главная', path: '/' },
    { name: 'Тест', path: '/test' },
    { name: 'Игра', path: '/game' },
    { name: 'Чат', path: '/chat' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          <Link 
            to="/" 
            className="flex items-center space-x-2 font-bold text-xl text-primary"
          >
            <span className="animate-float">MyWebsite</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-2 py-1 font-medium transition-colors duration-300
                  ${location.pathname === item.path ? 'text-primary' : 'text-foreground hover:text-primary'}
                  after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 
                  after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right 
                  after:transition-transform after:duration-300 
                  ${location.pathname === item.path ? 'after:scale-x-100' : 'hover:after:scale-x-100 hover:after:origin-bottom-left'}`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground p-2 rounded-md hover:bg-muted transition-colors duration-300"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="container-custom bg-background px-2 pt-2 pb-3 space-y-1 shadow-lg">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-4 py-3 rounded-md text-base font-medium transition-colors duration-300
                ${location.pathname === item.path ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-muted'}`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
