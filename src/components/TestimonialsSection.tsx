import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { LoadingFallback } from "./LoadingFallback";

export const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [stats, setStats] = useState({
    avgRating: 4.9,
    totalBookings: 50000,
    totalPartners: 1000
  });

  const fetchTestimonials = useCallback(async () => {
    try {
      // Limite de 3 tentativas
      if (retryCount >= 3) {
        setError("Número máximo de tentativas excedido. Por favor, tente novamente mais tarde.");
        setLoading(false);
        return;
      }

      setLoading(true);
      
      // Usar dados estáticos se as tabelas não existirem
      try {
        const { data, error } = await supabase
          .from('depoimentos')
          .select('*')
          .order('id', { ascending: false })
          .limit(3);
        
        if (error) {
          // Se a tabela não existir, usar dados estáticos
          if (error.code === '42P01') {
            console.log('Tabela depoimentos não existe, usando dados estáticos');
            setTestimonials([
              {
                id: 1,
                nome: 'Ana Ferreira',
                cargo: 'Empresária',
                empresa: 'Tech Solutions',
                depoimento: 'Excelente serviço! A AKI Viagens organizou nossa viagem corporativa com perfeição. Recomendo a todos.',
                avaliacao: 5
              },
              {
                id: 2,
                nome: 'Carlos Mendonça',
                cargo: 'Engenheiro',
                empresa: 'Construções Angola',
                depoimento: 'Minha família e eu tivemos uma experiência incrível no Safari Kissama. Guias muito bem preparados e atenciosos.',
                avaliacao: 5
              },
              {
                id: 3,
                nome: 'Sofia Martins',
                cargo: 'Médica',
                empresa: 'Hospital Central',
                depoimento: 'A estadia no Hotel Presidente foi maravilhosa. Atendimento de primeira e instalações impecáveis.',
                avaliacao: 4
              }
            ]);
          } else {
            throw error;
          }
        } else {
          setTestimonials(data || []);
        }
      } catch (err: any) {
        console.error('Erro ao buscar depoimentos:', err);
        setTestimonials([
          {
            id: 1,
            nome: 'Ana Ferreira',
            cargo: 'Empresária',
            empresa: 'Tech Solutions',
            depoimento: 'Excelente serviço! A AKI Viagens organizou nossa viagem corporativa com perfeição. Recomendo a todos.',
            avaliacao: 5
          },
          {
            id: 2,
            nome: 'Carlos Mendonça',
            cargo: 'Engenheiro',
            empresa: 'Construções Angola',
            depoimento: 'Minha família e eu tivemos uma experiência incrível no Safari Kissama. Guias muito bem preparados e atenciosos.',
            avaliacao: 5
          },
          {
            id: 3,
            nome: 'Sofia Martins',
            cargo: 'Médica',
            empresa: 'Hospital Central',
            depoimento: 'A estadia no Hotel Presidente foi maravilhosa. Atendimento de primeira e instalações impecáveis.',
            avaliacao: 4
          }
        ]);
      }

      // Buscar estatísticas
      try {
        const { data: statsData, error: statsError } = await supabase
          .from('estatisticas')
          .select('*')
          .single();

        if (statsError) {
          if (statsError.code !== 'PGRST116') {
            console.error('Erro ao buscar estatísticas:', statsError);
          }
        } else if (statsData) {
          setStats({
            avgRating: statsData.avaliacao_media_hoteis || 4.9,
            totalBookings: (statsData.total_reservas_hotel || 0) + 
                          (statsData.total_reservas_carro || 0) + 
                          (statsData.total_reservas_salao || 0) + 
                          (statsData.total_reservas_pacote || 0) || 50000,
            totalPartners: (statsData.total_hoteis || 0) + 
                          (statsData.total_carros || 0) + 
                          (statsData.total_saloes || 0) || 1000
          });
        }
      } catch (statsErr) {
        console.error('Erro ao processar estatísticas:', statsErr);
        // Mantém os valores padrão definidos no estado inicial
      }
    } catch (err: any) {
      setError(err.message);
      console.error('Erro geral ao buscar dados:', err);
      setRetryCount(prevCount => prevCount + 1);
    } finally {
      setLoading(false);
    }
  }, [retryCount]);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  if (loading) {
    return <LoadingFallback onRetry={fetchTestimonials} />;
  }

  if (error) {
    return (
      <section className="py-20 bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              O que Nossos{" "}
              <span className="bg-gradient-to-r from-purple-600 to-yellow-500 bg-clip-text text-transparent">
                Clientes Dizem
              </span>
            </h2>
            <p className="text-red-500">Erro ao carregar depoimentos. Tente novamente mais tarde.</p>
            <button 
              onClick={() => {
                setRetryCount(0);
                setError(null);
                fetchTestimonials();
              }}
              className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              Tentar novamente
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            O que Nossos{" "}
            <span className="bg-gradient-to-r from-purple-600 to-yellow-500 bg-clip-text text-transparent">
              Clientes Dizem
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Milhares de experiências positivas comprovam a qualidade dos nossos serviços
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Quote className="h-8 w-8 text-purple-200 mr-3" />
                  <div className="flex">
                    {[...Array(testimonial.avaliacao || 5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                
                <p className="text-gray-700 leading-relaxed mb-6 italic">
                  "{testimonial.depoimento}"
                </p>
                
                <div className="flex items-center">
                  {testimonial.imagem_url ? (
                    <img 
                      src={testimonial.imagem_url} 
                      alt={testimonial.nome}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold mr-4">
                      {testimonial.nome?.charAt(0) || "A"}
                    </div>
                  )}
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.nome}</h4>
                    <p className="text-sm text-gray-600">{testimonial.cargo}</p>
                    <p className="text-sm text-purple-600">{testimonial.empresa}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 pt-16 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600 mb-2">{stats.avgRating}/5</div>
              <div className="text-sm text-gray-500">Avaliação Média</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600 mb-2">{(stats.totalBookings / 1000).toFixed(0)}k+</div>
              <div className="text-sm text-gray-500">Reservas Realizadas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600 mb-2">{stats.totalPartners}+</div>
              <div className="text-sm text-gray-500">Parceiros</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600 mb-2">24/7</div>
              <div className="text-sm text-gray-500">Suporte</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
