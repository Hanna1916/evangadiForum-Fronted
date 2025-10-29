import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

// Assuming the logo is available here (as per previous context)
import EvangadiLogo from "../../assets/footerlogo.png";
// Assuming you have SVG or font-awesome icons for socials (placeholders used here)
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    // 1. Component Structure
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {/* === Column 1: Logo and Socials === */}
        <div className={styles.logoAndSocials}>
          <Link to="/" className={styles.logoLink}>
            <img
              src={EvangadiLogo}
              alt="Evangadi Forum Logo"
              className={styles.logoImage}
            />
          </Link>

          <div className={styles.socialIcons}>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
            >
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* === Column 2: Useful Links === */}
        <div className={styles.footerSection}>
          <h4 className={styles.sectionTitle}>Useful Link</h4>
          <ul className={styles.linkList}>
            <li>
              <Link to="/detail" className={styles.footerLink}>
                How it works
              </Link>
            </li>
            <li>
              <Link to="/terms" className={styles.footerLink}>
                Terms of Service
              </Link>
            </li>
            <li>
              <Link to="/privacy" className={styles.footerLink}>
                Privacy policy
              </Link>
            </li>
          </ul>
        </div>

        {/* === Column 3: Contact Info === */}
        <div className={styles.footerSection}>
          <h4 className={styles.sectionTitle}>Contact Info</h4>
          <p className={styles.contactText}>Evangadi Networks</p>
          <p className={styles.contactText}>
            <a href="mailto:support@evangadi.com" className={styles.footerLink}>
              support@evangadi.com
            </a>
          </p>
          <p className={styles.contactText}>
            <a href="tel:+12023862702" className={styles.footerLink}>
              +1 202-386-2702
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
