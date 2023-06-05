const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

// API endpoint to send an email
app.post('/send-email', (req, res) => {
  const { subject, body,emailSender } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'ramanandraibenirina@gmail.com',
      pass: 'iodwufzroylzwugu',
    },
  });

  // Prepare the email content
  const mailOptions = {
    from: `${emailSender}`,
    to: 'ramanandraibenirina@gmail.com',
    subject,
    html: body,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to send the email.' });
    } else {
      console.log('Email sent:', info.response);
      res.status(200).json({ message: 'Email sent successfully.' });
    }
  });
});

// Start the server
app.listen(8000, () => {
  console.log('Server running on port 8000');
});
