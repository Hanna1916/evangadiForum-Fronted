// import { useContext } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
//   useLocation,
//   useParams,
// } from "react-router-dom";

// import Header from "../components/Header/Header";
// import Footer from "../components/Footer/Footer";
// import AuthPage from "../pages/AuthPage";
// import HomePage from "../pages/HomePage";
// import About from "../components/About/About";
// import QuestionPage from "../pages/QuestionPage";
// import AnswerPage from "../pages/AnswerPage";
// import { AuthContext } from "../context/AuthContext";
// import Answer from "../components/Answer/Answer";
// import HowItWorks from "../components/About/Howitworks/HowItWorks";

// // Protected Route wrapper
// const ProtectedRoute = ({ children }) => {
//   const { user, loading } = useContext(AuthContext);
//   const location = useLocation();

//   if (loading)
//     return (
//       <div style={{ textAlign: "center", marginTop: "20vh" }}>
//         <div className="spinner" />
//         Checking authentication...
//       </div>
//     );

//   if (!user)
//     return <Navigate to="/auth/login" replace state={{ from: location }} />;

//   return children;
// };

// // Redirect helper for legacy /question/:question_id links
// const RedirectToAnswer = () => {
//   const { question_id } = useParams();
//   if (!question_id) return <Navigate to="/home" />;
//   return <Navigate to={`/answer/${question_id}`} replace />;
// };

// const AppRouter = () => {
//   return (
//     <Router>
//       <Header />

//       <Routes>
//         {/* Default redirect */}
//         <Route path="/" element={<Navigate to="/home" />} />

//         {/* Home (protected) */}
//         <Route
//           path="/home"
//           element={
//             <ProtectedRoute>
//               <HomePage />
//             </ProtectedRoute>
//           }
//         />

//         {/* Auth */}
//         <Route path="/auth" element={<Navigate to="/auth/login" />} />
//         <Route path="/auth/login" element={<AuthPage />} />
//         <Route path="/auth/signup" element={<AuthPage />} />

//         {/* About */}
//         <Route path="/about" element={<About />} />
//         <Route path='/detail' element={<HowItWorks/> } />

//         {/* Question post page (Ask Question) */}
//         <Route
//           path="/question/post"
//           element={
//             <ProtectedRoute>
//               <QuestionPage />
//             </ProtectedRoute>
//           }
//         />

//         {/* Legacy question route - redirect to answer page while preserving id */}
//         <Route path="/question/:question_id" element={<RedirectToAnswer />} />

//         {/* Answer Page (canonical) */}
//         <Route
//           path="/answer/:questionId"
//           element={
//             <ProtectedRoute>
//               <AnswerPage />
//             </ProtectedRoute>
//           }
//         />

//         {/* Fallback */}
//         <Route path="*" element={<Navigate to="/home" />} />
//       </Routes>

//       <Footer />
//     </Router>
//   );
// };

// export default AppRouter;
import { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useParams,
} from "react-router-dom";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import AuthPage from "../pages/AuthPage";
import HomePage from "../pages/HomePage";
import About from "../components/About/About";
import QuestionPage from "../pages/QuestionPage";
import { AuthContext } from "../context/AuthContext";
import AnswerPage from "../pages/AnswerPage";
import HowItWorks from "../components/About/Howitworks/HowItWorks";

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading)
    return (
      <div style={{ textAlign: "center", marginTop: "20vh" }}>
        <div className="spinner" />
        Checking authentication...
      </div>
    );

  if (!user)
    return <Navigate to="/auth/login" replace state={{ from: location }} />;

  return children;
};

// Redirect helper for legacy /question/:question_id links
const RedirectToAnswer = () => {
  const { question_id } = useParams();
  if (!question_id) return <Navigate to="/home" />;
  return <Navigate to={`/answer/${question_id}`} replace />;
};

const AppRouter = () => {
  return (
    <Router>
      <Header />

      <Routes>
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/home" />} />

        {/* Home (protected) */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

        {/* Auth */}
        <Route path="/auth" element={<Navigate to="/auth/login" />} />
        <Route path="/auth/login" element={<AuthPage />} />
        <Route path="/auth/signup" element={<AuthPage />} />

        {/* About */}
        <Route path="/about" element={<About />} />
        <Route path="/detail" element={<HowItWorks />} />

        {/* Question post page (Ask Question) */}
        <Route
          path="/question/post"
          element={
            <ProtectedRoute>
              <QuestionPage />
            </ProtectedRoute>
          }
        />

        {/* Legacy question route - redirect to answer page while preserving id */}
        <Route path="/question/:question_id" element={<RedirectToAnswer />} />

        {/* Answer Page (canonical) - ONLY KEEP THIS ONE */}
        <Route
          path="/answer/:questionId"
          element={
            <ProtectedRoute>
              <AnswerPage />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>

      <Footer />
    </Router>
  );
};

export default AppRouter;
