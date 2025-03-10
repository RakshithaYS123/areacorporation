const nodemailer = require("nodemailer");
require("dotenv").config();

// Create a transporter with proper Gmail configuration
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // use SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD, // Using app password instead of regular password
  },
  // Add debug option for detailed logs
  debug: true,
  logger: true,
});

// Verify SMTP connection at startup
transporter.verify(function (error, success) {
  if (error) {
    console.error("SMTP verification failed:", error);
  } else {
    console.log("SMTP server is ready to send messages");
  }
});

const sendIssueNotification = async (corporationEmail, issue) => {
  try {
    // Override the recipient email with a fixed email address
    const recipientEmail = "rakshitha@ivislabs.com";
    console.log(
      `Sending email to fixed recipient: ${recipientEmail} (overriding: ${corporationEmail})`
    );

    // Ensure we have a valid image path
    let attachmentConfig = [];
    if (issue.image) {
      const imagePath = `${process.cwd()}/uploads/${issue.image
        .split("/")
        .pop()}`;
      console.log(`Checking image path: ${imagePath}`);

      // Add the attachment if image exists
      attachmentConfig = [
        {
          filename: "issue-image.jpg",
          path: imagePath,
          cid: "issueImage",
        },
      ];
    } else {
      console.log("No image attached to issue");
    }

    const mailOptions = {
      from: `"Area Corporation System" <${process.env.EMAIL_USER}>`,
      to: recipientEmail, // Use the fixed recipient email
      subject: "New Area Issue Reported",
      html: `
        <h2 style="color: #2a5885;">New Area Issue Reported</h2>
        <div style="border: 1px solid #e0e0e0; border-radius: 5px; padding: 15px; margin-bottom: 20px;">
          <p><strong>Address:</strong> ${issue.address || "Not specified"}</p>
          <p><strong>Description:</strong> ${
            issue.description || "Not provided"
          }</p>
          <p><strong>Reported on:</strong> ${new Date(
            issue.createdAt || Date.now()
          ).toLocaleString()}</p>
        </div>
        <p>Please log in to the Area Corporation System to view more details.</p>
        ${
          issue.image
            ? '<img src="cid:issueImage" alt="Issue Image" style="max-width: 100%; border-radius: 5px;">'
            : "<p>No image was attached to this report.</p>"
        }
        <hr style="margin-top: 20px;">
        <p style="font-size: 12px; color: #888;">This is an automated message, please do not reply directly to this email.</p>
      `,
      attachments: attachmentConfig,
      // Add delivery status notifications
      dsn: {
        id: `issue_${issue._id || "unknown"}`,
        return: "headers",
        notify: ["failure", "delay", "success"],
        recipient: process.env.EMAIL_USER,
      },
    };

    // Log mail options for debugging
    console.log("Mail options:", {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
      attachmentsCount: mailOptions.attachments.length,
    });

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully. Details:", {
      messageId: info.messageId,
      response: info.response,
      accepted: info.accepted,
      rejected: info.rejected,
    });

    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    // More detailed error logging
    if (error.code === "ENOENT") {
      console.error("File not found error. Check attachment paths.");
    } else if (error.code === "ECONNREFUSED") {
      console.error("Connection refused. Check SMTP settings and firewall.");
    }
    return false;
  }
};

module.exports = { sendIssueNotification };
