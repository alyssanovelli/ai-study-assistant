import { useState } from 'react'
import ReactMarkdown from 'react-markdown'

function App() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)

  const askQuestion = async () => {
    if (!question.trim()) return;

    setLoading(true)
    setAnswer("")

    try {
    const response = await fetch('http://127.0.0.1:8000/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question: question,
      }),
    });

    const data = await response.json()
    setAnswer(data.answer)
    } catch (error) {
      setAnswer("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="App">
      <h1>StudyAI</h1>

      <p>Ask questions about what you're studying!</p>

      <input
        type="text"
        placeholder="Ask a question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            askQuestion();
          }
        }}
      />
      <button onClick={askQuestion} disabled={loading}>
        {loading ? 'Thinking...' : 'Ask'}
      </button>

      {answer && (
      <div>
        <h2>Answer:</h2>
        
        <ReactMarkdown>{answer}</ReactMarkdown>
      </div>
      )}
    </div>
    );
}
export default App