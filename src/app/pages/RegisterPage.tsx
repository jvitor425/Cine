import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { AuthForm } from '../components/organisms/AuthForm';

export function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleRegister = async ({ name, email, password }: { name: string; email: string; password: string }) => {
    await register(name, email, password);
    navigate('/dashboard');
  };

  const handleToggle = () => {
    navigate('/login');
  };

  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[80vh]">
      <AuthForm type="register" onSubmit={handleRegister} onToggle={handleToggle} />
    </div>
  );
}
