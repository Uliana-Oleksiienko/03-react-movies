import type { Movie } from "../../types/movie";
import css from "./MovieGrid.module.css";

interface MoviesGridProps {
  onSelect: (movie: Movie) => void;
  movies: Movie[];
}

export default function MovieGrid({ movies, onSelect }: MoviesGridProps) {
  return (
    <ul className={css.grid}>
      {movies.map((item) => (
        <li key={item.id} onClick={() => onSelect(item)}>
          <div className={css.card}>
            <img
              className={css.image}
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt={item.title}
              loading="lazy"
            />
            <h2 className={css.title}>{item.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
}