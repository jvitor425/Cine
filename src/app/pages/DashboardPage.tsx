import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { mockApi, Movie } from '../services/mockApi';
import { Film, Star, Calendar, TrendingUp } from 'lucide-react';

export function DashboardPage() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    mockApi.seedData();
    setMovies(mockApi.getMovies());
  }, []);

  const stats = {
    total: movies.length,
    avgRating: (movies.reduce((acc, m) => acc + m.rating, 0) / movies.length || 0).toFixed(1),
    latestYear: Math.max(...movies.map(m => m.year), 0),
    genres: new Set(movies.map(m => m.genre)).size
  };

  const genreData = Object.entries(
    movies.reduce((acc, m) => {
      acc[m.genre] = (acc[m.genre] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }));

  const yearData = Object.entries(
    movies.reduce((acc, m) => {
      const decade = Math.floor(m.year / 10) * 10;
      acc[decade] = (acc[decade] || 0) + 1;
      return acc;
    }, {} as Record<number, number>)
  ).map(([year, count]) => ({ year: `${year}s`, count })).sort((a, b) => parseInt(a.year) - parseInt(b.year));

  const ratingData = movies.slice(0, 10).map(m => ({
    title: m.title.length > 20 ? m.title.substring(0, 20) + '...' : m.title,
    rating: m.rating
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-3xl mb-2">Painel</h1>
        <p className="text-muted-foreground">Visão geral das análises da sua coleção de filmes</p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total de Filmes</p>
                <p className="text-3xl">{stats.total}</p>
              </div>
              <Film className="size-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avaliação Média</p>
                <p className="text-3xl">{stats.avgRating}</p>
              </div>
              <Star className="size-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Ano Mais Recente</p>
                <p className="text-3xl">{stats.latestYear}</p>
              </div>
              <Calendar className="size-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Gêneros</p>
                <p className="text-3xl">{stats.genres}</p>
              </div>
              <TrendingUp className="size-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Filmes por Gênero</CardTitle>
            <CardDescription>Distribuição de filmes entre diferentes gêneros</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={genreData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {genreData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Filmes por Década</CardTitle>
            <CardDescription>Número de filmes lançados por década</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={yearData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" name="Quantidade" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Top 10 Filmes por Avaliação</CardTitle>
            <CardDescription>Filmes com maior avaliação na coleção</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={ratingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="title" angle={-45} textAnchor="end" height={100} />
                <YAxis domain={[7, 10]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="rating" stroke="#8884d8" strokeWidth={2} name="Avaliação" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
