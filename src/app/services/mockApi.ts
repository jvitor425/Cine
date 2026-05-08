export interface Movie {
  id: string;
  title: string;
  director: string;
  year: number;
  genre: string;
  rating: number;
  createdAt: string;
}

const STORAGE_KEY = 'movies_data';

export const mockApi = {
  getMovies: (): Movie[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  getMovie: (id: string): Movie | undefined => {
    const movies = mockApi.getMovies();
    return movies.find(m => m.id === id);
  },

  createMovie: (movie: Omit<Movie, 'id' | 'createdAt'>): Movie => {
    const movies = mockApi.getMovies();
    const newMovie: Movie = {
      ...movie,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    movies.push(newMovie);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
    return newMovie;
  },

  updateMovie: (id: string, updates: Partial<Movie>): Movie => {
    const movies = mockApi.getMovies();
    const index = movies.findIndex(m => m.id === id);

    if (index === -1) {
      throw new Error('Filme não encontrado');
    }

    movies[index] = { ...movies[index], ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
    return movies[index];
  },

  deleteMovie: (id: string): void => {
    const movies = mockApi.getMovies();
    const filtered = movies.filter(m => m.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  },

  seedData: () => {
    const existing = mockApi.getMovies();
    if (existing.length === 0) {
      const sampleMovies: Omit<Movie, 'id' | 'createdAt'>[] = [
        { title: 'The Shawshank Redemption', director: 'Frank Darabont', year: 1994, genre: 'Drama', rating: 9.3 },
        { title: 'The Godfather', director: 'Francis Ford Coppola', year: 1972, genre: 'Crime', rating: 9.2 },
        { title: 'The Dark Knight', director: 'Christopher Nolan', year: 2008, genre: 'Action', rating: 9.0 },
        { title: 'Pulp Fiction', director: 'Quentin Tarantino', year: 1994, genre: 'Crime', rating: 8.9 },
        { title: 'Forrest Gump', director: 'Robert Zemeckis', year: 1994, genre: 'Drama', rating: 8.8 },
        { title: 'Inception', director: 'Christopher Nolan', year: 2010, genre: 'Sci-Fi', rating: 8.8 },
        { title: 'The Matrix', director: 'Lana Wachowski', year: 1999, genre: 'Sci-Fi', rating: 8.7 },
        { title: 'Interstellar', director: 'Christopher Nolan', year: 2014, genre: 'Sci-Fi', rating: 8.6 },
        { title: 'Gladiator', director: 'Ridley Scott', year: 2000, genre: 'Action', rating: 8.5 },
        { title: 'The Departed', director: 'Martin Scorsese', year: 2006, genre: 'Crime', rating: 8.5 },
        { title: 'The Prestige', director: 'Christopher Nolan', year: 2006, genre: 'Mystery', rating: 8.5 },
        { title: 'The Lion King', director: 'Roger Allers', year: 1994, genre: 'Animation', rating: 8.5 },
        { title: 'Saving Private Ryan', director: 'Steven Spielberg', year: 1998, genre: 'War', rating: 8.6 },
        { title: 'The Green Mile', director: 'Frank Darabont', year: 1999, genre: 'Drama', rating: 8.6 },
        { title: 'Parasite', director: 'Bong Joon Ho', year: 2019, genre: 'Thriller', rating: 8.6 },
      ];

      sampleMovies.forEach(movie => mockApi.createMovie(movie));
    }
  }
};
