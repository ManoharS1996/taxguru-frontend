import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaEye, FaComment, FaBookmark, FaShareAlt } from 'react-icons/fa';
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
  white-space: pre-line;
  font-size: 1.1rem;
  
  p {
    margin-bottom: 1.5rem;
  }
`;

const MetaInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray};
  font-size: 0.9rem;
  border-top: 1px solid ${({ theme }) => theme.colors.grayLight};
  padding-top: 1.5rem;
  margin-top: 2rem;
`;

const MetaLeft = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${({ theme }) => theme.colors.secondary};
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: ${({ theme }) => theme.colors.grayLight};
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
        const res = await axios.get(`https://sai1taxbackend.onrender.com/api/articles/${id}`);
        
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

  const handleSave = async () => {
    try {
      const res = await axios.post(`https://sai1taxbackend.onrender.com/api/articles/${id}/save`);
      setArticle(res.data.data);
    } catch (err) {
      console.error('Error saving article:', err);
    }
  };

  const handleShare = async () => {
    try {
      const res = await axios.post(`https://sai1taxbackend.onrender.com/api/articles/${id}/share`);
      setArticle(res.data.data);
      
      if (navigator.share) {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href
        });
      } else {
        // Fallback for browsers that don't support Web Share API
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing article:', err);
    }
  };

  // const handleComment = async () => {
  //   try {
  //     const res = await axios.post(`https://sai1taxbackend.onrender.com/api/articles/${id}/comment`);
  //     setArticle(res.data.data);
  //   } catch (err) {
  //     console.error('Error adding comment:', err);
  //   }
  // };

  if (loading) return <div>Loading article...</div>;
  if (error) return <div>{error}</div>;
  if (!article) return <div>Article not found</div>;

  return (
    <>
      <Header />
      <Container>
        {article.imageUrl && (
          <ImageContainer>
            <img src={article.imageUrl} alt={article.title} />
          </ImageContainer>
        )}
        
        <ContentContainer>
          <BackButton onClick={() => navigate(-1)}>
            <FaArrowLeft /> Back to articles
          </BackButton>
          
          <Title>{article.title}</Title>
          {article.subheading && <Subheading>{article.subheading}</Subheading>}
          
          <Content dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br/>') }} />
          
          <MetaInfo>
            <MetaLeft>
              <MetaItem>
                <FaEye /> {article.views} views
              </MetaItem>
              <MetaItem>
                <FaComment /> {article.comments} comments
              </MetaItem>
              <MetaItem>
                Published: {new Date(article.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </MetaItem>
            </MetaLeft>
          </MetaInfo>
          
          <ActionButtons>
            <ActionButton onClick={handleSave}>
              <FaBookmark /> Save ({article.saves || 0})
            </ActionButton>
            <ActionButton onClick={handleShare}>
              <FaShareAlt /> Share ({article.shares || 0})
            </ActionButton>
          </ActionButtons>
        </ContentContainer>
      </Container>
    </>
  );
};

export default ArticleDetail;