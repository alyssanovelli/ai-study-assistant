import { useState } from "react";
import ReactMarkdown from "react-markdown";

function App() {
  // User's question
  const [question, setQuestion] = useState("");

  // AI's answer
  const [answer, setAnswer] = useState("");

  // Loading state
  const [loading, setLoading] = useState(false);

  // Send question to backend
  const askQuestion = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setAnswer("");

    try {
      // Call FastAPI
      const response = await fetch("http://127.0.0.1:8000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
        }),
      });

      // Get response data
      const data = await response.json();

      setAnswer(data.answer);
    } catch (error) {
      setAnswer("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // Page
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Header */}
      <header className="border-b border-slate-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          {/* Logo */}
          <div>
            <h1 className="text-xl font-bold">
              StudyAI
            </h1>

            <p className="text-sm text-slate-400">
              Your AI-powered study companion
            </p>
          </div>

          {/* Upload button */}
          <button className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-200">
            + New Document
          </button>

        </div>
      </header>

      {/* Main layout */}
      <div className="mx-auto flex max-w-7xl">

        {/* Sidebar */}
        <aside className="hidden min-h-[calc(100vh-73px)] w-64 border-r border-slate-800 p-6 md:block">

          <h2 className="mb-4 text-sm font-semibold text-slate-400">
            YOUR DOCUMENTS
          </h2>

          {/* Document list */}
          <div className="space-y-2">

            <button className="w-full rounded-lg bg-slate-800 p-3 text-left text-sm">
              📄 Discrete Mathematics
            </button>

            <button className="w-full rounded-lg p-3 text-left text-sm text-slate-400 hover:bg-slate-900">
              📄 Java Notes
            </button>

            <button className="w-full rounded-lg p-3 text-left text-sm text-slate-400 hover:bg-slate-900">
              📄 Computer Architecture
            </button>

          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 px-6 py-12">

          <div className="mx-auto max-w-4xl">

            {/* Welcome */}
            <div className="mb-10">

              <p className="mb-2 text-sm font-medium text-blue-400">
                STUDYAI
              </p>

              <h2 className="text-4xl font-bold tracking-tight">
                What are you studying today?
              </h2>

              <p className="mt-3 text-slate-400">
                Ask questions about your uploaded study materials.
              </p>

            </div>

            {/* Question box */}
            <div className="rounded-2xl border border-slate-700 bg-slate-900 p-4 shadow-xl">

              <textarea
                className="min-h-32 w-full resize-none bg-transparent p-2 text-lg outline-none placeholder:text-slate-600"
                placeholder="Ask a question..."
                value={question}

                // Update question
                onChange={(event) => setQuestion(event.target.value)}

                // Enter = submit
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    askQuestion();
                  }
                }}
              />

              <div className="flex justify-end border-t border-slate-800 pt-3">

                <button
                  onClick={askQuestion}
                  disabled={loading}
                  className="rounded-lg bg-blue-600 px-5 py-2 font-medium hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? "Thinking..." : "Ask AI"}
                </button>

              </div>
            </div>

            {/* AI answer */}
            {answer && (
              <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">

                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-400">
                  AI Answer
                </h3>

                {/* Render Markdown */}
                <div className="prose prose-invert max-w-none">
                  <ReactMarkdown>
                    {answer}
                  </ReactMarkdown>
                </div>

              </div>
            )}

            {/* Recent documents */}
            <section className="mt-12">

              <h3 className="mb-4 text-xl font-semibold">
                Recent Documents
              </h3>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                {/* Document card */}
                <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">

                  <div className="mb-4 text-2xl">
                    📄
                  </div>

                  <h4 className="font-medium">
                    Discrete Mathematics
                  </h4>

                  <p className="mt-1 text-sm text-slate-500">
                    12 chunks
                  </p>

                </div>

                {/* Document card */}
                <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">

                  <div className="mb-4 text-2xl">
                    📄
                  </div>

                  <h4 className="font-medium">
                    Java Notes
                  </h4>

                  <p className="mt-1 text-sm text-slate-500">
                    8 chunks
                  </p>

                </div>

              </div>
            </section>

          </div>
        </main>
      </div>
    </div>
  );
}

export default App;