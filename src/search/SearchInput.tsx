import './SearchInput.scss';

interface SearchProps {
  isLoading: boolean;
  query: string;
  onHandleInputChange: (query: React.ChangeEvent<HTMLInputElement>) => void;
}

function SearchInput({ isLoading, query, onHandleInputChange }: SearchProps) {
  return (
    <div className="SearchInput">
      <input
        type="search"
        className="SearchInput-input"
        placeholder="Search query"
        value={query}
        onChange={onHandleInputChange}
      />
      <span className="Search-icon"></span>
      {isLoading ? <div className="Search-loader"></div> : null}
    </div>
  );
}

export default SearchInput;
