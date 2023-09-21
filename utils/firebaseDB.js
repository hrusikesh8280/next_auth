import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { app } from '../config/firebase'; 


const db = getFirestore(app); 

// Function to add a new blog to Firestore
export const addBlog = async (blogData) => {
  try {
    const docRef = await addDoc(collection(db, 'blogs'), blogData);
    return docRef.id;
  } catch (error) {
    console.error('Error adding blog:', error);
    throw error;
  }
};

// Function to retrieve all blogs from Firestore
export const getAllBlogs = async () => {
  const blogs = [];
  try {
    const querySnapshot = await getDocs(collection(db, 'blogs'));
    querySnapshot.forEach((doc) => {
      blogs.push({ id: doc.id, ...doc.data() });
    });
    return blogs;
  } catch (error) {
    throw error;
  }
};

export { db }; 
