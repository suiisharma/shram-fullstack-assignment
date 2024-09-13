
import PropTypes from 'prop-types';

const FullScreenLoadingSpinner = ({ color = '#4CAF50' }) => {
    const overlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        zIndex: 9999,
    };

    const spinnerContainerStyle = {
        position: 'relative',
        width: '200px',
        height: '200px',
    };

    const textStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: color,
    };

    return (
        <div style={overlayStyle}>
            <div style={spinnerContainerStyle}>
                <svg width="200" height="200" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor={color} stopOpacity="1" />
                            <stop offset="100%" stopColor={color} stopOpacity="0.2" />
                        </linearGradient>
                    </defs>

                    {/* Outer rotating ring */}
                    <circle cx="50" cy="50" r="45" fill="none" stroke="url(#gradient)" strokeWidth="8" strokeLinecap="round">
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            dur="2s"
                            repeatCount="indefinite"
                            from="0 50 50"
                            to="360 50 50"
                        />
                    </circle>

                    {/* Inner pulsing circle */}
                    <circle cx="50" cy="50" r="30" fill={color}>
                        <animate
                            attributeName="r"
                            values="30;35;30"
                            dur="1.5s"
                            repeatCount="indefinite"
                        />
                        <animate
                            attributeName="opacity"
                            values="0.8;1;0.8"
                            dur="1.5s"
                            repeatCount="indefinite"
                        />
                    </circle>

                    {/* Orbiting small circles */}
                    {[0, 120, 240].map((angle) => (
                        <circle key={angle} cx="50" cy="20" r="6" fill={color}>
                            <animateTransform
                                attributeName="transform"
                                type="rotate"
                                dur="3s"
                                repeatCount="indefinite"
                                from={`${angle} 50 50`}
                                to={`${angle + 360} 50 50`}
                            />
                        </circle>
                    ))}
                </svg>
                <div style={textStyle}>Loading...</div>
            </div>
        </div>
    );
}
FullScreenLoadingSpinner.propTypes = {
    color: PropTypes.string,
};

export default FullScreenLoadingSpinner;