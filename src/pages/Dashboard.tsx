import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { videoService } from '@/services/api';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdsterraNativeBanner from '@/components/AdsterraNativeBanner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { useNavigate, Link } from 'react-router-dom';
import { Category, Video, categories } from '@/data/mockArticles';
import { Upload } from 'lucide-react';

interface VideoFormData {
    title: string;
    description: string;
    videoUrl: string;
    category: Category;
    author: string;
    thumbnailUrl: string;
    isFeatured: boolean;
}

const Dashboard = () => {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [videos, setVideos] = useState<Video[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);

    const initialFormData: VideoFormData = {
        title: '',
        description: '',
        videoUrl: '',
        category: 'movies',
        author: user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Anonymous',
        thumbnailUrl: '',
        isFeatured: false,
    };

    const [formData, setFormData] = useState<VideoFormData>(initialFormData);

    const fetchVideos = async () => {
        try {
            const data = await videoService.getVideos();
            setVideos(data);
        } catch (error) {
            console.error('Error fetching videos:', error);
        }
    };

    React.useEffect(() => {
        fetchVideos();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setLoading(true);
        try {
            // const token = await user.getIdToken(); // Supabase handles auth automatically
            const token = '';
            if (isEditing && editId) {
                await videoService.updateVideo(editId, formData, token);
                toast.success('Video updated successfully!');
            } else {
                await videoService.createVideo(formData, token);
                toast.success('Video published successfully!');
            }
            setFormData(initialFormData);
            setIsEditing(false);
            setEditId(null);
            fetchVideos();
        } catch (error: any) {
            console.error(error);
            toast.error(error.message || 'Failed to save video');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (video: Video) => {
        setFormData({
            title: video.title,
            description: video.description,
            videoUrl: video.videoUrl,
            category: video.category,
            author: video.author,
            thumbnailUrl: video.thumbnailUrl,
            isFeatured: video.isFeatured || false,
        });
        setIsEditing(true);
        setEditId(video.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id: string) => {
        if (!user || !window.confirm('Are you sure you want to delete this video?')) return;

        try {
            // const token = await user.getIdToken();
            await videoService.deleteVideo(id, '');
            toast.success('Video deleted');
            fetchVideos();
        } catch (error: any) {
            console.error(error);
            toast.error('Failed to delete video');
        }
    };

    const handleSignOut = async () => {
        await signOut();
        toast.success('Signed out');
        navigate('/');
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            {/* Native Banner Ad */}
            <div className="container pt-6">
                <AdsterraNativeBanner className="my-4" />
            </div>

            <main className="flex-1 container py-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold font-headline">Creator's Dashboard</h1>
                        <p className="text-muted-foreground">Welcome back, {user?.email}</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" asChild>
                            <Link to="/import">
                                <Upload className="w-4 h-4 mr-2" />
                                Bulk Import
                            </Link>
                        </Button>
                        <Button variant="outline" onClick={handleSignOut}>Sign Out</Button>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Form Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle>{isEditing ? 'Edit Video' : 'Add New Video'}</CardTitle>
                            <CardDescription>
                                {isEditing ? 'Update the details of your video.' : 'Fill in the details below to publish a new video.'}
                            </CardDescription>
                        </CardHeader>
                        <form onSubmit={handleSubmit}>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Video Title</Label>
                                    <Input
                                        id="title"
                                        placeholder="Enter a catchy title"
                                        required
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    />
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="category">Category</Label>
                                        <Select
                                            value={formData.category}
                                            onValueChange={(value: Category) => setFormData({ ...formData, category: value })}
                                        >
                                            <SelectTrigger id="category">
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories.map(cat => (
                                                    <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="flex items-center space-x-2 pt-8">
                                        <Switch
                                            id="featured"
                                            checked={formData.isFeatured}
                                            onCheckedChange={(checked) => setFormData({ ...formData, isFeatured: checked })}
                                        />
                                        <Label htmlFor="featured">Feature this video</Label>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="videoUrl">Video URL</Label>
                                    <Input
                                        id="videoUrl"
                                        placeholder="https://www.youtube.com/watch?v=..."
                                        type="url"
                                        required
                                        value={formData.videoUrl}
                                        onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                                    />
                                    <p className="text-xs text-muted-foreground">Supports YouTube & Direct Video links</p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="thumbnailUrl">Thumbnail URL</Label>
                                    <Input
                                        id="thumbnailUrl"
                                        placeholder="https://images.unsplash.com/..."
                                        type="url"
                                        required
                                        value={formData.thumbnailUrl}
                                        onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        placeholder="Describe your video..."
                                        className="min-h-[150px]"
                                        required
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    />
                                </div>

                            </CardContent>
                            <CardFooter className="flex justify-end gap-4 border-t pt-6">
                                {isEditing && (
                                    <Button type="button" variant="ghost" onClick={() => {
                                        setIsEditing(false);
                                        setEditId(null);
                                        setFormData(initialFormData);
                                    }}>Cancel Edit</Button>
                                )}
                                <Button type="submit" disabled={loading}>
                                    {loading ? 'Processing...' : (isEditing ? 'Update Video' : 'Publish Video')}
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>

                    {/* List Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Manage Videos</CardTitle>
                            <CardDescription>A list of all published videos.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {videos.length > 0 ? (
                                    videos.map((video) => (
                                        <div key={video.id} className="flex items-start justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                                            <div className="flex gap-3 overflow-hidden">
                                                <div className="w-24 h-16 bg-muted rounded overflow-hidden flex-shrink-0">
                                                    <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="min-w-0">
                                                    <h4 className="font-semibold truncate leading-tight line-clamp-1">{video.title}</h4>
                                                    <p className="text-xs text-muted-foreground capitalize mt-1">{video.category} • {video.publishedAt}</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-2 ml-2">
                                                <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => handleEdit(video)}>Edit</Button>
                                                <Button size="sm" variant="destructive" className="h-7 text-xs" onClick={() => handleDelete(video.id)}>Delete</Button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-muted-foreground py-8">No videos found.</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Dashboard;
