import { Link } from "react-router-dom";
import styles from "./About.module.css";

const About = () => {
  return (
    // 1. Component Structure
    <div className={styles.aboutContainer}>
      <div className={styles.aboutContent}>
        {/* About Heading */}
        <h5 className={styles.subHeading}>About</h5>
        <h1 className={styles.mainHeading}>Evangadi Networks</h1>

        {/* Paragraph 1 */}
        <p className={styles.paragraph}>
          No matter what stage of life you are in, whether you're just starting
          elementary school or being promoted to CEO of a Fortune 500 company,
          you have much to offer to those who are trying to follow in your
          footsteps.
        </p>

        {/* Paragraph 2 */}
        <p className={styles.paragraph}>
          Whether you are willing to share your knowledge or you are just
          looking to meet mentors of your own, please start by joining the
          network here.
        </p>

        {/* 3. Content Integration: "HOW IT WORKS" Button/Link */}
        <Link to="/detail" className={styles.howItWorksButton}>
          HOW IT WORKS
        </Link>
      </div>

      {/* 3. Content Integration: The abstract corner graphic */}
      <div className={styles.abstractGraphic}></div>
    </div>
  );
};

export default About;
