import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileJson, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { importVideos, mapVideoFields } from '@/utils/videoImporter';

const ImportVideos = () => {
    const navigate = useNavigate();
    const [file, setFile] = useState<File | null>(null);
    const [jsonData, setJsonData] = useState<any[]>([]);
    const [preview, setPreview] = useState<any[]>([]);
    const [importing, setImporting] = useState(false);
    const [progress, setProgress] = useState({ current: 0, total: 0 });
    const [results, setResults] = useState<{
        success: number;
        failed: number;
        errors: string[];
    } | null>(null);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;

        setFile(selectedFile);
        setResults(null);

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const parsed = JSON.parse(event.target?.result as string);
                const dataArray = Array.isArray(parsed) ? parsed : [parsed];
                setJsonData(dataArray);

                // Preview first 5 mapped entries
                const previews = dataArray.slice(0, 5).map(mapVideoFields).filter(Boolean);
                setPreview(previews);
            } catch (error) {
                alert('Invalid JSON file');
                setFile(null);
            }
        };
        reader.readAsText(selectedFile);
    };

    const handleImport = async () => {
        if (jsonData.length === 0) return;

        setImporting(true);
        setResults(null);

        const importResults = await importVideos(jsonData, (current, total) => {
            setProgress({ current, total });
        });

        setResults(importResults);
        setImporting(false);
    };

    const handleReset = () => {
        setFile(null);
        setJsonData([]);
        setPreview([]);
        setResults(null);
        setProgress({ current: 0, total: 0 });
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="container py-8 max-w-4xl">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Import Videos from JSON</h1>
                        <p className="text-muted-foreground mt-2">
                            Upload a JSON file with video data to batch import into your library
                        </p>
                    </div>
                    <Button variant="outline" onClick={() => navigate('/dashboard')}>
                        Back to Dashboard
                    </Button>
                </div>

                {/* Upload Area */}
                {!file && (
                    <div className="border-2 border-dashed border-border rounded-lg p-12 text-center">
                        <FileJson className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Upload JSON File</h3>
                        <p className="text-muted-foreground mb-4">
                            Select a JSON file containing video data
                        </p>
                        <label htmlFor="file-upload" className="cursor-pointer">
                            <Button asChild>
                                <span>
                                    <Upload className="w-4 h-4 mr-2" />
                                    Choose File
                                </span>
                            </Button>
                        </label>
                        <input
                            id="file-upload"
                            type="file"
                            accept=".json"
                            className="hidden"
                            onChange={handleFileSelect}
                        />
                    </div>
                )}

                {/* Preview */}
                {file && !importing && !results && (
                    <div className="space-y-6">
                        <div className="bg-card border border-border rounded-lg p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold">File: {file.name}</h3>
                                    <p className="text-sm text-muted-foreground">
                                        {jsonData.length} videos detected
                                    </p>
                                </div>
                                <Button variant="outline" size="sm" onClick={handleReset}>
                                    Change File
                                </Button>
                            </div>

                            {preview.length > 0 && (
                                <div className="space-y-4">
                                    <h4 className="font-semibold">Preview (first {preview.length} entries):</h4>
                                    <div className="space-y-3 max-h-64 overflow-y-auto">
                                        {preview.map((video, idx) => (
                                            <div key={idx} className="bg-muted p-3 rounded text-sm">
                                                <div className="font-medium truncate">{video.title}</div>
                                                <div className="text-xs text-muted-foreground truncate mt-1">
                                                    URL: {video.video_url}
                                                </div>
                                                <div className="text-xs text-muted-foreground mt-1">
                                                    Category: {video.category} | Author: {video.author}
                                                </div>
                                                {(video.duration || video.views || video.location) && (
                                                    <div className="text-xs text-muted-foreground mt-1 flex gap-2 flex-wrap">
                                                        {video.duration && <span className="bg-background px-1 rounded border">⏱ {video.duration}</span>}
                                                        {video.views && <span className="bg-background px-1 rounded border">👁 {video.views}</span>}
                                                        {video.location && <span className="bg-background px-1 rounded border">📍 {video.location}</span>}
                                                    </div>
                                                )}
                                                {(video.body_type || video.scenario || video.ethnicity) && (
                                                    <div className="text-xs text-muted-foreground mt-1 flex gap-2 flex-wrap">
                                                        {video.body_type && <span className="bg-background px-1 rounded border">🧘 {video.body_type}</span>}
                                                        {video.scenario && <span className="bg-background px-1 rounded border">🎭 {video.scenario}</span>}
                                                        {video.ethnicity && <span className="bg-background px-1 rounded border">🌍 {video.ethnicity}</span>}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <Button onClick={handleImport} className="w-full" size="lg">
                            Import {jsonData.length} Videos
                        </Button>
                    </div>
                )}

                {/* Progress */}
                {importing && (
                    <div className="bg-card border border-border rounded-lg p-8 text-center">
                        <Loader2 className="w-12 h-12 mx-auto animate-spin text-primary mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Importing Videos...</h3>
                        <p className="text-muted-foreground">
                            {progress.current} of {progress.total} processed
                        </p>
                        <div className="w-full bg-muted rounded-full h-2 mt-4">
                            <div
                                className="bg-primary h-2 rounded-full transition-all duration-300"
                                style={{ width: `${(progress.current / progress.total) * 100}%` }}
                            />
                        </div>
                    </div>
                )}

                {/* Results */}
                {results && (
                    <div className="space-y-6">
                        <div className="bg-card border border-border rounded-lg p-6">
                            <h3 className="text-xl font-semibold mb-4">Import Complete</h3>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                                    <CheckCircle className="w-8 h-8 text-green-500" />
                                    <div>
                                        <div className="text-2xl font-bold text-green-500">{results.success}</div>
                                        <div className="text-sm text-muted-foreground">Successful</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                                    <XCircle className="w-8 h-8 text-red-500" />
                                    <div>
                                        <div className="text-2xl font-bold text-red-500">{results.failed}</div>
                                        <div className="text-sm text-muted-foreground">Failed</div>
                                    </div>
                                </div>
                            </div>

                            {results.errors.length > 0 && (
                                <div className="space-y-2">
                                    <h4 className="font-semibold text-red-500">Errors:</h4>
                                    <div className="max-h-48 overflow-y-auto space-y-1">
                                        {results.errors.map((error, idx) => (
                                            <div key={idx} className="text-sm text-red-500 bg-red-500/10 p-2 rounded">
                                                {error}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-4">
                            <Button onClick={handleReset} variant="outline" className="flex-1">
                                Import More
                            </Button>
                            <Button onClick={() => navigate('/dashboard')} className="flex-1">
                                Go to Dashboard
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImportVideos;
