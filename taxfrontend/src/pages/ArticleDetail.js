import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import Header from '../components/Header';

const Container = styled.div`
  max-width: 900px;
  margin: 2rem auto;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  overflow: hidden;
`;

const ImageContainer = styled.div`
  height: 400px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ContentContainer = styled.div`
  padding: 2rem;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 1.5rem;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.2s;
  
  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
  font-size: 2.5rem;
  line-height: 1.3;
`;

const Subheading = styled.h2`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: 500;
  opacity: 0.9;
`;

const Content = styled.div`
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.8;
  margin-bottom: 2rem;
  font-size: 1.1rem;
  white-space: pre-line;
  
  p {
    margin-bottom: 1.5rem;
  }
`;

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/api/articles/${id}`);
        
        if (res.data.success) {
          setArticle(res.data.data);
          setError(null);
        } else {
          setError(res.data.error || 'Article not found');
        }
      } catch (err) {
        setError(err.response?.data?.error || err.message);
        console.error('Error fetching article:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) return <div>Loading article...</div>;
  if (error) return <div>{error}</div>;
  if (!article) return <div>Article not found</div>;

  return (
    <>
      <Header />
      <Container>
        <ImageContainer>
          <img 
            src={article.imageUrl} 
            alt={article.title}
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80';
            }}
          />
        </ImageContainer>
        
        <ContentContainer>
          <BackButton onClick={() => navigate(-1)}>
            <FaArrowLeft /> Back to articles
          </BackButton>
          
          <Title>{article.title}</Title>
          {article.subheading && <Subheading>{article.subheading}</Subheading>}
          
          <Content>{article.content}</Content>
        </ContentContainer>
      </Container>
    </>
  );
};

export default ArticleDetail;