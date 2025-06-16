import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Building, Car, Calendar, MapPin, Award, BookOpen, Plane, Camera, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ServicesGrid = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: Building,
      title: "Hotéis",
      description: "Mais de 500 hotéis verificados",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
      deals: "A partir de 8.500 Kz",
      rating: 4.5,
      color: "from-blue-500 to-blue-600",
      href: "/hoteis"
    },
    {
      icon: Car,
      title: "Aluguel de Carros",
      description: "Carros para todos os orçamentos",
      image: "https://images.unsplash.com/photo-1549924231-f129b911e442",
      deals: "A partir de 15.000 Kz/dia",
      rating: 4.7,
      color: "from-green-500 to-green-600",
      href: "/carros"
    },
    {
      icon: Calendar,
      title: "Salões de Festas",
      description: "Espaços únicos para eventos",
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3",
      deals: "A partir de 50.000 Kz",
      rating: 4.6,
      color: "from-purple-500 to-purple-600",
      href: "/saloes"
    },
    {
      icon: MapPin,
      title: "Pacotes Turísticos",
      description: "Experiências completas",
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828",
      deals: "A partir de 85.000 Kz",
      rating: 4.8,
      color: "from-orange-500 to-orange-600",
      href: "/pacotes"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore nossos serviços
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Compare preços e encontre as melhores ofertas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-md overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded-full flex items-center">
                  <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                  <span className="text-xs font-medium">{service.rating}</span>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center mb-3">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${service.color} flex items-center justify-center mr-3`}>
                    <service.icon className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
                </div>
                <p className="text-gray-600 mb-4 text-sm">{service.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-bold text-purple-600">{service.deals}</span>
                </div>
                <Button 
                  onClick={() => navigate(service.href)}
                  variant="outline" 
                  className="w-full border-purple-200 text-purple-700 hover:bg-purple-50"
                >
                  Ver ofertas
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Services */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Award, title: "Prêmios bemAki", subtitle: "Hotéis premiados", href: "/ofertas" },
            { icon: BookOpen, title: "GTA", subtitle: "Guia turístico", href: "/sobre" },
            { icon: Plane, title: "Voos", subtitle: "Passagens aéreas", href: "/ofertas" },
            { icon: Camera, title: "Experiências", subtitle: "Tours e atividades", href: "/pacotes" }
          ].map((item, index) => (
            <div 
              key={index} 
              onClick={() => navigate(item.href)}
              className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100 cursor-pointer"
            >
              <div className="flex items-center">
                <item.icon className="h-8 w-8 text-purple-600 mr-3" />
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">{item.title}</h4>
                  <p className="text-xs text-gray-600">{item.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
