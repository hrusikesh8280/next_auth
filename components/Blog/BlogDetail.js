import React from 'react';
import Link from 'next/link';
import styles from '../CSS/BlogDetail.module.css';

const BlogDetail = ({ blog }) => {
  return (
    <div className={styles.container}>
      <h2>{blog.title}</h2>
      <p className={styles.author}>By {blog.author}</p>
      <p className={styles.date}>Published on {blog.createdAt.toDate().toLocaleDateString()}</p>
      <div className={styles.content}>
        {blog.image && <img src={blog.image} alt="Blog Cover" />}
        <p>{blog.content}</p>
        {blog.videoUrl && (
          <div className={styles.video}>
            <iframe width="560" height="315" src={blog.videoUrl} title="Embedded Video"></iframe>
          </div>
        )}
      </div>
      <Link href="/blogs">
        <a className={styles.backLink}>Back to Blog List</a>
      </Link>
    </div>
  );
};

export default BlogDetail;
