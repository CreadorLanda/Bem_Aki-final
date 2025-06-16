import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { LoginBar } from "@/components/LoginBar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, MapPin, Search, Filter, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCarros } from "@/hooks/useCarros";
import { useStorage } from "@/hooks/useStorage";

export const CarrosPage = () => {
  const navigate = useNavigate();
  const { getCarros } = useCarros();
  const { getImageUrl } = useStorage();
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [carros, setCarros] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [localizacoes, setLocalizacoes] = useState<string[]>([]);

  useEffect(() => {
    const fetchCarros = async () => {
      setLoading(true);
      const { data, error } = await getCarros();
      
      if (error) {
        console.error("Erro ao buscar carros:", error);
      } else if (data) {
        // Extrair lista única de localizações para o filtro
        const localizacoesUnicas = [...new Set(data.map((carro: any) => carro.localizacao))];
        setLocalizacoes(localizacoesUnicas);
        
        // Processar carros e obter URLs das imagens
        const carrosProcessados = await Promise.all(
          data.map(async (carro: any) => {
            let imagemUrl = '/placeholder.svg';
            
            // Se o carro tem imagens, pegar a primeira
            if (carro.imagens_carro && carro.imagens_carro.length > 0) {
              const url = await getImageUrl('carros', carro.imagens_carro[0].caminho_arquivo);
              if (url) imagemUrl = url;
            }
            
            // Calcular média das avaliações se disponível
            let rating = carro.avaliacao_media || 4.5;
            
            return {
              ...carro,
              image: imagemUrl,
              rating,
              features: [
                carro.tipo_transmissao,
                `${carro.numero_portas} Portas`,
                carro.tem_ar_condicionado ? 'AC' : null,
                carro.tipo_combustivel,
              ].filter(Boolean)
            };
          })
        );
        
        setCarros(carrosProcessados);
      }
      
      setLoading(false);
    };

    fetchCarros();
  }, []);

  const filteredCars = carros.filter(car => {
    const matchesSearch = car.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.localizacao.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !location || location === "all" || car.localizacao === location;
    const matchesPrice = !priceRange || priceRange === "all" ||
      (priceRange === "low" && car.preco_diaria <= 30000) ||
      (priceRange === "medium" && car.preco_diaria > 30000 && car.preco_diaria <= 40000) ||
      (priceRange === "high" && car.preco_diaria > 40000);
    
    return matchesSearch && matchesLocation && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <LoginBar />
      <Header />
      
      {/* Search Section */}
      <section className="bg-white py-8 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Aluguel de Carros</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar carros..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Localização" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as localizações</SelectItem>
                {localizacoes.map((loc) => (
                  <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger>
                <SelectValue placeholder="Faixa de preço" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os preços</SelectItem>
                <SelectItem value="low">Até 30.000 Kz</SelectItem>
                <SelectItem value="medium">30.000 - 40.000 Kz</SelectItem>
                <SelectItem value="high">Acima de 40.000 Kz</SelectItem>
              </SelectContent>
            </Select>
            
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Filter className="h-4 w-4 mr-2" />
              Filtrar
            </Button>
          </div>
        </div>
      </section>

      {/* Cars Grid */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">{filteredCars.length} carros encontrados</p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 text-purple-600 animate-spin" />
              <span className="ml-2 text-lg text-gray-600">Carregando carros...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCars.map((car) => (
                <Card key={car.id} className="hover:shadow-lg transition-shadow duration-300">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={car.image} 
                      alt={`${car.marca} ${car.modelo}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-bold mb-1">{car.marca} {car.modelo}</h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{car.localizacao}</span>
                    </div>
                    
                    <div className="flex items-center mb-3">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="text-sm">{car.rating}</span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{car.descricao}</p>
                    
                    <div className="mb-3 flex flex-wrap gap-1">
                      {car.features.slice(0, 3).map((feature, idx) => (
                        <span key={idx} className="inline-block bg-gray-100 text-xs px-2 py-1 rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-purple-600">{car.preco_diaria.toLocaleString()} Kz</p>
                        <p className="text-xs text-gray-500">por dia</p>
                      </div>
                      <Button 
                        onClick={() => navigate(`/carro/${car.id}`)}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        Ver Detalhes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          
          {!loading && filteredCars.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">Nenhum carro encontrado com os filtros selecionados.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};
