import { Link, useNavigate } from 'react-router';
import { Button } from '../ui/button';
import { Logo } from '../atoms/Logo';
import { useAuth } from '../../contexts/AuthContext';
import { LogOut } from 'lucide-react';

export function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="border-b bg-background">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Logo />
          </Link>

          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost">Início</Button>
            </Link>

            {isAuthenticated ? (
              <>
                <Link to="/dashboard">
                  <Button variant="ghost">Painel</Button>
                </Link>
                <Link to="/crud">
                  <Button variant="ghost">Filmes</Button>
                </Link>
                <div className="flex items-center gap-2">
                  <span className="text-sm">Bem-vindo, {user?.name}</span>
                  <Button variant="outline" size="icon" onClick={handleLogout}>
                    <LogOut className="size-4" />
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Entrar</Button>
                </Link>
                <Link to="/register">
                  <Button>Cadastrar</Button>
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
