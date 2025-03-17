
import Layout from '../components/Layout/Layout';
import ArticleContent from '../components/Article/ArticleContent';

const Article = () => {
  return (
    <Layout>
      <div className="container-custom py-16">
        <ArticleContent />
      </div>
    </Layout>
  );
};

export default Article;
