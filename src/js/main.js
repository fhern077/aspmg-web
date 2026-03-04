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

    // 2b. Navbar collapse (hamburger menu)
    var toggler = document.querySelector('.navbar-toggler');
    var collapse = document.getElementById('navbarNav');
    if (toggler && collapse) {
        toggler.addEventListener('click', function () {
            var expanded = collapse.classList.toggle('show');
            toggler.setAttribute('aria-expanded', expanded);
        });
        collapse.querySelectorAll('.nav-link:not(.dropdown-toggle)').forEach(function (link) {
            link.addEventListener('click', function () {
                collapse.classList.remove('show');
                toggler.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // 2c. Dropdown toggle
    function closeAllDropdowns() {
        document.querySelectorAll('.dropdown-menu.show').forEach(function (m) {
            m.classList.remove('show');
        });
        document.querySelectorAll('.dropdown-toggle.show').forEach(function (t) {
            t.classList.remove('show');
            t.setAttribute('aria-expanded', 'false');
        });
    }
    document.querySelectorAll('.dropdown-toggle').forEach(function (toggle) {
        toggle.addEventListener('click', function (e) {
            e.preventDefault();
            var menu = this.nextElementSibling;
            if (!menu) return;
            var wasOpen = menu.classList.contains('show');
            closeAllDropdowns();
            if (!wasOpen) {
                menu.classList.add('show');
                this.classList.add('show');
                this.setAttribute('aria-expanded', 'true');
            }
        });
    });
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.dropdown')) closeAllDropdowns();
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeAllDropdowns();
    });

    // 2d. FAQ Accordion
    var faqAccordion = document.getElementById('faqAccordion');
    if (faqAccordion) {
        faqAccordion.addEventListener('click', function (e) {
            var btn = e.target.closest('.accordion-button');
            if (!btn) return;
            var targetSel = btn.getAttribute('data-bs-target');
            var panel = document.querySelector(targetSel);
            if (!panel) return;
            var isOpen = panel.classList.contains('show');
            // Close all panels
            faqAccordion.querySelectorAll('.accordion-collapse.show').forEach(function (p) {
                p.classList.remove('show');
                var b = p.closest('.accordion-item').querySelector('.accordion-button');
                if (b) { b.classList.add('collapsed'); b.setAttribute('aria-expanded', 'false'); }
            });
            // Toggle clicked panel
            if (!isOpen) {
                panel.classList.add('show');
                btn.classList.remove('collapsed');
                btn.setAttribute('aria-expanded', 'true');
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

    // 8. Contact Form Submission
    var contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            var btn = document.getElementById('contactSubmitBtn');
            var alert = document.getElementById('contactAlert');
            var form = this;

            // Gather fields
            var name = form.querySelector('[name="name"]').value.trim();
            var email = form.querySelector('[name="email"]').value.trim();
            var phone = form.querySelector('[name="phone"]').value.trim();
            var community = form.querySelector('[name="community"]').value.trim();
            var subject = form.querySelector('[name="subject"]').value.trim();
            var message = form.querySelector('[name="message"]').value.trim();
            var website = form.querySelector('[name="website"]').value;

            // Basic validation
            if (!name || !email || !subject || !message) {
                showAlert('Please fill in all required fields.', 'danger');
                return;
            }

            // Build message with subject and community context
            var fullMessage = '[' + subject + ']';
            if (community) fullMessage += ' Community: ' + community;
            fullMessage += '\n\n' + message;

            // Disable button
            var originalHTML = btn.innerHTML;
            btn.disabled = true;
            btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Sending...';

            fetch('https://applyhoa.com/api/contact/aspmg', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    phone: phone || '',
                    message: fullMessage,
                    website: website
                })
            })
            .then(function (res) { return res.json(); })
            .then(function (data) {
                if (data.data && data.data.success) {
                    showAlert('Message sent successfully! We\'ll get back to you soon.', 'success');
                    form.reset();
                } else {
                    showAlert(data.error ? data.error.message : 'Something went wrong. Please try again.', 'danger');
                }
            })
            .catch(function () {
                showAlert('Unable to send message. Please call us at (305) 661-8400.', 'danger');
            })
            .finally(function () {
                btn.disabled = false;
                btn.innerHTML = originalHTML;
            });

            function showAlert(msg, type) {
                alert.style.display = 'block';
                alert.className = 'col-12 alert alert-' + type;
                alert.textContent = msg;
                if (type === 'success') {
                    setTimeout(function () { alert.style.display = 'none'; }, 6000);
                }
            }
        });
    }
});
