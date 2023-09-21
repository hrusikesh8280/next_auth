import React from 'react';
import Link from 'next/link';
import styles from '../CSS/BlogList.module.css'; 

const BlogList = ({ blogs }) => {
  return (
    <div className={styles.container}>
      <h2>Blog List</h2>
      <ul className={styles.list}>
        {blogs.map((blog) => (
          <li key={blog.id} className={styles.item}>
            <Link href={`/blogs/${blog.id}`}>
              <a className={styles.link}>{blog.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
