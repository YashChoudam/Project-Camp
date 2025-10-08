import { text } from "express";
import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Task Manager",
      link: "https://taskmanager.com",
    },
  });

  const emailTextual = mailGenerator.generatePlaintext(options.mailgenConent);

  const emailHtml = mailGenerator.generate(options.mailgenConent);

  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST, 
    port: process.env.MAILTRAP_SMTP_PORT,
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASS,
    },  
  });

  const mail = {
    from: "yashchoudam527@gmail.com",
    to: options.email,
    subject: options.subject,
    text: emailTextual,
    html: emailHtml,
  };

  try {
    await transporter.sendMail(mail);
  } catch (error) {
    console.error(
      "Email service failed , make sure that you have provided mailtrap credentials in .env file",
      error,
    );
  }
};

const emailVerificationMailgenContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro:
        "Welcome to Project Camp — your journey to build, learn, and launch awesome projects starts here!",
      action: {
        instructions: "To verify your email please click on the button below",
        button: {
          color: "#22b461ff",
          text: "Verify your email",
          link: verificationUrl,
        },
      },
      outro:
        "If any query you can write a mail to us we would love to help you !",
    },
  };
};

const forgotaPasswordMailgenContent = (username, passwordResetUrl) => {
  return {
    body: {
      name: username,
      intro: "We got the request to reset the password of your account ",
      action: {
        instructions: "To reset the password click on the button below",
        button: {
          color: "#c02b49ff",
          text: "Reset Password",
          link: passwordResetUrl,
        },
      },
      outro:
        "If any query you can write a mail to us we would love to help you !",
    },
  };
};

export {
  emailVerificationMailgenContent,
  forgotaPasswordMailgenContent,
  sendEmail,
};
