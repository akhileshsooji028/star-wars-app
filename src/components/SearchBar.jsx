import { useState } from 'react';

function SearchBar({ onSearch }) {
  const [term, setTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(term);
  };

  const handleClear = () => {
    setTerm('');
    onSearch('');
  };

  return (
    <div className="mb-6">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search characters..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="px-6 py-2 text-black border border-slate-300 rounded-lg hover:text-white hover:bg-blue-700 transition-colors duration-200"
        >
          Search
        </button>
        {term && (
            <button
            type="button"
            onClick={handleClear}
            className="px-6 py-2 text-black border border-slate-300 rounded-lg hover:text-white hover:bg-red-700 transition-colors duration-200"
            >
            Clear
            </button>
        )}
      </form>
    </div>
  );
}

export default SearchBar;