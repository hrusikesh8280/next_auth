import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../../utils/firebaseAuth';
import { addBlog } from '../../utils/firebaseDB';

 import styles from '../CSS/BlogForm.module.css'; // Import CSS styles

const BlogForm = () => {
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (image && !isValidImageUrl(image)) {
      setError('Invalid image URL. Please provide a valid URL or leave it empty.');
      return;
    }

    try {
      const blogData = {
        title,
        content,
        image,
        videoUrl,
        author: user.uid,
        createdAt: new Date(),
        comments: [],
      };

      await addBlog(blogData);

      setSuccessMessage('Blog published successfully!');
      setTitle('');
      setContent('');
      setImage('');
      setVideoUrl('');
    } catch (err) {
      setError(err.message);
    }
  };

  const isValidImageUrl = (url) => {
    return url.startsWith('http://') || url.startsWith('https://');
  };

  return (
    <div className={styles.container}>
      <h2>Create a New Blog</h2>
      {error && <p className={styles.errorMessage}>{error}</p>}
      {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="image">Image URL:</label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Paste the image URL here"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="videoUrl">Video URL:</label>
          <input
            type="text"
            id="videoUrl"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
        </div>
        <button type="submit">Publish Blog</button>
      </form>
    </div>
  );
};

export default BlogForm;
