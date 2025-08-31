import { generateBuffetMessage } from "@/utils/generateBuffetMessage";
import Button from "../../../components/reuseable/Button";
import { Product } from "@/types/Products";

const WhatsAppBuffet: React.FC<{ selectedProducts: Product[] }> = ({ selectedProducts }) => {
  const message = `${generateBuffetMessage(selectedProducts)}`;
  console.log("message", message);
  

  const sendMessage = () => {
    const phoneNumber = "918750838486"; // Fixed phone number
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <Button
      onClick={sendMessage}
      label="WhatsApp"
      className="!bg-green-500"
    />
  );
};

export default WhatsAppBuffet;
