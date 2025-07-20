const API_BASE_URL = 'https://koma-ai.app/';

interface Comic {
  _id: string;
  user_id: string;
  image_url: string;
  panel_prompts: string[];
  prompt: string;
  likes: number;
  is_liked?: boolean; // Add this field to track if current user liked it
  created_at: string;
}

interface GenerateComicData {
  prompt: string;
}

interface GenerateComicResponse {
  message: string;
  image_url: string;
  panel_prompts: string[];
}

class MangaApiService {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('auth_token');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    };
  }

  // Generate a new comic
  async generateComic(prompt: string): Promise<GenerateComicResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/koma/generate`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ prompt }), // Fix: wrap in object with prompt key
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to generate comic');
      }

      return result;
    } catch (error) {
      throw error;
    }
  }

  // Get explore comics (all public comics)
  async getExploreComics(): Promise<Comic[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/koma/explore`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch explore comics');
      }

      return result;
    } catch (error) {
      throw error;
    }
  }

  // Get top comics (sorted by likes)
  async getTopComics(): Promise<Comic[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/koma/top`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch top comics');
      }

      return result;
    } catch (error) {
      throw error;
    }
  }

  // Get user's own comics (my library)
  async getMyLibrary(): Promise<Comic[]> {
    try {
      console.log('Fetching my library...'); // Debug log
      const response = await fetch(`${API_BASE_URL}/koma/my-library`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      console.log('Library response status:', response.status); // Debug log

      const result = await response.json();
      console.log('Library response data:', result); // Debug log

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch my library');
      }

      return result;
    } catch (error) {
      console.error('Error in getMyLibrary:', error); // Debug log
      throw error;
    }
  }

  // Get comics liked by current user
  async getLikedComics(): Promise<Comic[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/koma/likes`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch liked comics');
      }

      return result;
    } catch (error) {
      throw error;
    }
  }

  // Like/unlike a comic
  async likeComic(comicId: string): Promise<{ message: string }> {
    try {
      console.log('Liking comic:', comicId); // Debug log
      const response = await fetch(`${API_BASE_URL}/koma/like/${comicId}`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
      });

      console.log('Like response status:', response.status); // Debug log

      const result = await response.json();
      console.log('Like response data:', result); // Debug log

      if (!response.ok) {
        throw new Error(result.error || 'Failed to like comic');
      }

      return result;
    } catch (error) {
      console.error('Error in likeComic:', error); // Debug log
      throw error;
    }
  }
}

export const mangaApi = new MangaApiService();
export type { Comic, GenerateComicData, GenerateComicResponse };
