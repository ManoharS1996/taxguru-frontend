import React from "react";
import styled from "styled-components";
import { FaEye, FaComment } from "react-icons/fa";

const Card = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.1);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.75rem;
`;

const Excerpt = styled.p`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 1.5rem;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray};
  font-size: 0.9rem;
`;

const FooterItem = styled.span`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

const ArticleCard = ({ article }) => {
  return (
    <Card>
      <Title>{article.title}</Title>
      <Excerpt>{article.excerpt || "No excerpt available."}</Excerpt>
      <Footer>
        <FooterItem><FaEye /> {article.views || 0}</FooterItem>
        <FooterItem><FaComment /> {article.comments || 0}</FooterItem>
        <FooterItem>{new Date(article.date).toLocaleDateString()}</FooterItem>
      </Footer>
    </Card>
  );
};

export default ArticleCard;
