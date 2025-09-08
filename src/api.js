import peopleData from './constants/people.json';

const BASE_URL = 'https://swapi.dev/api';

export const fetchPeople = async (page = 1, searchTerm = '') => {
  let url = `${BASE_URL}/people/?page=${page}`;
  if (searchTerm) {
    url = `${BASE_URL}/people/?search=${searchTerm}&page=${page}`;
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching people:', error);
    
    // Fallback to static people.json data
    let fallbackPeople = peopleData;
    
    // Apply search filter if searchTerm exists
    if (searchTerm) {
        const lowerTerm = searchTerm.toLowerCase();
        fallbackPeople = fallbackPeople.filter((person) =>
            (person.name?.toLowerCase() || '').includes(lowerTerm) ||
            (person.hair_color?.toLowerCase() || '').includes(lowerTerm) ||
            (person.skin_color?.toLowerCase() || '').includes(lowerTerm) ||
            (person.eye_color?.toLowerCase() || '').includes(lowerTerm)
        );
    }
    
    // Applying pagination
    const limit = 10;
    const startIndex = limit * (page - 1);
    const endIndex = limit * page;
    const paginatedPeople = fallbackPeople.slice(startIndex, endIndex);
    
    return {
      results: paginatedPeople,
      count: fallbackPeople.length,
      next: endIndex < fallbackPeople.length ? `page=${page + 1}` : null,
      previous: page > 1 ? `page=${page - 1}` : null
    };
  }
};

export const fetchPerson = async (url) => {  
  const match = url.match(/\/people\/(\d+)(\/)?$/);
  if (!match) {
    console.error('Invalid URL format:', url);
    return;
  }
  const id = match[1];
  try {
    const response = await fetch(`${BASE_URL}/people/${id}/`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching person:', error);
    
    // Fallback: try to find person in people.json
    const fallbackPeople = peopleData;
    
    // If not found by numeric ID, try to find by URL pattern
    const fallbackPerson = fallbackPeople.find((person) => {
      if (person.url) {
        return person.url === url;
      }
      return false;
    });

    return fallbackPerson || null;
  }
};