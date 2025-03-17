
import { useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import HeroSection from '../components/Home/HeroSection';
import FeaturesSection from '../components/Home/FeaturesSection';
import ContentSection from '../components/Home/ContentSection';
import ArticlePreview from '../components/Home/ArticlePreview';
import CtaSection from '../components/Home/CtaSection';

const Index = () => {
  // Hero animation video - futuristic tech
  const heroVideoUrl = "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";
  
  // Fun tech images for content sections
  const contentImageUrl = "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d";
  const contentGifUrl = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGJlNDRmM2EyN2Q0ZDY2OTFkNzQzNjVhMTgxYTlmZDY2ZDc1MDdlZiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/3oKIPnAiaMCws8nOsE/giphy.gif";
  
  // Add sound effects
  useEffect(() => {
    // Create audio element for background music
    const backgroundMusic = new Audio("/background-music.mp3");
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.1;
    
    // Play button for music
    const playButton = document.createElement("button");
    playButton.innerText = "🔊 Музыка";
    playButton.className = "fixed bottom-4 right-4 z-50 bg-primary text-white px-4 py-2 rounded-full shadow-lg";
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
        imageUrl={contentImageUrl}
        gifUrl={contentGifUrl}
      />
      <ContentSection 
        imageUrl="https://images.unsplash.com/photo-1516192518150-0d8fee5425e3"
        gifUrl="https://media.giphy.com/media/l0HlHFRbmaZtBRhXG/giphy.gif"
        isReversed={true}
      />
      <ArticlePreview />
      <CtaSection />
    </Layout>
  );
};

export default Index;
