import { useState, useEffect, useContext } from "react";
import styles from "./QuestionPage.module.css";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

const QuestionPage = () => {
  const { token } = useContext(AuthContext);
  const [questions, setQuestions] = useState([]);
  const [search] = useState({ title: "", description: "" });
  const [newQuestion, setNewQuestion] = useState({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState(""); // feedback message

  // Fetch questions
  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/question/");
      setQuestions(res.data.questions || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load questions. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleChange = (e, stateUpdater) => {
    const { name, value } = e.target;
    stateUpdater((prev) => ({ ...prev, [name]: value }));
  };

  // Post a new question with message feedback
  const handlePostQuestion = async () => {
    if (!newQuestion.title.trim() || !newQuestion.description.trim()) {
      setMessage(" Please enter both title and description.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      // ✅ FIXED: Added /api prefix and trailing slash
      const res = await api.post("/api/question/", newQuestion);

      setQuestions((prev) => [res.data, ...prev]);
      setNewQuestion({ title: "", description: "" });
      setMessage(" Question posted successfully!");
    } catch (err) {
      console.error("Post error:", err);
      console.error("Error details:", err.response?.data);
      setMessage(err.response?.data?.message || "❌ Failed to post question.");
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const filteredQuestions = questions.filter((q) => {
    const matchTitle = q.title
      ?.toLowerCase()
      .includes(search.title.toLowerCase());
    const matchDesc = q.description
      ?.toLowerCase()
      .includes(search.description.toLowerCase());
    return matchTitle && matchDesc;
  });

  return (
    <div className={styles.questionPageWrapper}>
      <div className={styles.stepsSection}>
        <h2>Steps to Write a Good Question</h2>
        <ul>
          <li>➤ Be clear and concise</li>
          <li>➤ Provide context and examples</li>
          <li>➤ Check for duplicates</li>
          <li>➤ Use proper tags</li>
        </ul>
      </div>

      <div className={styles.postSection}>
        <h2>Post Your Question</h2>

        <input
          type="text"
          name="title"
          placeholder="Question title"
          value={newQuestion.title}
          onChange={(e) => handleChange(e, setNewQuestion)}
          className={styles.titleSearch}
        />
        <textarea
          name="description"
          placeholder="Describe your question..."
          value={newQuestion.description}
          onChange={(e) => handleChange(e, setNewQuestion)}
          className={styles.descriptionSearch}
        />

        {/* Show message */}
        {message && <p className={styles.message}>{message}</p>}

        <button
          onClick={handlePostQuestion}
          className={styles.postButton}
          disabled={loading}
        >
          {loading ? "Posting..." : "Post Question"}
        </button>
      </div>
    </div>
  );
};

export default QuestionPage;
