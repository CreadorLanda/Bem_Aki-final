import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { LoginBar } from "@/components/LoginBar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, MapPin, Wifi, Car, Coffee, Search, Filter, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useHoteis } from "@/hooks/useHoteis";
import { useStorage } from "@/hooks/useStorage";

export const HoteisPage = () => {
  const navigate = useNavigate();
  const { getHoteis, loading: hoteisLoading } = useHoteis();
  const { getImageUrl } = useStorage();
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [hoteis, setHoteis] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [cidades, setCidades] = useState<string[]>([]);

  useEffect(() => {
    const fetchHoteis = async () => {
      setLoading(true);
      const { data, error } = await getHoteis();
      
      if (error) {
        console.error("Erro ao buscar hotéis:", error);
      } else if (data) {
        // Extrair lista única de cidades para o filtro
        const cidadesUnicas = [...new Set(data.map((hotel: any) => hotel.cidade))];
        setCidades(cidadesUnicas);
        
        // Processar hotéis e obter URLs das imagens
        const hoteisProcessados = await Promise.all(
          data.map(async (hotel: any) => {
            let imagemUrl = '/placeholder.svg';
            
            // Se o hotel tem imagens, pegar a primeira
            if (hotel.imagens_hotel && hotel.imagens_hotel.length > 0) {
              const url = await getImageUrl('hoteis', hotel.imagens_hotel[0].caminho_arquivo);
              if (url) imagemUrl = url;
            }
            
            // Calcular média das avaliações se disponível
            let rating = hotel.avaliacao_media || 4.5;
            
            return {
              ...hotel,
              image: imagemUrl,
              rating,
              features: [
                hotel.tem_wifi ? 'Wi-Fi' : null,
                hotel.tem_piscina ? 'Piscina' : null,
                hotel.tem_restaurante ? 'Restaurante' : null,
                hotel.tem_estacionamento ? 'Estacionamento' : null,
                hotel.tem_academia ? 'Academia' : null
              ].filter(Boolean)
            };
          })
        );
        
        setHoteis(hoteisProcessados);
      }
      
      setLoading(false);
    };

    fetchHoteis();
  }, []);

  const filteredHotels = hoteis.filter(hotel => {
    const matchesSearch = hotel.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hotel.cidade.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hotel.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !location || location === "all" || hotel.cidade === location;
    const matchesPrice = !priceRange || priceRange === "all" ||
      (priceRange === "low" && hotel.preco_minimo <= 30000) ||
      (priceRange === "medium" && hotel.preco_minimo > 30000 && hotel.preco_minimo <= 50000) ||
      (priceRange === "high" && hotel.preco_minimo > 50000);
    
    return matchesSearch && matchesLocation && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <LoginBar />
      <Header />
      
      {/* Search Section */}
      <section className="bg-white py-8 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Hotéis em Angola</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar hotéis..."
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
                {cidades.map((cidade) => (
                  <SelectItem key={cidade} value={cidade}>{cidade}</SelectItem>
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
                <SelectItem value="medium">30.000 - 50.000 Kz</SelectItem>
                <SelectItem value="high">Acima de 50.000 Kz</SelectItem>
              </SelectContent>
            </Select>
            
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Filter className="h-4 w-4 mr-2" />
              Filtrar
            </Button>
          </div>
        </div>
      </section>

      {/* Hotels Grid */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">{filteredHotels.length} hotéis encontrados</p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 text-purple-600 animate-spin" />
              <span className="ml-2 text-lg text-gray-600">Carregando hotéis...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHotels.map((hotel) => (
                <Card key={hotel.id} className="hover:shadow-lg transition-shadow duration-300">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={hotel.image} 
                      alt={hotel.nome} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-bold mb-1">{hotel.nome}</h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{hotel.cidade}</span>
                    </div>
                    
                    <div className="flex items-center mb-3">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="text-sm">{hotel.rating}</span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{hotel.descricao}</p>
                    
                    <div className="mb-3 flex flex-wrap gap-1">
                      {hotel.features.slice(0, 3).map((feature, idx) => (
                        <span key={idx} className="inline-block bg-gray-100 text-xs px-2 py-1 rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-purple-600">{hotel.preco_minimo?.toLocaleString()} Kz</p>
                        <p className="text-xs text-gray-500">por noite</p>
                      </div>
                      <Button 
                        onClick={() => navigate(`/hotel/${hotel.id}`)}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        Ver Hotel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          
          {!loading && filteredHotels.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">Nenhum hotel encontrado com os filtros selecionados.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};
