// Navbar hide on scroll down, show on scroll up
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    if (!header) return;

    let lastScrollTop = 0;
    let scrollThreshold = 100; // Start hiding after 100px scroll
    let isScrolling;

    // Add transition to header
    header.style.transition = 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out';

    window.addEventListener('scroll', function() {
        // Clear timeout throughout the scroll
        window.clearTimeout(isScrolling);

        // Set a timeout to run after scrolling ends
        isScrolling = setTimeout(function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // Add shadow when scrolled
            if (scrollTop > 10) {
                header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
            } else {
                header.style.boxShadow = '';
            }

            // Only start hiding/showing after scrollThreshold
            if (scrollTop > scrollThreshold) {
                if (scrollTop > lastScrollTop) {
                    // Scrolling down - hide navbar
                    header.style.transform = 'translateY(-100%)';
                } else {
                    // Scrolling up - show navbar
                    header.style.transform = 'translateY(0)';
                }
            } else {
                // Always show navbar at top
                header.style.transform = 'translateY(0)';
            }

            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        }, 50); // Wait 50ms after scroll stops
    }, false);

    // Hover over navbar area to show it even when hidden
    let navbarTimeout;
    const navbarHeight = header.offsetHeight;

    document.addEventListener('mousemove', function(e) {
        // If mouse is near top of screen, show navbar
        if (e.clientY < navbarHeight + 20) {
            clearTimeout(navbarTimeout);
            header.style.transform = 'translateY(0)';
        }
    });
});
