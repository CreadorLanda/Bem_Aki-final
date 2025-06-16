
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Send } from "lucide-react";

export const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter subscription:", email);
    setEmail("");
    // Add toast notification here
  };

  return (
    <section className="py-16 bg-gradient-to-r from-purple-600 to-purple-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-white/10 p-3 rounded-full">
              <Mail className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Receba as Melhores Ofertas
          </h2>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">
            Assine nossa newsletter e seja o primeiro a saber sobre promoções exclusivas, 
            novos destinos e ofertas imperdíveis.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="flex gap-4">
            <div className="flex-1">
              <Input
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white border-white text-gray-900 placeholder:text-gray-500"
                required
              />
            </div>
            <Button 
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold px-6"
            >
              <Send className="h-4 w-4 mr-2" />
              Assinar
            </Button>
          </form>
          
          <p className="text-sm text-purple-200 text-center mt-4">
            Enviamos apenas conteúdo relevante. Cancele a qualquer momento.
          </p>
        </div>
      </div>
    </section>
  );
};
