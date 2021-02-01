import './Characters.scss';
import Header from '../common/Header';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Movie } from '../models/Movie';
import { fetchWrapper } from '../api/Api';
import { Character } from '../models/Character';
import { splitCharactersUrls } from './utils';

function Characters() {
  let { filmId } = useParams<{ filmId: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getMovie = async () => {
      const movie = await fetchWrapper.get<Movie>(`films/${filmId}/`);
      setMovie(movie);
      getCharacters(movie.characters);
    };
    const getCharacters = async (characterUrls: string[]) => {
      setIsLoading(true);
      const characters = await fetchWrapper.getAll<Character[]>(
        splitCharactersUrls(characterUrls)
      );
      setIsLoading(false);
      setCharacters(characters);
    };

    if (!!filmId) {
      getMovie();
    }
  }, [filmId]);
  return (
    <div>
      <Header
        title={`Characters - ${
          isLoading ? 'Loading...' : movie ? movie.title : ''
        }`}
      />
      <ul>
        {characters &&
          characters.map((character) => (
            <li className="ListItem" key={character.url}>
              <span className="ListItem-card-item">{character.name}</span>
              <span className="ListItem-card-item">{`Birth year: ${character.birth_year}`}</span>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Characters;
