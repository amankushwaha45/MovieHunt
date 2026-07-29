const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendAdminOTP = async (email, otp) => {

    await transporter.sendMail({

        from: `"MovieHunt Admin" <${process.env.EMAIL_USER}>`,

        to: email,

        subject: "MovieHunt Admin Login OTP",

        html: `
        <div style="font-family:Arial;padding:25px">

            <h2 style="color:#f84464">
                MovieHunt Admin Login
            </h2>

            <p>Your Login OTP is</p>

            <h1 style="
                letter-spacing:8px;
                color:#f84464;
            ">
                ${otp}
            </h1>

            <p>
                This OTP is valid for only
                <b>5 minutes</b>.
            </p>

        </div>
        `

    });

};

module.exports = sendAdminOTP;