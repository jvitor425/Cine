import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { FormField } from '../molecules/FormField';
import { Movie } from '../../services/mockApi';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

interface MovieDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  movie?: Movie | null;
  onSave: (data: Omit<Movie, 'id' | 'createdAt'>) => void;
  mode: 'create' | 'edit' | 'view';
}

export function MovieDialog({ open, onOpenChange, movie, onSave, mode }: MovieDialogProps) {
  const [title, setTitle] = useState('');
  const [director, setDirector] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState('');

  useEffect(() => {
    if (movie) {
      setTitle(movie.title);
      setDirector(movie.director);
      setYear(movie.year.toString());
      setGenre(movie.genre);
      setRating(movie.rating.toString());
    } else {
      setTitle('');
      setDirector('');
      setYear('');
      setGenre('');
      setRating('');
    }
  }, [movie, open]);

  const handleSave = () => {
    onSave({
      title,
      director,
      year: parseInt(year),
      genre,
      rating: parseFloat(rating)
    });
    onOpenChange(false);
  };

  const isViewMode = mode === 'view';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Criar Filme' : mode === 'edit' ? 'Editar Filme' : 'Detalhes do Filme'}
          </DialogTitle>
          {isViewMode && <DialogDescription>Visualizar informações do filme</DialogDescription>}
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Título</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isViewMode}
            />
          </div>

          <div className="space-y-2">
            <Label>Diretor</Label>
            <Input
              value={director}
              onChange={(e) => setDirector(e.target.value)}
              disabled={isViewMode}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Ano</Label>
              <Input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                disabled={isViewMode}
              />
            </div>

            <div className="space-y-2">
              <Label>Avaliação</Label>
              <Input
                type="number"
                step="0.1"
                min="0"
                max="10"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                disabled={isViewMode}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Gênero</Label>
            <Input
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              disabled={isViewMode}
            />
          </div>

          {movie && isViewMode && (
            <div className="space-y-2">
              <Label>Criado em</Label>
              <Input
                value={new Date(movie.createdAt).toLocaleString('pt-BR')}
                disabled
              />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {isViewMode ? 'Fechar' : 'Cancelar'}
          </Button>
          {!isViewMode && (
            <Button onClick={handleSave}>
              {mode === 'create' ? 'Criar' : 'Salvar Alterações'}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
