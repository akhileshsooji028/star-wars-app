function PersonDetails({ person, onBack }) {
  if (!person) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Character not found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 mt-40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg border-4 border-double border-gray-400 overflow-hidden">
          <div className="bg-gray-100 px-6 py-4 border-b-4 border-double border-gray-400">
            <h1 className="text-3xl font-bold text-gray-900">{person.name}</h1>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="border-b-2 border-double border-gray-300 pb-2">
                  <span className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Physical Attributes</span>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Height:</span>
                    <span className="text-gray-900">{person.height} cm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Mass:</span>
                    <span className="text-gray-900">{person.mass} kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Hair Color:</span>
                    <span className="text-gray-900">{person.hair_color}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Eye Color:</span>
                    <span className="text-gray-900">{person.eye_color}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Skin Color:</span>
                    <span className="text-gray-900">{person.skin_color}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Gender:</span>
                    <span className="text-gray-900">{person.gender}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="border-b-2 border-double border-gray-300 pb-2">
                  <span className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Other Information</span>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Birth Year:</span>
                    <span className="text-gray-900">{person.birth_year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Homeworld:</span>
                    <span className="text-gray-900">Available via API</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Films:</span>
                    <span className="text-gray-900">{person.films?.length || 0} films</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Species:</span>
                    <span className="text-gray-900">{person.species?.length || 0} species</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Vehicles:</span>
                    <span className="text-gray-900">{person.vehicles?.length || 0} vehicles</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Starships:</span>
                    <span className="text-gray-900">{person.starships?.length || 0} starships</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-100 px-6 py-4 border-t-4 border-double border-gray-400">
            <button
              onClick={onBack}
              className="inline-flex items-center px-4 py-2 border border-slate-300 text-black text-sm font-medium rounded-md hover:text-white hover:bg-orange-500 transition-colors duration-200"
            >
              ← Back to Characters List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonDetails;