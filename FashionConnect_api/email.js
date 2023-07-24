import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
});

const sendEmail = (receiverEmail, subject, text) => {

    const mailOptions = {
        from: process.env.EMAIL,
        to: receiverEmail,
        subject: subject,
        text: text,
    };

    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            throw err
        } else {
            console.log("Email sent successfully", data.response);
        }
    });
};

export default sendEmail;