import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CreditCard, Calendar, Lock, User, Shield } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: string;
  service: string;
  onPaymentComplete?: (paymentData: any) => Promise<void>;
}

export const PaymentModal = ({ isOpen, onClose, amount, service, onPaymentComplete }: PaymentModalProps) => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: ""
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsProcessing(true);
      
      // Simulação de processamento de pagamento
      console.log("Processando pagamento:", { paymentMethod, cardData, amount, service });
      
      // Simular um pequeno atraso para dar feedback ao usuário
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Se temos uma função de callback para completar o pagamento, chamamos ela
      if (onPaymentComplete) {
        await onPaymentComplete({
          method: paymentMethod,
          amount,
          service,
          status: 'confirmada'
        });
      }
      
      // Mostrar mensagem de sucesso
      toast({
        title: "Pagamento realizado com sucesso!",
        description: "Sua reserva foi confirmada.",
        variant: "default",
      });
      
      // Fechar o modal
      onClose();
    } catch (error) {
      console.error("Erro ao processar pagamento:", error);
      toast({
        title: "Erro no pagamento",
        description: "Não foi possível processar seu pagamento. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardData({
      ...cardData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Finalizar Pagamento
          </DialogTitle>
        </DialogHeader>
        
        {/* Order Summary */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="font-semibold text-gray-900 mb-2">Resumo da Reserva</h3>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">{service}</span>
            <span className="font-bold text-purple-600">{amount}</span>
          </div>
        </div>
        
        {/* Payment Methods */}
        <div className="space-y-4 mb-6">
          <Label className="text-base font-semibold">Método de Pagamento</Label>
          
          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setPaymentMethod("card")}
              className={`p-3 border rounded-lg flex flex-col items-center ${
                paymentMethod === "card" ? "border-purple-500 bg-purple-50" : "border-gray-200"
              }`}
            >
              <CreditCard className="h-6 w-6 mb-1" />
              <span className="text-xs">Cartão</span>
            </button>
            
            <button
              type="button"
              onClick={() => setPaymentMethod("transfer")}
              className={`p-3 border rounded-lg flex flex-col items-center ${
                paymentMethod === "transfer" ? "border-purple-500 bg-purple-50" : "border-gray-200"
              }`}
            >
              <Shield className="h-6 w-6 mb-1" />
              <span className="text-xs">Transferência</span>
            </button>
            
            <button
              type="button"
              onClick={() => setPaymentMethod("multicaixa")}
              className={`p-3 border rounded-lg flex flex-col items-center ${
                paymentMethod === "multicaixa" ? "border-purple-500 bg-purple-50" : "border-gray-200"
              }`}
            >
              <Lock className="h-6 w-6 mb-1" />
              <span className="text-xs">Multicaixa</span>
            </button>
          </div>
        </div>
        
        {/* Card Form */}
        {paymentMethod === "card" && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Número do Cartão</Label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="cardNumber"
                  name="number"
                  placeholder="1234 5678 9012 3456"
                  value={cardData.number}
                  onChange={handleInputChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cardName">Nome no Cartão</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="cardName"
                  name="name"
                  placeholder="Nome como aparece no cartão"
                  value={cardData.name}
                  onChange={handleInputChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cardExpiry">Validade</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="cardExpiry"
                    name="expiry"
                    placeholder="MM/AA"
                    value={cardData.expiry}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cardCvv">CVV</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="cardCvv"
                    name="cvv"
                    placeholder="123"
                    value={cardData.cvv}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-purple-600 hover:bg-purple-700"
              disabled={isProcessing}
            >
              {isProcessing ? "Processando..." : `Pagar ${amount}`}
            </Button>
          </form>
        )}
        
        {/* Transfer Instructions */}
        {paymentMethod === "transfer" && (
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Dados para Transferência</h4>
              <div className="space-y-1 text-sm text-blue-800">
                <p><strong>Banco:</strong> Banco BAI</p>
                <p><strong>IBAN:</strong> AO06 0040 0000 1234 5678 9012 3</p>
                <p><strong>Titular:</strong> bemAki Angola, Lda</p>
                <p><strong>Valor:</strong> {amount}</p>
              </div>
            </div>
            <Button 
              onClick={handleSubmit} 
              className="w-full bg-purple-600 hover:bg-purple-700"
              disabled={isProcessing}
            >
              {isProcessing ? "Processando..." : "Confirmar Transferência"}
            </Button>
          </div>
        )}
        
        {/* Multicaixa */}
        {paymentMethod === "multicaixa" && (
          <div className="space-y-4">
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-900 mb-2">Pagamento Multicaixa Express</h4>
              <p className="text-sm text-yellow-800">
                Será redirecionado para o portal Multicaixa Express para finalizar o pagamento de forma segura.
              </p>
            </div>
            <Button 
              onClick={handleSubmit} 
              className="w-full bg-purple-600 hover:bg-purple-700"
              disabled={isProcessing}
            >
              {isProcessing ? "Processando..." : "Ir para Multicaixa Express"}
            </Button>
          </div>
        )}
        
        <div className="text-center text-xs text-gray-500 mt-4">
          <Shield className="h-4 w-4 inline mr-1" />
          Pagamento 100% seguro e protegido
        </div>
      </DialogContent>
    </Dialog>
  );
};
