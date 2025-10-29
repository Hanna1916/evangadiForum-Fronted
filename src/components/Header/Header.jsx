import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { AuthContext } from "../../context/AuthContext";
import logo from "../../assets/logo.png";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/auth");
    setMenuOpen(false);
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        {/* Left: Logo */}
        <div className={styles.logo}>
          <Link to="/">
            <img
              src={logo}
              alt="Evangadi Forum Logo"
              className={styles.logoImg}
            />
          </Link>
        </div>

        {/* Hamburger */}
        <div className={styles.hamburger} onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>

        {/* Navigation */}
        <nav className={`${styles.nav} ${menuOpen ? styles.active : ""}`}>
          <Link
            to="/"
            className={styles.link}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/detail"
            className={styles.link}
            onClick={() => setMenuOpen(false)}
          >
            How It Works
          </Link>

          {!user ? (
            <Link
              to="/auth"
              className={styles.authBtn}
              onClick={() => setMenuOpen(false)}
            >
              SIGN IN
            </Link>
          ) : (
            <>
             
              <button onClick={handleLogout} className={styles.logoutBtn}>
                LOG OUT
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
