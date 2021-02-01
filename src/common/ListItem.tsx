import { Movie } from '../models/Movie';
import './ListItem.scss';
import { Link } from 'react-router-dom';

interface ListItemProps {
  movie: Movie;
}

function ListItem({ movie }: ListItemProps) {
  return (
    <li className="ListItem">
      <span className="ListItem-card-item">{movie.title}</span>
      <span className="ListItem-card-item">{movie.director}</span>
      <span className="ListItem-card-item">{movie.release_date}</span>
      <Link to={`/search/${movie.episode_id}/people`}>Characters</Link>
    </li>
  );
}

export default ListItem;
