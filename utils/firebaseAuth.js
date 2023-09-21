import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../config/firebase';
// Initialize Firebase Authentication
const auth = getAuth(app);

// Signup function
export const signup = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user;
  } catch (error) {
    throw error;
  }
};

// Login function
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user;
  } catch (error) {
    throw error;
  }
};

export { auth }; // Export the auth object
