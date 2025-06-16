import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Calendar, MapPin, Car, Building, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";

export const PackagesSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const { data, error } = await supabase
          .from('pacotes')
          .select('*')
          .limit(5);
        
        if (error) throw error;
        
        // Processar os dados para garantir que inclui seja sempre um array
        const processedData = data?.map(pkg => ({
          ...pkg,
          inclui: pkg.inclui ? 
            (typeof pkg.inclui === 'string' ? pkg.inclui.split(',') : pkg.inclui) 
            : []
        }));
        
        setPackages(processedData || []);
      } catch (err: any) {
        setError(err.message);
        console.error('Erro ao buscar pacotes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  useEffect(() => {
    if (packages.length === 0) return;
    
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [packages]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pacotes Completos
            </h2>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pacotes Completos
            </h2>
            <p className="text-red-500">Erro ao carregar dados. Tente novamente mais tarde.</p>
          </div>
        </div>
      </section>
    );
  }

  if (packages.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pacotes Completos
            </h2>
            <p>Nenhum pacote disponível no momento.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Pacotes Completos
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Combine hotel, carro e experiências com os melhores preços garantidos
          </p>
        </div>

        <div className="relative">
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div 
            ref={scrollRef}
            className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {packages.map((pkg) => (
              <Card key={pkg.id} className="relative min-w-[300px] max-w-[300px] hover:shadow-lg transition-shadow duration-300">
                {pkg.promocao && (
                  <div className="absolute top-3 right-3 z-10">
                    <Badge className="bg-yellow-500 hover:bg-yellow-600">Promoção</Badge>
                  </div>
                )}
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={pkg.imagem_url || "/placeholder.svg"} 
                    alt={pkg.nome} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold mb-1">{pkg.nome}</h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{pkg.destino_principal}</span>
                  </div>
                  
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="text-sm">{pkg.avaliacao_media || "Novo"}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                      <span className="text-sm">{pkg.duracao_dias || "?"} dias</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Inclui:</p>
                    <div className="space-y-1">
                      {Array.isArray(pkg.inclui) && pkg.inclui.slice(0, 3).map((item: string, idx: number) => (
                        <div key={idx} className="flex items-center text-sm">
                          {item.toLowerCase().includes("hotel") || item.toLowerCase().includes("resort") ? (
                            <Building className="h-3 w-3 text-purple-600 mr-2" />
                          ) : item.toLowerCase().includes("carro") || item.toLowerCase().includes("4x4") ? (
                            <Car className="h-3 w-3 text-purple-600 mr-2" />
                          ) : (
                            <Users className="h-3 w-3 text-purple-600 mr-2" />
                          )}
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div>
                      <p className="font-bold text-purple-600">{pkg.preco?.toLocaleString()} Kz</p>
                      <p className="text-xs text-gray-500">pacote completo</p>
                    </div>
                    <Button 
                      onClick={() => navigate(`/pacotes/${pkg.id}`)}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      Ver Pacote
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-8">
          <Button 
            onClick={() => navigate('/pacotes')}
            variant="outline" 
            className="border-purple-200 text-purple-700 hover:bg-purple-50"
          >
            Ver todos os pacotes
          </Button>
        </div>
      </div>
    </section>
  );
};
