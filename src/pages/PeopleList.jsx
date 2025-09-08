import { useState, useEffect, useCallback, useMemo } from 'react';
import { fetchPeople } from '../api';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import PeopleTable from '../components/PeopleTable'; // New import

function PeopleList({ onSelectPerson }) {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [totalPages, setTotalPages] = useState(1);

  // Use a separate useEffect to handle fetching total pages only when the search term changes.
  // This prevents unnecessary API calls when just paginating.
  useEffect(() => {
    fetchPeople(1, searchTerm).then(data => {
      setTotalPages(Math.ceil(data.count / 10));
    });
  }, [searchTerm]);

  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
    setPage(1); // Reset to the first page on a new search
  }, []);

  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
  }, []);

  const headerElement = useMemo(() => (
    <h1 className="text-4xl font-bold underline text-center mb-8">
      Star Wars Characters
    </h1>
  ), []);

  return (
    <div className="min-h-screen py-8 bg-white text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {headerElement}
        <SearchBar onSearch={handleSearch} />
        <PeopleTable page={page} searchTerm={searchTerm} onSelectPerson={onSelectPerson} />
        <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </div>
  );
}

export default PeopleList;