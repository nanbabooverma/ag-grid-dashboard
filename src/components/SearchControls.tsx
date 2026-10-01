import { Search, X } from "react-feather";

interface SearchControlsprops {
  value: string;
  onChange: (value: string) => void;
  onReset: () => void;
}

const SearchControls = ({ value, onChange, onReset }: SearchControlsprops) => {
  return (
    <div className="table-actions">
      <div className="search-box">
        <span className="search-icon">
          <Search size={18} color="#929baa" width={18} />
        </span>

        <input
          type="text"
          placeholder="Search records..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />

        {value && (
          <button className="clear-search" onClick={onReset}>
            <X size={18} />
          </button>
        )}
      </div>

      <button className="filter-button" onClick={onReset}>
        Reset
      </button>
    </div>
  );
};

export default SearchControls;
