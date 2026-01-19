import { Video } from '../data/mockArticles';
import { supabase } from '@/lib/supabase';

// Map database snake_case to frontend camelCase if needed,
// but for now, we'll try to keep them consistent or map here.
// Assuming DB columns: id, title, description, video_url, category, author, published_at, thumbnail_url, is_featured

const mapVideoFromDB = (dbVideo: any): Video => ({
    id: dbVideo.id,
    title: dbVideo.title,
    description: dbVideo.description,
    videoUrl: dbVideo.video_url,
    category: dbVideo.category,
    author: dbVideo.author,
    publishedAt: new Date(dbVideo.published_at).toISOString().split('T')[0],
    thumbnailUrl: dbVideo.thumbnail_url,
    isFeatured: dbVideo.is_featured
});

export const videoService = {
    async getVideos(): Promise<Video[]> {
        const { data, error } = await supabase
            .from('videos')
            .select('*')
            .order('published_at', { ascending: false });

        if (error) throw new Error(error.message);

        return (data || []).map(mapVideoFromDB);
    },

    async getVideoById(id: string): Promise<Video> {
        const { data, error } = await supabase
            .from('videos')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw new Error(error.message);
        return mapVideoFromDB(data);
    },

    async createVideo(video: Omit<Video, 'id' | 'publishedAt'>, _token: string): Promise<Video> {
        // Note: Token is handled automatically by Supabase client if user is logged in
        const { data, error } = await supabase
            .from('videos')
            .insert({
                title: video.title,
                description: video.description,
                video_url: video.videoUrl,
                category: video.category,
                author: video.author,
                thumbnail_url: video.thumbnailUrl,
                is_featured: video.isFeatured
            })
            .select()
            .single();

        if (error) throw new Error(error.message);
        return mapVideoFromDB(data);
    },

    async updateVideo(id: string, video: Partial<Video>, _token: string): Promise<Video> {
        const updateData: any = {};
        if (video.title) updateData.title = video.title;
        if (video.description) updateData.description = video.description;
        if (video.videoUrl) updateData.video_url = video.videoUrl;
        if (video.category) updateData.category = video.category;
        if (video.thumbnailUrl) updateData.thumbnail_url = video.thumbnailUrl;
        if (video.isFeatured !== undefined) updateData.is_featured = video.isFeatured;

        const { data, error } = await supabase
            .from('videos')
            .update(updateData)
            .eq('id', id)
            .select()
            .single();

        if (error) throw new Error(error.message);
        return mapVideoFromDB(data);
    },

    async deleteVideo(id: string, _token: string): Promise<void> {
        const { error } = await supabase
            .from('videos')
            .delete()
            .eq('id', id);

        if (error) throw new Error(error.message);
    }
};
