import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layouts/MainLayout";
import { UserProfileCard } from "@/components/UserProfileCard";
import { useAuth } from "@/context/AuthContext";
import { useReservas } from "@/hooks/useReservas";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Download, Printer, Share } from "lucide-react";

export function ClientDashboard() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { 
    getAllReservas, 
    cancelarReservaHotel, 
    cancelarReservaCarro,
    cancelarReservaSalao,
    cancelarReservaPacote,
    loading: reservasLoading 
  } = useReservas();
  const [reservas, setReservas] = useState<any>({
    hotel: [],
    carro: [],
    salao: [],
    pacote: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadAttempts, setLoadAttempts] = useState(0);
  const initialLoadDone = useRef(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  const fetchReservas = useCallback(async () => {
    if (!user || loadAttempts > 2 || isLoading) return;
    
    try {
      console.log("Tentando carregar reservas...", { loadAttempts, isLoading, userId: user.id });
      setIsLoading(true);
      setError(null);
      
      // Pequeno atraso para garantir que o token de autenticação esteja disponível
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const { data, error } = await getAllReservas();
      
      if (error) {
        console.error("Erro ao carregar reservas:", error);
        setError("Erro ao carregar reservas");
        setLoadAttempts(prev => prev + 1);
        return;
      }
      
      if (data) {
        console.log("Dados carregados com sucesso:", data);
        setReservas(data);
        initialLoadDone.current = true;
      }
    } catch (err) {
      console.error("Exceção ao carregar reservas:", err);
      setError("Erro ao carregar reservas");
      setLoadAttempts(prev => prev + 1);
    } finally {
      setIsLoading(false);
    }
  }, [user, getAllReservas, loadAttempts, isLoading]);

  useEffect(() => {
    // Garantir que o usuário esteja autenticado e que a autenticação esteja completa
    if (user && user.id && !authLoading && !reservasLoading && !isLoading && !initialLoadDone.current && loadAttempts <= 2) {
      console.log("Chamando fetchReservas do useEffect");
      fetchReservas();
    }
  }, [user, authLoading, reservasLoading, fetchReservas, isLoading, loadAttempts]);

  // Adicionar um efeito para recarregar as reservas quando o componente é montado
  useEffect(() => {
    if (user && user.id && !initialLoadDone.current) {
      console.log("Componente montado, resetando estado para recarregar reservas");
      setLoadAttempts(0);
    }
    
    // Função de limpeza para quando o componente for desmontado
    return () => {
      initialLoadDone.current = false;
    };
  }, [user]);

  const handleCancelarReserva = async (tipo: string, id: string) => {
    setIsLoading(true);
    setError(null);
    let result;

    try {
      switch (tipo) {
        case 'hotel':
          result = await cancelarReservaHotel(id);
          break;
        case 'carro':
          result = await cancelarReservaCarro(id);
          break;
        case 'salao':
          result = await cancelarReservaSalao(id);
          break;
        case 'pacote':
          result = await cancelarReservaPacote(id);
          break;
        default:
          result = { error: 'Tipo de reserva inválido' };
      }

      if (result.error) {
        console.error(`Erro ao cancelar reserva de ${tipo}:`, result.error);
        setError(`Erro ao cancelar reserva: ${result.error}`);
      } else {
        // Atualizar a lista de reservas após o cancelamento
        initialLoadDone.current = false; // Permitir recarregar os dados
        setLoadAttempts(0); // Resetar contagem de tentativas
        fetchReservas();
      }
    } catch (err) {
      console.error("Erro inesperado ao cancelar reserva:", err);
      setError("Ocorreu um erro ao cancelar a reserva");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pendente':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Pendente</Badge>;
      case 'confirmada':
        return <Badge variant="outline" className="bg-green-100 text-green-800">Confirmada</Badge>;
      case 'cancelada':
        return <Badge variant="outline" className="bg-red-100 text-red-800">Cancelada</Badge>;
      case 'concluida':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">Concluída</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd/MM/yyyy', { locale: ptBR });
    } catch (error) {
      return dateString;
    }
  };

  const handleRetry = () => {
    initialLoadDone.current = false;
    setLoadAttempts(0);
    fetchReservas();
  };

  const handleDownloadVoucher = (tipo: string, reserva: any) => {
    // Gerar um número de voucher aleatório
    const voucherNumber = "AKI" + Math.floor(10000 + Math.random() * 90000);
    
    // Preparar dados para o voucher
    // Em uma implementação real, aqui você usaria o VoucherGenerator
    // const voucherData = {
    //   id: reserva.id,
    //   tipo: tipo as 'hotel' | 'carro' | 'salao' | 'pacote',
    //   nome: getTipoNome(tipo, reserva),
    //   data_inicio: getTipoDataInicio(tipo, reserva),
    //   data_fim: getTipoDataFim(tipo, reserva),
    //   preco_total: reserva.preco_total,
    //   detalhes: reserva,
    //   usuario: {
    //     nome: user?.user_metadata?.nome || "",
    //     sobrenome: user?.user_metadata?.sobrenome || "",
    //     email: user?.email || ""
    //   }
    // };
    // const voucherNumber = generateVoucher(voucherData);
    
    // Por enquanto, apenas mostraremos um alerta
    alert(`Voucher #${voucherNumber} para sua reserva de ${tipo} está sendo gerado.`);
  };

  // Funções auxiliares para obter dados específicos de cada tipo de reserva
  const getTipoNome = (tipo: string, reserva: any): string => {
    switch (tipo) {
      case 'hotel':
        return reserva.quarto?.hotel?.nome || 'Hotel';
      case 'carro':
        return `${reserva.carro?.marca} ${reserva.carro?.modelo}`;
      case 'salao':
        return reserva.salao?.nome || 'Salão';
      case 'pacote':
        return reserva.pacote?.nome || 'Pacote';
      default:
        return 'Reserva';
    }
  };

  const getTipoDataInicio = (tipo: string, reserva: any): string => {
    switch (tipo) {
      case 'hotel':
        return reserva.data_checkin;
      case 'carro':
        return reserva.data_retirada;
      case 'salao':
        return reserva.data_evento;
      case 'pacote':
        return reserva.data_inicio;
      default:
        return '';
    }
  };

  const getTipoDataFim = (tipo: string, reserva: any): string => {
    switch (tipo) {
      case 'hotel':
        return reserva.data_checkout;
      case 'carro':
        return reserva.data_devolucao;
      case 'salao':
        return '';
      case 'pacote':
        return '';
      default:
        return '';
    }
  };

  const handlePrintVoucher = (tipo: string, reserva: any) => {
    alert(`Preparando para imprimir o voucher para sua reserva de ${tipo}.`);
    // Em uma implementação real, você poderia abrir uma janela de impressão
    // window.print();
  };

  const handleShareVoucher = (tipo: string, reserva: any) => {
    alert(`Compartilhar voucher para sua reserva de ${tipo}.`);
    // Em uma implementação real, você poderia implementar compartilhamento
    // via API Web Share ou gerar um link para compartilhar
  };

  if (authLoading) {
    return (
      <MainLayout>
        <div className="container py-8">
          <h1 className="text-3xl font-bold mb-6">Minha Conta</h1>
          <div className="flex justify-center items-center h-64">
            <p>Verificando autenticação...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!user) {
    return null; // Redirecionamento já foi feito no useEffect
  }

  return (
    <MainLayout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Minha Conta</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <UserProfileCard />
          </div>
          
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Minhas Reservas</CardTitle>
                <CardDescription>
                  Gerencie suas reservas de hotéis, carros, salões e pacotes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center items-center py-10">
                    <p>Carregando reservas...</p>
                  </div>
                ) : error ? (
                  <div className="py-10">
                    <Alert variant="destructive" className="mb-4">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                    <div className="flex justify-center">
                      <Button onClick={handleRetry}>Tentar novamente</Button>
                    </div>
                  </div>
                ) : (
                  <Tabs defaultValue="hotel">
                    <TabsList className="mb-4">
                      <TabsTrigger value="hotel">Hotéis</TabsTrigger>
                      <TabsTrigger value="carro">Carros</TabsTrigger>
                      <TabsTrigger value="salao">Salões</TabsTrigger>
                      <TabsTrigger value="pacote">Pacotes</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="hotel">
                      {reservas.hotel.length === 0 ? (
                        <p className="text-center py-8 text-muted-foreground">
                          Você não possui reservas de hotéis.
                        </p>
                      ) : (
                        <div className="space-y-4">
                          {reservas.hotel.map((reserva: any) => (
                            <Card key={reserva.id}>
                              <CardContent className="p-4">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h3 className="font-medium">{reserva.quarto?.hotel?.nome || 'Hotel'}</h3>
                                    <p className="text-sm text-muted-foreground">
                                      {reserva.quarto?.tipo || 'Quarto'} - {formatDate(reserva.data_checkin)} a {formatDate(reserva.data_checkout)}
                                    </p>
                                    <p className="text-sm mt-1">
                                      {reserva.quantidade_hospedes} hóspedes • {reserva.preco_total?.toLocaleString() || '0'} Kz
                                    </p>
                                  </div>
                                  <div className="flex flex-col items-end space-y-2">
                                    {getStatusBadge(reserva.status)}
                                    {reserva.status === 'pendente' && (
                                      <Button 
                                        variant="outline" 
                                        size="sm" 
                                        className="text-red-600"
                                        onClick={() => handleCancelarReserva('hotel', reserva.id)}
                                      >
                                        Cancelar
                                      </Button>
                                    )}
                                    {reserva.status === 'confirmada' && (
                                      <div className="flex flex-col space-y-2 mt-2">
                                        <Button 
                                          variant="outline" 
                                          size="sm"
                                          className="text-purple-600"
                                          onClick={() => handleDownloadVoucher('hotel', reserva)}
                                        >
                                          <Download className="h-4 w-4 mr-1" /> Voucher
                                        </Button>
                                        <div className="flex space-x-2">
                                          <Button 
                                            variant="ghost" 
                                            size="sm"
                                            onClick={() => handlePrintVoucher('hotel', reserva)}
                                          >
                                            <Printer className="h-4 w-4" />
                                          </Button>
                                          <Button 
                                            variant="ghost" 
                                            size="sm"
                                            onClick={() => handleShareVoucher('hotel', reserva)}
                                          >
                                            <Share className="h-4 w-4" />
                                          </Button>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="carro">
                      {reservas.carro.length === 0 ? (
                        <p className="text-center py-8 text-muted-foreground">
                          Você não possui reservas de carros.
                        </p>
                      ) : (
                        <div className="space-y-4">
                          {reservas.carro.map((reserva: any) => (
                            <Card key={reserva.id}>
                              <CardContent className="p-4">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h3 className="font-medium">{reserva.carro?.marca} {reserva.carro?.modelo}</h3>
                                    <p className="text-sm text-muted-foreground">
                                      {formatDate(reserva.data_retirada)} a {formatDate(reserva.data_devolucao)}
                                    </p>
                                    <p className="text-sm mt-1">
                                       {reserva.preco_total?.toLocaleString() || '0'} Kz
                                    </p>
                                  </div>
                                  <div className="flex flex-col items-end space-y-2">
                                    {getStatusBadge(reserva.status)}
                                    {reserva.status === 'pendente' && (
                                      <Button 
                                        variant="outline" 
                                        size="sm" 
                                        className="text-red-600"
                                        onClick={() => handleCancelarReserva('carro', reserva.id)}
                                      >
                                        Cancelar
                                      </Button>
                                    )}
                                    {reserva.status === 'confirmada' && (
                                      <div className="flex flex-col space-y-2 mt-2">
                                        <Button 
                                          variant="outline" 
                                          size="sm"
                                          className="text-purple-600"
                                          onClick={() => handleDownloadVoucher('carro', reserva)}
                                        >
                                          <Download className="h-4 w-4 mr-1" /> Voucher
                                        </Button>
                                        <div className="flex space-x-2">
                                          <Button 
                                            variant="ghost" 
                                            size="sm"
                                            onClick={() => handlePrintVoucher('carro', reserva)}
                                          >
                                            <Printer className="h-4 w-4" />
                                          </Button>
                                          <Button 
                                            variant="ghost" 
                                            size="sm"
                                            onClick={() => handleShareVoucher('carro', reserva)}
                                          >
                                            <Share className="h-4 w-4" />
                                          </Button>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="salao">
                      {reservas.salao.length === 0 ? (
                        <p className="text-center py-8 text-muted-foreground">
                          Você não possui reservas de salões.
                        </p>
                      ) : (
                        <div className="space-y-4">
                          {reservas.salao.map((reserva: any) => (
                            <Card key={reserva.id}>
                              <CardContent className="p-4">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h3 className="font-medium">{reserva.salao?.nome || 'Salão'}</h3>
                                    <p className="text-sm text-muted-foreground">
                                      {formatDate(reserva.data_evento)}
                                    </p>
                                    <p className="text-sm mt-1">
                                      {reserva.quantidade_convidados} convidados • {reserva.preco_total?.toLocaleString() || '0'} Kz
                                    </p>
                                  </div>
                                  <div className="flex flex-col items-end space-y-2">
                                    {getStatusBadge(reserva.status)}
                                    {reserva.status === 'pendente' && (
                                      <Button 
                                        variant="outline" 
                                        size="sm" 
                                        className="text-red-600"
                                        onClick={() => handleCancelarReserva('salao', reserva.id)}
                                      >
                                        Cancelar
                                      </Button>
                                    )}
                                    {reserva.status === 'confirmada' && (
                                      <div className="flex flex-col space-y-2 mt-2">
                                        <Button 
                                          variant="outline" 
                                          size="sm"
                                          className="text-purple-600"
                                          onClick={() => handleDownloadVoucher('salao', reserva)}
                                        >
                                          <Download className="h-4 w-4 mr-1" /> Voucher
                                        </Button>
                                        <div className="flex space-x-2">
                                          <Button 
                                            variant="ghost" 
                                            size="sm"
                                            onClick={() => handlePrintVoucher('salao', reserva)}
                                          >
                                            <Printer className="h-4 w-4" />
                                          </Button>
                                          <Button 
                                            variant="ghost" 
                                            size="sm"
                                            onClick={() => handleShareVoucher('salao', reserva)}
                                          >
                                            <Share className="h-4 w-4" />
                                          </Button>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="pacote">
                      {reservas.pacote.length === 0 ? (
                        <p className="text-center py-8 text-muted-foreground">
                          Você não possui reservas de pacotes.
                        </p>
                      ) : (
                        <div className="space-y-4">
                          {reservas.pacote.map((reserva: any) => (
                            <Card key={reserva.id}>
                              <CardContent className="p-4">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h3 className="font-medium">{reserva.pacote?.nome || 'Pacote'}</h3>
                                    <p className="text-sm text-muted-foreground">
                                      {formatDate(reserva.data_inicio)} a {formatDate(reserva.data_fim)}
                                    </p>
                                    <p className="text-sm mt-1">
                                      {reserva.quantidade_pessoas} pessoas • {reserva.preco_total?.toLocaleString() || '0'} Kz
                                    </p>
                                  </div>
                                  <div className="flex flex-col items-end space-y-2">
                                    {getStatusBadge(reserva.status)}
                                    {reserva.status === 'pendente' && (
                                      <Button 
                                        variant="outline" 
                                        size="sm" 
                                        className="text-red-600"
                                        onClick={() => handleCancelarReserva('pacote', reserva.id)}
                                      >
                                        Cancelar
                                      </Button>
                                    )}
                                    {reserva.status === 'confirmada' && (
                                      <div className="flex flex-col space-y-2 mt-2">
                                        <Button 
                                          variant="outline" 
                                          size="sm"
                                          className="text-purple-600"
                                          onClick={() => handleDownloadVoucher('pacote', reserva)}
                                        >
                                          <Download className="h-4 w-4 mr-1" /> Voucher
                                        </Button>
                                        <div className="flex space-x-2">
                                          <Button 
                                            variant="ghost" 
                                            size="sm"
                                            onClick={() => handlePrintVoucher('pacote', reserva)}
                                          >
                                            <Printer className="h-4 w-4" />
                                          </Button>
                                          <Button 
                                            variant="ghost" 
                                            size="sm"
                                            onClick={() => handleShareVoucher('pacote', reserva)}
                                          >
                                            <Share className="h-4 w-4" />
                                          </Button>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
