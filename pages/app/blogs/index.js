import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../utils/firebaseDB'; 

const BlogListPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'blogs'));
        const blogList = [];

        querySnapshot.forEach((doc) => {
          blogList.push({ id: doc.id, ...doc.data() });
        });

        setBlogs(blogList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div>
      <h1>Blog List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {blogs.map((blog) => (
            <li key={blog.id}>
              <Link href={`/app/blogs/${blog.id}`}>
                {blog.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BlogListPage;
