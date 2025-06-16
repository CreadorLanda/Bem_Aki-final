import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { AdminDashboard } from "./pages/AdminDashboard";
import { HotelDashboard } from "./pages/HotelDashboard";
import { ClientDashboard } from "./pages/ClientDashboard";
import { HoteisPage } from "./pages/HoteisPage";
import { CarrosPage } from "./pages/CarrosPage";
import { SaloesPage } from "./pages/SaloesPage";
import { PacotesPage } from "./pages/PacotesPage";
import { SobrePage } from "./pages/SobrePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { HotelView } from "./components/HotelView";
import { CarView } from "./components/CarView";
import { SalonView } from "./components/SalonView";
import { PackageView } from "./components/PackageView";
import { OffersView } from "./components/OffersView";
import { ReservationFlow } from "./components/ReservationFlow";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/hoteis" element={<HoteisPage />} />
    <Route path="/carros" element={<CarrosPage />} />
    <Route path="/saloes" element={<SaloesPage />} />
    <Route path="/pacotes" element={<PacotesPage />} />
    <Route path="/sobre" element={<SobrePage />} />
    
    {/* Auth Routes */}
    <Route path="/login" element={<LoginPage />} />
    <Route path="/registro" element={<RegisterPage />} />
    
    {/* Dashboards com proteção por tipo de usuário */}
    <Route path="/admin" element={
      <ProtectedRoute allowedUserTypes={['admin']}>
        <AdminDashboard />
      </ProtectedRoute>
    } />
    
    <Route path="/hotel-dashboard" element={
      <ProtectedRoute allowedUserTypes={['gerente_hotel', 'hotel']}>
        <HotelDashboard />
      </ProtectedRoute>
    } />
    
    <Route path="/minha-conta" element={
      <ProtectedRoute allowedUserTypes={['cliente', 'admin', 'gerente_hotel', 'hotel', 'gerente_carro', 'gerente_salao']}>
        <ClientDashboard />
      </ProtectedRoute>
    } />
    
    {/* Content Views */}
    <Route path="/hotel/:id" element={<HotelView />} />
    <Route path="/carro/:id" element={<CarView />} />
    <Route path="/salao/:id" element={<SalonView />} />
    <Route path="/pacote/:id" element={<PackageView />} />
    <Route path="/ofertas" element={<OffersView />} />
    <Route path="/reservar" element={<ReservationFlow />} />
    
    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default App;
