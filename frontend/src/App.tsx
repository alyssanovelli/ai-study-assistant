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
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5]">

      {/* Header */}
      <header className="border-b border-[#262626] bg-[#0a0a0a]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          {/* Logo */}
          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#450a0a] text-sm font-bold text-[#fca5a5]">
              S
            </div>

            <div>
              <h1 className="text-xl font-semibold tracking-tight">
                StudyAI
              </h1>

              <p className="text-sm text-[#737373]">
                Your AI-powered study companion
              </p>
            </div>

          </div>

          {/* Upload button */}
          <label className="cursor-pointer rounded-lg bg-[#f5f5f5] px-4 py-2 text-sm font-medium text-[#0a0a0a] transition hover:bg-[#d4d4d4]">
            + New Document

            <input
              type="file"
              accept=".pdf,.docx,.txt"
              className="hidden"
            />
          </label>

        </div>
      </header>

      {/* Main layout */}
      <div className="mx-auto flex max-w-7xl">

        {/* Sidebar */}
        <aside className="hidden min-h-[calc(100vh-73px)] w-64 border-r border-[#262626] p-6 md:block">

          <h2 className="mb-4 text-xs font-semibold tracking-wider text-[#737373]">
            YOUR DOCUMENTS
          </h2>

          {/* Document list */}
          <div className="space-y-1">

            {/* Active document */}
            <button className="w-full rounded-lg border border-[#3f1717] bg-[#1c1111] p-3 text-left text-sm text-[#f5f5f5] transition hover:bg-[#241515]">
              <span className="mr-2">📄</span>
              Discrete Mathematics
            </button>

            <button className="w-full rounded-lg p-3 text-left text-sm text-[#a3a3a3] transition hover:bg-[#171717] hover:text-[#f5f5f5]">
              <span className="mr-2">📄</span>
              Java Notes
            </button>

            <button className="w-full rounded-lg p-3 text-left text-sm text-[#a3a3a3] transition hover:bg-[#171717] hover:text-[#f5f5f5]">
              <span className="mr-2">📄</span>
              Computer Architecture
            </button>

          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 px-6 py-16">

          <div className="mx-auto max-w-4xl">

            {/* Welcome */}
            <div className="mb-10">

              <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-[#a33a3a]">
                STUDYAI
              </p>

              <h2 className="text-4xl font-semibold tracking-tight text-[#f5f5f5]">
                What are you studying today?
              </h2>

              <p className="mt-3 text-[#737373]">
                Ask questions about your uploaded study materials.
              </p>

            </div>

            {/* Question box */}
            <div className="rounded-2xl border border-[#2a2a2a] bg-[#141414] p-4 shadow-2xl shadow-black/20 transition focus-within:border-[#5c2020]">

              <textarea
                className="min-h-32 w-full resize-none bg-transparent p-2 text-lg text-[#f5f5f5] outline-none placeholder:text-[#525252]"
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

              <div className="flex justify-between border-t border-[#262626] pt-3">

                <p className="self-center text-xs text-[#525252]">
                  Press Enter to ask
                </p>

                {/* Ask button */}
                <button
                  onClick={askQuestion}
                  disabled={loading}
                  className="rounded-lg bg-[#7f1d1d] px-5 py-2 text-sm font-medium text-[#fff5f5] transition hover:bg-[#991b1b] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {loading ? "Thinking..." : "Ask AI"}
                </button>

              </div>
            </div>

            {/* AI answer */}
            {answer && (
              <div className="mt-8 rounded-2xl border border-[#3a2424] bg-[#141414] p-6">

                {/* AI header */}
                <div className="mb-5 flex items-center gap-3">

                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#450a0a] text-xs font-bold text-[#fca5a5]">
                    AI
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-[#f5f5f5]">
                      AI Answer
                    </h3>

                    <p className="text-xs text-[#737373]">
                      StudyAI
                    </p>
                  </div>

                </div>

                {/* Render Markdown */}
                <div className="prose prose-invert max-w-none text-[#d4d4d4]">
                  <ReactMarkdown>
                    {answer}
                  </ReactMarkdown>
                </div>

              </div>
            )}

            {/* Recent documents */}
            <section className="mt-16">

              <div className="mb-5">

                <h3 className="text-xl font-semibold text-[#f5f5f5]">
                  Recent Documents
                </h3>

                <p className="mt-1 text-sm text-[#737373]">
                  Your uploaded study materials
                </p>

              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                {/* Document card */}
                <div className="cursor-pointer rounded-xl border border-[#262626] bg-[#141414] p-5 transition hover:border-[#3a3a3a] hover:bg-[#1a1a1a]">

                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-[#1f1515] text-lg">
                    📄
                  </div>

                  <h4 className="font-medium text-[#f5f5f5]">
                    Discrete Mathematics
                  </h4>

                  <p className="mt-2 text-sm text-[#737373]">
                    12 chunks
                  </p>

                </div>

                {/* Document card */}
                <div className="cursor-pointer rounded-xl border border-[#262626] bg-[#141414] p-5 transition hover:border-[#3a3a3a] hover:bg-[#1a1a1a]">

                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-[#1f1515] text-lg">
                    📄
                  </div>

                  <h4 className="font-medium text-[#f5f5f5]">
                    Java Notes
                  </h4>

                  <p className="mt-2 text-sm text-[#737373]">
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