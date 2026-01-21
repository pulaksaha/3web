import React, { useEffect, useRef } from 'react';
import fluidPlayer from 'fluid-player';
import 'fluid-player/src/css/fluidplayer.css';

interface VideoPlayerProps {
    url: string;
    title: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, title }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const playerRef = useRef<any>(null);

    const getYouTubeId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const youtubeId = getYouTubeId(url);

    useEffect(() => {
        if (!youtubeId && videoRef.current) {
            // Initialize Fluid Player
            playerRef.current = fluidPlayer(videoRef.current, {
                layoutControls: {
                    fillToContainer: true,
                    primaryColor: "#29b6f6",
                    autoPlay: false,
                    playButtonShowing: true,
                    playPauseAnimation: true,
                    mute: false,
                    logo: {
                        imageUrl: null,
                        position: 'top left',
                        clickUrl: null,
                        opacity: 1
                    },
                    htmlOnPauseBlock: {
                        html: null,
                        height: null,
                        width: null
                    },
                    allowDownload: false,
                    allowTheatre: true,
                    playbackRateEnabled: true,
                    controlBar: {
                        autoHide: true,
                        autoHideTimeout: 3,
                        animated: true
                    }
                }
            });

            // Handle Auto-Rotation for Landscape Videos
            const handleFullscreenChange = async () => {
                if (document.fullscreenElement && videoRef.current) {
                    const { videoWidth, videoHeight } = videoRef.current;
                    // Check if video is landscape
                    if (videoWidth > videoHeight) {
                        try {
                            // Attempt to lock to landscape
                            // @ts-ignore
                            await screen.orientation.lock('landscape');
                        } catch (err) {
                            // console.log('Orientation lock failed or not supported', err);
                        }
                    }
                } else {
                    try {
                        screen.orientation.unlock();
                    } catch (err) {
                        // Ignore unlock errors
                    }
                }
            };

            document.addEventListener('fullscreenchange', handleFullscreenChange);
            // document.addEventListener('webkitfullscreenchange', handleFullscreenChange); // Typescript might complain

            // We need to attach cleanup for this specific listener which is tricky with the current structure
            // Instead, we'll modify the cleanup function below to include this.
            return () => {
                document.removeEventListener('fullscreenchange', handleFullscreenChange);
                if (playerRef.current) {
                    try { playerRef.current.destroy(); } catch (e) { }
                    playerRef.current = null;
                }
            };
        }

    }, [url, youtubeId]);

    // Custom CSS to fix mobile overlap
    const mobileStyles = `
        @media only screen and (max-width: 768px) {
            .fluid_controls_volume_container, 
            .fluid_controls_volume,
            .fluid_controls_mute {
                display: none !important;
            }
            .fluid_controls_duration {
                font-size: 12px !important;
                padding-left: 10px !important;
                margin-left: 0 !important;
            }
            .fluid_controls_currentprogress {
                font-size: 12px !important;
                font-weight: 500 !important;
            }
            /* Adjust spacing for other controls if needed */
            .fluid_controls_left {
                display: flex !important;
                align-items: center !important;
                gap: 5px !important;
            }
        }
    `;

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
        <div className="rounded-xl overflow-hidden shadow-lg bg-black w-full">
            <style>{mobileStyles}</style>
            <video
                ref={videoRef}
                className="w-full h-full"
                src={url}
                title={title}
                style={{ width: '100%', aspectRatio: '16/9' }}
            >
                <source src={url} type="video/mp4" />
                <source src={url} type="video/webm" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default VideoPlayer;

