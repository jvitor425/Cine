import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card';
import { Button } from '../ui/button';
import { Movie } from '../../services/mockApi';
import { Edit, Trash2, Eye } from 'lucide-react';

interface MovieCardProps {
  movie: Movie;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function MovieCard({ movie, onView, onEdit, onDelete }: MovieCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="line-clamp-1">{movie.title}</CardTitle>
        <CardDescription>Dirigido por {movie.director}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Ano:</span>
          <span>{movie.year}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Gênero:</span>
          <span>{movie.genre}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Avaliação:</span>
          <span>{movie.rating}/10</span>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => onView(movie.id)} className="flex-1">
          <Eye className="size-4" />
          Ver
        </Button>
        <Button variant="outline" size="sm" onClick={() => onEdit(movie.id)} className="flex-1">
          <Edit className="size-4" />
          Editar
        </Button>
        <Button variant="destructive" size="sm" onClick={() => onDelete(movie.id)}>
          <Trash2 className="size-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
