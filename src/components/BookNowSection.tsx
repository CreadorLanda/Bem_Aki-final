
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, MessageCircle, Mail, Clock, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const BookNowSection = () => {
  const navigate = useNavigate();

  const benefits = [
    "Confirmação instantânea",
    "Cancelamento grátis até 24h",
    "Suporte 24/7",
    "Melhores preços garantidos"
  ];

  const contactMethods = [
    {
      icon: Phone,
      title: "Telefone",
      info: "+244 923 456 789",
      action: "Ligar agora",
      color: "bg-green-500"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      info: "+244 923 456 789",
      action: "Enviar mensagem",
      color: "bg-green-600"
    },
    {
      icon: Mail,
      title: "Email",
      info: "reservas@bemaki.ao",
      action: "Enviar email",
      color: "bg-blue-500"
    }
  ];

  const handleReserveClick = () => {
    navigate('/reservar');
  };

  return (
    <section className="py-16 bg-gradient-to-r from-purple-600 to-yellow-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pronto para Reservar?
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Fale connosco agora e garanta já a sua reserva com as melhores condições
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Benefits */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6">
              Por que escolher a bemAki?
            </h3>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center text-white">
                  <CheckCircle className="h-5 w-5 text-yellow-300 mr-3 flex-shrink-0" />
                  <span className="text-lg">{benefit}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-4 bg-white/10 rounded-lg">
              <div className="flex items-center text-white mb-2">
                <Clock className="h-5 w-5 text-yellow-300 mr-2" />
                <span className="font-semibold">Horário de Atendimento</span>
              </div>
              <p className="text-white/90">Segunda a Domingo: 6h às 22h</p>
            </div>
          </div>

          {/* Contact Methods */}
          <div className="space-y-4">
            {contactMethods.map((method, index) => (
              <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-12 h-12 ${method.color} rounded-lg flex items-center justify-center mr-4`}>
                        <method.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{method.title}</h4>
                        <p className="text-gray-600">{method.info}</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="border-purple-200 text-purple-700 hover:bg-purple-50"
                    >
                      {method.action}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <Card className="bg-yellow-50 border-yellow-200">
              <CardContent className="p-6 text-center">
                <h4 className="font-bold text-gray-900 mb-2">Reserva Online</h4>
                <p className="text-gray-600 mb-4">
                  Use nossa plataforma para reservar instantaneamente
                </p>
                <Button 
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                  onClick={handleReserveClick}
                >
                  Fazer Reserva Online
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
