export const fetchLists = async () => {
  try {
    const response = await fetch('https://apis.ccbp.in/list-creation/lists'); // Replace with actual API URL
    if (!response.ok) throw new Error('Failed to fetch lists');
    return await response.json();
  } catch (error) {
    console.error('API Fetch Error:', error);
    return null;
  }
};
