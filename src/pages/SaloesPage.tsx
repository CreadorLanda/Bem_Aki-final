import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { LoginBar } from "@/components/LoginBar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, MapPin, Search, Filter, Users, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSaloes } from "@/hooks/useSaloes";
import { useStorage } from "@/hooks/useStorage";

export const SaloesPage = () => {
  const navigate = useNavigate();
  const { getSaloes } = useSaloes();
  const { getImageUrl } = useStorage();
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");
  const [saloes, setSaloes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [localizacoes, setLocalizacoes] = useState<string[]>([]);

  useEffect(() => {
    const fetchSaloes = async () => {
      setLoading(true);
      const { data, error } = await getSaloes();
      
      if (error) {
        console.error("Erro ao buscar salões:", error);
      } else if (data) {
        // Extrair lista única de localizações para o filtro
        const localizacoesUnicas = [...new Set(data.map((salao: any) => salao.cidade))];
        setLocalizacoes(localizacoesUnicas);
        
        // Processar salões e obter URLs das imagens
        const saloesProcessados = await Promise.all(
          data.map(async (salao: any) => {
            let imagemUrl = '/placeholder.svg';
            
            // Se o salão tem imagens, pegar a primeira
            if (salao.imagens_salao && salao.imagens_salao.length > 0) {
              const url = await getImageUrl('saloes', salao.imagens_salao[0].caminho_arquivo);
              if (url) imagemUrl = url;
            }
            
            // Calcular média das avaliações se disponível
            let rating = salao.avaliacao_media || 4.5;
            
            // Preparar lista de recursos
            const features = [];
            if (salao.tem_ar_condicionado) features.push('AC');
            if (salao.tem_estacionamento) features.push('Estacionamento');
            if (salao.tem_wifi) features.push('Wi-Fi');
            if (salao.tem_palco) features.push('Palco');
            if (salao.tem_som) features.push('Som');
            if (salao.tem_iluminacao) features.push('Iluminação');
            
            return {
              ...salao,
              image: imagemUrl,
              rating,
              features
            };
          })
        );
        
        setSaloes(saloesProcessados);
      }
      
      setLoading(false);
    };

    fetchSaloes();
  }, []);

  const filteredVenues = saloes.filter(venue => {
    const matchesSearch = venue.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         venue.cidade.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         venue.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !location || location === "all" || venue.cidade === location;
    const matchesCapacity = !capacity || capacity === "all" ||
      (capacity === "small" && venue.capacidade <= 150) ||
      (capacity === "medium" && venue.capacidade > 150 && venue.capacidade <= 250) ||
      (capacity === "large" && venue.capacidade > 250);
    
    return matchesSearch && matchesLocation && matchesCapacity;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <LoginBar />
      <Header />
      
      {/* Search Section */}
      <section className="bg-white py-8 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Salões de Festas</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar salões..."
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
            
            <Select value={capacity} onValueChange={setCapacity}>
              <SelectTrigger>
                <SelectValue placeholder="Capacidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as capacidades</SelectItem>
                <SelectItem value="small">Até 150 pessoas</SelectItem>
                <SelectItem value="medium">150 - 250 pessoas</SelectItem>
                <SelectItem value="large">Acima de 250 pessoas</SelectItem>
              </SelectContent>
            </Select>
            
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Filter className="h-4 w-4 mr-2" />
              Filtrar
            </Button>
          </div>
        </div>
      </section>

      {/* Venues Grid */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">{filteredVenues.length} salões encontrados</p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 text-purple-600 animate-spin" />
              <span className="ml-2 text-lg text-gray-600">Carregando salões...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVenues.map((venue) => (
                <Card key={venue.id} className="hover:shadow-lg transition-shadow duration-300">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={venue.image} 
                      alt={venue.nome} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-bold mb-1">{venue.nome}</h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{venue.cidade}</span>
                    </div>
                    
                    <div className="flex items-center mb-2">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="text-sm">{venue.rating}</span>
                    </div>

                    <div className="flex items-center text-gray-600 mb-3">
                      <Users className="h-4 w-4 mr-1" />
                      <span className="text-sm">Até {venue.capacidade} pessoas</span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{venue.descricao}</p>
                    
                    <div className="mb-3 flex flex-wrap gap-1">
                      {venue.features.slice(0, 3).map((feature, idx) => (
                        <span key={idx} className="inline-block bg-gray-100 text-xs px-2 py-1 rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-purple-600">{venue.preco_diaria.toLocaleString()} Kz</p>
                        <p className="text-xs text-gray-500">por evento</p>
                      </div>
                      <Button 
                        onClick={() => navigate(`/salao/${venue.id}`)}
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
          
          {!loading && filteredVenues.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">Nenhum salão encontrado com os filtros selecionados.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};
