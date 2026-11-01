// Behaviour shared by all pages. Loaded at the end of <body> (see _layouts/default.html).

// Mobile menu: the dropdown opens the chosen page.
const mobileNav = document.getElementById('mobileNav');
if (mobileNav) {
    mobileNav.addEventListener('change', () => {
        if (mobileNav.value) window.location.href = mobileNav.value;
    });
    // After the Back button the browser may restore the old choice: show the current page again.
    window.addEventListener('pageshow', () => {
        [...mobileNav.options].forEach((option) => { option.selected = option.defaultSelected; });
    });
}

// Filter buttons (News & Events, Funded Projects): show only the cards of the chosen category.
// The choice is kept in the URL (e.g. news.html#publication), so going back to the page restores it.
document.querySelectorAll('.filter-bar').forEach((bar) => {
    const buttons = [...bar.querySelectorAll('.filter-btn')];
    const cards = document.querySelectorAll(bar.dataset.cards);

    const select = (button) => {
        const filter = button.dataset.filter;
        buttons.forEach((b) => {
            b.classList.toggle('active', b === button);
            b.setAttribute('aria-pressed', b === button);
        });
        cards.forEach((card) => {
            card.hidden = filter !== 'all' && card.dataset.category !== filter;
        });
    };

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            select(button);
            history.replaceState(null, '', '#' + button.dataset.filter);
        });
    });

    const fromUrl = buttons.find((b) => '#' + b.dataset.filter === window.location.hash);
    select(fromUrl || bar.querySelector('.filter-btn.active'));
});

// Video player: loads the clip when the modal opens and stops it when the modal closes.
const videoModal = document.getElementById('videoModal');
if (videoModal) {
    const video = videoModal.querySelector('video');
    video.addEventListener('contextmenu', (event) => event.preventDefault());

    videoModal.addEventListener('show.bs.modal', (event) => {
        videoModal.querySelector('.modal-title').textContent = event.relatedTarget.dataset.videoTitle;
        video.src = event.relatedTarget.dataset.video;
        // Started here because this still runs inside the click, as mobile browsers require.
        // If the browser refuses anyway, the visitor can use the video controls.
        video.play().catch(() => {});
    });

    videoModal.addEventListener('hidden.bs.modal', () => {
        video.pause();
        video.removeAttribute('src');
        video.load();
    });
}

// Home news carousel: arrows move by one card, and it advances on its own every few seconds.
// Auto-advance stops while the visitor is using it (for good after a touch) and for those who prefer reduced motion.
document.querySelectorAll('.news-carousel').forEach((carousel) => {
    const track = carousel.querySelector('.news-carousel-track');
    const step = () => {
        const card = track.querySelector('.news-card');
        return card ? card.offsetWidth + parseFloat(getComputedStyle(track).columnGap) : 0;
    };
    const next = () => {
        const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
        if (atEnd) track.scrollTo({ left: 0 });
        else track.scrollBy({ left: step() });
    };
    const previous = () => {
        if (track.scrollLeft <= 2) track.scrollTo({ left: track.scrollWidth });
        else track.scrollBy({ left: -step() });
    };

    carousel.querySelector('.carousel-btn-next').addEventListener('click', next);
    carousel.querySelector('.carousel-btn-prev').addEventListener('click', previous);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let touched = false;
    let onScreen = false;
    carousel.addEventListener('touchstart', () => { touched = true; }, { passive: true });
    new IntersectionObserver((entries) => { onScreen = entries[0].isIntersecting; }).observe(carousel);

    setInterval(() => {
        const inUse = touched || carousel.matches(':hover, :focus-within') || document.querySelector('.modal.show');
        if (onScreen && !inUse && !document.hidden) next();
    }, 6000);
});
