
import { Header } from "@/components/Header";
import { LoginBar } from "@/components/LoginBar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Users, Award, Heart, Target, Eye } from "lucide-react";

export const SobrePage = () => {
  const stats = [
    { number: "500+", label: "Hotéis Parceiros" },
    { number: "50+", label: "Carros Disponíveis" },
    { number: "100+", label: "Salões de Festas" },
    { number: "10K+", label: "Clientes Satisfeitos" }
  ];

  const values = [
    {
      icon: Heart,
      title: "Paixão pelo Turismo",
      description: "Acreditamos que viajar transforma vidas e conecta culturas."
    },
    {
      icon: Award,
      title: "Qualidade Garantida",
      description: "Todos nossos parceiros são verificados e avaliados pelos clientes."
    },
    {
      icon: Users,
      title: "Foco no Cliente",
      description: "Sua satisfação é nossa prioridade absoluta em cada reserva."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <LoginBar />
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-purple-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Sobre a bemAki
            </h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Somos a plataforma líder em turismo e eventos em Angola, 
              conectando você aos melhores hotéis, carros, salões e experiências únicas.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card>
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Target className="h-8 w-8 text-purple-600 mr-3" />
                  <h2 className="text-2xl font-bold">Nossa Missão</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Facilitar e democratizar o acesso ao turismo em Angola, 
                  oferecendo uma plataforma segura, confiável e fácil de usar 
                  que conecta viajantes aos melhores serviços turísticos do país.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Eye className="h-8 w-8 text-purple-600 mr-3" />
                  <h2 className="text-2xl font-bold">Nossa Visão</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Ser a principal referência em turismo digital em Angola, 
                  promovendo o desenvolvimento do setor turístico nacional 
                  e contribuindo para o crescimento económico do país.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nossos Valores
            </h2>
            <p className="text-xl text-gray-600">
              Os princípios que guiam nosso trabalho diário
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-8">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <value.icon className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Nossa História
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  A bemAki nasceu da visão de tornar o turismo em Angola 
                  mais acessível e organizado. Fundada em 2023, começamos 
                  como uma pequena startup com o sonho de revolucionar 
                  a forma como os angolanos e visitantes descobrem e 
                  reservam serviços turísticos.
                </p>
                <p>
                  Hoje, somos orgulhosos de conectar milhares de viajantes 
                  com experiências únicas em todo o país, desde os hotéis 
                  mais luxuosos de Luanda até os destinos mais remotos 
                  e autênticos de Angola.
                </p>
                <p>
                  Continuamos crescendo, sempre mantendo nosso compromisso 
                  com a qualidade, transparência e satisfação do cliente.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="/placeholder.svg" 
                alt="Equipe bemAki"
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
