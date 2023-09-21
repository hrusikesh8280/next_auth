// pages/api/blogs/[id].js

import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { db } from '../../../config/firebase'; 

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { id } = req.query; 

      const firestore = getFirestore(db);
      const blogRef = doc(firestore, 'blogs', id);

      const blogDoc = await getDoc(blogRef);

      if (blogDoc.exists()) {
        const blogData = blogDoc.data();
        res.status(200).json(blogData);
      } else {
        res.status(404).json({ message: 'Blog not found' });
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
      res.status(500).json({ message: 'Error fetching blog' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
