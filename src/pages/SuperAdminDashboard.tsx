import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, Users, Building, Car, Calendar, DollarSign, Settings, Plus, 
  Hotel, Briefcase, Store, User, Search, Edit, Trash2, Check, X, 
  Shield, AlertTriangle, Clock, Activity, Eye, Lock, UserPlus, LogOut
} from "lucide-react";
import { 
  Dialog, DialogContent, DialogDescription, DialogFooter, 
  DialogHeader, DialogTitle, DialogTrigger 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const SuperAdminDashboard = () => {
  const [stats] = useState({
    totalUsers: 3567,
    totalCompanies: 87,
    activeUsers: 1245,
    pendingApprovals: 12,
    securityAlerts: 3
  });

  const [isAddAdminOpen, setIsAddAdminOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("users");

  const recentActivity = [
    { 
      id: 1, 
      user: "Carlos Mendes", 
      action: "Login bem-sucedido", 
      target: "Sistema", 
      timestamp: "2023-07-15 14:32:45", 
      ipAddress: "192.168.1.105" 
    },
    { 
      id: 2, 
      user: "Ana Silva", 
      action: "Atualização de perfil", 
      target: "Usuário ID: 1452", 
      timestamp: "2023-07-15 13:45:22", 
      ipAddress: "192.168.1.107" 
    },
    { 
      id: 3, 
      user: "João Santos", 
      action: "Criação de reserva", 
      target: "Reserva ID: 8765", 
      timestamp: "2023-07-15 12:22:18", 
      ipAddress: "192.168.1.110" 
    },
    { 
      id: 4, 
      user: "Maria Costa", 
      action: "Atualização de empresa", 
      target: "Empresa ID: 42", 
      timestamp: "2023-07-15 11:15:33", 
      ipAddress: "192.168.1.115" 
    },
    { 
      id: 5, 
      user: "Sistema", 
      action: "Backup automático", 
      target: "Banco de dados", 
      timestamp: "2023-07-15 04:00:00", 
      ipAddress: "localhost" 
    },
  ];

  const securityAlerts = [
    { 
      id: 1, 
      type: "Tentativa de login falha", 
      user: "pedro@example.com", 
      timestamp: "2023-07-15 15:45:22", 
      ipAddress: "45.123.45.67", 
      severity: "média" 
    },
    { 
      id: 2, 
      type: "Múltiplas tentativas de login", 
      user: "desconhecido", 
      timestamp: "2023-07-15 14:22:18", 
      ipAddress: "78.45.123.89", 
      severity: "alta" 
    },
    { 
      id: 3, 
      type: "Acesso a API não autorizado", 
      user: "API Key: ****5678", 
      timestamp: "2023-07-15 10:15:33", 
      ipAddress: "123.45.67.89", 
      severity: "alta" 
    },
  ];

  const adminUsers = [
    { id: 1, name: "Carlos Mendes", email: "carlos@akiviagens.co.ao", role: "admin", lastLogin: "2023-07-15 14:32:45", status: "ativo" },
    { id: 2, name: "Ana Silva", email: "ana@akiviagens.co.ao", role: "manager", lastLogin: "2023-07-15 13:45:22", status: "ativo" },
    { id: 3, name: "João Santos", email: "joao@akiviagens.co.ao", role: "admin", lastLogin: "2023-07-14 09:22:18", status: "ativo" },
    { id: 4, name: "Maria Costa", email: "maria@akiviagens.co.ao", role: "manager", lastLogin: "2023-07-13 16:15:33", status: "inativo" },
  ];

  const systemSettings = [
    { id: 1, name: "Backup automático", value: "Ativado (Diário - 04:00)", category: "segurança" },
    { id: 2, name: "Tempo limite de sessão", value: "30 minutos", category: "segurança" },
    { id: 3, name: "Tentativas de login", value: "5 tentativas", category: "segurança" },
    { id: 4, name: "Política de senha", value: "Forte (8+ caracteres, letras, números, símbolos)", category: "segurança" },
    { id: 5, name: "Comissão padrão - Hotéis", value: "10%", category: "financeiro" },
    { id: 6, name: "Comissão padrão - Carros", value: "15%", category: "financeiro" },
    { id: 7, name: "Comissão padrão - Salões", value: "12%", category: "financeiro" },
    { id: 8, name: "Email de notificação", value: "admin@akiviagens.co.ao", category: "notificações" },
  ];

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "baixa":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">Baixa</Badge>;
      case "média":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Média</Badge>;
      case "alta":
        return <Badge variant="outline" className="bg-red-100 text-red-800">Alta</Badge>;
      default:
        return <Badge variant="outline">{severity}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ativo":
        return <Badge variant="outline" className="bg-green-100 text-green-800">Ativo</Badge>;
      case "inativo":
        return <Badge variant="outline" className="bg-gray-100 text-gray-800">Inativo</Badge>;
      case "bloqueado":
        return <Badge variant="outline" className="bg-red-100 text-red-800">Bloqueado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "superadmin":
        return <Badge className="bg-purple-600">Super Admin</Badge>;
      case "admin":
        return <Badge className="bg-blue-600">Admin</Badge>;
      case "manager":
        return <Badge className="bg-green-600">Manager</Badge>;
      default:
        return <Badge>{role}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Super Admin Dashboard</h1>
            <p className="text-gray-600">Gerenciamento completo do sistema</p>
          </div>
          <div className="flex space-x-2">
            <Button 
              className="bg-purple-600 hover:bg-purple-700"
              onClick={() => setIsAddAdminOpen(true)}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Novo Admin
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
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
                <Building className="h-8 w-8 text-green-600" />
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
                <Activity className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Usuários Ativos</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.activeUsers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Aprovações</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.pendingApprovals}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <AlertTriangle className="h-8 w-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Alertas</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.securityAlerts}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="activity" className="space-y-4">
          <TabsList>
            <TabsTrigger value="activity">Atividade Recente</TabsTrigger>
            <TabsTrigger value="security">Segurança</TabsTrigger>
            <TabsTrigger value="admins">Administradores</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>

          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Log de Atividades</CardTitle>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Buscar atividades..."
                      className="pl-8 w-[250px]"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Usuário</TableHead>
                      <TableHead>Ação</TableHead>
                      <TableHead>Alvo</TableHead>
                      <TableHead>Data/Hora</TableHead>
                      <TableHead>IP</TableHead>
                      <TableHead className="text-right">Detalhes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentActivity.map((activity) => (
                      <TableRow key={activity.id}>
                        <TableCell className="font-medium">{activity.user}</TableCell>
                        <TableCell>{activity.action}</TableCell>
                        <TableCell>{activity.target}</TableCell>
                        <TableCell>{activity.timestamp}</TableCell>
                        <TableCell>{activity.ipAddress}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Alertas de Segurança</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {securityAlerts.map((alert) => (
                    <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="flex items-center">
                          <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                          <h3 className="font-semibold">{alert.type}</h3>
                        </div>
                        <p className="text-gray-600">Usuário: {alert.user}</p>
                        <div className="flex items-center mt-1 text-sm text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{alert.timestamp}</span>
                          <span className="mx-2">•</span>
                          <span>IP: {alert.ipAddress}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div>{getSeverityBadge(alert.severity)}</div>
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                          Investigar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="admins">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Usuários Administrativos</CardTitle>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Buscar administradores..."
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
                      <TableHead>Último Login</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {adminUsers.map((admin) => (
                      <TableRow key={admin.id}>
                        <TableCell className="font-medium">{admin.name}</TableCell>
                        <TableCell>{admin.email}</TableCell>
                        <TableCell>{getRoleBadge(admin.role)}</TableCell>
                        <TableCell>{admin.lastLogin}</TableCell>
                        <TableCell>{getStatusBadge(admin.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-purple-600">
                              <Lock className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600">
                              <LogOut className="h-4 w-4" />
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

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Configurações do Sistema</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Segurança</h3>
                    <div className="space-y-4">
                      {systemSettings
                        .filter(setting => setting.category === "segurança")
                        .map(setting => (
                          <div key={setting.id} className="flex justify-between items-center border-b pb-2">
                            <div className="flex items-center">
                              <Shield className="h-4 w-4 text-purple-600 mr-2" />
                              <span>{setting.name}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-gray-600 mr-2">{setting.value}</span>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Financeiro</h3>
                    <div className="space-y-4">
                      {systemSettings
                        .filter(setting => setting.category === "financeiro")
                        .map(setting => (
                          <div key={setting.id} className="flex justify-between items-center border-b pb-2">
                            <div className="flex items-center">
                              <DollarSign className="h-4 w-4 text-green-600 mr-2" />
                              <span>{setting.name}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-gray-600 mr-2">{setting.value}</span>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Notificações</h3>
                    <div className="space-y-4">
                      {systemSettings
                        .filter(setting => setting.category === "notificações")
                        .map(setting => (
                          <div key={setting.id} className="flex justify-between items-center border-b pb-2">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 text-blue-600 mr-2" />
                              <span>{setting.name}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-gray-600 mr-2">{setting.value}</span>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  <Button className="bg-purple-600 hover:bg-purple-700">Salvar Alterações</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Dialog para adicionar novo admin */}
      <Dialog open={isAddAdminOpen} onOpenChange={setIsAddAdminOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Adicionar Novo Administrador</DialogTitle>
            <DialogDescription>
              Crie uma nova conta com privilégios administrativos.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="adminName" className="text-right">
                Nome
              </Label>
              <Input id="adminName" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="adminEmail" className="text-right">
                Email
              </Label>
              <Input id="adminEmail" type="email" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="adminRole" className="text-right">
                Função
              </Label>
              <Select defaultValue="admin">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione a função" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="superadmin">Super Admin</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="adminPassword" className="text-right">
                Senha
              </Label>
              <Input id="adminPassword" type="password" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="adminConfirmPassword" className="text-right">
                Confirmar Senha
              </Label>
              <Input id="adminConfirmPassword" type="password" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <div></div>
              <div className="col-span-3 flex items-center space-x-2">
                <input type="checkbox" id="sendInvite" />
                <Label htmlFor="sendInvite">Enviar email de convite</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddAdminOpen(false)}>
              Cancelar
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700">Adicionar Administrador</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}; 