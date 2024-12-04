import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton: React.FC = () => {
  const handleClick = () => {
    const phoneNumber = "+2347049877170";
    const message = "Hello, I'm interested in your services!";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      <div>
        <button
          onClick={handleClick}
          className="fixed flex gap-1 items-center bottom-4 right-20 md:right-0 bg-green-500 text-white px-2 p-1 rounded-full shadow-lg hover:bg-green-600 animate-none transition duration-300 ease-in-out"
          aria-label="Chat on WhatsApp"
        >
          <span className="animate-bounce md:pt-2 pt-1">
            <FaWhatsapp size={20} />
          </span>
          <span className="text-xs md:text-sm">
            Any Question? Orders? Ask in WhatsApp
          </span>
        </button>
      </div>
    </>
  );
};

export default WhatsAppButton;
