import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card';
import { Button } from '../ui/button';
import { FormField } from '../molecules/FormField';

interface AuthFormProps {
  type: 'login' | 'register';
  onSubmit: (data: any) => Promise<void>;
  onToggle: () => void;
}

export function AuthForm({ type, onSubmit, onToggle }: AuthFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isRegister = type === 'register';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegister) {
        await onSubmit({ name, email, password });
      } else {
        await onSubmit({ email, password });
      }
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{isRegister ? 'Criar Conta' : 'Bem-vindo de Volta'}</CardTitle>
        <CardDescription>
          {isRegister
            ? 'Digite seus dados para criar uma conta'
            : 'Digite suas credenciais para acessar sua conta'}
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">
              {error}
            </div>
          )}

          {isRegister && (
            <FormField
              label="Nome"
              value={name}
              onChange={setName}
              required
            />
          )}

          <FormField
            label="E-mail"
            type="email"
            value={email}
            onChange={setEmail}
            required
          />

          <FormField
            label="Senha"
            type="password"
            value={password}
            onChange={setPassword}
            required
          />
        </CardContent>

        <CardFooter className="flex-col gap-4">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Carregando...' : isRegister ? 'Cadastrar' : 'Entrar'}
          </Button>

          <Button type="button" variant="ghost" onClick={onToggle} className="w-full">
            {isRegister
              ? 'Já tem uma conta? Entre'
              : 'Não tem uma conta? Cadastre-se'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
