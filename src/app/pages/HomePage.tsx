import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { Film, BarChart3, Database } from 'lucide-react';

export function HomePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-5xl tracking-tight">Bem-vindo ao CineApp</h1>
          <p className="text-xl text-muted-foreground">
            Sua plataforma completa de gerenciamento de filmes com autenticação, analytics e operações CRUD
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <Film className="size-12 mb-4" />
              <CardTitle>Base de Filmes</CardTitle>
              <CardDescription>
                Gerencie sua coleção completa de filmes com operações CRUD completas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/crud">
                <Button className="w-full">Explorar Filmes</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <BarChart3 className="size-12 mb-4" />
              <CardTitle>Painel de Analytics</CardTitle>
              <CardDescription>
                Veja insights e estatísticas sobre sua coleção de filmes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/dashboard">
                <Button className="w-full">Ver Painel</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Database className="size-12 mb-4" />
              <CardTitle>Acesso Seguro</CardTitle>
              <CardDescription>
                Autenticação baseada em JWT para proteger seus dados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/login">
                <Button className="w-full" variant="outline">Entrar</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="border-t pt-8 space-y-4">
          <h2 className="text-2xl">Funcionalidades</h2>
          <ul className="grid md:grid-cols-2 gap-4">
            <li className="flex items-start gap-2">
              <span className="size-2 rounded-full bg-primary mt-2" />
              <span>Operações CRUD completas para filmes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="size-2 rounded-full bg-primary mt-2" />
              <span>Filtragem avançada por nome e data</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="size-2 rounded-full bg-primary mt-2" />
              <span>Paginação com itens customizáveis por página</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="size-2 rounded-full bg-primary mt-2" />
              <span>Dashboard interativo com gráficos</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="size-2 rounded-full bg-primary mt-2" />
              <span>Autenticação JWT e rotas protegidas</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="size-2 rounded-full bg-primary mt-2" />
              <span>Construído com princípios de Atomic Design</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
