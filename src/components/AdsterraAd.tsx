interface AdsterraAdProps {
    className?: string;
    buttonText?: string;
    variant?: 'primary' | 'secondary' | 'minimal';
}

const AdsterraAd = ({
    className = '',
    buttonText = 'Sponsored Content',
    variant = 'minimal'
}: AdsterraAdProps) => {
    const adsterraUrl = 'https://unconsciousliteracynameless.com/z0ba2p10hp?key=1cf9b663f71f95bc5e5e81ccb6c93133';

    const variantStyles = {
        primary: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200',
        secondary: 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 transition-all duration-200',
        minimal: 'text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 underline transition-colors duration-200'
    };

    return (
        <div className={`adsterra-container text-center ${className}`}>
            <a
                href={adsterraUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className={variantStyles[variant]}
            >
                {buttonText}
            </a>
        </div>
    );
};

export default AdsterraAd;
