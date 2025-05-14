import React, { useEffect, useState } from "react";
import axios from "axios";
import ArticleCard from "../components/ArticleCard";
import SearchBar from "../components/SearchBar";
import Header from "../components/Header";
import styled from "styled-components";

const Container = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 2rem;
`;

const Heading = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
`;

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/articles")
      .then((res) => setArticles(res.data))
      .catch((err) => console.error(err));
  }, []);

  const filteredArticles = articles.filter((article) =>
    article.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header />
      <Container>
        <Heading>📚 Latest Articles</Heading>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        {filteredArticles.map((article) => (
          <ArticleCard key={article._id} article={article} />
        ))}
      </Container>
    </>
  );
};

export default Home;
