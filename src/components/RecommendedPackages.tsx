import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Calendar, Users } from "lucide-react";

export const RecommendedPackages = () => {
  const [loading, setLoading] = useState(true);
  const [packages, setPackages] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Aqui você faria a chamada para API para buscar os pacotes recomendados

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
        <h2 className="text-2xl font-bold text-red-600 mb-2">Erro ao carregar pacotes</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!packages || packages.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-2">Nenhum pacote encontrado</h2>
        <p>Não há pacotes recomendados disponíveis no momento.</p>
      </div>
    );
  }

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Pacotes Recomendados
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Descubra as melhores experiências em Angola
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg) => (
            <Card key={pkg.id} className="overflow-hidden">
              <div className="h-48 bg-gray-200 relative">
                {pkg.imagem_url ? (
                  <img
                    src={pkg.imagem_url}
                    alt={pkg.nome}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-gray-200">
                    <span className="text-gray-400">Sem imagem</span>
                  </div>
                )}
                {pkg.promocao && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded">
                    Promoção
                  </div>
                )}
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-xl mb-1">{pkg.nome}</h3>
                    <p className="text-gray-600 flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-1" />
                      {pkg.destino}
                    </p>
                  </div>
                  <div className="flex items-center bg-purple-100 text-purple-800 px-2 py-1 rounded">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span>{pkg.classificacao}</span>
                  </div>
                </div>
                <p className="mt-4 text-gray-600 line-clamp-2">{pkg.descricao_curta}</p>
                <div className="mt-4 flex flex-wrap gap-4">
                  <div className="flex items-center text-gray-700 text-sm">
                    <Calendar className="h-4 w-4 text-purple-600 mr-1" />
                    <span>{pkg.duracao} dias</span>
                  </div>
                  <div className="flex items-center text-gray-700 text-sm">
                    <Users className="h-4 w-4 text-purple-600 mr-1" />
                    <span>Até {pkg.max_pessoas} pessoas</span>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-lg text-purple-600">
                      {pkg.preco_por_pessoa.toLocaleString()} Kz
                    </span>
                    <span className="text-gray-500 text-sm"> / pessoa</span>
                  </div>
                  <Link to={`/pacotes/${pkg.id}`}>
                    <Button className="bg-purple-600 hover:bg-purple-700">Ver Detalhes</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/pacotes">
            <Button className="bg-purple-600 hover:bg-purple-700">Ver Todos os Pacotes</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}; 