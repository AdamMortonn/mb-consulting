import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Services.css';

function Services() {
  const navigate = useNavigate();

  const handleApplyClick = (serviceTitle) => {
    navigate('/contact', { 
      state: { 
        formData: {
          fundingAmount: '',  // This will be filled by user
          serviceNeeded: serviceTitle  // Pass the service title to pre-fill service selection
        } 
      } 
    });
  };

  const services = [
    {
      title: "Alternative Business Financing",
      description: "Innovative funding solutions beyond traditional banking, tailored to your business needs. We help secure working capital through various alternative lending options.",
      features: [
        "Short-term business loans",
        "Revenue-based financing",
        "Equipment financing",
        "Invoice factoring",
        "Merchant cash advances"
      ]
    },
    {
      title: "Mergers & Acquisitions",
      description: "Expert guidance through the entire M&A process, from valuation to deal closure. We ensure smooth transitions and maximize value for all parties involved.",
      features: [
        "Business valuation",
        "Due diligence",
        "Deal structuring",
        "Negotiation support",
        "Post-merger integration"
      ]
    },
    {
      title: "Strategic Planning",
      description: "Comprehensive business strategy development to drive growth and improve market position.",
      features: [
        "Market analysis",
        "Competitive positioning",
        "Growth strategy",
        "Risk assessment",
        "Performance metrics"
      ]
    },
    {
      title: "Operational Excellence",
      description: "Optimize your business processes and improve operational efficiency to maximize profitability.",
      features: [
        "Process optimization",
        "Cost reduction",
        "Quality management",
        "Supply chain optimization",
        "Performance monitoring"
      ]
    },
    {
      title: "Financial Advisory",
      description: "In-depth financial analysis and advisory services to improve fiscal health and decision-making.",
      features: [
        "Financial modeling",
        "Cash flow management",
        "Budget planning",
        "Investment strategy",
        "Risk management"
      ]
    },
    {
      title: "Business Transformation",
      description: "Guide your business through critical changes and digital transformation initiatives.",
      features: [
        "Digital transformation",
        "Change management",
        "Technology integration",
        "Process automation",
        "Employee training"
      ]
    }
  ];

  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'none';
          entry.target.offsetHeight; // Trigger reflow
          entry.target.style.animation = '';
          
          // Reset animations for features
          const features = entry.target.querySelectorAll('.service-features li');
          features.forEach(feature => {
            feature.style.animation = 'none';
            feature.offsetHeight;
            feature.style.animation = '';
          });
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.2
    });

    const cards = document.querySelectorAll('.service-card');
    cards.forEach(card => observer.observe(card));

    return () => {
      cards.forEach(card => observer.unobserve(card));
    };
  }, []);

  return (
    <div className="services-page">
      <section className="services-hero">
        <div className="container">
          <h1>Our Services</h1>
          <p>Comprehensive business solutions tailored to your needs</p>
        </div>
      </section>

      <section className="services-grid-section">
        <div className="container">
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <h2>{service.title}</h2>
                <p className="service-description">{service.description}</p>
                <ul className="service-features">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>
                      <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="button-container">
                  <button 
                    className="learn-more-btn"
                    onClick={() => handleApplyClick(service.title)}
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Ready to Get Started?</h2>
          <p>Let's discuss how we can help transform your business</p>
          <Link to="/contact" className="cta-button">Contact Us</Link>
        </div>
      </section>
    </div>
  );
}

export default Services; 