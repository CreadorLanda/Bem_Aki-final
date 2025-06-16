import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Fuel, Gauge, Car as CarIcon } from "lucide-react";

export const RecommendedCars = () => {
  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Aqui você faria a chamada para API para buscar os carros recomendados

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
        <h2 className="text-2xl font-bold text-red-600 mb-2">Erro ao carregar veículos</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!cars || cars.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-2">Nenhum veículo encontrado</h2>
        <p>Não há veículos recomendados disponíveis no momento.</p>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Veículos Recomendados
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Os melhores carros para alugar em Angola
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {cars.map((car) => (
            <Card key={car.id} className="overflow-hidden">
              <div className="h-48 bg-gray-200 relative">
                {car.imagem_url ? (
                  <img
                    src={car.imagem_url}
                    alt={`${car.marca} ${car.modelo}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-gray-200">
                    <span className="text-gray-400">Sem imagem</span>
                  </div>
                )}
                {car.promocao && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded">
                    Promoção
                  </div>
                )}
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-xl mb-1">
                    {car.marca} {car.modelo}
                  </h3>
                  <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                    {car.categoria}
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="flex items-center text-gray-700 text-sm">
                    <Users className="h-4 w-4 text-purple-600 mr-1" />
                    <span>{car.capacidade} pessoas</span>
                  </div>
                  <div className="flex items-center text-gray-700 text-sm">
                    <Fuel className="h-4 w-4 text-purple-600 mr-1" />
                    <span>{car.combustivel}</span>
                  </div>
                  <div className="flex items-center text-gray-700 text-sm">
                    <Gauge className="h-4 w-4 text-purple-600 mr-1" />
                    <span>{car.consumo}</span>
                  </div>
                  <div className="flex items-center text-gray-700 text-sm">
                    <CarIcon className="h-4 w-4 text-purple-600 mr-1" />
                    <span>{car.tipo_cambio}</span>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-lg text-purple-600">
                      {car.preco_diaria.toLocaleString()} Kz
                    </span>
                    <span className="text-gray-500 text-sm"> / dia</span>
                  </div>
                  <Link to={`/carros/${car.id}`}>
                    <Button className="bg-purple-600 hover:bg-purple-700">Ver Detalhes</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/carros">
            <Button className="bg-purple-600 hover:bg-purple-700">Ver Todos os Veículos</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}; 