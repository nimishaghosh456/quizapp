import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Start() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      localStorage.setItem('quizEmail', email);
      navigate('/quiz');
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.title}>Welcome to the Quiz!</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <label htmlFor="email" style={styles.label}>Enter your email:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              style={styles.input}
            />
            <button type="submit" style={styles.button}>Start Quiz</button>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(to right, #a1c4fd, #c2e9fb)',
  },
  container: {
    height: '100vh',
    background: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Poppins, sans-serif',
  },
  card: {
    background: '#fff',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
    width: '90%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  title: {
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '10px',
    fontWeight: '600',
    color: '#444',
    textAlign: 'left',
  },
  input: {
    padding: '12px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    marginBottom: '20px',
  },
  button: {
    padding: '12px',
    backgroundColor: '#2196F3',
    color: '#fff',
    border: 'none',
    fontWeight: '600',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default Start;
