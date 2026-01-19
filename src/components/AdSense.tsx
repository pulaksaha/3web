import { useEffect } from 'react';

interface AdSenseProps {
    adSlot?: string;
    adFormat?: 'auto' | 'fluid' | 'rectangle';
    className?: string;
}

const AdSense = ({
    adSlot = '1234567890', // You'll need to replace with actual ad slot IDs from AdSense
    adFormat = 'auto',
    className = ''
}: AdSenseProps) => {
    useEffect(() => {
        try {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.error('AdSense error:', err);
        }
    }, []);

    return (
        <div className={`adsense-container ${className}`}>
            <ins
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-5297566026315707"
                data-ad-slot={adSlot}
                data-ad-format={adFormat}
                data-full-width-responsive="true"
            />
        </div>
    );
};

export default AdSense;
