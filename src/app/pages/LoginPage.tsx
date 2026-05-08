import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { AuthForm } from '../components/organisms/AuthForm';

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async ({ email, password }: { email: string; password: string }) => {
    await login(email, password);
    navigate('/dashboard');
  };

  const handleToggle = () => {
    navigate('/register');
  };

  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[80vh]">
      <AuthForm type="login" onSubmit={handleLogin} onToggle={handleToggle} />
    </div>
  );
}
