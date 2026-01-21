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
    isFeatured: dbVideo.is_featured,
    duration: dbVideo.duration,
    views: dbVideo.views,
    location: dbVideo.location,
    bodytype: dbVideo.body_type,
    scenario: dbVideo.scenario,
    ethnicity: dbVideo.ethnicity
});

export const videoService = {
    async getVideos(sortBy: 'latest' | 'views' | 'top_rated' = 'latest'): Promise<Video[]> {
        let query = supabase.from('videos').select('*');

        switch (sortBy) {
            case 'views':
            case 'top_rated': // Aliasing top_rated to views for now as requested
                query = query.order('views', { ascending: false });
                break;
            case 'latest':
            default:
                query = query.order('published_at', { ascending: false });
                break;
        }

        const { data, error } = await query;

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
                is_featured: video.isFeatured,
                duration: video.duration,
                views: video.views,
                location: video.location,
                body_type: video.bodytype,
                scenario: video.scenario,
                ethnicity: video.ethnicity
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
        if (video.duration) updateData.duration = video.duration;
        if (video.views !== undefined) updateData.views = video.views;
        if (video.location) updateData.location = video.location;
        if (video.bodytype) updateData.body_type = video.bodytype;
        if (video.scenario) updateData.scenario = video.scenario;
        if (video.ethnicity) updateData.ethnicity = video.ethnicity;

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
    },

    async getUniqueTags(): Promise<string[]> {
        const { data, error } = await supabase
            .from('videos')
            .select('category, body_type, scenario, ethnicity, author');

        if (error) throw new Error(error.message);

        const tags = new Set<string>();
        data?.forEach((video: any) => {
            if (video.category) tags.add(video.category);
            if (video.body_type) tags.add(video.body_type);
            if (video.scenario) tags.add(video.scenario);
            if (video.ethnicity) tags.add(video.ethnicity);
            if (video.author) tags.add(video.author);
        });

        // Convert to array, filter falsy, and sort alphabetical
        return Array.from(tags)
            .filter(Boolean)
            .sort((a, b) => a.localeCompare(b));
    },

    async getUniqueCategories(): Promise<string[]> {
        const { data, error } = await supabase
            .from('videos')
            .select('category');

        if (error) throw new Error(error.message);

        const categories = new Set<string>();
        data?.forEach((video: any) => {
            if (video.category) categories.add(video.category);
        });

        // Convert to array, filter falsy, and sort alphabetical
        return Array.from(categories)
            .filter(Boolean)
            .sort((a, b) => a.localeCompare(b));
    },

    async searchVideos(query: string): Promise<Video[]> {
        if (!query) return [];

        const { data, error } = await supabase
            .from('videos')
            .select('*')
            .or(`title.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%,author.ilike.%${query}%`)
            .order('published_at', { ascending: false });

        if (error) throw new Error(error.message);

        return (data || []).map(mapVideoFromDB);
    }
};
