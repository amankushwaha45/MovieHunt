const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const generateOTP = () => {
  return otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
    alphabets: false,
  });
};

const sendOTP = async (email, otp) => {
  await transporter.sendMail({
    from: `"MovieHunt" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "MovieHunt Login OTP",
    html: `
      <div style="font-family:Arial;padding:20px">
        <h2>MovieHunt</h2>

        <p>Your Login OTP is</p>

        <h1 style="letter-spacing:8px">${otp}</h1>

        <p>This OTP is valid for 5 minutes.</p>

        <hr>

        <small>If you didn't request this OTP, please ignore this email.</small>

      </div>
    `,
  });
};

module.exports = {
  generateOTP,
  sendOTP,
};