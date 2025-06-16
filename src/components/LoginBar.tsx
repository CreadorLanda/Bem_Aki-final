import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LoginModal } from "@/components/LoginModal";
import { RegisterModal } from "@/components/RegisterModal";
import { Facebook, Instagram, Twitter, Phone, Mail, User, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const LoginBar = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const getInitials = () => {
    if (!user?.user_metadata?.nome) return "U";
    return `${user.user_metadata.nome.charAt(0)}${user.user_metadata.sobrenome ? user.user_metadata.sobrenome.charAt(0) : ""}`;
  };

  return (
    <>
      <div className="bg-purple-600 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-3 lg:space-y-0">
            {/* Contact Info */}
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-white">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+244 923 456 789</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span className="text-sm">info@bemaki.ao</span>
              </div>
            </div>

            {/* Social Media & Auth */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <a href="#" className="text-white hover:text-yellow-300 transition-colors p-1 rounded-full hover:bg-white/10">
                  <Facebook className="h-4 w-4" />
                </a>
                <a href="#" className="text-white hover:text-yellow-300 transition-colors p-1 rounded-full hover:bg-white/10">
                  <Instagram className="h-4 w-4" />
                </a>
                <a href="#" className="text-white hover:text-yellow-300 transition-colors p-1 rounded-full hover:bg-white/10">
                  <Twitter className="h-4 w-4" />
                </a>
              </div>
              
              {/* Login/Register Links or User Profile */}
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8 bg-yellow-400 text-purple-800">
                        <AvatarFallback>{getInitials()}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex flex-col space-y-1 p-2">
                      <p className="text-sm font-medium">{user.user_metadata?.nome || user.email}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate("/minha-conta")}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Meu Perfil</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sair</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center space-x-4 text-sm">
                  <button 
                    onClick={() => setIsLoginModalOpen(true)}
                    className="text-white hover:text-yellow-300 transition-colors underline-offset-4 hover:underline"
                  >
                    Entrar
                  </button>
                  <span className="text-white/50">|</span>
                  <button 
                    onClick={() => setIsRegisterModalOpen(true)}
                    className="text-white hover:text-yellow-300 transition-colors underline-offset-4 hover:underline"
                  >
                    Cadastrar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
      <RegisterModal 
        isOpen={isRegisterModalOpen} 
        onClose={() => setIsRegisterModalOpen(false)} 
      />
    </>
  );
};
