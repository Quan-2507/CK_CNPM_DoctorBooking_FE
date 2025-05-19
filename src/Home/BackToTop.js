import React, { useEffect, useState } from 'react';

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        isVisible && (
            <a
                href="#"
                onClick={scrollToTop}
                className="btn btn-lg btn-primary btn-lg-square rounded-circle back-to-top"
                style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}
            >
                <i className="bi bi-arrow-up"></i>
            </a>
        )
    );
};

export default BackToTop;
