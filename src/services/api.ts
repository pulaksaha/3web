import { Video } from '../data/mockArticles';

const API_BASE_URL = '/api';

export const videoService = {
    async getVideos(): Promise<Video[]> {
        const response = await fetch(`${API_BASE_URL}/articles`);
        if (!response.ok) {
            throw new Error('Failed to fetch videos');
        }
        return response.json();
    },

    async getVideoById(id: string): Promise<Video> {
        const response = await fetch(`${API_BASE_URL}/articles/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch video');
        }
        return response.json();
    },

    async createVideo(video: Omit<Video, 'id' | 'publishedAt'>, token: string): Promise<Video> {
        const response = await fetch(`${API_BASE_URL}/articles`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(video)
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to create video');
        }
        return response.json();
    },

    async updateVideo(id: string, video: Partial<Video>, token: string): Promise<Video> {
        const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(video)
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to update video');
        }
        return response.json();
    },

    async deleteVideo(id: string, token: string): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to delete video');
        }
    }
};
