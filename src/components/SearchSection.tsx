import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Hotel, Car, Scissors, Palmtree } from "lucide-react";

export const SearchSection = () => {
  const [activeTab, setActiveTab] = useState("hotels");
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você implementaria a lógica de busca com os dados do formulário
    console.log("Realizando busca para:", activeTab);
  };

  return (
    <div className="relative bg-purple-900 py-12 md:py-20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-purple-800 opacity-90"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Encontre os melhores serviços em Angola
          </h1>
          <p className="text-xl text-purple-100">
            Hotéis, carros, salões de beleza e pacotes turísticos
          </p>
        </div>
        
        <Tabs defaultValue="hotels" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 w-full max-w-2xl mx-auto bg-white/10">
            <TabsTrigger value="hotels" className="text-white data-[state=active]:bg-white data-[state=active]:text-purple-900">
              <Hotel className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Hotéis</span>
            </TabsTrigger>
            <TabsTrigger value="cars" className="text-white data-[state=active]:bg-white data-[state=active]:text-purple-900">
              <Car className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Carros</span>
            </TabsTrigger>
            <TabsTrigger value="salons" className="text-white data-[state=active]:bg-white data-[state=active]:text-purple-900">
              <Scissors className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Salões</span>
            </TabsTrigger>
            <TabsTrigger value="packages" className="text-white data-[state=active]:bg-white data-[state=active]:text-purple-900">
              <Palmtree className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Pacotes</span>
            </TabsTrigger>
          </TabsList>
          
          <Card className="mt-6 border-0 shadow-lg">
            <CardContent className="p-6">
              <TabsContent value="hotels">
                <form onSubmit={handleSearch}>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Destino</label>
                      <input
                        type="text"
                        placeholder="Para onde você vai?"
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                      <input
                        type="date"
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                      <input
                        type="date"
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Hóspedes</label>
                      <select className="w-full p-2 border rounded">
                        <option>1 adulto</option>
                        <option>2 adultos</option>
                        <option>2 adultos, 1 criança</option>
                        <option>2 adultos, 2 crianças</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                      Buscar Hotéis
                    </Button>
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="cars">
                <form onSubmit={handleSearch}>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Local de retirada</label>
                      <input
                        type="text"
                        placeholder="Onde você vai retirar o carro?"
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Data de retirada</label>
                      <input
                        type="date"
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Data de devolução</label>
                      <input
                        type="date"
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                      <select className="w-full p-2 border rounded">
                        <option>Todas as categorias</option>
                        <option>Econômico</option>
                        <option>Intermediário</option>
                        <option>SUV</option>
                        <option>Luxo</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                      Buscar Carros
                    </Button>
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="salons">
                <form onSubmit={handleSearch}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de serviço</label>
                      <select className="w-full p-2 border rounded">
                        <option>Todos os serviços</option>
                        <option>Cabelo</option>
                        <option>Unhas</option>
                        <option>Maquiagem</option>
                        <option>Massagem</option>
                        <option>Estética</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Localização</label>
                      <input
                        type="text"
                        placeholder="Onde você está?"
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
                      <input
                        type="date"
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                      Buscar Salões
                    </Button>
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="packages">
                <form onSubmit={handleSearch}>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Destino</label>
                      <input
                        type="text"
                        placeholder="Para onde você quer ir?"
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Data de partida</label>
                      <input
                        type="date"
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Duração</label>
                      <select className="w-full p-2 border rounded">
                        <option>Qualquer duração</option>
                        <option>Até 3 dias</option>
                        <option>4-7 dias</option>
                        <option>8-14 dias</option>
                        <option>15+ dias</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Pessoas</label>
                      <select className="w-full p-2 border rounded">
                        <option>1 pessoa</option>
                        <option>2 pessoas</option>
                        <option>3 pessoas</option>
                        <option>4 pessoas</option>
                        <option>5+ pessoas</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                      Buscar Pacotes
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>
      </div>
    </div>
  );
}; 