import React from 'react';
import styled from 'styled-components';
import { FaEye, FaComment } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Card = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  overflow: hidden;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0,0,0,0.12);
  }
`;

const ImageContainer = styled.div`
  height: 220px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
    
    &:hover {
      transform: scale(1.1);
    }
  }
`;

const Content = styled.div`
  padding: 1.5rem;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.75rem;
  font-size: 1.5rem;
  line-height: 1.3;
`;

const Subheading = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.75rem;
  font-size: 1.1rem;
  font-weight: 500;
  opacity: 0.9;
`;

const Excerpt = styled.p`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1.5rem;
  line-height: 1.6;
  opacity: 0.85;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray};
  font-size: 0.9rem;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.grayLight};
`;

const ReadMoreLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primaryDark};
    transform: translateX(3px);
  }
`;

const ArticleCard = ({ article }) => {
  return (
    <Card>
      <ImageContainer>
        <img 
          src={article.imageUrl} 
          alt={article.title}
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80';
          }}
        />
      </ImageContainer>
      <Content>
        <Title>{article.title}</Title>
        {article.subheading && <Subheading>{article.subheading}</Subheading>}
        <Excerpt>{article.excerpt}</Excerpt>
        <Footer>
          <div>
            <span><FaEye /> {article.views || 0} views</span>
          </div>
          <ReadMoreLink to={`/article/${article._id}`}>
            Read full article →
          </ReadMoreLink>
        </Footer>
      </Content>
    </Card>
  );
};

export default ArticleCard;