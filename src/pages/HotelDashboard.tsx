import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, DollarSign, Users, Bed, Star, Plus, Edit, Trash2, 
  CheckCircle2, XCircle, Image, Settings, Search
} from "lucide-react";
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, 
  DialogHeader, DialogTitle, DialogTrigger 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const HotelDashboard = () => {
  const [isAddRoomOpen, setIsAddRoomOpen] = useState(false);
  
  const [hotelInfo, setHotelInfo] = useState({
    id: "11111111-1111-1111-1111-111111111111",
    name: "Hotel Presidente",
    location: "Luanda, Angola",
    address: "Rua Mártires de Kifangondo, Luanda",
    description: "Hotel 5 estrelas localizado no centro de Luanda com vista para o mar.",
    stars: 5,
    amenities: ["Wi-Fi", "Piscina", "Academia", "Restaurante", "Estacionamento"],
    manager: "Carlos Mendes"
  });
  
  const [hotelStats] = useState({
    totalBookings: 89,
    monthlyRevenue: "450.000 Kz",
    occupancyRate: "78%",
    averageRating: 4.5,
    availableRooms: 12,
    pendingBookings: 5
  });

  const upcomingBookings = [
    { 
      id: 1, 
      guest: "Ana Costa", 
      room: "Suite Deluxe", 
      checkIn: "2024-01-16", 
      checkOut: "2024-01-18", 
      amount: "95.000 Kz",
      status: "confirmada" 
    },
    { 
      id: 2, 
      guest: "Carlos Mendes", 
      room: "Quarto Standard", 
      checkIn: "2024-01-17", 
      checkOut: "2024-01-19", 
      amount: "65.000 Kz",
      status: "pendente" 
    },
    { 
      id: 3, 
      guest: "Maria Santos", 
      room: "Suite Executiva", 
      checkIn: "2024-01-18", 
      checkOut: "2024-01-22", 
      amount: "120.000 Kz",
      status: "confirmada" 
    },
  ];

  const rooms = [
    { id: 1, type: "Suite Deluxe", price: "45.000 Kz", status: "disponível", beds: 2, capacity: 2, amenities: ["TV", "Ar-condicionado", "Frigobar", "Varanda"] },
    { id: 2, type: "Quarto Standard", price: "25.000 Kz", status: "ocupado", beds: 1, capacity: 2, amenities: ["TV", "Ar-condicionado"] },
    { id: 3, type: "Suite Executiva", price: "65.000 Kz", status: "disponível", beds: 2, capacity: 3, amenities: ["TV", "Ar-condicionado", "Frigobar", "Jacuzzi", "Sala de estar"] },
    { id: 4, type: "Quarto Familiar", price: "55.000 Kz", status: "disponível", beds: 3, capacity: 4, amenities: ["TV", "Ar-condicionado", "Frigobar", "Berço"] },
  ];

  const reviews = [
    { id: 1, guest: "João Silva", rating: 5, comment: "Excelente hotel, atendimento impecável!", date: "2023-12-15" },
    { id: 2, guest: "Maria Oliveira", rating: 4, comment: "Ótimo hotel, apenas o café da manhã poderia ter mais opções.", date: "2023-12-10" },
    { id: 3, guest: "Pedro Santos", rating: 5, comment: "Quartos muito confortáveis e limpos. Recomendo!", date: "2023-12-05" },
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

  const getRoomStatusBadge = (status: string) => {
    switch (status) {
      case "disponível":
        return <Badge variant="outline" className="bg-green-100 text-green-800">Disponível</Badge>;
      case "ocupado":
        return <Badge variant="outline" className="bg-red-100 text-red-800">Ocupado</Badge>;
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
            <h1 className="text-3xl font-bold text-gray-900">{hotelInfo.name}</h1>
            <p className="text-gray-600">{hotelInfo.location}</p>
          </div>
          <div className="flex space-x-2">
            <Button 
              className="bg-purple-600 hover:bg-purple-700"
              onClick={() => setIsAddRoomOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Novo Quarto
            </Button>
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Editar Hotel
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
                  <p className="text-2xl font-bold text-gray-900">{hotelStats.totalBookings}</p>
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
                  <p className="text-2xl font-bold text-gray-900">{hotelStats.monthlyRevenue}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Taxa Ocupação</p>
                  <p className="text-2xl font-bold text-gray-900">{hotelStats.occupancyRate}</p>
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
                  <p className="text-2xl font-bold text-gray-900">{hotelStats.averageRating}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Bed className="h-8 w-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Quartos Livres</p>
                  <p className="text-2xl font-bold text-gray-900">{hotelStats.availableRooms}</p>
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
                  <p className="text-2xl font-bold text-gray-900">{hotelStats.pendingBookings}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="bookings" className="space-y-4">
          <TabsList>
            <TabsTrigger value="bookings">Reservas</TabsTrigger>
            <TabsTrigger value="rooms">Quartos</TabsTrigger>
            <TabsTrigger value="reviews">Avaliações</TabsTrigger>
            <TabsTrigger value="hotel">Informações do Hotel</TabsTrigger>
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
                      <TableHead>Hóspede</TableHead>
                      <TableHead>Quarto</TableHead>
                      <TableHead>Check-in</TableHead>
                      <TableHead>Check-out</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {upcomingBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.guest}</TableCell>
                        <TableCell>{booking.room}</TableCell>
                        <TableCell>{booking.checkIn}</TableCell>
                        <TableCell>{booking.checkOut}</TableCell>
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

          <TabsContent value="rooms">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Gestão de Quartos</CardTitle>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Buscar quartos..."
                      className="pl-8 w-[250px]"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Capacidade</TableHead>
                      <TableHead>Camas</TableHead>
                      <TableHead>Comodidades</TableHead>
                      <TableHead>Preço/Noite</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rooms.map((room) => (
                      <TableRow key={room.id}>
                        <TableCell className="font-medium">{room.type}</TableCell>
                        <TableCell>{room.capacity} pessoas</TableCell>
                        <TableCell>{room.beds} cama(s)</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {room.amenities.slice(0, 2).map((amenity, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {amenity}
                              </Badge>
                            ))}
                            {room.amenities.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{room.amenities.length - 2}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{room.price}</TableCell>
                        <TableCell>{getRoomStatusBadge(room.status)}</TableCell>
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
                <CardTitle>Avaliações dos Hóspedes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-semibold">{review.guest}</h3>
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

          <TabsContent value="hotel">
            <Card>
              <CardHeader>
                <CardTitle>Informações do Hotel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Detalhes Básicos</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm text-gray-500">Nome do Hotel</Label>
                        <p>{hotelInfo.name}</p>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-500">Localização</Label>
                        <p>{hotelInfo.location}</p>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-500">Endereço</Label>
                        <p>{hotelInfo.address}</p>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-500">Classificação</Label>
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < hotelInfo.stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Descrição</h3>
                    <p className="text-gray-700">{hotelInfo.description}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Comodidades</h3>
                    <div className="flex flex-wrap gap-2">
                      {hotelInfo.amenities.map((amenity, i) => (
                        <Badge key={i} variant="secondary">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Gerente</h3>
                    <p>{hotelInfo.manager}</p>
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
                    <h3 className="font-semibold mb-2">Políticas do Hotel</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="checkInTime">Horário de Check-in</Label>
                        <Input id="checkInTime" defaultValue="14:00" />
                      </div>
                      <div>
                        <Label htmlFor="checkOutTime">Horário de Check-out</Label>
                        <Input id="checkOutTime" defaultValue="12:00" />
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
                        <input type="checkbox" id="notifyReview" defaultChecked />
                        <Label htmlFor="notifyReview">Notificar novas avaliações</Label>
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

      {/* Dialog para adicionar novo quarto */}
      <Dialog open={isAddRoomOpen} onOpenChange={setIsAddRoomOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Adicionar Novo Quarto</DialogTitle>
            <DialogDescription>
              Cadastre um novo tipo de quarto para o hotel.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="roomType" className="text-right">
                Tipo
              </Label>
              <Input id="roomType" className="col-span-3" placeholder="Suite Deluxe" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="roomPrice" className="text-right">
                Preço/Noite
              </Label>
              <Input id="roomPrice" className="col-span-3" placeholder="45.000" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="roomCapacity" className="text-right">
                Capacidade
              </Label>
              <Input id="roomCapacity" className="col-span-3" type="number" placeholder="2" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="roomBeds" className="text-right">
                Camas
              </Label>
              <Input id="roomBeds" className="col-span-3" type="number" placeholder="1" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="roomDescription" className="text-right">
                Descrição
              </Label>
              <Textarea id="roomDescription" className="col-span-3" placeholder="Descrição do quarto..." />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="roomAmenities" className="text-right">
                Comodidades
              </Label>
              <div className="col-span-3 space-y-2">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="amenityTv" />
                  <Label htmlFor="amenityTv">TV</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="amenityAc" />
                  <Label htmlFor="amenityAc">Ar-condicionado</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="amenityFrigobar" />
                  <Label htmlFor="amenityFrigobar">Frigobar</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="amenityCofre" />
                  <Label htmlFor="amenityCofre">Cofre</Label>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="roomQuantity" className="text-right">
                Quantidade
              </Label>
              <Input id="roomQuantity" className="col-span-3" type="number" placeholder="5" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddRoomOpen(false)}>
              Cancelar
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700">Adicionar Quarto</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
