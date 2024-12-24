import { Link } from 'react-router-dom';
import './SubmissionSuccess.css';

function SubmissionSuccess() {
  return (
    <div className="success-page">
      <div className="success-content">
        <img src="/MBConsultingLogo.png" alt="MB Consulting Logo" className="success-logo" />
        <h1>Submission Successful!</h1>
        <p>Thank you for your interest. Our team will contact you within 24 hours.</p>
        <Link to="/" className="return-home">Return to Home</Link>
      </div>
    </div>
  );
}

export default SubmissionSuccess; 