import { useState } from 'react';
import { auth, signup } from '../../utils/firebaseAuth';
import styles from '../CSS/signup.module.css';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const router = useRouter();
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // Call the signup function from utils/firebaseAuth
      await signup(email, password);
      setSuccessMessage('Registration successful! You can now log in page......');
      setTimeout(() => {
        router.push('/app/LoginPage');
      }, 2000);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.signupContainer}>
      <h2>Sign Up</h2>
      <div className={styles.formGroup}>
        <label className={styles.label}>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={handleSignup}>Sign Up</button>
      {error && <p className={styles.error}>{error}</p>}
      {successMessage && <p className={styles.success}>{successMessage}</p>}
      <p>
  Alredy have an account?{' '}
  <Link href="/app/LoginPage">
    Logn in here
  </Link>
</p>
    </div>
  );
};

export default Signup;
