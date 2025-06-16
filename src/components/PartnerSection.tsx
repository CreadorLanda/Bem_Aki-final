import { useState } from "react";

export const PartnerSection = () => {
  const [loading, setLoading] = useState(true);
  const [partners, setPartners] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Aqui você faria a chamada para API para buscar os parceiros

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

  if (!partners || partners.length === 0) {
    return null; // Não exibir nada se não houver parceiros
  }

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900">Nossos Parceiros</h2>
          <p className="mt-2 text-gray-600">Trabalhamos com as melhores empresas de Angola</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {partners.map((partner) => (
            <div key={partner.id} className="flex items-center justify-center p-4">
              {partner.logo_url ? (
                <img
                  src={partner.logo_url}
                  alt={partner.nome}
                  className="max-h-16 max-w-full grayscale hover:grayscale-0 transition-all duration-300"
                />
              ) : (
                <div className="h-16 w-full flex items-center justify-center bg-gray-100 text-gray-400 font-bold">
                  {partner.nome}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 