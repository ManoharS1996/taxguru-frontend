import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ArticleCard from '../components/ArticleCard';
import SearchBar from '../components/SearchBar';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 2rem;
`;

const Heading = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
`;

const CreateArticleLink = styled(Link)`
  display: inline-block;
  margin-bottom: 1.5rem;
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: 4px;
  text-decoration: none;
  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/articles${searchTerm ? `?search=${searchTerm}` : ''}`
        );
        setArticles(res.data);
      } catch (err) {
        console.error('Error fetching articles:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchArticles();
  }, [searchTerm]);

  if (loading) return <div>Loading articles...</div>;

  return (
    <Container>
      <Heading>📚 Latest Articles</Heading>
      <CreateArticleLink to="/create">Create New Article</CreateArticleLink>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {articles.length > 0 ? (
        articles.map((article) => (
          <ArticleCard key={article._id} article={article} />
        ))
      ) : (
        <p>No articles found. Try a different search term.</p>
      )}
    </Container>
  );
};

export default Home;
