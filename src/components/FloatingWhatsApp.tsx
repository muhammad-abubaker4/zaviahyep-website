import { WHATSAPP_URL } from "@/lib/constants";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

const FloatingWhatsApp = () => (
  <a
    href={WHATSAPP_URL}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat on WhatsApp"
    className="fixed bottom-5 right-3 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-300 hover:scale-110 hover:bg-[#20bd5a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 sm:bottom-6 sm:right-6 sm:h-14 sm:w-14"
  >
    <WhatsAppIcon className="h-6 w-6 sm:h-7 sm:w-7" />
  </a>
);

export default FloatingWhatsApp;
