import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const PromotionBanner = () => {
  const [loading, setLoading] = useState(true);
  const [promotion, setPromotion] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Aqui você faria a chamada para API para buscar a promoção em destaque

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
      </div>
    );
  }

  if (error) {
    return null; // Não exibir nada em caso de erro
  }

  if (!promotion) {
    return null; // Não exibir nada se não houver promoção
  }

  return (
    <div className="relative bg-purple-900 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        {promotion.imagem_url ? (
          <img
            src={promotion.imagem_url}
            alt={promotion.titulo}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-purple-800"></div>
        )}
        <div className="absolute inset-0 bg-purple-900/70"></div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
              {promotion.titulo}
            </h2>
            <p className="text-lg text-purple-100 mb-6 max-w-2xl">
              {promotion.descricao}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to={promotion.link_url}>
                <Button size="lg" className="bg-white text-purple-900 hover:bg-purple-50">
                  {promotion.botao_texto || "Ver oferta"}
                </Button>
              </Link>
              {promotion.data_fim && (
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-md text-white flex items-center">
                  <span className="mr-2">Válido até:</span>
                  <span className="font-bold">{new Date(promotion.data_fim).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </div>
          {promotion.destaque && (
            <div className="bg-yellow-400 text-purple-900 rounded-full px-6 py-6 font-bold text-xl md:text-2xl transform rotate-12 shadow-lg">
              {promotion.destaque}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 