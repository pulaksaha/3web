import React from 'react';

interface VideoPlayerProps {
    url: string;
    title: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, title }) => {
    const getYouTubeId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const youtubeId = getYouTubeId(url);

    if (youtubeId) {
        return (
            <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-xl bg-black">
                <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${youtubeId}`}
                    title={title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>
        );
    }

    return (
        <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-xl bg-black">
            <video
                className="absolute top-0 left-0 w-full h-full"
                controls
                src={url}
            >
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default VideoPlayer;
