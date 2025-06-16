import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

export const FeaturedDestinations = () => {
  const [loading, setLoading] = useState(true);
  const [destinations, setDestinations] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Aqui você faria a chamada para API para buscar os destinos em destaque

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
        <h2 className="text-2xl font-bold text-red-600 mb-2">Erro ao carregar destinos</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!destinations || destinations.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-2">Nenhum destino encontrado</h2>
        <p>Não há destinos em destaque disponíveis no momento.</p>
      </div>
    );
  }

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Destinos em Destaque
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Descubra os lugares mais incríveis de Angola
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {destinations.map((destination) => (
            <Link key={destination.id} to={`/destinos/${destination.id}`}>
              <Card className="overflow-hidden h-64 relative group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                {destination.imagem_url ? (
                  <img
                    src={destination.imagem_url}
                    alt={destination.nome}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-gray-200">
                    <span className="text-gray-400">Sem imagem</span>
                  </div>
                )}
                <CardContent className="absolute bottom-0 left-0 right-0 z-20 p-4">
                  <h3 className="font-bold text-xl text-white mb-1">{destination.nome}</h3>
                  <p className="text-white/80 text-sm">{destination.pacotes_count || 0} pacotes disponíveis</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
