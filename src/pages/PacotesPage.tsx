import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { LoginBar } from "@/components/LoginBar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, MapPin, Search, Filter, Calendar, Users, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { usePacotes } from "@/hooks/usePacotes";
import { useStorage } from "@/hooks/useStorage";

export const PacotesPage = () => {
  const navigate = useNavigate();
  const { getPacotes } = usePacotes();
  const { getImageUrl } = useStorage();
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [duration, setDuration] = useState("");
  const [pacotes, setPacotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [destinos, setDestinos] = useState<string[]>([]);
  const [duracoes, setDuracoes] = useState<string[]>([]);

  useEffect(() => {
    const fetchPacotes = async () => {
      setLoading(true);
      const { data, error } = await getPacotes();
      
      if (error) {
        console.error("Erro ao buscar pacotes:", error);
      } else if (data) {
        // Extrair lista única de destinos para o filtro
        const destinosUnicos = [...new Set(data.map((pacote: any) => pacote.destino_principal))];
        setDestinos(destinosUnicos);
        
        // Extrair lista única de durações para o filtro
        const duracoesUnicas = [...new Set(data.map((pacote: any) => `${pacote.duracao_dias} dias`))].sort();
        setDuracoes(duracoesUnicas);
        
        // Processar pacotes e obter URLs das imagens
        const pacotesProcessados = await Promise.all(
          data.map(async (pacote: any) => {
            let imagemUrl = '/placeholder.svg';
            
            // Se o pacote tem imagens, pegar a primeira
            if (pacote.imagens_pacote && pacote.imagens_pacote.length > 0) {
              const url = await getImageUrl('pacotes', pacote.imagens_pacote[0].caminho_arquivo);
              if (url) imagemUrl = url;
            }
            
            // Calcular média das avaliações se disponível
            let rating = pacote.avaliacao_media || 4.7;
            
            return {
              ...pacote,
              image: imagemUrl,
              rating,
              duration: `${pacote.duracao_dias} dias`,
              groupSize: `${pacote.min_pessoas}-${pacote.max_pessoas} pessoas`,
              includes: pacote.inclui ? pacote.inclui.split(',').map((item: string) => item.trim()) : []
            };
          })
        );
        
        setPacotes(pacotesProcessados);
      }
      
      setLoading(false);
    };

    fetchPacotes();
  }, []);

  const filteredPackages = pacotes.filter(pkg => {
    const matchesSearch = pkg.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.destino_principal.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !location || location === "all" || pkg.destino_principal === location;
    const matchesDuration = !duration || duration === "all" || pkg.duration === duration;
    
    return matchesSearch && matchesLocation && matchesDuration;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <LoginBar />
      <Header />
      
      {/* Search Section */}
      <section className="bg-white py-8 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Pacotes Turísticos</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar pacotes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Destino" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os destinos</SelectItem>
                {destinos.map((destino) => (
                  <SelectItem key={destino} value={destino}>{destino}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger>
                <SelectValue placeholder="Duração" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as durações</SelectItem>
                {duracoes.map((duracao) => (
                  <SelectItem key={duracao} value={duracao}>{duracao}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Filter className="h-4 w-4 mr-2" />
              Filtrar
            </Button>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">{filteredPackages.length} pacotes encontrados</p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 text-purple-600 animate-spin" />
              <span className="ml-2 text-lg text-gray-600">Carregando pacotes...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPackages.map((pkg) => (
                <Card key={pkg.id} className="hover:shadow-lg transition-shadow duration-300">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={pkg.image} 
                      alt={pkg.nome} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-bold mb-1">{pkg.nome}</h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{pkg.destino_principal}</span>
                    </div>
                    
                    <div className="flex items-center mb-2">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="text-sm">{pkg.rating}</span>
                    </div>

                    <div className="flex items-center justify-between text-gray-600 mb-3">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span className="text-sm">{pkg.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        <span className="text-sm">{pkg.groupSize}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{pkg.descricao}</p>
                    
                    <div className="mb-3 flex flex-wrap gap-1">
                      {pkg.includes.slice(0, 3).map((item, idx) => (
                        <span key={idx} className="inline-block bg-gray-100 text-xs px-2 py-1 rounded">
                          {item}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-purple-600">{pkg.preco.toLocaleString()} Kz</p>
                        <p className="text-xs text-gray-500">por pessoa</p>
                      </div>
                      <Button 
                        onClick={() => navigate(`/pacote/${pkg.id}`)}
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
          
          {!loading && filteredPackages.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">Nenhum pacote encontrado com os filtros selecionados.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};
