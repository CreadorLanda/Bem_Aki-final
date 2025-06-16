import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, Users, Building, Car, Calendar, DollarSign, Settings, Plus, 
  Hotel, Briefcase, Store, User, Search, Edit, Trash2, Check, X
} from "lucide-react";
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, 
  DialogHeader, DialogTitle, DialogTrigger 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const AdminDashboard = () => {
  const [stats] = useState({
    totalUsers: 1234,
    totalHotels: 45,
    totalCars: 28,
    totalSalons: 15,
    totalBookings: 567,
    totalRevenue: "2.5M Kz",
    pendingApprovals: 12
  });

  const [isAddPartnerOpen, setIsAddPartnerOpen] = useState(false);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [selectedPartnerType, setSelectedPartnerType] = useState("hotel");

  const pendingPartners = [
    { id: 1, name: "Hotel Luanda Bay", type: "hotel", location: "Luanda", status: "pending" },
    { id: 2, name: "Resort Benguela", type: "hotel", location: "Benguela", status: "pending" },
    { id: 3, name: "Carros Luxo", type: "carro", location: "Luanda", status: "pending" },
    { id: 4, name: "Salão Festas", type: "salao", location: "Huambo", status: "pending" },
  ];

  const recentBookings = [
    { id: 1, service: "Hotel Presidente", user: "João Silva", amount: "45.000 Kz", date: "2024-01-15" },
    { id: 2, service: "Skyna Hotel", user: "Maria Santos", amount: "38.000 Kz", date: "2024-01-14" },
    { id: 3, service: "Carro SUV", user: "Pedro Costa", amount: "25.000 Kz", date: "2024-01-13" },
  ];

  const partners = [
    { id: 1, name: "Hotel Presidente", type: "hotel", location: "Luanda", status: "active" },
    { id: 2, name: "Skyna Hotel", type: "hotel", location: "Luanda", status: "active" },
    { id: 3, name: "Avis Rent-a-Car", type: "carro", location: "Luanda", status: "active" },
    { id: 4, name: "Salão Royal", type: "salao", location: "Luanda", status: "active" },
    { id: 5, name: "Viagens Angola", type: "pacote", location: "Luanda", status: "active" },
  ];

  const users = [
    { id: 1, name: "Carlos Mendes", email: "carlos@hotelpresidente.co.ao", role: "gerente_hotel", company: "Hotel Presidente" },
    { id: 2, name: "Ana Silva", email: "ana@skynahotel.co.ao", role: "gerente_hotel", company: "Skyna Hotel" },
    { id: 3, name: "João Santos", email: "joao@avisangola.co.ao", role: "gerente_carro", company: "Avis Rent-a-Car" },
    { id: 4, name: "Maria Costa", email: "maria@salaoroyal.co.ao", role: "gerente_salao", company: "Salão Royal" },
  ];

  const getPartnerTypeIcon = (type: string) => {
    switch (type) {
      case "hotel":
        return <Hotel className="h-4 w-4" />;
      case "carro":
        return <Car className="h-4 w-4" />;
      case "salao":
        return <Store className="h-4 w-4" />;
      case "pacote":
        return <Briefcase className="h-4 w-4" />;
      default:
        return <Building className="h-4 w-4" />;
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "gerente_hotel":
        return "Gerente de Hotel";
      case "gerente_carro":
        return "Gerente de Locadora";
      case "gerente_salao":
        return "Gerente de Salão";
      case "admin":
        return "Administrador";
      default:
        return "Cliente";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Administrativo</h1>
          <div className="flex space-x-2">
            <Button 
              className="bg-purple-600 hover:bg-purple-700"
              onClick={() => setIsAddPartnerOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Nova Empresa
            </Button>
            <Button 
              variant="outline"
              onClick={() => setIsAddUserOpen(true)}
            >
              <User className="h-4 w-4 mr-2" />
              Novo Usuário
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Usuários</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Hotel className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Hotéis</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalHotels}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Car className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Carros</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalCars}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Store className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Salões</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalSalons}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Reservas</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalBookings}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-emerald-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Receita</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalRevenue}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <BarChart3 className="h-8 w-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pendentes</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.pendingApprovals}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="partners" className="space-y-4">
          <TabsList>
            <TabsTrigger value="partners">Empresas</TabsTrigger>
            <TabsTrigger value="pending">Pendentes</TabsTrigger>
            <TabsTrigger value="users">Usuários</TabsTrigger>
            <TabsTrigger value="bookings">Reservas</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>

          <TabsContent value="partners">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Empresas Parceiras</CardTitle>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Buscar empresas..."
                      className="pl-8 w-[250px]"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Localização</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {partners.map((partner) => (
                      <TableRow key={partner.id}>
                        <TableCell className="font-medium">{partner.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {getPartnerTypeIcon(partner.type)}
                            <span className="ml-2">{partner.type === "hotel" ? "Hotel" : 
                                                  partner.type === "carro" ? "Locadora" : 
                                                  partner.type === "salao" ? "Salão" : "Pacote"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{partner.location}</TableCell>
                        <TableCell>
                          <Badge variant={partner.status === "active" ? "secondary" : "outline"}>
                            {partner.status === "active" ? "Ativo" : "Inativo"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
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

          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle>Empresas Pendentes de Aprovação</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingPartners.map((partner) => (
                    <div key={partner.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="flex items-center">
                          {getPartnerTypeIcon(partner.type)}
                          <h3 className="font-semibold ml-2">{partner.name}</h3>
                        </div>
                        <p className="text-gray-600">{partner.location}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">Ver Detalhes</Button>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <Check className="h-4 w-4 mr-1" />
                          Aprovar
                        </Button>
                        <Button size="sm" variant="destructive">
                          <X className="h-4 w-4 mr-1" />
                          Rejeitar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Gerentes de Empresas</CardTitle>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Buscar usuários..."
                      className="pl-8 w-[250px]"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Função</TableHead>
                      <TableHead>Empresa</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{getRoleLabel(user.role)}</TableCell>
                        <TableCell>{user.company}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
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

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Reservas Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{booking.service}</h3>
                        <p className="text-gray-600">Cliente: {booking.user}</p>
                        <p className="text-sm text-gray-500">{booking.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">{booking.amount}</p>
                        <Badge variant="secondary">Confirmado</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Configurações do Sistema</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Configurações Gerais</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="siteName">Nome do Site</Label>
                          <Input id="siteName" defaultValue="AKI Viagens Afrika" />
                        </div>
                        <div>
                          <Label htmlFor="contactEmail">Email de Contato</Label>
                          <Input id="contactEmail" defaultValue="contato@akiviagens.co.ao" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Configurações de Comissões</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="hotelCommission">Comissão de Hotéis (%)</Label>
                          <Input id="hotelCommission" defaultValue="10" type="number" />
                        </div>
                        <div>
                          <Label htmlFor="carCommission">Comissão de Carros (%)</Label>
                          <Input id="carCommission" defaultValue="15" type="number" />
                        </div>
                        <div>
                          <Label htmlFor="salonCommission">Comissão de Salões (%)</Label>
                          <Input id="salonCommission" defaultValue="12" type="number" />
                        </div>
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

      {/* Dialog para adicionar nova empresa */}
      <Dialog open={isAddPartnerOpen} onOpenChange={setIsAddPartnerOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Adicionar Nova Empresa</DialogTitle>
            <DialogDescription>
              Cadastre uma nova empresa parceira no sistema.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="partnerType" className="text-right">
                Tipo
              </Label>
              <Select 
                defaultValue="hotel" 
                onValueChange={(value) => setSelectedPartnerType(value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hotel">Hotel</SelectItem>
                  <SelectItem value="carro">Locadora de Carros</SelectItem>
                  <SelectItem value="salao">Salão de Eventos</SelectItem>
                  <SelectItem value="pacote">Agência de Pacotes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nome
              </Label>
              <Input id="name" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Localização
              </Label>
              <Input id="location" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">
                Endereço
              </Label>
              <Input id="address" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Descrição
              </Label>
              <Input id="description" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddPartnerOpen(false)}>
              Cancelar
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700">Adicionar Empresa</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog para adicionar novo usuário */}
      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Adicionar Novo Usuário</DialogTitle>
            <DialogDescription>
              Cadastre um novo usuário gerente para uma empresa parceira.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="userName" className="text-right">
                Nome
              </Label>
              <Input id="userName" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="userEmail" className="text-right">
                Email
              </Label>
              <Input id="userEmail" type="email" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="userRole" className="text-right">
                Função
              </Label>
              <Select defaultValue="gerente_hotel">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione a função" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gerente_hotel">Gerente de Hotel</SelectItem>
                  <SelectItem value="gerente_carro">Gerente de Locadora</SelectItem>
                  <SelectItem value="gerente_salao">Gerente de Salão</SelectItem>
                  <SelectItem value="admin">Administrador</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="userCompany" className="text-right">
                Empresa
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione a empresa" />
                </SelectTrigger>
                <SelectContent>
                  {partners.map(partner => (
                    <SelectItem key={partner.id} value={partner.id.toString()}>
                      {partner.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="userPassword" className="text-right">
                Senha
              </Label>
              <Input id="userPassword" type="password" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
              Cancelar
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700">Adicionar Usuário</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
