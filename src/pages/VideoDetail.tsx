import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { videoService } from '@/services/api';
import { Video } from '@/data/mockArticles';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'react-router-dom';
import AdSpace from '@/components/AdSpace';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import VideoPlayer from '@/components/VideoPlayer';
import ArticleCard from '@/components/VideoCard';

const VideoDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [video, setVideo] = useState<Video | null>(null);
    const [loading, setLoading] = useState(true);
    const [recommendedVideos, setRecommendedVideos] = useState<Video[]>([]);
    const [visibleCount, setVisibleCount] = useState(12);
    const [hasLoadedMore, setHasLoadedMore] = useState(false);

    // Scroll to top when video ID changes
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [id]);

    useEffect(() => {
        const fetchVideoData = async () => {
            if (!id) return;
            try {
                // Reset states on new video
                setVisibleCount(12);
                setHasLoadedMore(false);

                // Fetch current video
                const currentVideo = await videoService.getVideoById(id);
                setVideo(currentVideo);

                // Fetch recommendations (all videos excluding current)
                const allVideos = await videoService.getVideos();

                // Filter and Shuffle
                const otherVideos = allVideos.filter(v => v.id !== id);
                for (let i = otherVideos.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [otherVideos[i], otherVideos[j]] = [otherVideos[j], otherVideos[i]];
                }

                setRecommendedVideos(otherVideos);

            } catch (error) {
                console.error(error);
                toast.error('Failed to load video');
                navigate('/');
            } finally {
                setLoading(false);
            }
        };

        fetchVideoData();
    }, [id, navigate]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <p className="text-lg">Loading video...</p>
                </main>
                <Footer />
            </div>
        );
    }

    if (!video) return null;

    // Helper to inject ads into recommendations
    // Helper to inject ads into recommendations
    const renderRecommendations = () => {
        const items = [];
        const videosToShow = recommendedVideos.slice(0, visibleCount);
        let videoIdx = 0;

        // Pattern: 4 videos, Ad, 4 videos, Ad, 4 videos, Ad, remaining videos...

        // Chunk 1: 4 videos
        for (let i = 0; i < 4 && videoIdx < videosToShow.length; i++) items.push({ type: 'video', data: videosToShow[videoIdx++] });
        if (videoIdx < videosToShow.length || visibleCount >= 12) items.push({ type: 'ad', id: 'ad-1' });

        // Chunk 2: 4 videos
        for (let i = 0; i < 4 && videoIdx < videosToShow.length; i++) items.push({ type: 'video', data: videosToShow[videoIdx++] });
        if (videoIdx < videosToShow.length || visibleCount >= 12) items.push({ type: 'ad', id: 'ad-2' });

        // Chunk 3: 4 videos
        for (let i = 0; i < 4 && videoIdx < videosToShow.length; i++) items.push({ type: 'video', data: videosToShow[videoIdx++] });
        if (videoIdx < videosToShow.length || visibleCount >= 12) items.push({ type: 'ad', id: 'ad-3' });

        // Remaining videos (if any, e.g. from load more)
        while (videoIdx < videosToShow.length) {
            items.push({ type: 'video', data: videosToShow[videoIdx++] });
        }

        return items;
    };

    const handleLoadMore = () => {
        if (!hasLoadedMore) {
            // First click: Load 6 more videos
            setVisibleCount(prev => prev + 6);
            setHasLoadedMore(true);
        } else {
            // Second click: Redirect to homepage
            navigate('/');
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
                {/* Native Banner Ad before content */}
                <div className="container py-6">
                    <AdSpace variant="native" className="my-4" />
                </div>


                <div className="container py-8 max-w-5xl mx-auto">
                    <div className="flex flex-col gap-12">
                        {/* Main content column */}
                        <div>


                            <article className="space-y-6">
                                <div className="space-y-4">
                                    <VideoPlayer url={video.videoUrl} title={video.title} />

                                    <div className="flex items-start justify-between gap-4">
                                        <div className="space-y-2">
                                            <Badge variant="secondary" className="capitalize">
                                                {video.category}
                                            </Badge>
                                            <h1 className="text-2xl md:text-4xl font-bold font-headline leading-tight">
                                                {video.title}
                                            </h1>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground py-2 border-b">
                                        <span className="flex items-center gap-2">
                                            <User size={16} /> {video.author}
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <Calendar size={16} /> {video.publishedAt}
                                        </span>
                                    </div>
                                </div>

                                <div className="prose prose-lg dark:prose-invert max-w-none">
                                    <div className="whitespace-pre-wrap leading-relaxed">
                                        {video.description}
                                    </div>
                                </div>
                            </article>
                        </div>

                        {/* Recommended Videos Section */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold font-headline">Recommended Videos</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {renderRecommendations().map((item, idx) => (
                                    <React.Fragment key={idx}>
                                        {item.type === 'video' ? (
                                            <ArticleCard article={item.data as Video} />
                                        ) : (
                                            <div className="col-span-1 min-h-[300px] flex items-center justify-center bg-muted/30 rounded-xl border border-dashed">
                                                <div className="w-full h-full p-2">
                                                    <AdSpace variant="card" className="w-full h-full min-h-[250px]" />
                                                </div>
                                            </div>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>

                            <div className="flex justify-center pt-8">
                                <Button size="lg" variant="outline" className="min-w-[200px]" onClick={handleLoadMore}>
                                    {hasLoadedMore ? 'View More on Homepage' : 'Load More Videos'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default VideoDetail;
