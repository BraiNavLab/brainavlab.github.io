// Interactions of the optional restyling (restyle in _config.yml).
// With restyle: false in _config.yml this file can be deleted.

// Mobile menu: a button opens the regular menu, replacing the plain dropdown.
const topnav = document.querySelector('.topnav');
const mainMenu = document.getElementById('mainMenu');
if (topnav && mainMenu) {
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'nav-toggle';
    toggle.setAttribute('aria-label', 'Menu');
    toggle.setAttribute('aria-controls', 'mainMenu');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.innerHTML = '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
    topnav.prepend(toggle);
    document.documentElement.classList.add('has-nav-toggle');

    const setOpen = (open) => {
        mainMenu.classList.toggle('open', open);
        toggle.setAttribute('aria-expanded', open);
    };
    toggle.addEventListener('click', () => setOpen(!mainMenu.classList.contains('open')));

    // It also closes with Esc, with a click elsewhere and when the keyboard moves out of it.
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && mainMenu.classList.contains('open')) {
            setOpen(false);
            toggle.focus();
        }
    });
    document.addEventListener('click', (event) => {
        if (!topnav.contains(event.target)) setOpen(false);
    });
    topnav.addEventListener('focusout', (event) => {
        if (event.relatedTarget && !topnav.contains(event.relatedTarget)) setOpen(false);
    });
}

// Header shadow once the page has scrolled away from the top.
const header = document.querySelector('.header');
if (header) {
    const sentinel = document.createElement('div');
    sentinel.setAttribute('aria-hidden', 'true');
    document.body.prepend(sentinel);
    new IntersectionObserver((entries) => {
        header.classList.toggle('is-scrolled', !entries[0].isIntersecting);
    }).observe(sentinel);
}

// Funded projects: long descriptions start collapsed, with a button to expand them.
document.querySelectorAll('.funded-description').forEach((description) => {
    // A card hidden by the filter has no size: show it for a moment to measure it.
    const card = description.closest('.funded-project-card');
    const wasHidden = card.hidden;
    card.hidden = false;
    description.classList.add('is-collapsed');
    const fits = description.scrollHeight <= description.clientHeight + 2;
    card.hidden = wasHidden;
    if (fits) {
        description.classList.remove('is-collapsed');
        return;
    }
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'funded-more';
    button.textContent = 'Show more';
    button.setAttribute('aria-expanded', 'false');
    description.after(button);
    button.addEventListener('click', () => {
        const collapsed = description.classList.toggle('is-collapsed');
        button.textContent = collapsed ? 'Show more' : 'Show less';
        button.setAttribute('aria-expanded', !collapsed);
    });
});

// World map: the markers drop in the first time the map enters the screen.
const worldMap = document.querySelector('.world-map');
if (worldMap && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    worldMap.classList.add('pins-waiting');
    const mapObserver = new IntersectionObserver((entries) => {
        if (!entries[0].isIntersecting) return;
        worldMap.classList.replace('pins-waiting', 'pins-drop');
        mapObserver.disconnect();
    }, { threshold: 0.35 });
    mapObserver.observe(worldMap);
}

// Sections and cards fade in the first time they enter the screen, to guide the eye down the page.
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const items = document.querySelectorAll(
        'main > section, main > .contacts-container, main > .map-container, .people-grid-members > .card, .people-grid-others > .card, ' +
        '.research-projects-container > .card, .funded-project-card, .news-container > .news-card'
    );
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
            // Give the element back its own hover transitions once the fade is over.
            setTimeout(() => entry.target.classList.remove('reveal', 'is-visible'), 800);
        });
    }, { rootMargin: '0px 0px -8% 0px' });

    items.forEach((item) => {
        // Whatever is already on screen stays still: only what comes later fades in.
        if (item.getBoundingClientRect().top < window.innerHeight * 0.9) return;
        item.classList.add('reveal');
        observer.observe(item);
    });
}
