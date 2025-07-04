// VoucherGenerator.tsx
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface VoucherData {
  id: string;
  tipo: 'hotel' | 'carro' | 'salao' | 'pacote';
  nome: string;
  data_inicio: string;
  data_fim?: string;
  preco_total: number;
  detalhes: Record<string, any>;
  usuario: {
    nome: string;
    sobrenome: string;
    email: string;
  };
}

export const generateVoucher = (data: VoucherData): string => {
  // Gerar número de voucher
  const voucherNumber = "AKI" + Math.floor(10000 + Math.random() * 90000);
  
  // Em uma implementação real, aqui você geraria um PDF usando jsPDF
  // Por enquanto, apenas retornamos o número do voucher
  console.log('Gerando voucher para:', data);
  
  // Aqui você poderia implementar a geração de PDF usando jsPDF
  // Exemplo:
  // const doc = new jsPDF();
  // doc.text('AKI VIAGENS AFRIKA', 105, 20, { align: 'center' });
  // doc.text('VOUCHER DE RESERVA', 105, 30, { align: 'center' });
  // ...
  // doc.save(`voucher-${voucherNumber}.pdf`);
  
  return voucherNumber;
};

// Função auxiliar para formatar datas
export const formatDate = (dateString: string): string => {
  try {
    return format(new Date(dateString), 'dd/MM/yyyy', { locale: ptBR });
  } catch (error) {
    return dateString;
  }
};

// Função para obter o nome do tipo de reserva
export const getTipoReserva = (tipo: string): string => {
  switch (tipo) {
    case 'hotel':
      return 'Hospedagem';
    case 'carro':
      return 'Aluguel de Carro';
    case 'salao':
      return 'Salão de Eventos';
    case 'pacote':
      return 'Pacote Turístico';
    default:
      return 'Reserva';
  }
};
