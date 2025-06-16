import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MapPin } from "lucide-react";

export const RecommendedHotels = () => {
  const [loading, setLoading] = useState(true);
  const [hotels, setHotels] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Aqui você faria a chamada para API para buscar os hotéis recomendados

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
        <h2 className="text-2xl font-bold text-red-600 mb-2">Erro ao carregar hotéis</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!hotels || hotels.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-2">Nenhum hotel encontrado</h2>
        <p>Não há hotéis recomendados disponíveis no momento.</p>
      </div>
    );
  }

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Hotéis Recomendados
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Os melhores lugares para ficar em Angola
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {hotels.map((hotel) => (
            <Card key={hotel.id} className="overflow-hidden">
              <div className="h-48 bg-gray-200 relative">
                {hotel.imagem_url ? (
                  <img
                    src={hotel.imagem_url}
                    alt={hotel.nome}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-gray-200">
                    <span className="text-gray-400">Sem imagem</span>
                  </div>
                )}
                {hotel.promocao && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded">
                    Promoção
                  </div>
                )}
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-xl mb-1">{hotel.nome}</h3>
                    <p className="text-gray-600 flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-1" />
                      {hotel.cidade}
                    </p>
                  </div>
                  <div className="flex items-center bg-purple-100 text-purple-800 px-2 py-1 rounded">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span>{hotel.classificacao}</span>
                  </div>
                </div>
                <p className="mt-4 text-gray-600 line-clamp-2">{hotel.descricao_curta}</p>
                <div className="mt-4 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-lg text-purple-600">
                      {hotel.preco_minimo?.toLocaleString()} Kz
                    </span>
                    <span className="text-gray-500 text-sm"> / noite</span>
                  </div>
                  <Link to={`/hoteis/${hotel.id}`}>
                    <Button className="bg-purple-600 hover:bg-purple-700">Ver Detalhes</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/hoteis">
            <Button className="bg-purple-600 hover:bg-purple-700">Ver Todos os Hotéis</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}; 