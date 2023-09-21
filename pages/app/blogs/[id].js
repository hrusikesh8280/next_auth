import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../../utils/firebaseDB'; 
import BlogDetail from '../../../components/Blog/BlogDetail';

const BlogDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const blogDocRef = doc(db, 'blogs', id);
      getDoc(blogDocRef)
        .then((docSnapshot) => {
          if (docSnapshot.exists()) {
            setBlog({ id: docSnapshot.id, ...docSnapshot.data() });
          } else {
            console.error('Blog not found');
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching blog:', error);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!blog) {
    return <p>Blog not found.</p>;
  }

  return (
    <div>
      <BlogDetail blog={blog} />
    </div>
  );
};

export default BlogDetailPage;
