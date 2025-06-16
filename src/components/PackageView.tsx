import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Calendar, Users, Heart, Share } from "lucide-react";
import { PaymentModal } from "@/components/PaymentModal";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { MainLayout } from "@/components/layouts/MainLayout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Skeleton } from "@/components/ui/skeleton";

interface PackageViewProps {
  packageId?: string;
}

export const PackageView = ({ packageId: propPackageId }: PackageViewProps) => {
  const { id: paramId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pacote, setPacote] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const id = propPackageId || paramId;

  useEffect(() => {
    const fetchPacote = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data: pacoteData, error: pacoteError } = await supabase
          .from("pacotes")
          .select(`
            *,
            imagens_pacote (*)
          `)
          .eq("id", id)
          .single();

        if (pacoteError) throw pacoteError;
        if (!pacoteData) throw new Error("Pacote não encontrado");

        console.log("Dados do pacote carregados:", pacoteData);
        setPacote(pacoteData);
      } catch (err: any) {
        console.error("Erro ao buscar pacote:", err);
        setError(err.message || "Erro ao carregar dados do pacote");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPacote();
    }
  }, [id]);

  const handleBookPackage = () => {
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

  if (!pacote) {
    return (
      <MainLayout>
        <div className="container mx-auto py-6">
          <Alert>
            <AlertTitle>Pacote não encontrado</AlertTitle>
            <AlertDescription>O pacote que você está procurando não existe ou foi removido.</AlertDescription>
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
          {pacote.imagens_pacote && pacote.imagens_pacote.length > 0 && (
            <img 
              src={pacote.imagens_pacote[0].url} 
              alt={pacote.nome} 
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <div className="absolute bottom-6 left-6 text-white">
            <h1 className="text-4xl font-bold mb-2">{pacote.nome}</h1>
            <p className="flex items-center text-lg">
              <MapPin className="h-5 w-5 mr-2" />
              {pacote.destino}
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
                  <span className="font-bold text-lg">{pacote.classificacao || 4.8}</span>
                  <span className="text-gray-600 ml-2">({pacote.avaliacoes || 0} avaliações)</span>
                </div>
                <Badge className="ml-4 bg-green-100 text-green-800">Recomendado</Badge>
                {pacote.promocao && (
                  <Badge className="ml-2 bg-red-100 text-red-800">Promoção</Badge>
                )}
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Sobre o Pacote</h2>
                <p className="text-gray-700 mb-4">{pacote.descricao}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                  <div className="flex items-center text-gray-700">
                    <Calendar className="h-5 w-5 text-purple-600 mr-2" />
                    <span>{pacote.duracao || 7} dias</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Users className="h-5 w-5 text-purple-600 mr-2" />
                    <span>Até {pacote.max_pessoas || 10} pessoas</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Star className="h-5 w-5 text-purple-600 mr-2" />
                    <span>{pacote.categoria || "Premium"}</span>
                  </div>
                </div>
              </div>

              {/* Itinerary */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Itinerário</h2>
                <div className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-2">Dia 1: Chegada</h3>
                      <p className="text-gray-700 mb-4">Recepção no aeroporto e traslado para o hotel. Tempo livre para descanso.</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-2">Dia 2-6: Atividades</h3>
                      <p className="text-gray-700 mb-4">Passeios turísticos, atividades culturais e experiências gastronômicas.</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-2">Dia 7: Partida</h3>
                      <p className="text-gray-700 mb-4">Check-out do hotel e traslado para o aeroporto.</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Includes */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">O que está incluído</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-3">Incluído</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center text-gray-700">
                          <span className="text-green-500 mr-2">✓</span>
                          Hospedagem
                        </li>
                        <li className="flex items-center text-gray-700">
                          <span className="text-green-500 mr-2">✓</span>
                          Café da manhã
                        </li>
                        <li className="flex items-center text-gray-700">
                          <span className="text-green-500 mr-2">✓</span>
                          Traslados
                        </li>
                        <li className="flex items-center text-gray-700">
                          <span className="text-green-500 mr-2">✓</span>
                          Passeios guiados
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-3">Não Incluído</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center text-gray-700">
                          <span className="text-red-500 mr-2">✗</span>
                          Passagens aéreas
                        </li>
                        <li className="flex items-center text-gray-700">
                          <span className="text-red-500 mr-2">✗</span>
                          Refeições não mencionadas
                        </li>
                        <li className="flex items-center text-gray-700">
                          <span className="text-red-500 mr-2">✗</span>
                          Despesas pessoais
                        </li>
                        <li className="flex items-center text-gray-700">
                          <span className="text-red-500 mr-2">✗</span>
                          Seguro viagem
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Reservar este Pacote</h3>
                  <div className="space-y-4 mb-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Data de Partida</label>
                        <select className="w-full border rounded p-2">
                          <option>01/07/2023</option>
                          <option>15/07/2023</option>
                          <option>01/08/2023</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Pessoas</label>
                        <select className="w-full border rounded p-2">
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="border-t pt-4 mb-6">
                    <div className="flex justify-between mb-2">
                      <span>Preço por pessoa</span>
                      <span className="font-semibold">{pacote.preco?.toLocaleString() || "250.000"} Kz</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>{pacote.preco?.toLocaleString() || "250.000"} Kz</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    onClick={handleBookPackage}
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
          item={{
            nome: pacote.nome,
            preco: pacote.preco || 250000
          }}
          tipo="pacote"
        />
      )}
    </MainLayout>
  );
}; 