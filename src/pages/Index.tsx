
import { useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import HeroSection from '../components/Home/HeroSection';
import FeaturesSection from '../components/Home/FeaturesSection';
import ContentSection from '../components/Home/ContentSection';
import ArticlePreview from '../components/Home/ArticlePreview';
import CtaSection from '../components/Home/CtaSection';

const Index = () => {
  // Dark tech-themed video for hero section
  const heroVideoUrl = "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";
  
  // Content section images
  const xeonImageUrl = "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80";
  const xeonGifUrl = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdTBjMjA0ZG50eTNvOXo2NDJ0bXd3MTU2MGx0ZjN1cDBpOHhjc2hqaCZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/077i6AULCXc0FKTj9s/giphy.gif";
  
  const codingImageUrl = "https://images.unsplash.com/photo-1550645612-83f5d594b671?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80";
  const codingGifUrl = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMXFhZDcwYjdmdXNla256d24waTN5dHVpYnYwejZuYnNodmw2M212OSZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/ZVik7pBtu9dNS/giphy.gif";
  
  // Add sound effects
  useEffect(() => {
    // Create audio element for background music
    const backgroundMusic = new Audio("/background-music.mp3");
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.1;
    
    // Play button for music
    const playButton = document.createElement("button");
    playButton.innerText = "🔊 Музыка";
    playButton.className = "fixed bottom-4 right-4 z-50 glass-morphism text-white px-4 py-2 rounded-full shadow-lg";
    playButton.onclick = () => {
      if (backgroundMusic.paused) {
        backgroundMusic.play();
        playButton.innerText = "🔇 Тишина";
      } else {
        backgroundMusic.pause();
        playButton.innerText = "🔊 Музыка";
      }
    };
    
    document.body.appendChild(playButton);
    
    // Click sound for all buttons
    const clickSound = new Audio("/click-sound.mp3");
    const buttons = document.querySelectorAll("button, a");
    buttons.forEach(button => {
      button.addEventListener("click", () => {
        clickSound.currentTime = 0;
        clickSound.play();
      });
    });
    
    return () => {
      backgroundMusic.pause();
      document.body.removeChild(playButton);
    };
  }, []);
  
  return (
    <Layout>
      <HeroSection videoUrl={heroVideoUrl} />
      <FeaturesSection />
      <ContentSection 
        imageUrl={xeonImageUrl}
        gifUrl={xeonGifUrl}
        title="Мечта Арсения о суперкомпьютере"
        subtitle="Технологии и железо"
        description="Погрузитесь в историю о том, как Арсений мечтает о создании идеального суперкомпьютера на процессоре Xeon. Узнайте о его технических предпочтениях, любимых компонентах и планах на создание вычислительного монстра."
        linkText="Узнать больше о Xeon"
        linkUrl="/article"
        icon="cpu"
      />
      <ContentSection 
        imageUrl={codingImageUrl}
        gifUrl={codingGifUrl}
        title="Уникальный стиль программирования"
        subtitle="Код и творчество"
        description="Исследуйте необычный мир программирования Арсения, где традиционные правила часто переосмысливаются, а код становится настоящим произведением искусства с уникальным авторским почерком и неожиданными решениями."
        linkText="Изучить код Арсения"
        linkUrl="/article"
        icon="code"
        isReversed={true}
      />
      <ArticlePreview />
      <CtaSection />
    </Layout>
  );
};

export default Index;
