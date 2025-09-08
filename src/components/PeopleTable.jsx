import { useState, useEffect } from 'react';
import { fetchPeople, fetchPerson } from '../api';
import PropTypes from 'prop-types';

function PeopleTable({ page, searchTerm, onSelectPerson }) {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const tHeads = ['Name', 'Height', 'Mass', 'Hair Color', 'Eye Color', 'Skin Color', 'Actions'];

  useEffect(() => {
    setLoading(true);
    fetchPeople(page, searchTerm).then(data => {
      setPeople(data.results || []);
      setLoading(false);
    });
  }, [page, searchTerm]);

  const handleViewDetails = async (personUrl) => {
    const person = await fetchPerson(personUrl);
    onSelectPerson(person);
  };

  if (loading) {
    return (
      <div className="text-center mt-8">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (people.length === 0) {
    return (
      <div className="text-center text-lg mt-8">
        No characters found.
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto border-4 border-double border-black rounded-lg">
        <table className="min-w-full divide-y-4 divide-double divide-black">
          <thead className="bg-gray-100">
            <tr>
                {
                  tHeads.map((head) => (
                    <th key={head} className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider border-b-4 border-double border-black">
                      {head}
                    </th>
                  ))
                }
            </tr>
          </thead>
          <tbody className="divide-y-4 divide-double divide-black">
            {people.map((person) => (
              <tr key={person.name} className="bg-white hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{person.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{person.height} cm</td>
                <td className="px-6 py-4 whitespace-nowrap">{person.mass} kg</td>
                <td className="px-6 py-4 whitespace-nowrap">{person.hair_color}</td>
                <td className="px-6 py-4 whitespace-nowrap">{person.eye_color}</td>
                <td className="px-6 py-4 whitespace-nowrap">{person.skin_color}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleViewDetails(person.url)}
                    className="px-4 py-2 text-sm font-medium border-2 border-black rounded-md hover:bg-black hover:text-white transition-colors duration-200"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {people.map((person) => (
          <div key={person.name} className="bg-white border-4 border-double border-black rounded-lg p-4">
            <h3 className="text-lg font-bold mb-3">{person.name}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="font-semibold">Height:</span>
                <span>{person.height} cm</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Mass:</span>
                <span>{person.mass} kg</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Hair Color:</span>
                <span>{person.hair_color}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Eye Color:</span>
                <span>{person.eye_color}</span>
              </div>
            </div>
            <div className="mt-4">
              <button
                onClick={() => handleViewDetails(person.url)}
                className="w-full inline-flex justify-center items-center px-4 py-2 text-sm font-medium border-2 border-black rounded-md hover:bg-black hover:text-white transition-colors duration-200"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

PeopleTable.propTypes = {
    page: PropTypes.number.isRequired,
    searchTerm: PropTypes.string.isRequired,
    onSelectPerson: PropTypes.func.isRequired,
};

export default PeopleTable;