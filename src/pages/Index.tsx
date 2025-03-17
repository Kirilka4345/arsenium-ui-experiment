
import Layout from '../components/Layout/Layout';
import HeroSection from '../components/Home/HeroSection';
import FeaturesSection from '../components/Home/FeaturesSection';
import ContentSection from '../components/Home/ContentSection';
import ArticlePreview from '../components/Home/ArticlePreview';
import CtaSection from '../components/Home/CtaSection';

const Index = () => {
  // Sample video URL - replace with your actual video URL
  const heroVideoUrl = "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";
  
  // Sample image and GIF URLs - replace with your actual URLs
  const contentImageUrl = "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d";
  const contentGifUrl = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGJlNDRmM2EyN2Q0ZDY2OTFkNzQzNjVhMTgxYTlmZDY2ZDc1MDdlZiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/3oKIPnAiaMCws8nOsE/giphy.gif";
  
  return (
    <Layout>
      <HeroSection videoUrl={heroVideoUrl} />
      <FeaturesSection />
      <ContentSection 
        imageUrl={contentImageUrl}
        gifUrl={contentGifUrl}
      />
      <ContentSection 
        imageUrl="https://images.unsplash.com/photo-1582562124811-c09040d0a901"
        gifUrl="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGJlNDRmM2EyN2Q0ZDY2OTFkNzQzNjVhMTgxYTlmZDY2ZDc1MDdlZiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/3oKIPnAiaMCws8nOsE/giphy.gif"
        isReversed={true}
      />
      <ArticlePreview />
      <CtaSection />
    </Layout>
  );
};

export default Index;
