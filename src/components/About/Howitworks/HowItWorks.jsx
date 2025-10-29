import React from "react";
import styles from "./How.module.css";
import {
  FaUserPlus,
  FaSignInAlt,
  FaQuestionCircle,
  FaReply,
  FaSmile,
} from "react-icons/fa";

const HowItWorks = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>How It Works</h1>
      <p className={styles.subtitle}>
        Welcome to the <strong>Evangadi Q&amp;A Platform</strong> — a community
        where students ask programming-related questions, share knowledge, and
        learn together.
      </p>

      <div className={styles.steps}>
        {/* Step 1 */}
        <div className={styles.stepCard}>
          <FaUserPlus className={styles.icon} />
          <h3>Create an Account</h3>
          <p>
            Click on <strong>Sign Up</strong> to create your account. Provide
            your first name, last name, username, email, and password (at least
            8 characters).
          </p>
        </div>

        {/* Step 2 */}
        <div className={styles.stepCard}>
          <FaSignInAlt className={styles.icon} />
          <h3>Log In</h3>
          <p>
            Already registered? Use your email and password to log in and access
            your personalized dashboard.
          </p>
        </div>

        {/* Step 3 */}
        <div className={styles.stepCard}>
          <FaQuestionCircle className={styles.icon} />
          <h3>Ask or Explore Questions</h3>
          <p>
            On the Questions Page, browse or click “Ask a Question” to post your
            own. Add a clear title and description to get helpful answers.
          </p>
        </div>

        {/* Step 4 */}
        <div className={styles.stepCard}>
          <FaReply className={styles.icon} />
          <h3>Answer Questions</h3>
          <p>
            Click on any question to view details and answers. Share your
            knowledge by posting your own answer.
          </p>
        </div>

        {/* Step 5 */}
        <div className={styles.stepCard}>
          <FaSmile className={styles.icon} />
          <h3>Learn, Share & Grow</h3>
          <p>
            Stay respectful and helpful — together we grow as Evangadi
            developers. Ask, learn, and support one another.
          </p>
        </div>
      </div>

      <div className={styles.footer}>
        <p>Ask • Learn • Share — The Evangadi Way</p>
      </div>
    </div>
  );
};

export default HowItWorks;
