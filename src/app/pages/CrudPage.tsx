import { useState, useEffect, useMemo } from 'react';
import { Button } from '../components/ui/button';
import { SearchFilter } from '../components/molecules/SearchFilter';
import { PaginationControl } from '../components/molecules/PaginationControl';
import { MovieCard } from '../components/organisms/MovieCard';
import { MovieDialog } from '../components/organisms/MovieDialog';
import { DeleteDialog } from '../components/organisms/DeleteDialog';
import { mockApi, Movie } from '../services/mockApi';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

type DialogMode = 'create' | 'edit' | 'view';

export function CrudPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState<'all' | 'newest' | 'oldest'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<DialogMode>('create');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [movieToDelete, setMovieToDelete] = useState<Movie | null>(null);

  useEffect(() => {
    mockApi.seedData();
    loadMovies();
  }, []);

  const loadMovies = () => {
    setMovies(mockApi.getMovies());
  };

  const filteredAndSortedMovies = useMemo(() => {
    let filtered = movies.filter(movie =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.director.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.genre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (dateFilter === 'newest') {
      filtered = [...filtered].sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (dateFilter === 'oldest') {
      filtered = [...filtered].sort((a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    }

    return filtered;
  }, [movies, searchTerm, dateFilter]);

  const totalPages = Math.ceil(filteredAndSortedMovies.length / itemsPerPage);
  const paginatedMovies = filteredAndSortedMovies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCreate = () => {
    setSelectedMovie(null);
    setDialogMode('create');
    setDialogOpen(true);
  };

  const handleView = (id: string) => {
    const movie = movies.find(m => m.id === id);
    if (movie) {
      setSelectedMovie(movie);
      setDialogMode('view');
      setDialogOpen(true);
    }
  };

  const handleEdit = (id: string) => {
    const movie = movies.find(m => m.id === id);
    if (movie) {
      setSelectedMovie(movie);
      setDialogMode('edit');
      setDialogOpen(true);
    }
  };

  const handleDeleteClick = (id: string) => {
    const movie = movies.find(m => m.id === id);
    if (movie) {
      setMovieToDelete(movie);
      setDeleteDialogOpen(true);
    }
  };

  const handleDeleteConfirm = () => {
    if (movieToDelete) {
      mockApi.deleteMovie(movieToDelete.id);
      loadMovies();
      toast.success(`"${movieToDelete.title}" foi excluído`);
      setDeleteDialogOpen(false);
      setMovieToDelete(null);
    }
  };

  const handleSave = (data: Omit<Movie, 'id' | 'createdAt'>) => {
    try {
      if (dialogMode === 'create') {
        mockApi.createMovie(data);
        toast.success('Filme criado com sucesso');
      } else if (dialogMode === 'edit' && selectedMovie) {
        mockApi.updateMovie(selectedMovie.id, data);
        toast.success('Filme atualizado com sucesso');
      }
      loadMovies();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">Coleção de Filmes</h1>
          <p className="text-muted-foreground">Gerencie seu banco de dados completo de filmes</p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="size-4" />
          Adicionar Filme
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <SearchFilter
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Buscar por título, diretor ou gênero..."
          />
        </div>
        <div className="w-full md:w-48">
          <Select value={dateFilter} onValueChange={(v: any) => setDateFilter(v)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as Datas</SelectItem>
              <SelectItem value="newest">Mais Recentes</SelectItem>
              <SelectItem value="oldest">Mais Antigos</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        Mostrando {paginatedMovies.length} de {filteredAndSortedMovies.length} filmes
      </div>

      {paginatedMovies.length === 0 ? (
        <div className="text-center py-16 space-y-4">
          <p className="text-xl text-muted-foreground">Nenhum filme encontrado</p>
          <Button onClick={handleCreate}>
            <Plus className="size-4" />
            Adicione Seu Primeiro Filme
          </Button>
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedMovies.map(movie => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <PaginationControl
              currentPage={currentPage}
              totalPages={totalPages}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          )}
        </>
      )}

      <MovieDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        movie={selectedMovie}
        onSave={handleSave}
        mode={dialogMode}
      />

      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        itemName={movieToDelete?.title || ''}
      />
    </div>
  );
}
