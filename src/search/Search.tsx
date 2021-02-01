import './Search.scss';
import logo from '../assets/star-wars.png';
import SearchInput from './SearchInput';
import List from '../common/List';
import { Movie } from '../models/Movie';
import { useEffect, useState } from 'react';
import { fetchWrapper } from '../api/Api';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import Characters from '../characters/Characters';
import Panel from '../common/Panel';

function Search() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  let history = useHistory();
  let { path } = useRouteMatch();

  useEffect(() => {
    const search = async () => {
      setIsLoading(true);
      const movies = await fetchWrapper.get<Movie[]>('films/', {
        search: query,
      });
      setIsLoading(false);
      setMovies(movies);
    };

    if (!!query) {
      search();
    } else {
      setMovies([]);
    }
  }, [query]);

  return (
    <div className="Search-container">
      <div className="Search">
        <span className="Search-title">Star Wars Movies Search</span>
        <img src={logo} alt="Logo" />
        <SearchInput
          isLoading={isLoading}
          query={query}
          onHandleInputChange={(e) => setQuery(e.target.value)}
        />
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
