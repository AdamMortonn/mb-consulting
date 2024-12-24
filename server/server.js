const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASSWORD // Your 16-character app password
  }
});

const sendEmail = async (formData) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: `New Business Inquiry from ${formData.businessName}`,
      html: `
        <h2>New Business Inquiry</h2>
        <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
        <p><strong>Business Name:</strong> ${formData.businessName}</p>
        <p><strong>Business Start Date:</strong> ${formData.startDate}</p>
        <p><strong>Desired Funding Amount:</strong> ${formData.fundingAmount}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone}</p>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

app.post('/api/submit-form', async (req, res) => {
  try {
    await sendEmail(req.body);
    res.status(200).json({ message: 'Form submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error submitting form' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 