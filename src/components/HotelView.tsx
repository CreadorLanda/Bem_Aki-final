import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { useReservas } from "@/hooks/useReservas";
import { MainLayout } from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { format, addDays, differenceInDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useToast } from "@/components/ui/use-toast";
import { DatePickerWithRange } from "@/components/DatePickerWithRange";
import { Calendar } from "@/components/ui/calendar";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export function HotelView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useSupabaseAuth();
  const { criarReservaHotel } = useReservas();
  
  const [hotel, setHotel] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedQuarto, setSelectedQuarto] = useState<any>(null);
  const [datas, setDatas] = useState<{ from: Date; to: Date | undefined }>({
    from: new Date(),
    to: addDays(new Date(), 3),
  });
  const [reservaDialogOpen, setReservaDialogOpen] = useState(false);
  const [isReservando, setIsReservando] = useState(false);
  const [reservaSuccess, setReservaSuccess] = useState(false);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data: hotelData, error: hotelError } = await supabase
          .from("hoteis")
          .select(`
            *,
            imagens_hotel (*),
            quartos (*)
          `)
          .eq("id", id)
          .single();

        if (hotelError) throw hotelError;
        if (!hotelData) throw new Error("Hotel não encontrado");

        setHotel(hotelData);
      } catch (err: any) {
        console.error("Erro ao buscar hotel:", err);
        setError(err.message || "Erro ao carregar dados do hotel");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchHotel();
    }
  }, [id]);

  const calcularPrecoTotal = () => {
    if (!selectedQuarto || !datas.from || !datas.to) return 0;

    const dias = Math.max(1, differenceInDays(datas.to, datas.from));
    return selectedQuarto.preco_noite * dias;
  };

  const handleReservar = async () => {
    if (!user) {
      toast({
        title: "Atenção!",
        description: "Você precisa estar logado para fazer uma reserva.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    if (!selectedQuarto || !datas.from || !datas.to) {
      toast({
        title: "Dados incompletos",
        description: "Selecione um quarto e datas para a reserva",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsReservando(true);

      const reserva = {
        usuario_id: user.id,
        quarto_id: selectedQuarto.id,
        data_checkin: format(datas.from, 'yyyy-MM-dd'),
        data_checkout: format(datas.to, 'yyyy-MM-dd'),
        preco_total: calcularPrecoTotal(),
        quantidade_hospedes: selectedQuarto.capacidade || 1,
        status: 'pendente'
      };

      const { data, error } = await criarReservaHotel(reserva);

      if (error) throw error;

      setReservaSuccess(true);
      toast({
        title: "Reserva realizada com sucesso!",
        description: "Sua reserva foi registrada e está aguardando confirmação.",
      });

      // Fechar o diálogo após 2 segundos
      setTimeout(() => {
        setReservaDialogOpen(false);
        setReservaSuccess(false);
        // Redirecionar para o dashboard do cliente
        navigate("/minha-conta");
      }, 2000);

    } catch (err: any) {
      console.error("Erro ao fazer reserva:", err);
      toast({
        title: "Erro ao fazer reserva",
        description: err.message || "Ocorreu um erro ao processar sua reserva",
        variant: "destructive",
      });
    } finally {
      setIsReservando(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto py-6 space-y-8">
          <Skeleton className="h-12 w-3/4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton className="h-[400px] w-full" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-10 w-1/3" />
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-8 w-1/4" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Skeleton className="h-[200px] w-full" />
              <Skeleton className="h-[200px] w-full" />
              <Skeleton className="h-[200px] w-full" />
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="container mx-auto py-6">
          <Alert variant="destructive">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <Button onClick={() => navigate(-1)} className="mt-4">
            Voltar
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto py-6 space-y-8">
        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold">{hotel?.nome}</h1>
            <p className="text-muted-foreground">
              {hotel?.cidade}, {hotel?.endereco}
            </p>
          </div>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <Badge variant="outline" className="bg-primary/10">
              {hotel?.categoria} estrelas
            </Badge>
          </div>
        </div>

        <Separator />

        {/* Imagens e Informações */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Carrossel de Imagens */}
          <Card className="border-0 shadow-none">
            <CardContent className="p-0">
              <Carousel className="w-full">
                <CarouselContent>
                  {hotel?.imagens_hotel && hotel.imagens_hotel.length > 0 ? (
                    hotel.imagens_hotel.map((imagem: any) => (
                      <CarouselItem key={imagem.id}>
                        <div className="overflow-hidden rounded-lg">
                          <img
                            src={imagem.url}
                            alt={`Imagem do ${hotel.nome}`}
                            className="w-full h-[400px] object-cover"
                          />
                    </div>
                      </CarouselItem>
                    ))
                  ) : (
                    <CarouselItem>
                      <div className="overflow-hidden rounded-lg">
                        <img
                          src="/images/hotel-default.jpg"
                          alt="Imagem padrão do hotel"
                          className="w-full h-[400px] object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "https://placehold.co/800x400/e2e8f0/64748b?text=Hotel+Imagem+Padrão";
                          }}
                        />
                </div>
                    </CarouselItem>
                  )}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </CardContent>
          </Card>

          {/* Informações do Hotel */}
                <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Sobre o Hotel</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{hotel?.descricao}</p>
                <div className="mt-4 grid grid-cols-2 gap-2">
                          <div>
                    <h4 className="font-medium">Comodidades</h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground">
                      {hotel?.wifi && <li>Wi-Fi Grátis</li>}
                      {hotel?.estacionamento && <li>Estacionamento</li>}
                      {hotel?.piscina && <li>Piscina</li>}
                      {hotel?.cafe_manha && <li>Café da Manhã</li>}
                      {hotel?.academia && <li>Academia</li>}
                            </ul>
                          </div>
                  <div>
                    <h4 className="font-medium">Políticas</h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground">
                      <li>Check-in: {hotel?.horario_checkin || "14:00"}</li>
                      <li>Check-out: {hotel?.horario_checkout || "12:00"}</li>
                      {hotel?.permite_cancelamento && (
                        <li>Cancelamento gratuito até 24h antes</li>
                      )}
                    </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

            <Card>
              <CardHeader>
                <CardTitle>Localização</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {hotel?.endereco}, {hotel?.cidade}
                </p>
                {/* Aqui poderia ser adicionado um mapa */}
              </CardContent>
            </Card>
              </div>
            </div>

        {/* Quartos Disponíveis */}
            <div>
          <h2 className="text-2xl font-bold mb-4">Quartos Disponíveis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotel?.quartos && hotel.quartos.length > 0 ? (
              hotel.quartos.map((quarto: any) => (
                <Card key={quarto.id} className="overflow-hidden">
                  <CardHeader className="p-0">
                    <div className="h-[200px] bg-muted">
                      {/* Aqui poderia ter uma imagem do quarto */}
                      <div className="h-full flex items-center justify-center bg-primary/10">
                        <p className="font-medium">{quarto.tipo}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg">{quarto.tipo}</h3>
                        <p className="text-sm text-muted-foreground">
                          Capacidade: {quarto.capacidade} pessoas
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">
                          KZ {quarto.preco_noite?.toFixed(2) || '0.00'}
                        </p>
                        <p className="text-xs text-muted-foreground">por noite</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <h4 className="font-medium text-sm">Comodidades</h4>
                      <ul className="text-sm text-muted-foreground grid grid-cols-2 gap-1 mt-1">
                        {quarto.ar_condicionado && <li>• Ar-condicionado</li>}
                        {quarto.tv && <li>• TV</li>}
                        {quarto.frigobar && <li>• Frigobar</li>}
                        {quarto.varanda && <li>• Varanda</li>}
                        <li>• {quarto.tipo_cama}</li>
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Dialog open={reservaDialogOpen && selectedQuarto?.id === quarto.id} onOpenChange={(open) => {
                      setReservaDialogOpen(open);
                      if (!open) setReservaSuccess(false);
                    }}>
                      <DialogTrigger asChild>
                        <Button 
                          className="w-full" 
                          onClick={() => {
                            setSelectedQuarto(quarto);
                            setReservaDialogOpen(true);
                          }}
                        >
                          Reservar
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                          <DialogTitle>Reservar Quarto</DialogTitle>
                          <DialogDescription>
                            Preencha os detalhes da sua reserva para o quarto {quarto.tipo}
                          </DialogDescription>
                        </DialogHeader>
                        
                        {reservaSuccess ? (
                          <div className="py-6 space-y-4">
                            <Alert className="bg-green-50 border-green-200">
                              <div className="flex items-center gap-2">
                                <div className="h-4 w-4 rounded-full bg-green-500" />
                                <AlertTitle>Reserva realizada com sucesso!</AlertTitle>
                              </div>
                              <AlertDescription>
                                Sua reserva foi registrada e está aguardando confirmação.
                                Você será redirecionado para o seu dashboard.
                              </AlertDescription>
                            </Alert>
                          </div>
                        ) : (
                          <>
                            <div className="grid gap-4 py-4">
                              <div className="space-y-2">
                                <Label htmlFor="datas">Selecione as datas</Label>
                                <div className="border rounded-md p-4">
                                  <Calendar
                                    mode="range"
                                    selected={{
                                      from: datas.from,
                                      to: datas.to,
                                    }}
                                    onSelect={(range) => {
                                      if (range?.from) {
                                        setDatas({
                                          from: range.from,
                                          to: range.to || addDays(range.from, 1),
                                        });
                                      }
                                    }}
                                    numberOfMonths={1}
                                    disabled={(date) => date < new Date()}
                                    locale={ptBR}
                                  />
                    </div>
                  </div>
                  
                              <div className="space-y-2">
                                <Label>Detalhes da reserva</Label>
                                <div className="border rounded-md p-4 space-y-2">
                                  <div className="flex justify-between">
                                    <span>Check-in:</span>
                                    <span className="font-medium">
                                      {format(datas.from, 'dd/MM/yyyy', { locale: ptBR })}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Check-out:</span>
                                    <span className="font-medium">
                                      {datas.to ? format(datas.to, 'dd/MM/yyyy', { locale: ptBR }) : '-'}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Noites:</span>
                                    <span className="font-medium">
                                      {datas.to ? differenceInDays(datas.to, datas.from) : 1}
                                    </span>
                                  </div>
                                  <Separator className="my-2" />
                                  <div className="flex justify-between font-bold">
                                    <span>Preço total:</span>
                                    <span>KZ {(calcularPrecoTotal() || 0).toFixed(2)}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setReservaDialogOpen(false)}>
                                Cancelar
                              </Button>
                              <Button onClick={handleReservar} disabled={isReservando}>
                                {isReservando ? "Processando..." : "Confirmar Reserva"}
                  </Button>
                            </DialogFooter>
                          </>
                        )}
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
              </Card>
              ))
            ) : (
              <div className="col-span-full">
                <Alert>
                  <AlertDescription>
                    Não há quartos disponíveis para este hotel no momento.
                  </AlertDescription>
                </Alert>
            </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
