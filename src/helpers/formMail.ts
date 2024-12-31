import nodemailer, { SentMessageInfo } from "nodemailer";
import authMessages from "../utils/authMessages";

interface FormMailParams {
  enquiryData?: {
    name: string;
    phone: string;
    eventDate: string;
    guests: number;
    comments?: string;
    items?: {
      [category: string]: string[];
    };
  };
}

export const formMail = async ({
  enquiryData,
}: FormMailParams): Promise<SentMessageInfo> => {
  try {
    // Validate environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error("Email configuration is missing.");
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
      secure: true, 
    });

    let itemsHtml = '<p><strong>Items:</strong></p>';
    if (enquiryData?.items) {
      itemsHtml += '<ul>';
      for (const [category, products] of Object.entries(enquiryData.items)) {
        itemsHtml += `<li><strong>${category.charAt(0).toUpperCase() + category.slice(1)}:</strong>`;
        itemsHtml += '<ul>';
        products.forEach(product => {
          itemsHtml += `<li>${product}</li>`;
        });
        itemsHtml += '</ul></li>';
      }
      itemsHtml += '</ul>';
    } else {
      itemsHtml += '<p>No items provided.</p>';
    }

    const mailOptions = {
      from: `"${process.env.MAIL_NAME}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_FOR, 
      subject: "Catering Enquiry Received",
      html: `
        <p>You have received a new enquiry from:</p>
        <p><strong>Name:</strong> ${enquiryData?.name || "No name provided."}</p>
        <p><strong>Phone:</strong> ${enquiryData?.phone || "No phone provided."}</p>
        <p><strong>Event Date:</strong> ${enquiryData?.eventDate || "No date provided."}</p>
        <p><strong>Guests:</strong> ${enquiryData?.guests || 0}</p>
        <p><strong>Comments:</strong> ${enquiryData?.comments || "No comments provided."}</p>
        ${itemsHtml}
      `,
    };

    const mailResponse = await transporter.sendMail(mailOptions);

    return mailResponse;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Mailer Error:", error.message);
      throw new Error(`Mailer Error: ${error.message}`);
    } else {
      console.error("Unknown error occurred in mailer.");
      throw new Error(authMessages.unknownError);
    }
  }
};