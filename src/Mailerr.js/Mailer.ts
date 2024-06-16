// File: src/mailer.ts

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const sendWelcomeEmail = async (to: string, username: string) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: 'Welcome to Our Service',
        text: `Hello ${username},\n\nWelcome to our service. We are glad to have you on board.\n\nBest regards,\nYour Company`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Welcome email sent to:', to);
    } catch (error) {
        console.error('Error sending welcome email:', error);
    }
};
