import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useSupabaseAuth } from "@/hooks/useSupabaseAuth";
import { useReservas } from "@/hooks/useReservas";
import { MainLayout } from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { format, addDays, differenceInDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useToast } from "@/components/ui/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export function CarView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useSupabaseAuth();
  const { criarReservaCarro } = useReservas();

  const [carro, setCarro] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [datas, setDatas] = useState<{ from: Date; to: Date | undefined }>({
    from: new Date(),
    to: addDays(new Date(), 3),
  });
  const [reservaDialogOpen, setReservaDialogOpen] = useState(false);
  const [isReservando, setIsReservando] = useState(false);
  const [reservaSuccess, setReservaSuccess] = useState(false);

  useEffect(() => {
    const fetchCarro = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data: carroData, error: carroError } = await supabase
          .from("carros")
          .select(`
            *,
            imagens_carro (*)
          `)
          .eq("id", id)
          .single();

        if (carroError) throw carroError;
        if (!carroData) throw new Error("Carro não encontrado");

        setCarro(carroData);
      } catch (err: any) {
        console.error("Erro ao buscar carro:", err);
        setError(err.message || "Erro ao carregar dados do carro");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCarro();
    }
  }, [id]);

  const calcularPrecoTotal = () => {
    if (!carro || !datas.from || !datas.to) return 0;

    const dias = Math.max(1, differenceInDays(datas.to, datas.from));
    return carro.preco_diaria * dias;
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

    if (!carro || !datas.from || !datas.to) {
      toast({
        title: "Dados incompletos",
        description: "Selecione datas para a reserva",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsReservando(true);

      const reserva = {
        usuario_id: user.id,
        carro_id: carro.id,
        data_retirada: format(datas.from, 'yyyy-MM-dd'),
        data_devolucao: format(datas.to, 'yyyy-MM-dd'),
        preco_total: calcularPrecoTotal(),
        status: 'pendente',
   
      };

      const { data, error } = await criarReservaCarro(reserva);

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
            <h1 className="text-3xl font-bold">{carro?.marca} {carro?.modelo}</h1>
            <p className="text-muted-foreground">
              {carro?.ano} • {carro?.tipo_cambio} • {carro?.combustivel}
            </p>
          </div>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <Badge variant="outline" className="bg-primary/10">
              {carro?.categoria}
            </Badge>
            {carro?.ar_condicionado && (
              <Badge variant="outline" className="bg-blue-50">
                Ar-condicionado
              </Badge>
            )}
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
                  {carro?.imagens_carro && carro.imagens_carro.length > 0 ? (
                    carro.imagens_carro.map((imagem: any) => (
                      <CarouselItem key={imagem.id}>
                        <div className="overflow-hidden rounded-lg">
                          <img
                            src={imagem.url}
                            alt={`Imagem do ${carro.marca} ${carro.modelo}`}
                            className="w-full h-[400px] object-cover"
                          />
                        </div>
                      </CarouselItem>
                    ))
                  ) : (
                    <CarouselItem>
                      <div className="overflow-hidden rounded-lg">
                        <img
                          src="/images/car-default.jpg"
                          alt="Imagem padrão do veículo"
                          className="w-full h-[400px] object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "https://placehold.co/800x400/e2e8f0/64748b?text=Veículo+Imagem+Padrão";
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

          {/* Informações do Carro */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Detalhes do Veículo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium">Especificações</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 mt-2">
                      <li><span className="font-medium">Marca:</span> {carro?.marca}</li>
                      <li><span className="font-medium">Modelo:</span> {carro?.modelo}</li>
                      <li><span className="font-medium">Ano:</span> {carro?.ano}</li>
                      <li><span className="font-medium">Cor:</span> {carro?.cor}</li>
                      <li><span className="font-medium">Câmbio:</span> {carro?.tipo_cambio}</li>
                      <li><span className="font-medium">Combustível:</span> {carro?.combustivel}</li>
                      <li><span className="font-medium">Capacidade:</span> {carro?.capacidade_passageiros} passageiros</li>
                      <li><span className="font-medium">Portas:</span> {carro?.numero_portas}</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium">Características</h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                      {carro?.ar_condicionado && <li>Ar-condicionado</li>}
                      {carro?.direcao_hidraulica && <li>Direção hidráulica</li>}
                      {carro?.vidro_eletrico && <li>Vidros elétricos</li>}
                      {carro?.trava_eletrica && <li>Travas elétricas</li>}
                      {carro?.airbag && <li>Airbag</li>}
                      {carro?.abs && <li>Freios ABS</li>}
                      {carro?.bluetooth && <li>Bluetooth</li>}
                      {carro?.sensor_estacionamento && <li>Sensor de estacionamento</li>}
                    </ul>
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="font-medium">Descrição</h4>
                  <p className="text-sm text-muted-foreground mt-2">{carro?.descricao}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Preço e Disponibilidade</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-2xl font-bold">KZ {carro?.preco_diaria?.toFixed(2) || '0.00'}</p>
                    <p className="text-sm text-muted-foreground">por dia</p>
                  </div>
                  <Dialog open={reservaDialogOpen} onOpenChange={(open) => {
                    setReservaDialogOpen(open);
                    if (!open) setReservaSuccess(false);
                  }}>
                    <DialogTrigger asChild>
                      <Button>Reservar Agora</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Reservar Veículo</DialogTitle>
                        <DialogDescription>
                          Preencha os detalhes da sua reserva para o {carro?.marca} {carro?.modelo}
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
                                  <span>Data de retirada:</span>
                                  <span className="font-medium">
                                    {format(datas.from, 'dd/MM/yyyy', { locale: ptBR })}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Data de devolução:</span>
                                  <span className="font-medium">
                                    {datas.to ? format(datas.to, 'dd/MM/yyyy', { locale: ptBR }) : '-'}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Dias:</span>
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
                </div>
                <div className="mt-4">
                  <p className="text-sm">
                    <span className="font-medium">Local de retirada:</span> {carro?.localizacao || "Sede principal"}
                  </p>
                  <p className="text-sm mt-1">
                    <span className="font-medium">Política de cancelamento:</span> Gratuito até 24h antes da retirada
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 