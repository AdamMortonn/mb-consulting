import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Contact.css';

function Contact() {
  const location = useLocation();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    businessName: '',
    startDate: '',
    fundingAmount: '',
    email: '',
    phone: '',
    consent: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // If form data exists from hero form or services
    if (location.state?.formData) {
      const { fullName, ...rest } = location.state.formData;
      
      // Only try to split fullName if it exists
      if (fullName) {
        const [firstName = '', lastName = ''] = fullName.split(' ');
        setFormData(prev => ({
          ...prev,
          ...rest,
          firstName,
          lastName
        }));
      } else {
        // Handle data coming from services page
        setFormData(prev => ({
          ...prev,
          ...rest
        }));
      }
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate('/submission-success');
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
      
      <div className="contact-page">
        <div className="contact-container">
          <h1>Contact Us</h1>
          <p>Let's discuss how we can help your business grow</p>
          
          <div className="contact-form-card">
            <form onSubmit={handleSubmit} className="detailed-contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="businessName">Business Name</label>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="startDate">Business Start Date</label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="fundingAmount">Desired Funding Amount</label>
                <select
                  id="fundingAmount"
                  name="fundingAmount"
                  value={formData.fundingAmount}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Amount</option>
                  <option value="25-50k">$25,000 - $50,000</option>
                  <option value="50-100k">$50,000 - $100,000</option>
                  <option value="100-250k">$100,000 - $250,000</option>
                  <option value="250-500k">$250,000 - $500,000</option>
                  <option value="500k+">$500,000+</option>
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="consent-checkbox">
                <input
                  type="checkbox"
                  id="contactConsent"
                  name="consent"
                  required
                  onChange={handleChange}
                  checked={formData.consent}
                />
                <label htmlFor="contactConsent">
                  By submitting this form, I agree to receive communications via SMS/MMS, and acknowledge this as a formal application. I understand my data will be processed according to MB Consulting's privacy policy.
                </label>
              </div>

              <button type="submit" className="submit-button">Submit Application</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact; 