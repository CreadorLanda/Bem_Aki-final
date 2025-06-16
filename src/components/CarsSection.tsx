import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

export const CarsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const { data, error } = await supabase
          .from('carros')
          .select('*')
          .limit(5);
        
        if (error) throw error;
        
        setCars(data || []);
      } catch (err: any) {
        setError(err.message);
        console.error('Erro ao buscar carros:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  useEffect(() => {
    if (cars.length === 0) return;
    
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
  }, [cars]);

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
              Aluguel de Carros
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
              Aluguel de Carros
            </h2>
            <p className="text-red-500">Erro ao carregar dados. Tente novamente mais tarde.</p>
          </div>
        </div>
      </section>
    );
  }

  if (cars.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Aluguel de Carros
            </h2>
            <p>Nenhum carro disponível no momento.</p>
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
            Aluguel de Carros
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Escolha entre nossa ampla frota de veículos para alugar em toda Angola
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
            {cars.map((car) => (
              <Card key={car.id} className="min-w-[280px] max-w-[280px] hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={car.imagem_url || "/placeholder.svg"} 
                    alt={`${car.marca} ${car.modelo}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold mb-1">{car.marca} {car.modelo}</h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{car.cidade}</span>
                  </div>
                  
                  <div className="flex items-center mb-3">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-sm">{car.classificacao || "Novo"}</span>
                  </div>
                  
                  <div className="mb-3 flex flex-wrap gap-1">
                    {car.caracteristicas && car.caracteristicas.slice(0, 3).map((feature: string, idx: number) => (
                      <span key={idx} className="inline-block bg-gray-100 text-xs px-2 py-1 rounded">
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div>
                      <p className="font-bold text-purple-600">{car.preco_diaria?.toLocaleString()} Kz</p>
                      <p className="text-xs text-gray-500">por dia</p>
                    </div>
                    <Button 
                      onClick={() => navigate(`/carros/${car.id}`)}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      Reservar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-8">
          <Button 
            onClick={() => navigate('/carros')}
            variant="outline" 
            className="border-purple-200 text-purple-700 hover:bg-purple-50"
          >
            Ver todos os carros
          </Button>
        </div>
      </div>
    </section>
  );
};
