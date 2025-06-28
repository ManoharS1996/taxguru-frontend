import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // ⬅️ Updated
import Header from "../components/Header";

const Container = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 4px;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 4px;
  font-size: 1rem;
  min-height: 200px;
  resize: vertical;
`;

const Button = styled.button`
  padding: 0.75rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const CreateArticle = () => {
  const [formData, setFormData] = useState({
    title: "",
    subheading: "",
    content: "",
    excerpt: ""
  });
  const navigate = useNavigate(); // ⬅️ Updated

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://sai1taxbackend.onrender.com/api/articles",
        formData
      );
      navigate(`/article/${res.data._id}`); // ⬅️ Updated
    } catch (err) {
      console.error("Error creating article:", err);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <h1>Create New Article</h1>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="subheading"
            placeholder="Subheading (optional)"
            value={formData.subheading}
            onChange={handleChange}
          />
          <TextArea
            name="content"
            placeholder="Article content"
            value={formData.content}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="excerpt"
            placeholder="Excerpt (optional)"
            value={formData.excerpt}
            onChange={handleChange}
          />
          <Button type="submit">Publish Article</Button>
        </Form>
      </Container>
    </>
  );
};

export default CreateArticle;
