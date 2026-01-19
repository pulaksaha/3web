import { useEffect } from 'react';

interface AdsterraNativeBannerProps {
    className?: string;
}

const AdsterraNativeBanner = ({ className = '' }: AdsterraNativeBannerProps) => {
    useEffect(() => {
        // Load the script dynamically
        const script = document.createElement('script');
        script.async = true;
        script.setAttribute('data-cfasync', 'false');
        script.src = 'https://unconsciousliteracynameless.com/9a6a842ad36c1b1f79d4c1ed1c0d14fa/invoke.js';

        const container = document.getElementById('container-9a6a842ad36c1b1f79d4c1ed1c0d14fa');
        if (container && !container.hasChildNodes()) {
            container.appendChild(script);
        }

        return () => {
            // Cleanup if needed
            if (container && script.parentNode) {
                script.parentNode.removeChild(script);
            }
        };
    }, []);

    return (
        <div className={`adsterra-native-banner ${className}`}>
            <div id="container-9a6a842ad36c1b1f79d4c1ed1c0d14fa"></div>
        </div>
    );
};

export default AdsterraNativeBanner;
