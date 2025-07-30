import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import he from 'he';

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visited, setVisited] = useState(new Set());
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=15&type=multiple')
      .then(res => res.json())
      .then(data => {
        const formatted = data.results.map((q) => ({
          ...q,
          choices: shuffle([...q.incorrect_answers, q.correct_answer]),
        }));
        setQuestions(formatted);
      });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          handleSubmit();
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const shuffle = (array) => array.sort(() => Math.random() - 0.5);

  const handleAnswer = (index, answer) => {
    setAnswers({ ...answers, [index]: answer });
    setVisited(new Set([...visited, index]));
  };

  const handleSubmit = () => {
    localStorage.setItem('quizData', JSON.stringify({ questions, answers }));
    navigate('/result');
  };

  const formatTime = () => {
    const mins = String(Math.floor(timeLeft / 60)).padStart(2, '0');
    const secs = String(timeLeft % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  };

  if (questions.length === 0) return <p style={{ textAlign: 'center', fontSize: '24px' }}>Loading...</p>;

  const currentQ = questions[currentIndex];

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.timer}>Time Left: {formatTime()}</div>

        <div style={styles.question}>
          <h3>Q{currentIndex + 1}: {he.decode(currentQ.question)}</h3>
          {currentQ.choices.map((choice, i) => (
            <div key={i} style={styles.choice}>
              <label>
                <input
                  type="radio"
                  name={`q${currentIndex}`}
                  value={choice}
                  checked={answers[currentIndex] === choice}
                  onChange={() => handleAnswer(currentIndex, choice)}
                />{" "}
                {he.decode(choice)}
              </label>
            </div>
          ))}
        </div>

        <div style={styles.nav}>
          {questions.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setCurrentIndex(i);
                setVisited(new Set([...visited, i]));
              }}
              style={{
                padding: '8px',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 'bold',
                cursor: 'pointer',
                color: '#fff',
                backgroundColor: answers[i]
                  ? '#4CAF50'      // Green = answered
                  : visited.has(i)
                    ? '#FFA000'  // Yellow = visited
                    : '#BDBDBD', // Grey = not visited
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <div style={styles.buttons}>
          <button
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex(currentIndex - 1)}
            style={styles.btn}
          >
            Previous
          </button>

          <button
            disabled={currentIndex === questions.length - 1}
            onClick={() => {
              setCurrentIndex(currentIndex + 1);
              setVisited(new Set([...visited, currentIndex + 1]));
            }}
            style={styles.btn}
          >
            Next
          </button>

          <button
            onClick={handleSubmit}
            style={{ ...styles.btn, backgroundColor: '#E53935' }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: '#f2f2f2',
    padding: '20px',
    boxSizing: 'border-box',
  },
  container: {
    width: '100%',
    maxWidth: '750px',
    padding: '30px',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif',
    color: '#000',
  },
  timer: {
    fontSize: '20px',
    marginBottom: '20px',
    color: '#d32f2f',
    fontWeight: 'bold',
    textAlign: 'right',
  },
  question: {
    background: '#f9f9f9',
    padding: '20px',
    borderRadius: '12px',
    marginBottom: '25px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
  },
  choice: {
    backgroundColor: '#f1f1f1',
    borderRadius: '6px',
    padding: '10px',
    margin: '10px 0',
    transition: '0.3s',
  },
  nav: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(35px, 1fr))',
    gap: '6px',
    marginBottom: '20px',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
    marginTop: '20px',
    flexWrap: 'wrap',
  },
  btn: {
    padding: '10px 20px',
    backgroundColor: '#2196F3',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};

export default Quiz;
