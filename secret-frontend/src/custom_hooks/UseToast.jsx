import { useState, useEffect } from 'react';
import "../stylesheets/toastStyles.css"


const useToast = (initialMessage = '') => {
    const [message, setMessage] = useState(initialMessage);
    const [isVisible, setIsVisible] = useState(false);

    const showToast = (text) => {
        setMessage(text);
        setIsVisible(true);

        setTimeout(() => {
            setIsVisible(false);
        }, 2000);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, [isVisible]);

    const toastElement = (
        <div className={"toast"} style={{ display: isVisible ? 'block' : 'none' }}>
            {message}
        </div>
    );

    return { showToast, toastElement };

};

export default useToast;