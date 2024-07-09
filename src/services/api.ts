export const fetchSWPeople = async (term?: string) => {
  const endpoint = "https://swapi.dev/api/people";
  const currentUrl = term ? `${endpoint}?search=${term}` : endpoint;

  try {
    const response = await fetch(currentUrl);
    if (!response.ok) {
      throw new Error("Network response wasn't ok");
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching results:", error);
  }
};
