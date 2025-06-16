
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

export const Footer = () => {
  const footerSections = [
    {
      title: "Serviços",
      links: [
        { name: "Hotéis", href: "/hoteis" },
        { name: "Aluguel de Carros", href: "/carros" },
        { name: "Salões de Festas", href: "/saloes" },
        { name: "Pacotes Turísticos", href: "/pacotes" },
      ]
    },
    {
      title: "bemAki",
      links: [
        { name: "Prêmios bemAki", href: "/premios" },
        { name: "GTA - Guia Turístico", href: "/gta" },
        { name: "Sobre Nós", href: "/sobre" },
        { name: "Carreiras", href: "/carreiras" },
      ]
    },
    {
      title: "Suporte",
      links: [
        { name: "Central de Ajuda", href: "/ajuda" },
        { name: "Políticas", href: "/politicas" },
        { name: "Termos de Uso", href: "/termos" },
        { name: "Privacidade", href: "/privacidade" },
      ]
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <img 
              src="/lovable-uploads/16714d91-204d-4b5b-9d16-7ca44161258c.png" 
              alt="bemAki" 
              className="h-10 w-auto mb-6 brightness-0 invert"
            />
            <p className="text-gray-300 mb-6 leading-relaxed">
              A plataforma líder em turismo e eventos em Angola. 
              Conectamos você aos melhores hotéis, carros, salões e experiências únicas.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <MapPin className="h-5 w-5 mr-3 text-yellow-400" />
                <span>Luanda, Angola</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Phone className="h-5 w-5 mr-3 text-yellow-400" />
                <span>+244 xxx xxx xxx</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Mail className="h-5 w-5 mr-3 text-yellow-400" />
                <span>contato@bemaki.ao</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4 text-white">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href={link.href} 
                      className="text-gray-300 hover:text-yellow-400 transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Social Links */}
            <div className="flex space-x-4 mb-4 md:mb-0">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="p-2 bg-gray-800 rounded-full hover:bg-purple-600 transition-colors duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-gray-400">
                © 2024 bemAki. Todos os direitos reservados.
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Desenvolvido com ❤️ em Angola
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
