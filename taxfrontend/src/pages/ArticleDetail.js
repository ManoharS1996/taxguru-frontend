import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

const Container = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 2rem;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
`;

const Subheading = styled.h2`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
  font-weight: normal;
`;

const Content = styled.div`
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
  margin-bottom: 2rem;
  white-space: pre-line;
`;

const MetaInfo = styled.div`
  color: ${({ theme }) => theme.colors.gray};
  font-size: 0.9rem;
  border-top: 1px solid ${({ theme }) => theme.colors.gray};
  padding-top: 1rem;
`;

const ArticleDetail = () => {
  const params = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  // Debug: manually use this ID to test loading directly from backend
  const fallbackId = '666abc123def4567890ghi12'; // ⬅️ Replace with real _id if needed
  const articleId = params.id || fallbackId;

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        console.log('Fetching article with ID:', articleId);
        const res = await axios.get(`http://localhost:5000/api/articles/${articleId}`);
        console.log('Fetched article:', res.data);
        setArticle(res.data);
      } catch (err) {
        console.error('Error fetching article:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [articleId]);

  if (loading) return <div>Loading...</div>;
  if (!article) return <div>❌ Article not found. Check ID or backend.</div>;

  return (
    <Container>
      <Title>{article.title}</Title>
      {article.subheading && <Subheading>{article.subheading}</Subheading>}
      <Content>{article.content}</Content>
      <MetaInfo>
        Published on: {new Date(article.date).toLocaleDateString()} | 
        Views: {article.views} | 
        Comments: {article.comments}
      </MetaInfo>
    </Container>
  );
};

export default ArticleDetail;
