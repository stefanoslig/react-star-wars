import { Movie } from '../models/Movie';
import './List.scss';
import ListItem from './ListItem';

interface ListProps {
  data: Movie[];
}

function List({ data }: ListProps) {
  if (!data.length) {
    return <div className="List-no-results">No results...</div>;
  }
  return (
    <div className="List">
      <ul>
        {data.map((movie) => (
          <ListItem key={movie.episode_id} movie={movie} />
        ))}
      </ul>
    </div>
  );
}

export default List;
