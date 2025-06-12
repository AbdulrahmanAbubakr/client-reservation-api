const nodemailer = require("nodemailer");
const generateClientPDF = require("./generateClientPdf");
const sendClientData = async (clientData) => {
  const {
    fullName,
    civilId,
    company,
    phone,
    socialMedia,
    agreedToTerms,
    agreedToPrivacy,
    signature,
  } = clientData;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  const pdfStream = generateClientPDF(clientData);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.NOTIFY_EMAIL,
    subject: "New Client Registered",
    text: "A new client submission is attached as PDF.",
    attachments: [
      {
        filename: "client-submission.pdf",
        content: pdfStream,
        contentType: "application/pdf",
      },
    ],
  };
  await transporter.sendMail(mailOptions);
};

module.exports = sendClientData;
