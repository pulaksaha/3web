import { useEffect } from 'react';

interface AdsterraBanner160x300Props {
    className?: string;
}

const AdsterraBanner160x300 = ({ className = '' }: AdsterraBanner160x300Props) => {
    useEffect(() => {
        // Create the atOptions configuration
        // @ts-ignore
        window.atOptions = {
            'key': 'dfbd2c703151f97ecc1485306818e354',
            'format': 'iframe',
            'height': 300,
            'width': 160,
            'params': {}
        };

        // Load the invoke script
        const script = document.createElement('script');
        script.src = 'https://unconsciousliteracynameless.com/dfbd2c703151f97ecc1485306818e354/invoke.js';

        const container = document.getElementById('adsterra-banner-160x300-container');
        if (container && !document.querySelector('script[src*="dfbd2c703151f97ecc1485306818e354"]')) {
            container.appendChild(script);
        }

        return () => {
            // Cleanup
            if (container && script.parentNode) {
                script.parentNode.removeChild(script);
            }
        };
    }, []);

    return (
        <div className={`adsterra-banner-160x300 ${className}`}>
            <div id="adsterra-banner-160x300-container"></div>
        </div>
    );
};

export default AdsterraBanner160x300;
