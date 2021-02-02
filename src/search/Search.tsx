import './Search.scss';
import logo from '../assets/star-wars.png';
import SearchInput from './SearchInput';
import List from '../common/List';
import { Movie } from '../models/Movie';
import { useEffect, useState } from 'react';
import { fetchWrapper } from '../api/Api';
import {
  Route,
  Switch,
  useHistory,
  useLocation,
  useRouteMatch,
} from 'react-router-dom';
import Characters from '../characters/Characters';
import Panel from '../common/Panel';
import { useQueryAsState } from 'use-route-as-state';

function Search() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [{ search }, updateQueryParams] = useQueryAsState();
  let history = useHistory();
  let { path } = useRouteMatch();

  useEffect(() => {
    const searchRequest = async () => {
      setIsLoading(true);
      const movies = await fetchWrapper.get<Movie[]>('films/', {
        search: search,
      });
      setIsLoading(false);
      setMovies(movies);
    };

    if (!!search) {
      searchRequest();
    } else {
      setMovies([]);
    }
  }, [search]);

  return (
    <div className="Search-container">
      <div className="Search">
        <span className="Search-title">Star Wars Movies Search</span>
        <img src={logo} alt="Logo" />
        <SearchInput
          isLoading={isLoading}
          query={search}
          onHandleInputChange={(e) =>
            updateQueryParams({ search: e.target.value })
          }
        />
        <button
          className="Search-copy-url"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
          }}
        >
          Copy search to clipboard
        </button>
      </div>
      <List data={movies} />
      <Switch>
        <Route path={`${path}/:filmId/people`}>
          <Panel isOpen={true} backdropClicked={(e) => history.push(path)}>
            <Characters />
          </Panel>
        </Route>
      </Switch>
    </div>
  );
}

export default Search;
