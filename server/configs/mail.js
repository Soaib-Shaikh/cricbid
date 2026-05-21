import nodemailer from "nodemailer";

export const sendEmail = async (
  to,
  subject,
  text
) => {
  try {
    const transporter =
      nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

    await transporter.verify();

    const info =
      await transporter.sendMail({
        from: `"CricBid" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        text,
      });

    console.log(
      "Email sent:",
      info.messageId
    );

    return true;

  } catch (error) {
    console.log(
      "EMAIL ERROR:",
      error.message
    );

    return false;
  }
};