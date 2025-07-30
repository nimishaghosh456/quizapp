import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import he from 'he';

function Result() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('quizData');
    if (stored) {
      setData(JSON.parse(stored));
    } else {
      navigate('/');
    }
  }, [navigate]);

  if (!data) return <p>Loading results...</p>;

  const { questions, answers } = data;
  const score = questions.filter((q, i) => answers[i] === q.correct_answer).length;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>Quiz Completed ✅</h2>
        <p>Your Score: <strong>{score} / {questions.length}</strong></p>
      </div>

      {questions.map((q, i) => {
        const isCorrect = answers[i] === q.correct_answer;
        return (
          <div
            key={i}
            style={{
              ...styles.card,
              backgroundColor: isCorrect ? '#e8f5e9' : '#ffebee',
              borderLeft: isCorrect ? '5px solid #4CAF50' : '5px solid #E53935',
            }}
          >
            <p><strong>Q{i + 1}:</strong> {he.decode(q.question)}</p>
            <p><strong>Your Answer:</strong> {answers[i] ? he.decode(answers[i]) : 'No answer'}</p>
            <p><strong>Correct Answer:</strong> {he.decode(q.correct_answer)}</p>
          </div>
        );
      })}
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '900px',
    margin: 'auto',
    fontFamily: 'Poppins, sans-serif',
  },
  header: {
    marginBottom: '30px',
    textAlign: 'center',
    color: '#000',
  },
  card: {
    padding: '20px',
    marginBottom: '15px',
    borderRadius: '10px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
    color: '#000',
  },
};

export default Result;
