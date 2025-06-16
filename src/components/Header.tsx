import { useState } from "react";
import { Menu, X, MapPin, Calendar, Car, Building, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { LoginModal } from "@/components/LoginModal";
import { RegisterModal } from "@/components/RegisterModal";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const navigationItems = [
    { name: "Hotéis", href: "/hoteis", icon: Building },
    { name: "Carros", href: "/carros", icon: Car },
    { name: "Salões", href: "/saloes", icon: Calendar },
    { name: "Pacotes", href: "/pacotes", icon: MapPin },
    { name: "Sobre", href: "/sobre", icon: null },
  ];

  const handleReserveClick = () => {
    if (user) {
      navigate("/reservar");
    } else {
      setIsLoginModalOpen(true);
    }
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <NavLink to="/" className="flex-shrink-0">
              <img 
                src="/lovable-uploads/16714d91-204d-4b5b-9d16-7ca44161258c.png" 
                alt="bemAki" 
                className="h-10 w-auto"
              />
            </NavLink>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    `flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? "text-purple-600 bg-purple-50"
                        : "text-gray-700 hover:text-purple-600 hover:bg-gray-50"
                    }`
                  }
                >
                  {item.icon && <item.icon className="h-4 w-4" />}
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </nav>

            {/* CTA Button and Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Button 
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-semibold"
                onClick={handleReserveClick}
              >
                Reservar Agora
              </Button>
              
              {!user && (
                <>
                  <Button 
                    variant="outline" 
                    className="border-purple-200 text-purple-700"
                    onClick={() => setIsLoginModalOpen(true)}
                  >
                    <LogIn className="mr-2 h-4 w-4" />
                    Entrar
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="text-purple-700"
                    onClick={() => setIsRegisterModalOpen(true)}
                  >
                    <UserPlus className="mr-2 h-4 w-4" />
                    Cadastrar
                  </Button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-purple-600 p-2"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <nav className="flex flex-col space-y-2">
                {navigationItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium transition-colors duration-200 ${
                        isActive
                          ? "text-purple-600 bg-purple-50"
                          : "text-gray-700 hover:text-purple-600 hover:bg-gray-50"
                      }`
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.icon && <item.icon className="h-5 w-5" />}
                    <span>{item.name}</span>
                  </NavLink>
                ))}
                
                <div className="pt-4 space-y-2">
                  <Button 
                    className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-semibold"
                    onClick={handleReserveClick}
                  >
                    Reservar Agora
                  </Button>
                  
                  {!user && (
                    <>
                      <Button 
                        variant="outline" 
                        className="w-full border-purple-200 text-purple-700"
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsLoginModalOpen(true);
                        }}
                      >
                        <LogIn className="mr-2 h-4 w-4" />
                        Entrar
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="w-full text-purple-700"
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsRegisterModalOpen(true);
                        }}
                      >
                        <UserPlus className="mr-2 h-4 w-4" />
                        Cadastrar
                      </Button>
                    </>
                  )}
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

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
