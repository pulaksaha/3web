import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { videoService } from '@/services/api';
import { Video } from '@/data/mockArticles';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdsterraNativeBanner from '@/components/AdsterraNativeBanner';
import AdsterraBanner160x300 from '@/components/AdsterraBanner160x300';
import AdsterraAd from '@/components/AdsterraAd';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import VideoPlayer from '@/components/VideoPlayer';

const VideoDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [video, setVideo] = useState<Video | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVideo = async () => {
            if (!id) return;
            try {
                const data = await videoService.getVideoById(id);
                setVideo(data);
            } catch (error) {
                console.error(error);
                toast.error('Failed to load video');
                navigate('/');
            } finally {
                setLoading(false);
            }
        };

        fetchVideo();
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

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
                {/* Native Banner Ad before content */}
                <div className="container py-6">
                    <AdsterraNativeBanner className="my-4" />
                </div>

                <div className="container py-8 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_200px] gap-8">
                        {/* Main content column */}
                        <div>
                            <Button
                                variant="ghost"
                                className="mb-6 -ml-4 flex items-center gap-2"
                                onClick={() => navigate(-1)}
                            >
                                <ArrowLeft size={16} /> Back
                            </Button>

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

                                {/* Ad after description */}
                                <div className="py-6">
                                    <AdsterraAd variant="primary" buttonText="Sponsored Content" className="my-4" />
                                </div>
                            </article>
                        </div>

                        {/* Sidebar with ads */}
                        <aside className="hidden lg:block space-y-6">
                            <div className="sticky top-8 space-y-6">
                                <AdsterraBanner160x300 />
                                <AdsterraBanner160x300 />
                            </div>
                        </aside>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default VideoDetail;
