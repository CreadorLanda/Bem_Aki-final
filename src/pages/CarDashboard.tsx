import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, DollarSign, Users, Car, Star, Plus, Edit, Trash2, 
  CheckCircle2, XCircle, Image, Settings, Search, Fuel, Gauge
} from "lucide-react";
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, 
  DialogHeader, DialogTitle, DialogTrigger 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const CarDashboard = () => {
  const [isAddCarOpen, setIsAddCarOpen] = useState(false);
  
  const [companyInfo, setCompanyInfo] = useState({
    id: "22222222-2222-2222-2222-222222222222",
    name: "Avis Rent-a-Car",
    location: "Luanda, Angola",
    address: "Avenida 4 de Fevereiro, Luanda",
    description: "Locadora de veículos com frota moderna e diversificada.",
    manager: "João Santos"
  });
  
  const [carStats] = useState({
    totalBookings: 67,
    monthlyRevenue: "320.000 Kz",
    occupancyRate: "65%",
    averageRating: 4.3,
    availableCars: 18,
    pendingBookings: 4
  });

  const upcomingBookings = [
    { 
      id: 1, 
      client: "Pedro Costa", 
      car: "Toyota Corolla", 
      pickupDate: "2024-01-16", 
      returnDate: "2024-01-20", 
      amount: "65.000 Kz",
      status: "confirmada" 
    },
    { 
      id: 2, 
      client: "Ana Silva", 
      car: "Honda Civic", 
      pickupDate: "2024-01-17", 
      returnDate: "2024-01-19", 
      amount: "45.000 Kz",
      status: "pendente" 
    },
    { 
      id: 3, 
      client: "Carlos Mendes", 
      car: "Toyota Rav4", 
      pickupDate: "2024-01-18", 
      returnDate: "2024-01-25", 
      amount: "120.000 Kz",
      status: "confirmada" 
    },
  ];

  const cars = [
    { 
      id: 1, 
      brand: "Toyota", 
      model: "Corolla", 
      year: 2022, 
      price: "15.000 Kz", 
      status: "disponível", 
      transmission: "Automático", 
      fuel: "Gasolina",
      seats: 5,
      features: ["Ar-condicionado", "Vidros elétricos", "Bluetooth", "Câmera de ré"]
    },
    { 
      id: 2, 
      brand: "Honda", 
      model: "Civic", 
      year: 2021, 
      price: "14.000 Kz", 
      status: "alugado", 
      transmission: "Automático", 
      fuel: "Gasolina",
      seats: 5,
      features: ["Ar-condicionado", "Vidros elétricos", "Bluetooth"]
    },
    { 
      id: 3, 
      brand: "Toyota", 
      model: "Rav4", 
      year: 2023, 
      price: "22.000 Kz", 
      status: "disponível", 
      transmission: "Automático", 
      fuel: "Híbrido",
      seats: 5,
      features: ["Ar-condicionado", "Vidros elétricos", "Bluetooth", "Câmera 360°", "GPS"]
    },
    { 
      id: 4, 
      brand: "Volkswagen", 
      model: "Polo", 
      year: 2020, 
      price: "12.000 Kz", 
      status: "manutenção", 
      transmission: "Manual", 
      fuel: "Gasolina",
      seats: 5,
      features: ["Ar-condicionado", "Vidros elétricos"]
    },
  ];

  const reviews = [
    { id: 1, client: "Maria Santos", rating: 5, comment: "Carro em excelente estado e atendimento muito bom!", date: "2023-12-15" },
    { id: 2, client: "João Oliveira", rating: 4, comment: "Bom serviço, apenas a entrega demorou um pouco.", date: "2023-12-10" },
    { id: 3, client: "Ana Costa", rating: 5, comment: "Veículo muito confortável e econômico. Recomendo!", date: "2023-12-05" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pendente":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Pendente</Badge>;
      case "confirmada":
        return <Badge variant="outline" className="bg-green-100 text-green-800">Confirmada</Badge>;
      case "cancelada":
        return <Badge variant="outline" className="bg-red-100 text-red-800">Cancelada</Badge>;
      case "concluida":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">Concluída</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getCarStatusBadge = (status: string) => {
    switch (status) {
      case "disponível":
        return <Badge variant="outline" className="bg-green-100 text-green-800">Disponível</Badge>;
      case "alugado":
        return <Badge variant="outline" className="bg-red-100 text-red-800">Alugado</Badge>;
      case "manutenção":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Manutenção</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleConfirmBooking = (id: number) => {
    console.log(`Confirmando reserva ${id}`);
    // Implementar lógica para confirmar reserva
  };

  const handleCancelBooking = (id: number) => {
    console.log(`Cancelando reserva ${id}`);
    // Implementar lógica para cancelar reserva
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{companyInfo.name}</h1>
            <p className="text-gray-600">{companyInfo.location}</p>
          </div>
          <div className="flex space-x-2">
            <Button 
              className="bg-purple-600 hover:bg-purple-700"
              onClick={() => setIsAddCarOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Novo Carro
            </Button>
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Editar Empresa
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Reservas</p>
                  <p className="text-2xl font-bold text-gray-900">{carStats.totalBookings}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Receita Mensal</p>
                  <p className="text-2xl font-bold text-gray-900">{carStats.monthlyRevenue}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Gauge className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Taxa Utilização</p>
                  <p className="text-2xl font-bold text-gray-900">{carStats.occupancyRate}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Star className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Avaliação</p>
                  <p className="text-2xl font-bold text-gray-900">{carStats.averageRating}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Car className="h-8 w-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Carros Livres</p>
                  <p className="text-2xl font-bold text-gray-900">{carStats.availableCars}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pendentes</p>
                  <p className="text-2xl font-bold text-gray-900">{carStats.pendingBookings}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="bookings" className="space-y-4">
          <TabsList>
            <TabsTrigger value="bookings">Reservas</TabsTrigger>
            <TabsTrigger value="cars">Carros</TabsTrigger>
            <TabsTrigger value="reviews">Avaliações</TabsTrigger>
            <TabsTrigger value="company">Informações da Empresa</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Reservas</CardTitle>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Buscar reservas..."
                      className="pl-8 w-[250px]"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Carro</TableHead>
                      <TableHead>Retirada</TableHead>
                      <TableHead>Devolução</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {upcomingBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.client}</TableCell>
                        <TableCell>{booking.car}</TableCell>
                        <TableCell>{booking.pickupDate}</TableCell>
                        <TableCell>{booking.returnDate}</TableCell>
                        <TableCell>{booking.amount}</TableCell>
                        <TableCell>{getStatusBadge(booking.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            {booking.status === "pendente" && (
                              <>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-green-600"
                                  onClick={() => handleConfirmBooking(booking.id)}
                                >
                                  <CheckCircle2 className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-red-600"
                                  onClick={() => handleCancelBooking(booking.id)}
                                >
                                  <XCircle className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cars">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Gestão de Carros</CardTitle>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Buscar carros..."
                      className="pl-8 w-[250px]"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Marca/Modelo</TableHead>
                      <TableHead>Ano</TableHead>
                      <TableHead>Características</TableHead>
                      <TableHead>Preço/Dia</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cars.map((car) => (
                      <TableRow key={car.id}>
                        <TableCell className="font-medium">
                          <div>
                            <p className="font-medium">{car.brand} {car.model}</p>
                            <p className="text-sm text-gray-500">{car.transmission} • {car.fuel}</p>
                          </div>
                        </TableCell>
                        <TableCell>{car.year}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {car.features.slice(0, 2).map((feature, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                            {car.features.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{car.features.length - 2}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{car.price}</TableCell>
                        <TableCell>{getCarStatusBadge(car.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-purple-600">
                              <Image className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle>Avaliações dos Clientes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-semibold">{review.client}</h3>
                            <p className="text-sm text-gray-500 ml-2">{review.date}</p>
                          </div>
                          <div className="flex items-center mt-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="mt-2 text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="company">
            <Card>
              <CardHeader>
                <CardTitle>Informações da Empresa</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Detalhes Básicos</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm text-gray-500">Nome da Empresa</Label>
                        <p>{companyInfo.name}</p>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-500">Localização</Label>
                        <p>{companyInfo.location}</p>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-500">Endereço</Label>
                        <p>{companyInfo.address}</p>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-500">Gerente</Label>
                        <p>{companyInfo.manager}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Descrição</h3>
                    <p className="text-gray-700">{companyInfo.description}</p>
                  </div>

                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Edit className="h-4 w-4 mr-2" />
                    Editar Informações
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Configurações</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Políticas de Aluguel</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="pickupTime">Horário de Retirada</Label>
                        <Input id="pickupTime" defaultValue="09:00" />
                      </div>
                      <div>
                        <Label htmlFor="returnTime">Horário de Devolução</Label>
                        <Input id="returnTime" defaultValue="18:00" />
                      </div>
                      <div>
                        <Label htmlFor="minAge">Idade Mínima</Label>
                        <Input id="minAge" defaultValue="21" type="number" />
                      </div>
                      <div>
                        <Label htmlFor="cancellationPolicy">Política de Cancelamento</Label>
                        <Select defaultValue="24">
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione uma política" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="24">24 horas antes</SelectItem>
                            <SelectItem value="48">48 horas antes</SelectItem>
                            <SelectItem value="72">72 horas antes</SelectItem>
                            <SelectItem value="free">Cancelamento gratuito</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Notificações</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="notifyBooking" defaultChecked />
                        <Label htmlFor="notifyBooking">Notificar novas reservas</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="notifyReturn" defaultChecked />
                        <Label htmlFor="notifyReturn">Notificar devoluções próximas</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="notifyCancellation" defaultChecked />
                        <Label htmlFor="notifyCancellation">Notificar cancelamentos</Label>
                      </div>
                    </div>
                  </div>

                  <Button className="bg-purple-600 hover:bg-purple-700">Salvar Configurações</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Dialog para adicionar novo carro */}
      <Dialog open={isAddCarOpen} onOpenChange={setIsAddCarOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Adicionar Novo Carro</DialogTitle>
            <DialogDescription>
              Cadastre um novo veículo para a frota.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="carBrand" className="text-right">
                Marca
              </Label>
              <Input id="carBrand" className="col-span-3" placeholder="Toyota" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="carModel" className="text-right">
                Modelo
              </Label>
              <Input id="carModel" className="col-span-3" placeholder="Corolla" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="carYear" className="text-right">
                Ano
              </Label>
              <Input id="carYear" className="col-span-3" type="number" placeholder="2023" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="carPrice" className="text-right">
                Preço/Dia
              </Label>
              <Input id="carPrice" className="col-span-3" placeholder="15.000" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="carTransmission" className="text-right">
                Transmissão
              </Label>
              <Select defaultValue="automatico">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="automatico">Automático</SelectItem>
                  <SelectItem value="manual">Manual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="carFuel" className="text-right">
                Combustível
              </Label>
              <Select defaultValue="gasolina">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gasolina">Gasolina</SelectItem>
                  <SelectItem value="diesel">Diesel</SelectItem>
                  <SelectItem value="hibrido">Híbrido</SelectItem>
                  <SelectItem value="eletrico">Elétrico</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="carSeats" className="text-right">
                Lugares
              </Label>
              <Input id="carSeats" className="col-span-3" type="number" placeholder="5" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="carDescription" className="text-right">
                Descrição
              </Label>
              <Textarea id="carDescription" className="col-span-3" placeholder="Descrição do veículo..." />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="carFeatures" className="text-right">
                Características
              </Label>
              <div className="col-span-3 space-y-2">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="featureAc" />
                  <Label htmlFor="featureAc">Ar-condicionado</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="featureElectricWindows" />
                  <Label htmlFor="featureElectricWindows">Vidros elétricos</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="featureBluetooth" />
                  <Label htmlFor="featureBluetooth">Bluetooth</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="featureCamera" />
                  <Label htmlFor="featureCamera">Câmera de ré</Label>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="carQuantity" className="text-right">
                Quantidade
              </Label>
              <Input id="carQuantity" className="col-span-3" type="number" placeholder="1" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddCarOpen(false)}>
              Cancelar
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700">Adicionar Carro</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
