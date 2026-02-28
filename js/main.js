/* ========================================
   ASPMG - Main JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', function () {

    // 1. Counter Animation (Trust Bar)
    function animateCounters() {
        var counters = document.querySelectorAll('.trust-number');
        counters.forEach(function (counter) {
            var target = parseInt(counter.getAttribute('data-count'));
            var duration = 2000;
            var start = performance.now();

            function update(currentTime) {
                var elapsed = currentTime - start;
                var progress = Math.min(elapsed / duration, 1);
                var eased = 1 - Math.pow(1 - progress, 3);
                counter.textContent = Math.floor(eased * target);
                if (progress < 1) requestAnimationFrame(update);
            }
            requestAnimationFrame(update);
        });
    }

    var trustBar = document.querySelector('.trust-bar');
    if (trustBar) {
        var trustObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateCounters();
                    trustObserver.disconnect();
                }
            });
        }, { threshold: 0.3 });
        trustObserver.observe(trustBar);
    }

    // 2. Navbar: Add shadow and shrink on scroll
    var navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 100) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        });
    }

    // 3. Scroll-to-Top Button
    var scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="bx bx-chevron-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollBtn);

    window.addEventListener('scroll', function () {
        if (window.scrollY > 500) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
    scrollBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 4. Intersection Observer for fade-in animations
    var fadeObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.fade-in-up').forEach(function (el) {
        fadeObserver.observe(el);
    });

    // 5. Document/Payment Search
    var searchInput = document.getElementById('docSearch') || document.getElementById('communitySearch');
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            var query = this.value.toLowerCase();
            var items = document.querySelectorAll('.doc-item, .community-item');
            items.forEach(function (item) {
                var name = item.getAttribute('data-name').toLowerCase();
                item.style.display = name.includes(query) ? '' : 'none';
            });
        });
    }

    // 6. Active nav link highlighting on scroll (homepage only)
    var sections = document.querySelectorAll('section[id]');
    if (sections.length > 2) {
        window.addEventListener('scroll', function () {
            var scrollPos = window.scrollY + 150;
            sections.forEach(function (section) {
                var top = section.offsetTop;
                var height = section.offsetHeight;
                var id = section.getAttribute('id');
                var link = document.querySelector('.nav-link[href*="' + id + '"]');
                if (link) {
                    if (scrollPos >= top && scrollPos < top + height) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                }
            });
        });
    }

    // 7. Copyright year auto-update
    var yearEls = document.querySelectorAll('.copyright-year');
    yearEls.forEach(function (el) {
        el.textContent = new Date().getFullYear();
    });
});
