import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Clock, Calendar, Heart, Share } from "lucide-react";
import { PaymentModal } from "@/components/PaymentModal";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { MainLayout } from "@/components/layouts/MainLayout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Skeleton } from "@/components/ui/skeleton";

interface SalonViewProps {
  salonId?: string;
}

export const SalonView = ({ salonId: propSalonId }: SalonViewProps) => {
  const { id: paramId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [salao, setSalao] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const id = propSalonId || paramId;

  useEffect(() => {
    const fetchSalao = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data: salaoData, error: salaoError } = await supabase
          .from("saloes")
          .select(`
            *,
            imagens_salao (*)
          `)
          .eq("id", id)
          .single();

        if (salaoError) throw salaoError;
        if (!salaoData) throw new Error("Salão não encontrado");

        console.log("Dados do salão carregados:", salaoData);
        setSalao(salaoData);
      } catch (err: any) {
        console.error("Erro ao buscar salão:", err);
        setError(err.message || "Erro ao carregar dados do salão");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSalao();
    }
  }, [id]);

  const handleBookService = (service: any) => {
    setSelectedService(service);
    setIsPaymentModalOpen(true);
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto py-6 space-y-8">
          <Skeleton className="h-12 w-3/4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton className="h-[400px] w-full" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-10 w-1/3" />
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="container mx-auto py-6">
          <Alert variant="destructive">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <Button onClick={() => navigate(-1)} className="mt-4">
            Voltar
          </Button>
        </div>
      </MainLayout>
    );
  }

  if (!salao) {
    return (
      <MainLayout>
        <div className="container mx-auto py-6">
          <Alert>
            <AlertTitle>Salão não encontrado</AlertTitle>
            <AlertDescription>O salão que você está procurando não existe ou foi removido.</AlertDescription>
          </Alert>
          <Button onClick={() => navigate(-1)} className="mt-4">
            Voltar
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="relative h-96 bg-gray-300">
          {salao.imagens_salao && salao.imagens_salao.length > 0 && (
            <img 
              src={salao.imagens_salao[0].url} 
              alt={salao.nome} 
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <div className="absolute bottom-6 left-6 text-white">
            <h1 className="text-4xl font-bold mb-2">{salao.nome}</h1>
            <p className="flex items-center text-lg">
              <MapPin className="h-5 w-5 mr-2" />
              {salao.endereco}, {salao.cidade}
            </p>
          </div>
          <div className="absolute top-6 right-6 flex space-x-2">
            <Button variant="outline" size="sm" className="bg-white/20 border-white text-white">
              <Heart className="h-4 w-4 mr-2" />
              Favoritar
            </Button>
            <Button variant="outline" size="sm" className="bg-white/20 border-white text-white">
              <Share className="h-4 w-4 mr-2" />
              Compartilhar
            </Button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Rating and Reviews */}
              <div className="flex items-center mb-6">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 mr-1" />
                  <span className="font-bold text-lg">{salao.classificacao || 4.5}</span>
                  <span className="text-gray-600 ml-2">({salao.avaliacoes || 0} avaliações)</span>
                </div>
                <Badge className="ml-4 bg-green-100 text-green-800">Excelente</Badge>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Sobre o Salão</h2>
                <p className="text-gray-700 mb-4">{salao.descricao}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                  <div className="flex items-center text-gray-700">
                    <Clock className="h-5 w-5 text-purple-600 mr-2" />
                    <span>Horário: {salao.horario_funcionamento || "09:00 - 18:00"}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Calendar className="h-5 w-5 text-purple-600 mr-2" />
                    <span>Dias: {salao.dias_funcionamento || "Seg - Sáb"}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Star className="h-5 w-5 text-purple-600 mr-2" />
                    <span>{salao.especialidade || "Eventos e Festas"}</span>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-6">Serviços Disponíveis</h2>
                <div className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row justify-between">
                        <div>
                          <h4 className="text-lg font-semibold">Aluguel do Salão</h4>
                          <p className="text-gray-600 mt-1">Aluguel completo do salão para eventos</p>
                          <p className="text-gray-600 mt-1">
                            <Clock className="h-4 w-4 inline mr-1" />
                            Duração: 24 horas
                          </p>
                        </div>
                        <div className="mt-4 md:mt-0 text-right">
                          <p className="text-lg font-bold text-purple-600">{salao.preco?.toLocaleString() || "150.000"} Kz</p>
                          <Button 
                            className="mt-3 bg-purple-600 hover:bg-purple-700" 
                            onClick={() => handleBookService({
                              nome: "Aluguel do Salão",
                              preco: salao.preco || 150000
                            })}
                          >
                            Agendar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Características</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center text-gray-700">
                    <span className="text-green-500 mr-2">✓</span>
                    Capacidade: {salao.capacidade || 100} pessoas
                  </div>
                  <div className="flex items-center text-gray-700">
                    <span className="text-green-500 mr-2">✓</span>
                    Estacionamento
                  </div>
                  <div className="flex items-center text-gray-700">
                    <span className="text-green-500 mr-2">✓</span>
                    Ar-condicionado
                  </div>
                  <div className="flex items-center text-gray-700">
                    <span className="text-green-500 mr-2">✓</span>
                    Cozinha equipada
                  </div>
                  <div className="flex items-center text-gray-700">
                    <span className="text-green-500 mr-2">✓</span>
                    Sistema de som
                  </div>
                  <div className="flex items-center text-gray-700">
                    <span className="text-green-500 mr-2">✓</span>
                    Segurança
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Agendar Serviço</h3>
                  <p className="text-gray-600 mb-4">
                    Entre em contato para agendar ou reservar este salão para seu evento.
                  </p>
                  <Button 
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    onClick={() => handleBookService({
                      nome: "Aluguel do Salão",
                      preco: salao.preco || 150000
                    })}
                  >
                    Reservar Agora
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {isPaymentModalOpen && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          item={selectedService}
          tipo="salao"
        />
      )}
    </MainLayout>
  );
}; 