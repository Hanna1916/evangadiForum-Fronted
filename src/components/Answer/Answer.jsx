import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import styles from "./Answer.module.css";

const Answer = ({ question, answers, onPostAnswer, currentUser }) => {
  console.log("🔍 Answer component received:", {
    questionTitle: question?.title,
    answersCount: answers?.length,
    answers: answers,
  });
  const [newAnswer, setNewAnswer] = useState("");
  const [posting, setPosting] = useState(false);

  const handleSubmit = async () => {
    if (!newAnswer.trim()) return;
    setPosting(true);
    try {
      await onPostAnswer(newAnswer);
      setNewAnswer("");
    } catch (err) {
      console.error("onPostAnswer failed:", err);
      throw err;
    } finally {
      setPosting(false);
    }
  };

  const navigate = useNavigate();

  return (
    <div className={styles.answerPage}>
      {/* Small heading */}
      <div className={styles.questionSection}>
        <div style={{ fontSize: 14, color: "#333", marginBottom: 6 }}>
          <h2> Question</h2>
        </div>
        <h2 className={styles.questionTitle}>{question?.title}</h2>
        <p className={styles.questionContent}>{question?.description}</p>
      </div>

      {/* Answers Section */}
      <div className={styles.answersSection}>
        <h3 className={styles.answersTitle}>Answer From The Community</h3>
        {!answers || answers.length === 0 ? (
          <p>No answers yet. Be the first to reply!</p>
        ) : (
          answers.map((ans) => (
            <div key={ans.answer_id} className={styles.answerItem}>
              <div className={styles.userInfo}>
                {ans.user_avatar ? (
                  <img
                    src={ans.user_avatar}
                    alt={ans.username || ans.user_name || "Anonymous"}
                    className={styles.avatar}
                  />
                ) : (
                  <FaUserCircle className={styles.avatarIcon} />
                )}
                <span className={styles.username}>
                  {ans.username || ans.user_name || "Anonymous"}
                </span>
              </div>
              <div className={styles.answerContent}>
                <div className={styles.answerBodyBox}>{ans.answer}</div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Centered Post Card */}
      {currentUser && (
        <div className={styles.postAnswer}>
          <div className={styles.postCard}>
            <h3>Answer The Top Question</h3>
            <div
              className="goLink"
              style={{ textAlign: "center", marginBottom: 10 }}
            >
              <button
                onClick={() => navigate("/home")}
                style={{
                  border: "none",
                  background: "transparent",
                  color: "#6b6b6b",
                  cursor: "pointer",
                }}
              >
                Go to Question page
              </button>
            </div>
            <textarea
              className={styles.answerInput}
              placeholder="Your Answer..."
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              disabled={posting}
            ></textarea>
            <button
              className={styles.postButton}
              onClick={handleSubmit}
              disabled={!newAnswer.trim() || posting}
            >
              {posting ? "Posting..." : "Post Your Answer"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Answer;
