
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { MapPin, Calendar as CalendarIcon, Users, Search } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const SearchBar = () => {
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [destination, setDestination] = useState("");
  const [guests, setGuests] = useState("2");
  const [serviceType, setServiceType] = useState("hoteis");

  const serviceTypes = [
    { value: "hoteis", label: "Hotéis" },
    { value: "carros", label: "Carros" },
    { value: "saloes", label: "Salões" },
    { value: "pacotes", label: "Pacotes" },
  ];

  const popularDestinations = [
    "Luanda", "Benguela", "Lubango", "Huambo", "Cabinda", "Malanje"
  ];

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 -mt-16 relative z-10 mx-4 max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Service Type */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de Serviço
          </label>
          <Select value={serviceType} onValueChange={setServiceType}>
            <SelectTrigger className="h-12">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {serviceTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Destination */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Destino
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Para onde você vai?"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="h-12 pl-10"
            />
          </div>
        </div>

        {/* Check-in */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Check-in
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full h-12 justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-3 h-4 w-4" />
                {checkIn ? format(checkIn, "dd/MM/yyyy", { locale: ptBR }) : "Selecionar data"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkIn}
                onSelect={setCheckIn}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Check-out */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Check-out
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full h-12 justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-3 h-4 w-4" />
                {checkOut ? format(checkOut, "dd/MM/yyyy", { locale: ptBR }) : "Selecionar data"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkOut}
                onSelect={setCheckOut}
                disabled={(date) => date < new Date() || (checkIn && date <= checkIn)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Guests */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hóspedes
          </label>
          <Select value={guests} onValueChange={setGuests}>
            <SelectTrigger className="h-12">
              <Users className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} {num === 1 ? "hóspede" : "hóspedes"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Search Button */}
        <div className="flex items-end">
          <Button 
            size="lg" 
            className="h-12 px-8 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
          >
            <Search className="mr-2 h-5 w-5" />
            Pesquisar
          </Button>
        </div>
      </div>

      {/* Popular Destinations */}
      <div className="mt-6 pt-6 border-t border-gray-100">
        <p className="text-sm text-gray-600 mb-3">Destinos populares:</p>
        <div className="flex flex-wrap gap-2">
          {popularDestinations.map((dest) => (
            <button
              key={dest}
              onClick={() => setDestination(dest)}
              className="px-3 py-1 text-sm bg-gray-100 hover:bg-purple-100 hover:text-purple-600 rounded-full transition-colors duration-200"
            >
              {dest}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
