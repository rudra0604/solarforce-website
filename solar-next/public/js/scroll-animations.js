// Scroll-based section animations
document.addEventListener('DOMContentLoaded', function() {
    // Add animation classes to all sections
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section, index) => {
        // Add initial hidden state
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        
        // Stagger animation delays slightly
        section.style.transitionDelay = `${index * 0.05}s`;
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate section when it enters viewport
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Optional: unobserve after animation (remove if you want animation on scroll up too)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections
    sections.forEach(section => {
        observer.observe(section);
    });

    // Animate cards within sections with stagger effect
    const animateCards = () => {
        const cards = document.querySelectorAll('.animate-card');
        
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Stagger card animations
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) scale(1)';
                    }, index * 100);
                    
                    cardObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px) scale(0.95)';
            card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            cardObserver.observe(card);
        });
    };

    // Run card animations after a brief delay
    setTimeout(animateCards, 100);

    // Animate FAQ accordions
    const faqItems = document.querySelectorAll('.accordion-item');
    if (faqItems.length > 0) {
        const faqObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, index * 80);
                    
                    faqObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        faqItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
            faqObserver.observe(item);
        });
    }
});
