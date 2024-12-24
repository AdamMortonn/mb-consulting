import './About.css';
import { useCountUp } from '../hooks/useCountUp';
import { useEffect } from 'react';

function About() {
  const clientSuccessRate = useCountUp(95);
  const capitalSecured = useCountUp(50);
  const businessesServed = useCountUp(200);

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

    // Observe all animated sections
    const elements = document.querySelectorAll('.methodology-item, .process-section, .expertise-section, .process-grid, .expertise-grid');
    elements.forEach(element => observer.observe(element));

    return () => {
      elements.forEach(element => observer.unobserve(element));
    };
  }, []);

  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="container">
          <h1>Data-Driven Business Solutions</h1>
          <p className="subtitle">Transforming insights into actionable strategies for success</p>
        </div>
      </section>

      <section className="about-content">
        <div className="container">
          <div className="methodology-grid">
            <div className="methodology-item animate-in">
              <h2>Our Approach</h2>
              <p>At MB Consulting, we combine advanced analytics with industry expertise to deliver measurable results. Our data-driven methodology ensures that every business decision is backed by concrete evidence and market insights.</p>
            </div>

            <div className="stats-container">
              <div className="stat-item">
                <span className="stat-number">{clientSuccessRate}%</span>
                <span className="stat-label">Client Success Rate</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">${capitalSecured}M+</span>
                <span className="stat-label">Capital Secured</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{businessesServed}+</span>
                <span className="stat-label">Businesses Served</span>
              </div>
            </div>
          </div>

          <div className="process-section animate-in">
            <h2>Our Process</h2>
            <div className="process-grid">
              <div className="process-item animate-fade-up" style={{ animationDelay: '0.1s' }}>
                <div className="process-number">01</div>
                <h3>Data Collection</h3>
                <p>Comprehensive gathering of business metrics, market data, and industry benchmarks</p>
              </div>
              <div className="process-item animate-fade-up" style={{ animationDelay: '0.2s' }}>
                <div className="process-number">02</div>
                <h3>Analysis</h3>
                <p>Advanced analytics to identify patterns, opportunities, and potential challenges</p>
              </div>
              <div className="process-item animate-fade-up" style={{ animationDelay: '0.3s' }}>
                <div className="process-number">03</div>
                <h3>Strategy Development</h3>
                <p>Creation of actionable strategies based on data insights and industry expertise</p>
              </div>
              <div className="process-item animate-fade-up" style={{ animationDelay: '0.4s' }}>
                <div className="process-number">04</div>
                <h3>Implementation</h3>
                <p>Guided execution with continuous monitoring and optimization</p>
              </div>
            </div>
          </div>

          <div className="expertise-section animate-in">
            <h2>Areas of Expertise</h2>
            <div className="expertise-grid">
              <div className="expertise-card animate-fade-up" style={{ animationDelay: '0.1s' }}>
                <h3>Financial Analysis</h3>
                <p>Deep dive into financial metrics to optimize performance and identify growth opportunities</p>
              </div>
              <div className="expertise-card animate-fade-up" style={{ animationDelay: '0.2s' }}>
                <h3>Market Research</h3>
                <p>Comprehensive market analysis using latest data analytics tools and methodologies</p>
              </div>
              <div className="expertise-card animate-fade-up" style={{ animationDelay: '0.3s' }}>
                <h3>Risk Assessment</h3>
                <p>Data-backed risk evaluation and mitigation strategies</p>
              </div>
              <div className="expertise-card animate-fade-up" style={{ animationDelay: '0.4s' }}>
                <h3>Growth Strategy</h3>
                <p>Evidence-based approaches to sustainable business growth</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About; 