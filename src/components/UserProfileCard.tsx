import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function UserProfileCard() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    sobrenome: "",
    telefone: "",
    dataNascimento: "",
    cpf: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, getUserProfile, updateUserProfile } = useAuth();
  const { toast } = useToast();

  const fetchUserProfile = useCallback(async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      const { data, error } = await getUserProfile();
      
      if (error) {
        console.error("Erro ao carregar perfil:", error);
        setError("Erro ao carregar dados do perfil");
        return;
      }
      
      if (data) {
        setFormData({
          nome: data.nome || "",
          sobrenome: data.sobrenome || "",
          telefone: data.telefone || "",
          dataNascimento: data.data_nascimento || "",
          cpf: data.cpf || "",
        });
      }
    } catch (err) {
      console.error("Exceção ao carregar perfil:", err);
      setError("Erro ao carregar dados do perfil");
    } finally {
      setIsLoading(false);
    }
  }, [user, getUserProfile]);

  useEffect(() => {
    if (user) {
      fetchUserProfile();
    }
  }, [user, fetchUserProfile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const userData = {
        nome: formData.nome,
        sobrenome: formData.sobrenome,
        telefone: formData.telefone,
        data_nascimento: formData.dataNascimento,
        cpf: formData.cpf,
      };

      const { data, error } = await updateUserProfile(userData);

      if (error) {
        if (typeof error === 'object' && error !== null && 'message' in error) {
          setError(error.message as string);
        } else {
          setError("Erro ao atualizar perfil. Tente novamente.");
        }
      } else {
        toast({
          title: "Perfil atualizado com sucesso!",
          description: "Seus dados foram atualizados.",
        });
        setIsEditing(false);
      }
    } catch (err) {
      setError("Ocorreu um erro inesperado. Tente novamente mais tarde.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <Card>
        <CardContent className="py-10">
          <p className="text-center">Você precisa estar logado para ver seu perfil.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Perfil do Usuário</CardTitle>
        <CardDescription>
          Visualize e edite suas informações pessoais.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="info">
          <TabsList className="mb-4">
            <TabsTrigger value="info">Informações</TabsTrigger>
            <TabsTrigger value="security">Segurança</TabsTrigger>
          </TabsList>
          
          <TabsContent value="info">
            {isLoading ? (
              <div className="py-10 text-center">Carregando...</div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                <div className="space-y-1">
                  <Label>Email</Label>
                  <div className="p-2 border rounded-md bg-muted">
                    {user.email}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome</Label>
                    <Input
                      id="nome"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      disabled={!isEditing}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sobrenome">Sobrenome</Label>
                    <Input
                      id="sobrenome"
                      name="sobrenome"
                      value={formData.sobrenome}
                      onChange={handleChange}
                      disabled={!isEditing}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input
                    id="telefone"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dataNascimento">Data de Nascimento</Label>
                    <Input
                      id="dataNascimento"
                      name="dataNascimento"
                      type="date"
                      value={formData.dataNascimento}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cpf">CPF/BI</Label>
                    <Input
                      id="cpf"
                      name="cpf"
                      value={formData.cpf}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2 pt-4">
                  {isEditing ? (
                    <>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setIsEditing(false)}
                      >
                        Cancelar
                      </Button>
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Salvando..." : "Salvar"}
                      </Button>
                    </>
                  ) : (
                    <Button 
                      type="button" 
                      onClick={() => setIsEditing(true)}
                    >
                      Editar Perfil
                    </Button>
                  )}
                </div>
              </form>
            )}
          </TabsContent>
          
          <TabsContent value="security">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Alterar Senha</h3>
                <p className="text-sm text-muted-foreground">
                  Para alterar sua senha, clique no botão abaixo para receber um email de redefinição.
                </p>
                <Button>Enviar Email de Redefinição</Button>
              </div>
              
              <div className="space-y-2 pt-4">
                <h3 className="text-lg font-medium">Excluir Conta</h3>
                <p className="text-sm text-muted-foreground">
                  Ao excluir sua conta, todos os seus dados serão removidos permanentemente.
                </p>
                <Button variant="destructive">Excluir Conta</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
} 