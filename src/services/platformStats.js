export const fetchYouTubeStats = async (handle) => {
  try {
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
    if (!apiKey) {
      return { status: 'unavailable' };
    }

    const response = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&forHandle=@${handle}&key=${apiKey}`);
    if (!response.ok) throw new Error('Network response was not ok');
    
    const data = await response.json();
    if (data.items && data.items.length > 0) {
      const stats = data.items[0].statistics;
      return {
        status: 'success',
        subscribers: parseInt(stats.subscriberCount, 10),
        views: parseInt(stats.viewCount, 10),
        videos: parseInt(stats.videoCount, 10)
      };
    }
    return { status: 'error' };
  } catch (error) {
    console.error('Error fetching YouTube stats:', error);
    return { status: 'error' };
  }
};

export const fetchCodeforcesStats = async (handle) => {
  try {
    const response = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`);
    if (!response.ok) throw new Error('Network response was not ok');
    
    const data = await response.json();
    if (data.status === 'OK' && data.result.length > 0) {
      const user = data.result[0];
      return {
        status: 'success',
        rating: user.rating,
        maxRating: user.maxRating,
        rank: user.rank,
        maxRank: user.maxRank
      };
    }
    return { status: 'error' };
  } catch (error) {
    console.error('Error fetching Codeforces stats:', error);
    return { status: 'error' };
  }
};

export const fetchLeetCodeStats = async (handle) => {
  try {
    const response = await fetch(`https://alfa-leetcode-api.onrender.com/${handle}`);
    if (!response.ok) throw new Error('Network response was not ok');
    
    const data = await response.json();
    if (data.totalSolved !== undefined) {
      return {
        status: 'success',
        totalSolved: data.totalSolved,
        easySolved: data.easySolved,
        mediumSolved: data.mediumSolved,
        hardSolved: data.hardSolved
      };
    }
    return { status: 'error' };
  } catch (error) {
    console.error('Error fetching LeetCode stats:', error);
    return { status: 'error' };
  }
};

export const fetchPlatformStats = async (platformId, handle) => {
  switch (platformId) {
    case 'youtube':
      return fetchYouTubeStats(handle);
    case 'codeforces':
      return fetchCodeforcesStats(handle);
    case 'leetcode':
      return fetchLeetCodeStats(handle);
    default:
      return { status: 'unavailable' };
  }
};
