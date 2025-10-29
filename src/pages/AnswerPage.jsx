import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Answer from "../components/Answer/Answer";
import { getSingleQuestion, getAnswers, postAnswer } from "../services/api";

const AnswerPage = () => {
  const { questionId } = useParams();
  const { user } = useContext(AuthContext);

  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  console.log("🔍 AnswerPage mounted");
  console.log("🔍 questionId from URL:", questionId);
  console.log("🔍 User context:", user);

  // Fetch question and its answers
  useEffect(() => {
    console.log("🔄 useEffect running for questionId:", questionId);

    const fetchData = async () => {
      try {
        setError("");
        console.log("📡 Fetching question data for ID:", questionId);

        // Fetch the question and answers in parallel
        const [resQuestion, resAnswers] = await Promise.all([
          getSingleQuestion(questionId),
          getAnswers(questionId),
        ]);

        console.log("✅ Question response:", resQuestion.data);
        console.log("✅ Answers response:", resAnswers.data);

        if (!resQuestion.data.question) {
          throw new Error("Question not found");
        }

        setQuestion(resQuestion.data.question);
        setAnswers(resAnswers.data.answers || []);
      } catch (err) {
        console.error("❌ Error in fetchData:", err);
        console.error("❌ Error details:", err.response?.data);
        setError(err.response?.data?.message || "Failed to load question");
      } finally {
        setLoading(false);
      }
    };

    if (questionId) {
      fetchData();
    } else {
      setError("No question ID provided");
      setLoading(false);
    }
  }, [questionId]);

  // Monitor state changes
  useEffect(() => {
    console.log("📊 Answers state updated:", answers);
  }, [answers]);

  const handlePostAnswer = async (content) => {
    // ... your existing post answer logic
    try {
      await postAnswer({
        question_id: questionId,
        answer: content,
      });
      // Refresh answers after posting
      const resAnswers = await getAnswers(questionId);
      setAnswers(resAnswers.data.answers || []);
    } catch (error) {
      console.error("Error posting answer:", error);
      throw error;
    }
  };

  if (loading) {
    console.log("⏳ AnswerPage: Still loading...");
    return (
      <p style={{ textAlign: "center" }}>Loading question and answers...</p>
    );
  }

  if (error) {
    console.log("❌ AnswerPage: Error -", error);
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => window.history.back()}>Go Back</button>
      </div>
    );
  }

  if (!question) {
    console.log("❌ AnswerPage: No question found");
    return <p style={{ textAlign: "center" }}>Question not found</p>;
  }

  console.log("🎯 AnswerPage rendering with:", { question, answers });
  console.log("🎯 AnswerPage passing to Answer component:", {
    question: question?.title,
    answersCount: answers?.length,
    answers: answers,
  });

  return (
    <div>
      <h1>Answer Page</h1>
      <Answer
        question={question}
        answers={answers}
        onPostAnswer={handlePostAnswer}
        currentUser={user}
      />
    </div>
  );
};

// ✅ MAKE SURE THIS EXPORT EXISTS ✅
export default AnswerPage;
