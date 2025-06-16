import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Clock } from "lucide-react";

export const RecommendedSalons = () => {
  const [loading, setLoading] = useState(true);
  const [salons, setSalons] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Aqui você faria a chamada para API para buscar os salões recomendados

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-600 mb-2">Erro ao carregar salões</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!salons || salons.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-2">Nenhum salão encontrado</h2>
        <p>Não há salões recomendados disponíveis no momento.</p>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Salões Recomendados
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Os melhores salões de beleza em Angola
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {salons.map((salon) => (
            <Card key={salon.id} className="overflow-hidden">
              <div className="h-48 bg-gray-200 relative">
                {salon.imagem_url ? (
                  <img
                    src={salon.imagem_url}
                    alt={salon.nome}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-gray-200">
                    <span className="text-gray-400">Sem imagem</span>
                  </div>
                )}
                {salon.promocao && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded">
                    Promoção
                  </div>
                )}
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-xl mb-1">{salon.nome}</h3>
                    <p className="text-gray-600 flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-1" />
                      {salon.cidade}
                    </p>
                  </div>
                  <div className="flex items-center bg-purple-100 text-purple-800 px-2 py-1 rounded">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span>{salon.classificacao}</span>
                  </div>
                </div>
                <p className="mt-4 text-gray-600 line-clamp-2">{salon.descricao_curta}</p>
                <div className="mt-4 flex items-center text-gray-700 text-sm">
                  <Clock className="h-4 w-4 text-purple-600 mr-1" />
                  <span>Horário: {salon.horario_funcionamento}</span>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-lg text-purple-600">
                      A partir de {salon.preco_minimo?.toLocaleString()} Kz
                    </span>
                  </div>
                  <Link to={`/saloes/${salon.id}`}>
                    <Button className="bg-purple-600 hover:bg-purple-700">Ver Detalhes</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/saloes">
            <Button className="bg-purple-600 hover:bg-purple-700">Ver Todos os Salões</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}; 