
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Users, Search } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          {/* Main Heading - More focused like Booking/Trivago */}
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Encontre e compare{" "}
            <span className="bg-gradient-to-r from-purple-600 to-yellow-500 bg-clip-text text-transparent">
              o melhor de Angola
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Hotéis, carros, salões de festas e muito mais. Tudo em um só lugar.
          </p>
        </div>

        {/* Search Box - Prominent like Booking.com */}
        <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-6 mb-12 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Destino ou nome do hotel
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Luanda, Benguela, Lubango..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Check-in</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="date"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Check-out</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="date"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hóspedes</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <select className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none">
                  <option>1 hóspede</option>
                  <option>2 hóspedes</option>
                  <option>3 hóspedes</option>
                  <option>4+ hóspedes</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <Button 
              size="lg" 
              className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 px-12 py-3 text-lg"
            >
              <Search className="mr-2 h-5 w-5" />
              Buscar
            </Button>
          </div>
        </div>

        {/* Quick filters like Booking */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {["Hotéis", "Carros", "Salões de Festas", "Pacotes", "Experiências"].map((filter) => (
            <button
              key={filter}
              className="px-6 py-2 bg-gray-100 hover:bg-purple-100 text-gray-700 hover:text-purple-700 rounded-full transition-colors duration-200 font-medium"
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
