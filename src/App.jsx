import { useState } from 'react';
import PeopleList from './pages/PeopleList';
import PersonDetails from './pages/PersonDetails';

function App() {
  const [currentView, setCurrentView] = useState('list');
  const [selectedPerson, setSelectedPerson] = useState(null);

  const handleSelectPerson = (person) => {
    setSelectedPerson(person);
    setCurrentView('details');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedPerson(null);
  };

  return (
    <div>
      {currentView === 'list' ? (
        <PeopleList onSelectPerson={handleSelectPerson} />
      ) : (
        <PersonDetails person={selectedPerson} onBack={handleBackToList} />
      )}
    </div>
  );
}

export default App;
