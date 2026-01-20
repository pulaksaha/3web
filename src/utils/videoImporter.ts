import { supabase } from '@/lib/supabase';

interface RawVideoData {
    [key: string]: any;
}

interface MappedVideo {
    title: string;
    video_url: string;
    thumbnail_url: string;
    description: string;
    category: string;
    author: string;
    published_at: string;
    is_featured: boolean;
    duration?: string;
    views?: number;
    location?: string;
    body_type?: string;
    scenario?: string;
    ethnicity?: string;
}

// Smart field mapper - detects common field name variations
export const mapVideoFields = (rawData: RawVideoData): MappedVideo | null => {
    try {
        // Title mapping
        const title = rawData.title || rawData.name || rawData.video_title || '';
        if (!title) return null;

        // Video URL mapping (Prioritize 'streamurl' as requested)
        const video_url =
            rawData.streamurl ||
            rawData.stream_url ||
            rawData.video_url ||
            rawData.videoUrl ||
            rawData.url ||
            rawData.link ||
            rawData.video_link ||
            '';
        if (!video_url) return null;

        // Thumbnail mapping (Prioritize 'thumbnail' as requested)
        const thumbnail_url =
            rawData.thumbnail ||
            rawData.thumbnail_url ||
            rawData.thumbnailUrl ||
            rawData.image ||
            rawData.poster ||
            rawData.cover ||
            'https://placehold.co/800x450/333/fff?text=' + encodeURIComponent(title);

        // Description mapping
        const description =
            rawData.description ||
            rawData.desc ||
            rawData.summary ||
            rawData.about ||
            title; // Fallback to title

        // Category mapping (lowercase)
        const rawCategory =
            rawData.category ||
            rawData.genre ||
            rawData.type ||
            'movies';
        const category = rawCategory.toLowerCase();

        // Author mapping
        const author =
            rawData.author ||
            rawData.uploader ||
            rawData.channel ||
            rawData.creator ||
            rawData.user ||
            'Unknown';

        // Published date
        const published_at =
            rawData.published_at ||
            rawData.publishedAt ||
            rawData.created_at ||
            rawData.date ||
            new Date().toISOString();

        // Featured flag
        const is_featured =
            rawData.is_featured ||
            rawData.isFeatured ||
            rawData.featured ||
            false;

        // New fields
        const duration = rawData.duration || undefined;
        // Parse views: remove commas if string, or take number
        let views = undefined;
        if (rawData.views !== undefined) {
            if (typeof rawData.views === 'string') {
                views = parseInt(rawData.views.replace(/,/g, ''), 10);
            } else {
                views = Number(rawData.views);
            }
            if (isNaN(views)) views = 0;
        }

        const location = rawData.location || undefined;
        const body_type = rawData.bodytype || rawData.body_type || undefined;
        const scenario = rawData.scenario || undefined;
        const ethnicity = rawData.ethnicity || undefined;

        return {
            title,
            video_url,
            thumbnail_url,
            description,
            category,
            author,
            published_at,
            is_featured,
            duration,
            views,
            location,
            body_type,
            scenario,
            ethnicity
        };
    } catch (error) {
        console.error('Error mapping video fields:', error);
        return null;
    }
};

// Batch import videos to Supabase
export const importVideos = async (
    rawVideos: RawVideoData[],
    onProgress?: (current: number, total: number) => void
): Promise<{ success: number; failed: number; errors: string[] }> => {
    const results = {
        success: 0,
        failed: 0,
        errors: [] as string[],
    };

    for (let i = 0; i < rawVideos.length; i++) {
        const rawVideo = rawVideos[i];

        // Map fields
        const mappedVideo = mapVideoFields(rawVideo);

        if (!mappedVideo) {
            results.failed++;
            results.errors.push(`Row ${i + 1}: Missing required fields (title or video_url)`);
            continue;
        }

        try {
            // Check for duplicates
            const { data: existing } = await supabase
                .from('videos')
                .select('id')
                .eq('video_url', mappedVideo.video_url)
                .single();

            if (existing) {
                results.failed++;
                results.errors.push(`Row ${i + 1}: Duplicate video URL - ${mappedVideo.title}`);
                continue;
            }

            // Insert video
            const { error } = await supabase
                .from('videos')
                .insert([mappedVideo]);

            if (error) {
                results.failed++;
                results.errors.push(`Row ${i + 1}: ${error.message}`);
            } else {
                results.success++;
            }
        } catch (error: any) {
            results.failed++;
            results.errors.push(`Row ${i + 1}: ${error.message}`);
        }

        // Report progress
        if (onProgress) {
            onProgress(i + 1, rawVideos.length);
        }
    }

    return results;
};
