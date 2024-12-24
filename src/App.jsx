import { useEffect, useState } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Contact from './pages/Contact';
import About from './pages/About';
import Services from './pages/Services';
import './App.css'
import useScrollToTop from './hooks/useScrollToTop';
import { useIntersectionObserver } from './hooks/useIntersectionObserver';
import SubmissionSuccess from './pages/SubmissionSuccess';

function App() {
  const navigate = useNavigate();
  const [heroFormData, setHeroFormData] = useState({
    businessName: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    fundingAmount: ''
  });

  const handleHeroFormChange = (e) => {
    const { name, value } = e.target;
    setHeroFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleHeroFormSubmit = (e) => {
    e.preventDefault();
    navigate('/contact', { 
      state: { 
        formData: {
          ...heroFormData,
          fullName: `${heroFormData.firstName} ${heroFormData.lastName}`
        } 
      } 
    });
  };

  useScrollToTop();

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('.header')
      if (window.scrollY > 50) {
        header.classList.add('scrolled')
      } else {
        header.classList.remove('scrolled')
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useIntersectionObserver('.animate-fade-in');
  useIntersectionObserver('.feature');

  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('reset');
          const animatedElements = entry.target.querySelectorAll('.animate-fade-up');
          animatedElements.forEach(el => {
            el.classList.remove('reset');
            el.style.animation = 'none';
            el.offsetHeight;
            el.style.animation = '';
          });
        } else {
          entry.target.classList.add('reset');
          const animatedElements = entry.target.querySelectorAll('.animate-fade-up');
          animatedElements.forEach(el => el.classList.add('reset'));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.2
    });

    const elements = document.querySelectorAll('.hero-left, .services-grid, .features-grid');
    elements.forEach(element => observer.observe(element));

    return () => {
      elements.forEach(element => observer.unobserve(element));
    };
  }, []);

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="logo-container">
            <Link to="/" className="logo-link">
              <img src="/MBConsultingLogo.png" alt="MB Consulting Logo" />
              <span className="header-title">MB Consulting</span>
            </Link>
          </div>
          <nav className="main-nav">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </nav>
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/" element={
            <>
              <div className="hero-wrapper">
                <section className="hero" id="home">
                  <div className="hero-left animate-in">
                    <h1>MB Consulting</h1>
                    <h2>Simplified Business</h2>
                    <p>No complications, just results.</p>
                    <ul className="hero-features">
                      <li>
                        <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                        </svg>
                        Simple Consultation Process
                      </li>
                      <li>
                        <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                        </svg>
                        24-Hour Response Time
                      </li>
                      <li>
                        <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                          <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
                        </svg>
                        Flexible Terms
                      </li>
                      <li>
                        <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
                        </svg>
                        Proven Track Record
                      </li>
                    </ul>
                  </div>
                  <div className="hero-right">
                    <div className="contact-card">
                      <h3>Get Started Today</h3>
                      <form className="contact-form" onSubmit={handleHeroFormSubmit}>
                        <input 
                          type="text" 
                          name="businessName"
                          placeholder="Business Name" 
                          value={heroFormData.businessName}
                          onChange={handleHeroFormChange}
                        />
                        <div className="name-row">
                          <input 
                            type="text" 
                            name="firstName"
                            placeholder="First Name" 
                            value={heroFormData.firstName}
                            onChange={handleHeroFormChange}
                          />
                          <input 
                            type="text" 
                            name="lastName"
                            placeholder="Last Name" 
                            value={heroFormData.lastName}
                            onChange={handleHeroFormChange}
                          />
                        </div>
                        <input 
                          type="email" 
                          name="email"
                          placeholder="Email" 
                          value={heroFormData.email}
                          onChange={handleHeroFormChange}
                        />
                        <input 
                          type="tel" 
                          name="phone"
                          placeholder="Phone" 
                          value={heroFormData.phone}
                          onChange={handleHeroFormChange}
                        />
                        <select 
                          name="fundingAmount"
                          value={heroFormData.fundingAmount}
                          onChange={handleHeroFormChange}
                        >
                          <option value="">Select Funding Amount</option>
                          <option value="25-50k">$25,000 - $50,000</option>
                          <option value="50-100k">$50,000 - $100,000</option>
                          <option value="100-250k">$100,000 - $250,000</option>
                          <option value="250-500k">$250,000 - $500,000</option>
                          <option value="500k+">$500,000+</option>
                        </select>
                        <button type="submit" className="cta-button">Get Started</button>
                      </form>
                    </div>
                  </div>
                </section>
              </div>

              <section className="services" id="services">
                <div className="container">
                  <h2>Our Services</h2>
                  <div className="services-grid">
                    <div className="service-card animate-fade-up" style={{ animationDelay: '0.1s' }}>
                      <div className="icon">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                          <path d="M20 6H16V4C16 2.89 15.11 2 14 2H10C8.89 2 8 2.89 8 4V6H4C2.89 6 2 6.89 2 8V19C2 20.11 2.89 21 4 21H20C21.11 21 22 20.11 22 19V8C22 6.89 21.11 6 20 6ZM10 4H14V6H10V4ZM20 19H4V8H20V19Z"/>
                        </svg>
                      </div>
                      <h3>Business Strategy</h3>
                      <p>Strategic planning and execution to drive your business forward</p>
                    </div>
                    <div className="service-card animate-fade-up" style={{ animationDelay: '0.2s' }}>
                      <div className="icon">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                          <path d="M19 3H5C3.89 3 3 3.89 3 5V19C3 20.11 3.89 21 5 21H19C20.11 21 21 20.11 21 19V5C21 3.89 20.11 3 19 3ZM19 19H5V5H19V19ZM7 10H9V17H7V10ZM11 7H13V17H11V7ZM15 13H17V17H15V13Z"/>
                        </svg>
                      </div>
                      <h3>Financial Analysis</h3>
                      <p>Comprehensive financial planning and analysis services</p>
                    </div>
                    <div className="service-card animate-fade-up" style={{ animationDelay: '0.3s' }}>
                      <div className="icon">
                        <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                          <path d="M13 2.05V5.08C16.39 5.57 19 8.47 19 12C19 15.87 15.87 19 12 19C8.47 19 5.57 16.39 5.08 13H2.05C2.56 17.84 6.81 21.5 12 21.5C17.52 21.5 22 17.02 22 11.5C22 6.32 18.34 2.07 13 2.05ZM12 7C9.24 7 7 9.24 7 12C7 14.76 9.24 17 12 17C14.76 17 17 14.76 17 12C17 9.24 14.76 7 12 7Z"/>
                        </svg>
                      </div>
                      <h3>Growth Consulting</h3>
                      <p>Accelerate your business growth with expert guidance</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="why-us">
                <div className="container">
                  <h2 className="animate-fade-in">Why Choose MB Consulting?</h2>
                  <div className="features-grid">
                    <div className="feature animate-fade-up" style={{ animationDelay: '0.1s' }}>
                      <h3>Local Expertise</h3>
                      <p>Deep understanding of Lake George and upstate New York business landscape</p>
                    </div>
                    <div className="feature animate-fade-up" style={{ animationDelay: '0.2s' }}>
                      <h3>Proven Track Record</h3>
                      <p>Years of successful partnerships with businesses like yours</p>
                    </div>
                    <div className="feature animate-fade-up" style={{ animationDelay: '0.3s' }}>
                      <h3>Personalized Approach</h3>
                      <p>Tailored solutions that match your specific business needs</p>
                    </div>
                    <div className="feature animate-fade-up" style={{ animationDelay: '0.4s' }}>
                      <h3>Results Driven</h3>
                      <p>Focus on delivering measurable business outcomes</p>
                    </div>
                  </div>
      </div>
              </section>

              <section className="cta-section">
                <div className="container">
                  <h2>Ready to Transform Your Business?</h2>
                  <p>Schedule a free consultation with our experts today</p>
                  <Link to="/contact" className="cta-button">Contact Us</Link>
      </div>
              </section>
            </>
          } />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/submission-success" element={<SubmissionSuccess />} />
        </Routes>
      </main>

      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-info">
              <img src="/MBConsultingLogo.png" alt="MB Consulting Logo" className="footer-logo" />
              <p>Your trusted business partner in Lake George, NY</p>
            </div>
            <div className="footer-links">
              <h4>Quick Links</h4>
              <ul>
                <li><Link to="/services">Services</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>
            <div className="footer-contact">
              <h4>Contact Us</h4>
              <p>Lake George, NY</p>
              <p>Email: adam@mbconsulting.com</p>
              <p>Phone: (518) 645-8149</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 MB Consulting. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
