// fuzzySearch.js

const calculateLevenshteinDistance = (str1, str2) => {
    const m = str1.length;
    const n = str2.length;
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
  
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
  
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (str1[i - 1] === str2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1];
        } else {
          dp[i][j] = Math.min(
            dp[i - 1][j - 1] + 1,
            dp[i - 1][j] + 1,
            dp[i][j - 1] + 1
          );
        }
      }
    }
    return dp[m][n];
  };
  
  export const fuzzySearchSongs = (songs, searchTerm, threshold = 2) => {
    if (!searchTerm) return songs;
    
    const searchTermLower = searchTerm.toLowerCase();
    
    return songs.filter(song => {
      const fieldsToSearch = [
        song.songName,
        song.artist,
        song.albumName,
        song.username
      ];
      
      return fieldsToSearch.some(field => {
        if (!field) return false;
        const fieldLower = field.toLowerCase();
        
        // Exact match
        if (fieldLower.includes(searchTermLower)) return true;
        
        // Fuzzy match
        const searchWords = searchTermLower.split(' ');
        const fieldWords = fieldLower.split(' ');
        
        return searchWords.every(searchWord =>
          fieldWords.some(fieldWord => {
            const distance = calculateLevenshteinDistance(searchWord, fieldWord);
            return distance <= threshold;
          })
        );
      });
    });
  };
  
  export const fuzzySearchPlaylists = (playlists, searchTerm, threshold = 2) => {
    if (!searchTerm) return playlists;
    
    const searchTermLower = searchTerm.toLowerCase();
    
    return playlists.filter(playlist => {
      const fieldsToSearch = [
        playlist.name,
        playlist.username,
        playlist.genre
      ];
      
      return fieldsToSearch.some(field => {
        if (!field) return false;
        const fieldLower = field.toLowerCase();
        
        // Exact match
        if (fieldLower.includes(searchTermLower)) return true;
        
        // Fuzzy match
        const searchWords = searchTermLower.split(' ');
        const fieldWords = fieldLower.split(' ');
        
        return searchWords.every(searchWord =>
          fieldWords.some(fieldWord => {
            const distance = calculateLevenshteinDistance(searchWord, fieldWord);
            return distance <= threshold;
          })
        );
      });
    });
  };