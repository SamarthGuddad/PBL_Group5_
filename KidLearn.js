import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './KidLearn.css'; // Assuming you'll create a separate CSS file

import { Link } from "react-router-dom";

const KidLearn = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("firstName");
    if (name) {
      setFirstName(name);
    }
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('firstName');
    localStorage.removeItem('email');
    navigate('/login'); 
  };

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.feature-card, .category-card, .approach-box').forEach((el) => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div>
      {/* Navbar */}
      <nav>
        <div className="navbar">
          <Link to="/" className="logo">
            <div className="logo-circle">K</div>
            <span className="logo-text">KidLearn</span>
          </Link>

          <div className="nav-menu">
            <Link to="/games" className="nav-item">
              <i className="fas fa-brain"></i>
              <span>Math</span>
            </Link>

            <Link to="/read" className="nav-item">
              <i className="fas fa-book-open"></i>
              <span>Stories</span>
            </Link>

            <Link to="/fun" className="nav-item">
              <i className="fas fa-award"></i>
              <span>Fun Games</span>
            </Link>

            <Link to="/dash" className="nav-item">
              <i className="fas fa-award"></i>
              <span>DashBoard</span>
            </Link>
          </div>

                <div>
            {firstName ? (
              <>
                <h2>Welcome {firstName}!</h2>
                <button onClick={handleLogout} className="btn btn-primary">Logout</button>
              </>
            ) : (
              <span>
                <Link to="/login">
                <a className="btn btn-outline">Log In</a>
                </Link>
                <Link to="/signup">
                <a className="btn btn-primary">Sign Up</a>
                </Link>
              </span>
            )}
          </div>

          <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
            <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>

        <div className={`mobile-nav ${isMobileMenuOpen ? 'active' : ''}`} id="mobileNav">
          <Link to="/games" className="nav-item">
            <i className="fas fa-brain"></i>
            <span>Math</span>
          </Link>

          <Link to="/read" className="nav-item">
            <i className="fas fa-book-open"></i>
            <span>Stories</span>
          </Link>

          <Link to="/fun" className="nav-item">
            <i className="fas fa-award"></i>
            <span>Fun Games</span>
          </Link>

          <a href="#" className="btn btn-outline">Log In</a>
          <a href="#" className="btn btn-primary">Sign Up</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Learning is <span>Fun</span> with KidLearn!</h1>
            <p>Explore exciting Math lessons, read wonderful Stories, and challenge yourself with fun Quizzes , also keeping track of your Progress.</p>
            <div className="hero-buttons">
              
              <Link to="/">
              <a className="btn btn-primary">Start Learning</a>
              </Link>
              
              <Link to="/dash">
              <a href="#" className="btn btn-outline">Keep Track Of Your Progress</a>
              </Link>
            </div>
          </div>

          <div className="hero-image">
            <img
              src="https://img.freepik.com/premium-vector/vector-illustration-schoolboy-carrying-books-apple_43633-3418.jpg?ga=GA1.1.1579530458.1739508117&semt=ais_hybrid"
              alt="Happy kids learning"
            />
            <div className="shape shape-yellow"></div>
            <div className="shape shape-orange"></div>
            <div className="shape shape-green"></div>
          </div>
        </div>

        <div className="bg-shape-1"></div>
        <div className="bg-shape-2"></div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <div className="section-header">
          <h2>Explore Learning Categories</h2>
          <p>Discover exciting learning activities across different subjects designed specially for kids</p>
        </div>

        <div className="category-cards">
          <div className="category-card math">
            <div className="category-icon">
              <i className="fas fa-brain"></i>
            </div>
            <h3>Math Adventures</h3>
            <p>Fun games and puzzles to learn numbers, counting, shapes, and basic math operations.</p>
            <Link to="/games" className="category-link">
              Explore Now
              <i className="fas fa-chevron-right"></i>
            </Link>
          </div>

          <div className="category-card story">
            <div className="category-icon">
              <i className="fas fa-book-open"></i>
            </div>
            <h3>Story Time</h3>
            <p>Exciting stories with colorful illustrations to improve reading skills and vocabulary.</p>
            <Link to="/read" className="category-link">
              Explore Now
              <i className="fas fa-chevron-right"></i>
            </Link>
          </div>

          <div className="category-card quiz">
            <div className="category-icon">
              <i className="fas fa-award"></i>
            </div>
            <h3>Fun Quizzes</h3>
            <p>Interactive quizzes and challenges that make learning enjoyable and rewarding.</p>
            <Link to="/fun" className="category-link">
              Explore Now
              <i className="fas fa-chevron-right"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="info-section">
        <div className="section-header">
          <h2>Why Choose KidLearn?</h2>
          <p>Our platform is designed to make learning a joyful experience while ensuring educational value</p>
        </div>

        <div className="features">
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-heart"></i>
            </div>
            <h3>Kid-Friendly</h3>
            <p>Designed specifically for children with intuitive navigation and colorful interfaces</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-bullseye"></i>
            </div>
            <h3>Age-Appropriate</h3>
            <p>Content tailored for different age groups ensuring the right challenge level</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-star"></i>
            </div>
            <h3>Expert-Created</h3>
            <p>Curriculum developed by educators with years of experience in child education</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-smile"></i>
            </div>
            <h3>Fun Learning</h3>
            <p>Interactive activities that make education enjoyable and memorable</p>
          </div>
        </div>

        <div className="approach-box">
          <div className="approach-image">
            <div className="approach-image-container">
              <div className="approach-bg"></div>
              <img
                src="https://img.freepik.com/free-vector/boy-read-books-white-background_1308-101904.jpg?ga=GA1.1.1579530458.1739508117&semt=ais_hybrid"
                alt="Happy learning"
              />
            </div>
          </div>

          <div className="approach-content">
            <h3>Our Learning Approach</h3>
            <p>
              At KidLearn, we believe that children learn best when they're having fun. Our platform combines
              educational content with engaging activities to create a positive learning experience.
            </p>
            <p>
              Through interactive lessons, colorful animations, and rewarding challenges, we help children
              develop a love for learning that will benefit them throughout their educational journey.
            </p>

            <div className="tags">
              <span className="tag tag-yellow">Interactive Learning</span>
              <span className="tag tag-green">Visual Engagement</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-content">
          <div className="footer-grid">
            <div className="footer-column">
              <div className="footer-logo">
                <div className="footer-logo-circle">K</div>
                <span className="footer-logo-text">KidLearn</span>
              </div>
              <p className="footer-description">
                Making learning fun and engaging for children of all ages through interactive educational content.
              </p>
              <div className="social-icons">
                <a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
                <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
                <a href="#" className="social-icon"><i className="fab fa-youtube"></i></a>
              </div>
            </div>

            <div className="footer-column">
              <h3>Quick Links</h3>
              <ul className="footer-links">
                <li><a href="#">Home</a></li>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Our Programs</a></li>
                <li><a href="#">Testimonials</a></li>
                <li><a href="#">Contact Us</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h3>Learning Categories</h3>
              <ul className="footer-links">
                <li><a href="#">Math Adventures</a></li>
                <li><a href="#">Story Time</a></li>
                <li><a href="#">Fun Quizzes</a></li>
                <li><a href="#">Science Experiments</a></li>
                <li><a href="#">Art & Crafts</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h3>For Parents</h3>
              <ul className="footer-links">
                <li><a href="#">Privacy & Safety</a></li>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Support</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2025 KidLearn. All rights reserved.</p>
            <div className="made-with">
              Made with <span className="heart"><i className="fas fa-heart"></i></span> for curious young minds
            </div>
          </div>
        </div>
      </footer>
      {/* Do not remove this script tag */}
      <script src="https://cdn.gpteng.co/gptengineer.js" type="module"></script>
    </div>
  );
};

export default KidLearn;