// Portfolio Gallery Logic

const initialPhotos = [
    { id: 1, category: 'wedding', src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800', size: 'tall' },
    { id: 2, category: 'wedding', src: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800', size: 'wide' },
    { id: 3, category: 'portrait', src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800', size: 'normal' },
    { id: 4, category: 'event', src: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=800', size: 'tall' },
    { id: 5, category: 'wedding', src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800', size: 'normal' },
    { id: 6, category: 'portrait', src: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800', size: 'wide' },
    { id: 7, category: 'event', src: 'https://images.unsplash.com/photo-1514525253344-f814d0743b1a?auto=format&fit=crop&q=80&w=800', size: 'normal' },
    { id: 8, category: 'portrait', src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800', size: 'tall' },
    { id: 9, category: 'wedding', src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800', size: 'normal' },
    { id: 10, category: 'portrait', src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=800', size: 'wide' },
    { id: 11, category: 'event', src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800', size: 'tall' },
    { id: 12, category: 'wedding', src: 'https://images.unsplash.com/photo-1509927083803-4bd519298ac4?auto=format&fit=crop&q=80&w=800', size: 'normal' }
];

// Initialize localStorage if empty
if (!localStorage.getItem('portfolio_photos')) {
    localStorage.setItem('portfolio_photos', JSON.stringify(initialPhotos));
}

function renderGallery(filter = 'all') {
    const gallery = document.getElementById('portfolio-gallery');
    const photos = JSON.parse(localStorage.getItem('portfolio_photos')) || [];

    // Clear with a brief fade-out effect if needed, or just clear directly for snappier feel
    gallery.innerHTML = '';

    const filteredPhotos = filter === 'all'
        ? photos
        : photos.filter(p => p.category === filter);

    filteredPhotos.forEach((photo, index) => {
        const item = document.createElement('div');
        // Use gallery-fade for a scale + opacity entrance
        item.className = `gallery-item ${photo.size || 'normal'} gallery-fade`;
        item.style.transitionDelay = `${index * 0.1}s`;

        item.innerHTML = `
            <img src="${photo.src}" alt="${photo.category}">
            <div class="overlay">
                <span>View Project</span>
            </div>
        `;
        gallery.appendChild(item);

        // Trigger visibility after a short frame to ensure transition plays
        requestAnimationFrame(() => {
            item.classList.add('visible');
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderGallery();

    // Filtering logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Re-render
            const filter = btn.getAttribute('data-filter');
            renderGallery(filter);
        });
    });
});
