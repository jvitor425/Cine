import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card';
import { Button } from '../ui/button';
import { FormField } from '../molecules/FormField';
import { useAuth } from '../../contexts/AuthContext';

interface AuthFormProps {
  type: 'login' | 'register';
  onSubmit: (data: any) => Promise<void>;
  onToggle: () => void;
}

export function AuthForm({ type, onSubmit, onToggle }: AuthFormProps) {
  const { resetPassword } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const isRegister = type === 'register';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
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

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    try {
      await resetPassword(resetEmail);
      setSuccessMsg('E-mail de recuperação enviado! Verifique sua caixa de entrada.');
      setShowReset(false);
      setResetEmail('');
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro');
    } finally {
      setLoading(false);
    }
  };

  if (showReset) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Recuperar Senha</CardTitle>
          <CardDescription>
            Informe seu e-mail para receber as instruções de recuperação
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleResetPassword}>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">
                {error}
              </div>
            )}
            {successMsg && (
              <div className="p-3 rounded-md bg-green-500/10 text-green-600 text-sm">
                {successMsg}
              </div>
            )}
            <FormField
              label="E-mail"
              type="email"
              value={resetEmail}
              onChange={setResetEmail}
              required
            />
          </CardContent>

          <CardFooter className="flex-col gap-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar E-mail de Recuperação'}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => { setShowReset(false); setError(''); setSuccessMsg(''); }}
              className="w-full"
            >
              Voltar ao Login
            </Button>
          </CardFooter>
        </form>
      </Card>
    );
  }

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

          {!isRegister && (
            <div className="text-right">
              <button
                type="button"
                onClick={() => { setShowReset(true); setError(''); }}
                className="text-sm text-muted-foreground hover:text-primary underline-offset-4 hover:underline"
              >
                Esqueci minha senha
              </button>
            </div>
          )}
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
