import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Calendar, MapPin, Users, Check, CreditCard, 
  Download, Printer, Share
} from "lucide-react";
import { PaymentModal } from "@/components/PaymentModal";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { LoginModal } from "@/components/LoginModal";

const steps = [
  { id: "details", name: "Detalhes" },
  { id: "payment", name: "Pagamento" },
  { id: "confirmation", name: "Confirmação" }
];

export const ReservationFlow = () => {
  const [currentStep, setCurrentStep] = useState("details");
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Verificar se o usuário está autenticado
    if (!user) {
      setIsLoginModalOpen(true);
    }
  }, [user]);

  // Redirecionar para a página inicial se o usuário fechar o modal de login sem autenticar
  const handleLoginModalClose = () => {
    setIsLoginModalOpen(false);
    if (!user) {
      navigate("/");
    }
  };
  
  const hotel = {
    name: "Hotel Presidente",
    image: "/placeholder.svg",
    location: "Luanda",
    roomType: "Suite Deluxe",
    price: 45000,
    checkIn: "2024-01-25",
    checkOut: "2024-01-28",
    guests: 2,
    nights: 3
  };

  const totalPrice = hotel.price * hotel.nights;
  
  // Handle moving to payment step
  const handleContinueToPayment = () => {
    if (!user) {
      setIsLoginModalOpen(true);
      return;
    }
    setCurrentStep("payment");
    setIsPaymentModalOpen(true);
  };
  
  // Handle payment completion
  const handlePaymentComplete = () => {
    setIsPaymentModalOpen(false);
    setCurrentStep("confirmation");
    setIsConfirmed(true);
  };

  // Handle share
  const handleShareVoucher = () => {
    alert("Funcionalidade de compartilhamento será implementada aqui");
  };
  
  // Generate random voucher number
  const voucherNumber = "BK" + Math.floor(10000 + Math.random() * 90000);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Steps */}
        <nav className="mb-8">
          <ol className="flex items-center justify-center space-x-4 md:space-x-8">
            {steps.map((step, stepIdx) => (
              <li key={step.id} className="flex items-center">
                <div 
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-sm ${
                    currentStep === step.id || 
                    (currentStep === "payment" && step.id === "details") || 
                    (currentStep === "confirmation" && (step.id === "details" || step.id === "payment"))
                    ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {stepIdx < steps.findIndex(s => s.id === currentStep) ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    stepIdx + 1
                  )}
                </div>
                <span 
                  className={`ml-2 text-sm font-medium hidden md:block ${
                    currentStep === step.id ? "text-gray-900" : "text-gray-500"
                  }`}
                >
                  {step.name}
                </span>
                {stepIdx < steps.length - 1 ? (
                  <div className="hidden md:block w-12 h-0.5 mx-2 bg-gray-200"></div>
                ) : null}
              </li>
            ))}
          </ol>
        </nav>

        <Card className="overflow-hidden">
          <div className="bg-purple-600 text-white p-6">
            <h1 className="text-2xl font-bold mb-1">Sua Reserva</h1>
            {currentStep === "confirmation" ? (
              <p className="text-white/90">Reserva #{voucherNumber} confirmada!</p>
            ) : (
              <p className="text-white/90">Complete os detalhes para finalizar sua reserva</p>
            )}
          </div>
          
          <CardContent className="p-6">
            {/* Hotel Info Section (always visible) */}
            <div className="border-b pb-6 mb-6">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/4 mb-4 md:mb-0">
                  <img 
                    src={hotel.image} 
                    alt={hotel.name}
                    className="w-full h-32 object-cover rounded"
                  />
                </div>
                <div className="md:w-3/4 md:pl-6">
                  <h2 className="text-xl font-semibold mb-2">{hotel.name}</h2>
                  <p className="text-gray-600 flex items-center mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    {hotel.location}
                  </p>
                  <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-6">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-purple-600 mr-2" />
                      <span>Check-in: {hotel.checkIn}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-purple-600 mr-2" />
                      <span>Check-out: {hotel.checkOut}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-purple-600 mr-2" />
                      <span>{hotel.guests} Hóspedes</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium">{hotel.roomType}</p>
                      <p className="text-sm text-gray-600">{hotel.nights} noites</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-purple-600">
                        {totalPrice.toLocaleString()} Kz
                      </p>
                      <p className="text-sm text-gray-500">Total</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Guest Details Form */}
            {currentStep === "details" && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Informações do Hóspede</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Nome</Label>
                    <Input 
                      id="firstName" 
                      placeholder="Seu nome"
                      defaultValue={user?.user_metadata?.nome || ""}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Sobrenome</Label>
                    <Input 
                      id="lastName" 
                      placeholder="Seu sobrenome"
                      defaultValue={user?.user_metadata?.sobrenome || ""}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="seu@email.com"
                      defaultValue={user?.email || ""}
                      readOnly={!!user?.email}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Telefone</Label>
                    <Input 
                      id="phone" 
                      placeholder="+244 923 456 789"
                      defaultValue={user?.user_metadata?.telefone || ""}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="specialRequests">Pedidos Especiais (opcional)</Label>
                    <textarea 
                      id="specialRequests" 
                      className="w-full border rounded-md p-2"
                      rows={3}
                      placeholder="Ex: Quarto em andar alto, cama extra, etc."
                    ></textarea>
                  </div>
                </div>

                <div className="pt-6 flex justify-end">
                  <Button 
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={handleContinueToPayment}
                  >
                    Continuar para Pagamento
                  </Button>
                </div>
              </div>
            )}

            {/* Confirmation Section */}
            {currentStep === "confirmation" && (
              <div className="space-y-6">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mb-4">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-green-800 mb-2">Reserva Confirmada!</h3>
                  <p className="text-green-700">
                    Parabéns! Sua reserva foi confirmada com sucesso.
                  </p>
                </div>

                <div className="bg-gray-50 border rounded-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Detalhes do Voucher</h3>
                    <span className="text-lg font-bold">#{voucherNumber}</span>
                  </div>
                  
                  <div className="space-y-3 mb-6 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Nome do Hóspede:</span>
                      <span>{user?.user_metadata?.nome || ""} {user?.user_metadata?.sobrenome || ""}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status do Pagamento:</span>
                      <span className="text-green-600 font-semibold">Confirmado</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Método de Pagamento:</span>
                      <div className="flex items-center">
                        <CreditCard className="h-4 w-4 mr-1" />
                        <span>Cartão de Crédito</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">ID da Transação:</span>
                      <span className="text-sm">TRX-{Math.floor(100000 + Math.random() * 900000)}</span>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-3">
                    <Button variant="outline" className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      Baixar PDF
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Printer className="h-4 w-4 mr-2" />
                      Imprimir
                    </Button>
                    <Button variant="outline" className="flex-1" onClick={handleShareVoucher}>
                      <Share className="h-4 w-4 mr-2" />
                      Compartilhar
                    </Button>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-800 mb-2">Informações Importantes:</h3>
                  <ul className="space-y-2 text-blue-700 text-sm">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 mr-2 mt-0.5 text-blue-600" />
                      <span>Apresente o voucher na recepção do hotel no momento do check-in.</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 mr-2 mt-0.5 text-blue-600" />
                      <span>O horário de check-in é a partir das 14h e o check-out até às 12h.</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 mr-2 mt-0.5 text-blue-600" />
                      <span>Recebemos uma cópia da reserva no seu email.</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-6 flex justify-center">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    Voltar para a Página Inicial
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <PaymentModal 
        isOpen={isPaymentModalOpen} 
        onClose={() => setIsPaymentModalOpen(false)}
        amount={`${totalPrice.toLocaleString()} Kz`}
        service={`${hotel.name} - ${hotel.roomType}`}
      />

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={handleLoginModalClose} 
      />
    </div>
  );
};
