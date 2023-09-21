import { useState } from 'react';
import { auth, login } from '../../utils/firebaseAuth';
import styles from "../CSS/login.module.css"
import Link from 'next/link';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Call the login function from utils/firebaseAuth
      await login(email, password);
      setSuccessMessage('Login successful!'); // Display success message
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2>Login</h2>
      <div className={styles.formGroup}>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className={styles.formGroup}>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={handleLogin}>Login</button>
      {error && <p className={styles.error}>{error}</p>}
      {successMessage && <p className={`${styles.success} ${styles.message}`}>{successMessage}</p>}
      <p>
  Don't have an account?{' '}
  <Link href="/app/SignupPage">
    Sign up here
  </Link>
</p>
    </div>
  );
};

export default Login;
