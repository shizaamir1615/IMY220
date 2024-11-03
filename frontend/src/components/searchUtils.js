// searchUtils.js
export const searchItems = (items, searchTerm) => {
    if (!searchTerm) return items;
    
    const searchLower = searchTerm.toLowerCase();
    
    return items.filter(item => {
      const nameMatch = item.name?.toLowerCase().includes(searchLower);
      const genreMatch = item.genre?.toLowerCase().includes(searchLower);
      const hashtagMatch = item.hashtags?.some(tag => 
        tag.toLowerCase().includes(searchLower) ||
        tag.toLowerCase().includes(searchTerm.replace('#', '').toLowerCase())
      );
      
      return nameMatch || genreMatch || hashtagMatch;
    });
  };

