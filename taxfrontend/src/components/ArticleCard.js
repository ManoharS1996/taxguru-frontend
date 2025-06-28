import React from "react";
import styled from "styled-components";
import { FaEye, FaComment } from "react-icons/fa";
import { Link } from "react-router-dom";

const Card = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.1);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-3px);
  }
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.75rem;
`;

const Subheading = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  font-weight: normal;
`;

const Excerpt = styled.p`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray};
  font-size: 0.9rem;
`;

const FooterItem = styled.span`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

const ReadMoreLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;

const ArticleCard = ({ article }) => {
  return (
    <Card>
      <Title>{article.title}</Title>
      {article.subheading && <Subheading>{article.subheading}</Subheading>}
      <Excerpt>{article.excerpt || "No excerpt available."}</Excerpt>
      <Footer>
        <div>
          <FooterItem><FaEye /> {article.views || 0}</FooterItem>
          <FooterItem style={{ marginLeft: "1rem" }}><FaComment /> {article.comments || 0}</FooterItem>
        </div>
        <ReadMoreLink to={`/article/${article._id}`}>Read more →</ReadMoreLink>
      </Footer>
    </Card>
  );
};

export default ArticleCard;
