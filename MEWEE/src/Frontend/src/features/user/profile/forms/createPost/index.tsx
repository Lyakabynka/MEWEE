import React, { useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '../../../../../entities';

export const CreatePostForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const {getAPI} = useAuthStore();
  const [image, setImage] = useState<File | null>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImage(file || null); // Handle undefined case properly
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Convert image to base64
    let imageBase64 = '';
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          imageBase64 = reader.result.split(',')[1];
          // Send the data to the backend API
          sendPostToApi(title, content, imageBase64);
        }
      };
      reader.readAsDataURL(image);
    } else {
      // Send the data to the backend API without an image
      sendPostToApi(title, content, '');
    }
  };

  const sendPostToApi = async (title: string, content: string, imageBase64: string) => {
    try {
      // Call your API endpoint here
      await getAPI().post('/post', {
        title,
        content,
        image: imageBase64});
      // Reset form fields after successful submission
      setTitle('');
      setContent('');
      setImage(null);
      alert('Post created successfully!');
    } catch (error) {
      console.error('Error creating post:', error);
      alert('An error occurred while creating the post.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" value={title} onChange={handleTitleChange} required />
      </div>
      <div>
        <label htmlFor="content">Content:</label>
        <textarea id="content" value={content} onChange={handleContentChange} required />
      </div>
      <div>
        <label htmlFor="image">Attachment:</label>
        <input type="file" id="image" accept="image/*" onChange={handleImageChange} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreatePostForm;
