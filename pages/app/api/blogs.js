// pages/api/blogs.js

import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { db } from '../../../config/firebase'; 

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const firestore = getFirestore(db);
      const blogsCollection = collection(firestore, 'blogs');
      const blogsQuerySnapshot = await getDocs(blogsCollection);

      const blogs = [];
      blogsQuerySnapshot.forEach((doc) => {
        blogs.push({ id: doc.id, ...doc.data() });
      });

      res.status(200).json(blogs);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      res.status(500).json({ message: 'Error fetching blogs' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
