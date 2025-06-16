import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

export const PopularActivities = () => {
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Aqui você faria a chamada para API para buscar as atividades populares

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
        <h2 className="text-2xl font-bold text-red-600 mb-2">Erro ao carregar atividades</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!activities || activities.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-2">Nenhuma atividade encontrada</h2>
        <p>Não há atividades populares disponíveis no momento.</p>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Atividades Populares
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Experiências incríveis para aproveitar em Angola
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {activities.map((activity) => (
            <Link key={activity.id} to={`/atividades/${activity.id}`}>
              <Card className="overflow-hidden h-80 relative group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                {activity.imagem_url ? (
                  <img
                    src={activity.imagem_url}
                    alt={activity.nome}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-gray-200">
                    <span className="text-gray-400">Sem imagem</span>
                  </div>
                )}
                <CardContent className="absolute bottom-0 left-0 right-0 z-20 p-6">
                  <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm inline-block mb-2">
                    {activity.categoria}
                  </div>
                  <h3 className="font-bold text-xl text-white mb-2">{activity.nome}</h3>
                  <p className="text-white/90 text-sm line-clamp-2">{activity.descricao_curta}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-white font-bold">
                      {activity.preco_base ? `${activity.preco_base.toLocaleString()} Kz` : 'Consultar preço'}
                    </span>
                    <div className="bg-white/30 backdrop-blur-sm hover:bg-white/50 transition-colors px-3 py-1 rounded-full text-white text-sm">
                      Ver detalhes
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}; 