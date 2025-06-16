import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, Users, Building, Car, Calendar, DollarSign, Settings, Plus, 
  Hotel, Briefcase, Store, User, Search, Edit, Trash2, Check, X, 
  PieChart, TrendingUp, Download, ArrowUpDown, CreditCard
} from "lucide-react";
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, 
  DialogHeader, DialogTitle, DialogTrigger 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const ManagerDashboard = () => {
  const [stats] = useState({
    totalRevenue: "3.2M Kz",
    monthlyRevenue: "450K Kz",
    totalBookings: 1245,
    totalUsers: 3567,
    totalCompanies: 87,
    pendingPayouts: 12
  });

  const [isExportOpen, setIsExportOpen] = useState(false);

  const revenueData = [
    { month: "Jan", amount: 240000 },
    { month: "Fev", amount: 280000 },
    { month: "Mar", amount: 320000 },
    { month: "Abr", amount: 350000 },
    { month: "Mai", amount: 380000 },
    { month: "Jun", amount: 420000 },
    { month: "Jul", amount: 450000 },
  ];

  const topCompanies = [
    { id: 1, name: "Hotel Presidente", type: "hotel", revenue: "450.000 Kz", bookings: 89, commission: "45.000 Kz" },
    { id: 2, name: "Avis Rent-a-Car", type: "carro", revenue: "320.000 Kz", bookings: 67, commission: "48.000 Kz" },
    { id: 3, name: "Skyna Hotel", type: "hotel", revenue: "280.000 Kz", bookings: 52, commission: "28.000 Kz" },
    { id: 4, name: "Salão Royal", type: "salao", revenue: "180.000 Kz", bookings: 23, commission: "21.600 Kz" },
    { id: 5, name: "Viagens Angola", type: "pacote", revenue: "150.000 Kz", bookings: 15, commission: "22.500 Kz" },
  ];

  const pendingPayouts = [
    { id: 1, company: "Hotel Presidente", amount: "45.000 Kz", period: "Jul 2023", status: "pendente" },
    { id: 2, company: "Avis Rent-a-Car", amount: "48.000 Kz", period: "Jul 2023", status: "pendente" },
    { id: 3, company: "Skyna Hotel", amount: "28.000 Kz", period: "Jul 2023", status: "pendente" },
  ];

  const recentTransactions = [
    { 
      id: 1, 
      company: "Hotel Presidente", 
      type: "Pagamento de comissão", 
      amount: "42.000 Kz", 
      date: "15/06/2023", 
      status: "completo" 
    },
    { 
      id: 2, 
      company: "Avis Rent-a-Car", 
      type: "Pagamento de comissão", 
      amount: "38.000 Kz", 
      date: "15/06/2023", 
      status: "completo" 
    },
    { 
      id: 3, 
      company: "Skyna Hotel", 
      type: "Pagamento de comissão", 
      amount: "25.000 Kz", 
      date: "15/06/2023", 
      status: "completo" 
    },
    { 
      id: 4, 
      company: "Salão Royal", 
      type: "Pagamento de comissão", 
      amount: "18.000 Kz", 
      date: "15/06/2023", 
      status: "completo" 
    },
  ];

  const getCompanyTypeIcon = (type: string) => {
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pendente":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Pendente</Badge>;
      case "completo":
        return <Badge variant="outline" className="bg-green-100 text-green-800">Completo</Badge>;
      case "cancelado":
        return <Badge variant="outline" className="bg-red-100 text-red-800">Cancelado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleApprovePayment = (id: number) => {
    console.log(`Aprovando pagamento ${id}`);
    // Implementar lógica para aprovar pagamento
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Financeiro</h1>
          <div className="flex space-x-2">
            <Button 
              className="bg-purple-600 hover:bg-purple-700"
              onClick={() => setIsExportOpen(true)}
            >
              <Download className="h-4 w-4 mr-2" />
              Exportar Relatório
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Receita Total</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalRevenue}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Receita Mensal</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.monthlyRevenue}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-yellow-600" />
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
                <Users className="h-8 w-8 text-purple-600" />
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
                <Building className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Empresas</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalCompanies}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CreditCard className="h-8 w-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pagamentos</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.pendingPayouts}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Receita Mensal</CardTitle>
              <CardDescription>Evolução da receita nos últimos 7 meses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-end space-x-2">
                {revenueData.map((data) => (
                  <div key={data.month} className="flex flex-col items-center flex-1">
                    <div 
                      className="bg-purple-600 w-full rounded-t-md" 
                      style={{ height: `${(data.amount / 450000) * 250}px` }}
                    ></div>
                    <div className="mt-2 text-sm">{data.month}</div>
                    <div className="text-xs text-gray-500">{(data.amount / 1000)}K</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Distribuição de Receita</CardTitle>
              <CardDescription>Por tipo de empresa</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="w-48 h-48 mb-6 relative">
                <div className="w-full h-full rounded-full overflow-hidden bg-gray-200">
                  <div className="absolute inset-0">
                    <div className="h-full bg-purple-600" style={{ width: '45%' }}></div>
                  </div>
                  <div className="absolute inset-0">
                    <div className="h-full bg-blue-500" style={{ width: '30%', transform: 'rotate(162deg)' }}></div>
                  </div>
                  <div className="absolute inset-0">
                    <div className="h-full bg-yellow-500" style={{ width: '15%', transform: 'rotate(270deg)' }}></div>
                  </div>
                  <div className="absolute inset-0">
                    <div className="h-full bg-green-500" style={{ width: '10%', transform: 'rotate(324deg)' }}></div>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <PieChart className="h-12 w-12 text-gray-400" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-600 rounded-full mr-2"></div>
                  <span className="text-sm">Hotéis (45%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-sm">Carros (30%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <span className="text-sm">Salões (15%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm">Pacotes (10%)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="companies" className="space-y-4">
          <TabsList>
            <TabsTrigger value="companies">Empresas Top</TabsTrigger>
            <TabsTrigger value="payouts">Pagamentos Pendentes</TabsTrigger>
            <TabsTrigger value="transactions">Transações Recentes</TabsTrigger>
            <TabsTrigger value="reports">Relatórios</TabsTrigger>
          </TabsList>

          <TabsContent value="companies">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Empresas com Maior Receita</CardTitle>
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
                      <TableHead>Empresa</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Receita</TableHead>
                      <TableHead>Reservas</TableHead>
                      <TableHead>Comissão</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topCompanies.map((company) => (
                      <TableRow key={company.id}>
                        <TableCell className="font-medium">{company.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {getCompanyTypeIcon(company.type)}
                            <span className="ml-2">{company.type === "hotel" ? "Hotel" : 
                                                  company.type === "carro" ? "Locadora" : 
                                                  company.type === "salao" ? "Salão" : "Pacote"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{company.revenue}</TableCell>
                        <TableCell>{company.bookings}</TableCell>
                        <TableCell>{company.commission}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <ArrowUpDown className="h-4 w-4 mr-2" />
                            Detalhes
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payouts">
            <Card>
              <CardHeader>
                <CardTitle>Pagamentos Pendentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingPayouts.map((payout) => (
                    <div key={payout.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{payout.company}</h3>
                        <p className="text-gray-600">Período: {payout.period}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-bold text-green-600">{payout.amount}</p>
                          {getStatusBadge(payout.status)}
                        </div>
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleApprovePayment(payout.id)}
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Aprovar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions">
            <Card>
              <CardHeader>
                <CardTitle>Transações Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Empresa</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-medium">{transaction.company}</TableCell>
                        <TableCell>{transaction.type}</TableCell>
                        <TableCell>{transaction.amount}</TableCell>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Relatórios Financeiros</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <BarChart3 className="h-5 w-5 text-purple-600 mr-2" />
                          <h3 className="font-medium">Relatório Mensal</h3>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600">Resumo de receitas e comissões do mês atual</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <PieChart className="h-5 w-5 text-blue-600 mr-2" />
                          <h3 className="font-medium">Relatório por Empresa</h3>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600">Detalhamento por empresa parceira</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
                          <h3 className="font-medium">Relatório Anual</h3>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600">Comparativo anual de desempenho</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Dialog para exportar relatório */}
      <Dialog open={isExportOpen} onOpenChange={setIsExportOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Exportar Relatório</DialogTitle>
            <DialogDescription>
              Selecione o tipo de relatório e o período para exportar.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="reportType" className="text-right">
                Tipo
              </Label>
              <Select defaultValue="monthly">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Relatório Mensal</SelectItem>
                  <SelectItem value="company">Relatório por Empresa</SelectItem>
                  <SelectItem value="annual">Relatório Anual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="period" className="text-right">
                Período
              </Label>
              <Select defaultValue="current">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione o período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">Mês Atual</SelectItem>
                  <SelectItem value="last">Mês Anterior</SelectItem>
                  <SelectItem value="quarter">Último Trimestre</SelectItem>
                  <SelectItem value="year">Último Ano</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="format" className="text-right">
                Formato
              </Label>
              <Select defaultValue="pdf">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione o formato" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsExportOpen(false)}>
              Cancelar
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700">Exportar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}; 