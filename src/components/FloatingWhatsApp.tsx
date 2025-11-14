import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const FloatingWhatsApp = () => {
  const handleClick = () => {
    window.open("https://wa.me/255755521203", "_blank");
  };

  return (
    <Button
      onClick={handleClick}
      size="icon"
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-[#25D366] hover:bg-[#20BA5A] shadow-lg hover:shadow-xl z-50 transition-all duration-300 hover:scale-110"
    >
      <MessageCircle className="h-6 w-6 text-white" />
    </Button>
  );
};
