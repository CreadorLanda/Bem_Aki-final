import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Star, MapPin, Calendar, Car, Building, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export const OffersView = () => {
  const [offerType, setOfferType] = useState("hotels");
  const hotelScrollRef = useRef<HTMLDivElement>(null);
  const carScrollRef = useRef<HTMLDivElement>(null);
  const venueScrollRef = useRef<HTMLDivElement>(null);

  const hotelOffers = [
    {
      id: 1,
      name: "Hotel Presidente",
      location: "Luanda",
      image: "/placeholder.svg",
      oldPrice: 45000,
      newPrice: 35000,
      rating: 4.8,
      discount: 22,
      amenities: ["Wi-Fi", "Piscina", "Estacionamento"]
    },
    {
      id: 2,
      name: "Skyna Hotel",
      location: "Luanda",
      image: "/placeholder.svg",
      oldPrice: 38000,
      newPrice: 30000,
      rating: 4.6,
      discount: 21,
      amenities: ["Wi-Fi", "Academia", "Restaurante"]
    },
    {
      id: 3,
      name: "Epic Sana",
      location: "Luanda",
      image: "/placeholder.svg",
      oldPrice: 60000,
      newPrice: 42000,
      rating: 4.9,
      discount: 30,
      amenities: ["Wi-Fi", "Vista Mar", "Spa"]
    },
    {
      id: 4,
      name: "Hotel Continental",
      location: "Lubango",
      image: "/placeholder.svg",
      oldPrice: 35000,
      newPrice: 28000,
      rating: 4.4,
      discount: 20,
      amenities: ["Wi-Fi", "Café da Manhã", "Restaurante"]
    }
  ];

  const carOffers = [
    {
      id: 1,
      name: "Toyota Corolla",
      location: "Luanda",
      image: "/placeholder.svg",
      oldPrice: 25000,
      newPrice: 18000,
      rating: 4.7,
      discount: 28,
      features: ["Automático", "4 Portas", "AC"]
    },
    {
      id: 2,
      name: "Hyundai Tucson",
      location: "Luanda",
      image: "/placeholder.svg",
      oldPrice: 35000,
      newPrice: 28000,
      rating: 4.8,
      discount: 20,
      features: ["SUV", "Automático", "AC"]
    },
    {
      id: 3,
      name: "Toyota Hilux",
      location: "Luanda",
      image: "/placeholder.svg",
      oldPrice: 45000,
      newPrice: 38000,
      rating: 4.9,
      discount: 15,
      features: ["4x4", "Diesel", "5 Lugares"]
    }
  ];

  const venueOffers = [
    {
      id: 1,
      name: "Salão Diamante",
      location: "Luanda",
      image: "/placeholder.svg",
      oldPrice: 120000,
      newPrice: 85000,
      rating: 4.8,
      discount: 29,
      features: ["200 Pessoas", "Climatizado", "Catering"]
    },
    {
      id: 2,
      name: "Golden Hall",
      location: "Luanda",
      image: "/placeholder.svg",
      oldPrice: 150000,
      newPrice: 105000,
      rating: 4.9,
      discount: 30,
      features: ["300 Pessoas", "Som", "Decoração"]
    }
  ];

  useEffect(() => {
    const scrollRefs = [hotelScrollRef, carScrollRef, venueScrollRef];
    const intervals: NodeJS.Timeout[] = [];

    scrollRefs.forEach((scrollRef) => {
      const interval = setInterval(() => {
        if (scrollRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
          if (scrollLeft + clientWidth >= scrollWidth) {
            scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
          }
        }
      }, 3000);
      intervals.push(interval);
    });

    return () => intervals.forEach(interval => clearInterval(interval));
  }, []);

  const scroll = (direction: 'left' | 'right', scrollRef: React.RefObject<HTMLDivElement>) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ofertas Especiais</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Aproveite as melhores ofertas em hotéis, carros e salões de eventos por tempo limitado.
          </p>
        </div>

        <Tabs defaultValue="hotels" className="mb-12" onValueChange={setOfferType}>
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="hotels" className="flex items-center space-x-2">
                <Building className="h-4 w-4" />
                <span>Hotéis</span>
              </TabsTrigger>
              <TabsTrigger value="cars" className="flex items-center space-x-2">
                <Car className="h-4 w-4" />
                <span>Carros</span>
              </TabsTrigger>
              <TabsTrigger value="venues" className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Salões</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="hotels">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Hotéis em Promoção</h2>
            <div className="relative">
              <button
                onClick={() => scroll('left', hotelScrollRef)}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              
              <button
                onClick={() => scroll('right', hotelScrollRef)}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              <div 
                ref={hotelScrollRef}
                className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {hotelOffers.map((offer) => (
                  <Link to={`/hotel/${offer.id}`} key={offer.id} className="min-w-[300px]">
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                      <div className="relative">
                        <img 
                          src={offer.image} 
                          alt={offer.name}
                          className="h-48 w-full object-cover"
                        />
                        <div className="absolute top-3 right-3 bg-yellow-500 text-white text-sm font-bold px-2 py-1 rounded">
                          {offer.discount}% OFF
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <h3 className="font-bold text-lg">{offer.name}</h3>
                        <div className="flex items-center text-gray-600 mb-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span className="text-sm">{offer.location}</span>
                        </div>
                        
                        <div className="flex items-center mb-3">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          <span className="text-sm font-medium">{offer.rating}</span>
                        </div>
                        
                        <div className="mb-3">
                          {offer.amenities.map((amenity, idx) => (
                            <span key={idx} className="inline-block bg-gray-100 text-xs px-2 py-1 rounded mr-2 mb-2">
                              {amenity}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-sm text-gray-500 line-through">{offer.oldPrice.toLocaleString()} Kz</span>
                            <p className="text-lg font-bold text-purple-600">{offer.newPrice.toLocaleString()} Kz</p>
                            <span className="text-xs text-gray-500">por noite</span>
                          </div>
                          <Button className="bg-purple-600 hover:bg-purple-700">
                            Ver Oferta
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="cars">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Aluguel de Carros com Desconto</h2>
            <div className="relative">
              <button
                onClick={() => scroll('left', carScrollRef)}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              
              <button
                onClick={() => scroll('right', carScrollRef)}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              <div 
                ref={carScrollRef}
                className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {carOffers.map((offer) => (
                  <Card key={offer.id} className="min-w-[300px] overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="relative">
                      <img 
                        src={offer.image} 
                        alt={offer.name}
                        className="h-48 w-full object-cover"
                      />
                      <div className="absolute top-3 right-3 bg-yellow-500 text-white text-sm font-bold px-2 py-1 rounded">
                        {offer.discount}% OFF
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-bold text-lg">{offer.name}</h3>
                      <div className="flex items-center text-gray-600 mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{offer.location}</span>
                      </div>
                      
                      <div className="flex items-center mb-3">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span className="text-sm font-medium">{offer.rating}</span>
                      </div>
                      
                      <div className="mb-3">
                        {offer.features.map((feature, idx) => (
                          <span key={idx} className="inline-block bg-gray-100 text-xs px-2 py-1 rounded mr-2 mb-2">
                            {feature}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm text-gray-500 line-through">{offer.oldPrice.toLocaleString()} Kz</span>
                          <p className="text-lg font-bold text-purple-600">{offer.newPrice.toLocaleString()} Kz</p>
                          <span className="text-xs text-gray-500">por dia</span>
                        </div>
                        <Button className="bg-purple-600 hover:bg-purple-700">
                          Ver Oferta
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="venues">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Salões de Eventos em Promoção</h2>
            <div className="relative">
              <button
                onClick={() => scroll('left', venueScrollRef)}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              
              <button
                onClick={() => scroll('right', venueScrollRef)}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              <div 
                ref={venueScrollRef}
                className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {venueOffers.map((offer) => (
                  <Card key={offer.id} className="min-w-[300px] overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="relative">
                      <img 
                        src={offer.image} 
                        alt={offer.name}
                        className="h-48 w-full object-cover"
                      />
                      <div className="absolute top-3 right-3 bg-yellow-500 text-white text-sm font-bold px-2 py-1 rounded">
                        {offer.discount}% OFF
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-bold text-lg">{offer.name}</h3>
                      <div className="flex items-center text-gray-600 mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{offer.location}</span>
                      </div>
                      
                      <div className="flex items-center mb-3">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span className="text-sm font-medium">{offer.rating}</span>
                      </div>
                      
                      <div className="mb-3">
                        {offer.features.map((feature, idx) => (
                          <span key={idx} className="inline-block bg-gray-100 text-xs px-2 py-1 rounded mr-2 mb-2">
                            {feature}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm text-gray-500 line-through">{offer.oldPrice.toLocaleString()} Kz</span>
                          <p className="text-lg font-bold text-purple-600">{offer.newPrice.toLocaleString()} Kz</p>
                          <span className="text-xs text-gray-500">por evento</span>
                        </div>
                        <Button className="bg-purple-600 hover:bg-purple-700">
                          Ver Oferta
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Current Promotion Banner */}
        <div className="rounded-xl overflow-hidden relative bg-gradient-to-r from-purple-600 to-yellow-500 p-8 text-white">
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
            {/* Background decorative element */}
            <div className="w-full h-full bg-white transform rotate-45 translate-x-1/2 translate-y-1/2"></div>
          </div>
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Promoção Especial de Lançamento!</h2>
            <p className="text-lg opacity-90 mb-6">
              Utilize o código <strong>BEMAKI10</strong> e ganhe 10% de desconto em qualquer reserva.
            </p>
            <div className="space-y-2 mb-6">
              <div className="flex items-center">
                <Check className="h-5 w-5 mr-2 text-yellow-300" />
                <span>Válido para reservas feitas até 30 de Janeiro</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 mr-2 text-yellow-300" />
                <span>Aplicável em hotéis, carros e salões de eventos</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 mr-2 text-yellow-300" />
                <span>Sem restrições de datas para utilização</span>
              </div>
            </div>
            <Button className="bg-white text-purple-700 hover:bg-gray-100">
              Ver todas as promoções
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
