/* ========================================
   ASPMG - Internationalization (i18n)
   English / Spanish
   ======================================== */

(function () {
    'use strict';

    var translations = {
        en: {
            // Topbar
            'topbar.address': '85 Grand Canal Dr, Unit 201, Miami, FL 33144',
            'lang.toggle': 'ES',

            // Navbar
            'nav.home': 'Home',
            'nav.about': 'About',
            'nav.services': 'Services',
            'nav.testimonials': 'Testimonials',
            'nav.faq': 'FAQ',
            'nav.contact': 'Contact',
            'nav.resident_portal': 'Resident Portal',
            'nav.make_payment': 'Make a Payment',
            'nav.community_docs': 'Community Documents',

            // Hero
            'hero.label': "Miami & Broward County's Trusted Partner",
            'hero.title_1': 'Your Community.',
            'hero.title_2': 'Our Commitment.',
            'hero.desc': 'Full-service HOA and condominium association management with 20+ years of dedicated experience protecting and enhancing your property investment.',
            'hero.cta_proposal': 'Request a Proposal',
            'hero.cta_services': 'Our Services',
            'hero.card1_title': 'Trusted Management',
            'hero.card1_desc': '20+ years protecting property investments across South Florida',
            'hero.card2_title': '20+ Communities',
            'hero.card2_desc': 'HOA & condo associations throughout Miami-Dade & Broward',
            'hero.card3_title': '24/7 Emergency Service',
            'hero.card3_desc': 'Round-the-clock support when your community needs it most',

            // Trust Bar
            'trust.years': 'Years of Experience',
            'trust.communities': 'Communities Managed',
            'trust.emergency': 'Emergency Support',

            // About
            'about.label': 'About ASPMG',
            'about.title': 'Dedicated Property Management<br>in Miami & Broward County',
            'about.lead': 'ASPMG delivers professional and cost-effective property management with your goals in mind.',
            'about.desc': 'Our property management team develops strategic plans to enhance common areas, make effective repairs, reduce costs, and plan for major projects \u2014 all while managing daily operations seamlessly.',
            'about.feat1_title': 'Transparent Communication',
            'about.feat1_desc': 'Regular updates so you are never surprised by what is happening with your properties.',
            'about.feat2_title': 'Personalized Service',
            'about.feat2_desc': 'To us you are not "just another client." We provide customized management solutions.',
            'about.feat3_title': '24/7 Emergency Response',
            'about.feat3_desc': 'Round-the-clock service to handle any emergency repairs that may arise.',
            'about.badge_text': 'Years of<br>Excellence',

            // Services
            'services.label': 'Our Services',
            'services.title': 'Comprehensive Property<br>Management Solutions',
            'services.subtitle': "End-to-end management tailored to your community's needs",
            'services.financial_title': 'Financial Management',
            'services.financial_desc': 'Annual CAM reconciliation, accounts receivable and payable management, monthly statements, audits, annual budget preparation, and financial reporting.',
            'services.maintenance_title': 'Maintenance',
            'services.maintenance_desc': 'Customized maintenance plans, vendor supervision, bid/selection process management, repair notices, and 24-hour emergency service at your disposal.',
            'services.property_title': 'Property Management',
            'services.property_desc': 'Strategic community plans for long-term property value, meetings, elections, budgets, guard services, violations, parking, and day-to-day operations.',
            'services.tech_title': 'Technology',
            'services.tech_desc': 'Online accounts, payment portals, electronic forms, website construction, and electronic communications for modern, efficient management.',
            'services.comms_title': 'Communications',
            'services.comms_desc': 'Private client accounts with regular updates on inspections, financial reports, notices, maintenance, and projects. Stay informed at all times.',
            'services.inspect_title': 'Inspections',
            'services.inspect_desc': 'Regular property walks and thorough documentation. Preventive maintenance plans that have led to significant savings and lowered property insurance.',
            'services.learn_more': 'Learn More',

            // Differentiators
            'diff.label': 'Why Choose ASPMG',
            'diff.title': 'We Treat Your Community<br>Like Our Own',
            'diff.1_title': 'Local Expertise',
            'diff.1_desc': 'Deep knowledge of Miami-Dade and Broward County regulations, vendors, and community needs.',
            'diff.2_title': 'Cost Savings',
            'diff.2_desc': 'Strategic financial planning that has eliminated the need for special assessments in our communities.',
            'diff.3_title': 'Proactive Inspections',
            'diff.3_desc': 'Regular property walks and preventive maintenance leading to significant savings on costly repairs.',
            'diff.4_title': 'Technology Forward',
            'diff.4_desc': 'Online accounts, payment portals, electronic forms, and digital communications for modern management.',

            // Testimonials
            'testimonials.label': 'Testimonials',
            'testimonials.title': 'What Our Communities<br>Say About Us',
            'testimonial.1': '"ASPMG has provided nothing but excellent service for three years. They have managed several of my units. Being in the Real Estate industry I deal with 10+ associations a year and few are as attentive and diligent. I highly recommend their services."',
            'testimonial.1_role': 'Association Board Member',
            'testimonial.2': '"This is a very reliable management company. They work very hard in our association, looking for smart solutions to our problems. Thanks to this company, the financials in our community have improved 200%. I recommend this management company for anyone who wants a peaceful community and smart solutions."',
            'testimonial.2_role': 'Association Board Member',
            'testimonial.3': '"I absolutely love this management group! In this crazy condo world you need people who care and are willing to go the extra mile. They walk the property almost daily, stay late problem solving, and offer suggestions that better our community. Their honesty is undeniable!"',
            'testimonial.3_role': 'Association Board Member',
            'testimonial.4': '"A Solid Property Management has been working for my association for 4 and a half years and we have had a great experience. We have had no increase in maintenance costs, redone our roofing, obtained our 40-year re-certification, and repainted our community \u2014 all without a special assessment."',
            'testimonial.4_role': 'Resident',

            // FAQ
            'faq.label': 'FAQ',
            'faq.title': 'Frequently Asked Questions',
            'faq.q1': 'What services does ASPMG provide?',
            'faq.a1': 'ASPMG provides full-service property management including financial management, maintenance coordination, property inspections, technology solutions, and 24/7 emergency response for HOA and condominium associations in Miami-Dade and Broward County.',
            'faq.q2': 'How do I make a payment for my community?',
            'faq.a2': 'You can make secure online payments through our <a href="payments.html">Payments portal</a>. Simply find your community name and click to be directed to our secure payment processor, DirectBiller.',
            'faq.q3': 'What areas does ASPMG serve?',
            'faq.a3': 'We serve communities throughout Miami-Dade County and Broward County, Florida. Our local expertise allows us to provide responsive, hands-on management with deep knowledge of regional regulations and vendors.',
            'faq.q4': 'How can I submit a maintenance request?',
            'faq.a4': 'You can submit maintenance requests by contacting our office at <a href="tel:3056618400">(305) 661-8400</a> or emailing <a href="mailto:info@aspmg.com">info@aspmg.com</a>. For emergencies, our 24/7 service line is always available.',
            'faq.q5': 'How do I apply to rent or purchase in a managed community?',
            'faq.a5': 'Visit our <a href="documents.html">Community Documents</a> page to download the application for your specific community. Completed applications can be submitted to our office along with any required documentation.',
            'faq.q6': 'What makes ASPMG different from larger management companies?',
            'faq.a6': 'At ASPMG, you are never "just another client." We provide personalized, hands-on service with direct access to your management team. Our boutique approach means your community gets the dedicated attention it deserves, backed by 20+ years of local expertise.',

            // CTA
            'cta.title': 'Is Your Community Lost Within<br>a Giant Management Company?',
            'cta.desc': 'At ASPMG, you are never "just another client." Let us show you what personalized, dedicated property management looks like.',
            'cta.btn': 'Request a Free Consultation',

            // Contact
            'contact.label': 'Contact Us',
            'contact.title': 'Ready to Elevate Your<br>Community Management?',
            'contact.office': 'Our Office',
            'contact.phone': 'Phone',
            'contact.email': 'Email',
            'contact.form_name': 'Full Name *',
            'contact.form_email': 'Email *',
            'contact.form_phone': 'Phone',
            'contact.form_community': 'Community Name',
            'contact.form_subject': 'Subject *',
            'contact.form_subject_default': 'Select a topic...',
            'contact.form_subject_1': 'Request a Management Proposal',
            'contact.form_subject_2': 'Maintenance Request',
            'contact.form_subject_3': 'Billing Question',
            'contact.form_subject_4': 'General Inquiry',
            'contact.form_message': 'Message *',
            'contact.form_submit': 'Send Message',
            'contact.form_placeholder_name': 'John Smith',
            'contact.form_placeholder_email': 'john@example.com',
            'contact.form_placeholder_phone': '(305) 555-0000',
            'contact.form_placeholder_community': 'Your community',
            'contact.form_placeholder_message': 'How can we help you?',

            // Footer
            'footer.desc': 'Full-service HOA and condominium association management serving Miami-Dade and Broward County for over 20 years.',
            'footer.quick_links': 'Quick Links',
            'footer.resident_resources': 'Resident Resources',
            'footer.contact': 'Contact',
            'footer.home': 'Home',
            'footer.about': 'About Us',
            'footer.services': 'Services',
            'footer.testimonials': 'Testimonials',
            'footer.contact_link': 'Contact',
            'footer.payments': 'Make a Payment',
            'footer.documents': 'Community Documents',
            'footer.faq': 'FAQ',
            'footer.copyright': 'A Solid Property Management Group. All rights reserved.',
            'footer.serving': 'Serving Miami-Dade & Broward County',

            // Documents Page
            'docs.hero_label': 'Resident Resources',
            'docs.hero_title': 'Community Documents',
            'docs.hero_desc': 'Download applications and banking forms for your community',
            'docs.search_placeholder': 'Search documents by community name...',
            'docs.applications_title': 'Community Applications',
            'docs.ach_title': 'ACH / Banking Forms',

            // Payments Page
            'pay.hero_label': 'Resident Resources',
            'pay.hero_title': 'Online Payments',
            'pay.hero_desc': 'Make convenient and secure online payments for your community',
            'pay.search_placeholder': 'Find your community...',
            'pay.subtitle': 'Select your community below to make a secure online payment via DirectBiller',
            'pay.badge': 'Pay Now'
        },

        es: {
            // Topbar
            'topbar.address': '85 Grand Canal Dr, Suite 201, Miami, FL 33144',
            'lang.toggle': 'EN',

            // Navbar
            'nav.home': 'Inicio',
            'nav.about': 'Nosotros',
            'nav.services': 'Servicios',
            'nav.testimonials': 'Testimonios',
            'nav.faq': 'Preguntas',
            'nav.contact': 'Contacto',
            'nav.resident_portal': 'Portal de Residentes',
            'nav.make_payment': 'Realizar un Pago',
            'nav.community_docs': 'Documentos',

            // Hero
            'hero.label': 'Su Aliado de Confianza en Miami y Broward',
            'hero.title_1': 'Su Comunidad.',
            'hero.title_2': 'Nuestro Compromiso.',
            'hero.desc': 'Administraci\u00f3n integral de asociaciones HOA y condominios con m\u00e1s de 20 a\u00f1os de experiencia dedicada a proteger y valorizar su inversi\u00f3n inmobiliaria.',
            'hero.cta_proposal': 'Solicitar Propuesta',
            'hero.cta_services': 'Nuestros Servicios',
            'hero.card1_title': 'Gesti\u00f3n de Confianza',
            'hero.card1_desc': 'M\u00e1s de 20 a\u00f1os protegiendo inversiones inmobiliarias en el sur de la Florida',
            'hero.card2_title': '20+ Comunidades',
            'hero.card2_desc': 'Asociaciones HOA y condominios en Miami-Dade y Broward',
            'hero.card3_title': 'Emergencias 24/7',
            'hero.card3_desc': 'Atenci\u00f3n las 24 horas cuando su comunidad m\u00e1s lo necesita',

            // Trust Bar
            'trust.years': 'A\u00f1os de Experiencia',
            'trust.communities': 'Comunidades Administradas',
            'trust.emergency': 'Soporte de Emergencia',

            // About
            'about.label': 'Sobre ASPMG',
            'about.title': 'Administraci\u00f3n Dedicada<br>en Miami y Broward',
            'about.lead': 'ASPMG ofrece administraci\u00f3n profesional y rentable con sus objetivos como prioridad.',
            'about.desc': 'Nuestro equipo desarrolla planes estrat\u00e9gicos para mejorar \u00e1reas comunes, realizar reparaciones efectivas, reducir costos y planificar proyectos importantes \u2014 todo mientras manejamos las operaciones del d\u00eda a d\u00eda sin contratiempos.',
            'about.feat1_title': 'Comunicaci\u00f3n Transparente',
            'about.feat1_desc': 'Actualizaciones constantes para que siempre est\u00e9 al tanto de lo que ocurre en su propiedad.',
            'about.feat2_title': 'Servicio Personalizado',
            'about.feat2_desc': 'Para nosotros usted no es "un cliente m\u00e1s." Ofrecemos soluciones de administraci\u00f3n a la medida.',
            'about.feat3_title': 'Emergencias 24/7',
            'about.feat3_desc': 'Servicio las 24 horas para atender cualquier reparaci\u00f3n de emergencia que pueda surgir.',
            'about.badge_text': 'A\u00f1os de<br>Excelencia',

            // Services
            'services.label': 'Nuestros Servicios',
            'services.title': 'Soluciones Integrales de<br>Administraci\u00f3n de Propiedades',
            'services.subtitle': 'Gesti\u00f3n completa adaptada a las necesidades de su comunidad',
            'services.financial_title': 'Gesti\u00f3n Financiera',
            'services.financial_desc': 'Conciliaci\u00f3n anual de CAM, cuentas por cobrar y pagar, estados mensuales, auditor\u00edas, preparaci\u00f3n de presupuesto y reportes financieros.',
            'services.maintenance_title': 'Mantenimiento',
            'services.maintenance_desc': 'Planes personalizados de mantenimiento, supervisi\u00f3n de proveedores, gesti\u00f3n de licitaciones, avisos de reparaci\u00f3n y servicio de emergencia las 24 horas.',
            'services.property_title': 'Administraci\u00f3n de Propiedades',
            'services.property_desc': 'Planes estrat\u00e9gicos para valor a largo plazo: reuniones, elecciones, presupuestos, seguridad, violaciones, estacionamiento y operaciones diarias.',
            'services.tech_title': 'Tecnolog\u00eda',
            'services.tech_desc': 'Cuentas en l\u00ednea, portales de pago, formularios electr\u00f3nicos, construcci\u00f3n de sitios web y comunicaciones digitales para una gesti\u00f3n moderna.',
            'services.comms_title': 'Comunicaciones',
            'services.comms_desc': 'Cuentas privadas con actualizaciones sobre inspecciones, reportes financieros, avisos, mantenimiento y proyectos. Est\u00e9 siempre informado.',
            'services.inspect_title': 'Inspecciones',
            'services.inspect_desc': 'Recorridos regulares con documentaci\u00f3n detallada. Planes de mantenimiento preventivo que han generado ahorros significativos y reducido costos de seguro.',
            'services.learn_more': 'M\u00e1s Informaci\u00f3n',

            // Differentiators
            'diff.label': 'Por Qu\u00e9 Elegirnos',
            'diff.title': 'Tratamos Su Comunidad<br>Como Propia',
            'diff.1_title': 'Experiencia Local',
            'diff.1_desc': 'Conocimiento profundo de regulaciones, proveedores y necesidades de Miami-Dade y Broward.',
            'diff.2_title': 'Ahorro de Costos',
            'diff.2_desc': 'Planificaci\u00f3n financiera estrat\u00e9gica que ha eliminado la necesidad de derramas especiales en nuestras comunidades.',
            'diff.3_title': 'Inspecciones Proactivas',
            'diff.3_desc': 'Recorridos regulares y mantenimiento preventivo que generan ahorros significativos en reparaciones costosas.',
            'diff.4_title': 'Innovaci\u00f3n Tecnol\u00f3gica',
            'diff.4_desc': 'Cuentas en l\u00ednea, portales de pago, formularios electr\u00f3nicos y comunicaciones digitales para una administraci\u00f3n moderna.',

            // Testimonials
            'testimonials.label': 'Testimonios',
            'testimonials.title': 'Lo Que Dicen<br>Nuestras Comunidades',
            'testimonial.1': '"ASPMG nos ha brindado un servicio excepcional durante tres a\u00f1os. Han administrado varias de mis unidades. En mi experiencia en bienes ra\u00edces trato con m\u00e1s de 10 asociaciones al a\u00f1o y pocas son tan atentas y diligentes. Los recomiendo ampliamente."',
            'testimonial.1_role': 'Miembro de Junta Directiva',
            'testimonial.2': '"Es una compa\u00f1\u00eda de administraci\u00f3n muy confiable. Trabajan con dedicaci\u00f3n en nuestra asociaci\u00f3n, buscando soluciones inteligentes a nuestros problemas. Gracias a ellos, las finanzas de nuestra comunidad han mejorado un 200%. Los recomiendo a quien desee una comunidad tranquila con soluciones inteligentes."',
            'testimonial.2_role': 'Miembro de Junta Directiva',
            'testimonial.3': '"\u00a1Me encanta esta empresa de administraci\u00f3n! En este mundo de condominios se necesitan personas comprometidas que est\u00e9n dispuestas a dar la milla extra. Recorren la propiedad casi a diario, se quedan hasta tarde resolviendo problemas y ofrecen sugerencias que mejoran nuestra comunidad. \u00a1Su honestidad es innegable!"',
            'testimonial.3_role': 'Miembro de Junta Directiva',
            'testimonial.4': '"A Solid Property Management ha trabajado para nuestra asociaci\u00f3n durante 4 a\u00f1os y medio con excelentes resultados. No hemos tenido aumentos en costos de mantenimiento, renovamos el techo, obtuvimos la recertificaci\u00f3n de 40 a\u00f1os y repintamos la comunidad \u2014 todo sin derramas especiales."',
            'testimonial.4_role': 'Residente',

            // FAQ
            'faq.label': 'Preguntas Frecuentes',
            'faq.title': 'Preguntas Frecuentes',
            'faq.q1': '\u00bfQu\u00e9 servicios ofrece ASPMG?',
            'faq.a1': 'ASPMG ofrece administraci\u00f3n integral de propiedades que incluye gesti\u00f3n financiera, coordinaci\u00f3n de mantenimiento, inspecciones, soluciones tecnol\u00f3gicas y respuesta de emergencia 24/7 para asociaciones HOA y condominios en Miami-Dade y Broward.',
            'faq.q2': '\u00bfC\u00f3mo puedo realizar un pago para mi comunidad?',
            'faq.a2': 'Puede realizar pagos seguros en l\u00ednea a trav\u00e9s de nuestro <a href="payments.html">portal de pagos</a>. Simplemente busque el nombre de su comunidad y haga clic para ser dirigido a nuestro procesador seguro, DirectBiller.',
            'faq.q3': '\u00bfQu\u00e9 \u00e1reas atiende ASPMG?',
            'faq.a3': 'Atendemos comunidades en todo Miami-Dade y Broward, Florida. Nuestro conocimiento local nos permite ofrecer una administraci\u00f3n receptiva y pr\u00e1ctica con profundo conocimiento de regulaciones regionales y proveedores.',
            'faq.q4': '\u00bfC\u00f3mo puedo enviar una solicitud de mantenimiento?',
            'faq.a4': 'Puede enviar solicitudes de mantenimiento contactando nuestra oficina al <a href="tel:3056618400">(305) 661-8400</a> o por correo a <a href="mailto:info@aspmg.com">info@aspmg.com</a>. Para emergencias, nuestra l\u00ednea 24/7 est\u00e1 siempre disponible.',
            'faq.q5': '\u00bfC\u00f3mo solicito alquilar o comprar en una comunidad administrada?',
            'faq.a5': 'Visite nuestra p\u00e1gina de <a href="documents.html">Documentos</a> para descargar la solicitud de su comunidad espec\u00edfica. Las solicitudes completadas pueden entregarse en nuestra oficina junto con la documentaci\u00f3n requerida.',
            'faq.q6': '\u00bfQu\u00e9 diferencia a ASPMG de las grandes compa\u00f1\u00edas de administraci\u00f3n?',
            'faq.a6': 'En ASPMG usted nunca es "un cliente m\u00e1s." Ofrecemos un servicio personalizado y cercano con acceso directo a su equipo de administraci\u00f3n. Nuestro enfoque boutique garantiza que su comunidad reciba la atenci\u00f3n dedicada que merece, respaldada por m\u00e1s de 20 a\u00f1os de experiencia local.',

            // CTA
            'cta.title': '\u00bfSu Comunidad Se Pierde Dentro<br>de una Gran Empresa Administradora?',
            'cta.desc': 'En ASPMG usted nunca es "un cliente m\u00e1s." Perm\u00edtanos mostrarle lo que significa una administraci\u00f3n personalizada y dedicada.',
            'cta.btn': 'Solicitar Consulta Gratuita',

            // Contact
            'contact.label': 'Cont\u00e1ctenos',
            'contact.title': '\u00bfListo Para Elevar la Administraci\u00f3n<br>de Su Comunidad?',
            'contact.office': 'Nuestra Oficina',
            'contact.phone': 'Tel\u00e9fono',
            'contact.email': 'Correo',
            'contact.form_name': 'Nombre Completo *',
            'contact.form_email': 'Correo Electr\u00f3nico *',
            'contact.form_phone': 'Tel\u00e9fono',
            'contact.form_community': 'Nombre de Comunidad',
            'contact.form_subject': 'Asunto *',
            'contact.form_subject_default': 'Seleccione un tema...',
            'contact.form_subject_1': 'Solicitar Propuesta de Administraci\u00f3n',
            'contact.form_subject_2': 'Solicitud de Mantenimiento',
            'contact.form_subject_3': 'Consulta de Facturaci\u00f3n',
            'contact.form_subject_4': 'Consulta General',
            'contact.form_message': 'Mensaje *',
            'contact.form_submit': 'Enviar Mensaje',
            'contact.form_placeholder_name': 'Juan P\u00e9rez',
            'contact.form_placeholder_email': 'juan@ejemplo.com',
            'contact.form_placeholder_phone': '(305) 555-0000',
            'contact.form_placeholder_community': 'Su comunidad',
            'contact.form_placeholder_message': '\u00bfEn qu\u00e9 podemos ayudarle?',

            // Footer
            'footer.desc': 'Administraci\u00f3n integral de asociaciones HOA y condominios sirviendo a Miami-Dade y Broward por m\u00e1s de 20 a\u00f1os.',
            'footer.quick_links': 'Enlaces R\u00e1pidos',
            'footer.resident_resources': 'Recursos para Residentes',
            'footer.contact': 'Contacto',
            'footer.home': 'Inicio',
            'footer.about': 'Nosotros',
            'footer.services': 'Servicios',
            'footer.testimonials': 'Testimonios',
            'footer.contact_link': 'Contacto',
            'footer.payments': 'Realizar un Pago',
            'footer.documents': 'Documentos',
            'footer.faq': 'Preguntas Frecuentes',
            'footer.copyright': 'A Solid Property Management Group. Todos los derechos reservados.',
            'footer.serving': 'Sirviendo a Miami-Dade y Broward',

            // Documents Page
            'docs.hero_label': 'Recursos para Residentes',
            'docs.hero_title': 'Documentos de la Comunidad',
            'docs.hero_desc': 'Descargue solicitudes y formularios bancarios para su comunidad',
            'docs.search_placeholder': 'Buscar documentos por nombre de comunidad...',
            'docs.applications_title': 'Solicitudes de Comunidad',
            'docs.ach_title': 'Formularios ACH / Bancarios',

            // Payments Page
            'pay.hero_label': 'Recursos para Residentes',
            'pay.hero_title': 'Pagos en L\u00ednea',
            'pay.hero_desc': 'Realice pagos seguros en l\u00ednea para su comunidad',
            'pay.search_placeholder': 'Busque su comunidad...',
            'pay.subtitle': 'Seleccione su comunidad para realizar un pago seguro a trav\u00e9s de DirectBiller',
            'pay.badge': 'Pagar'
        }
    };

    var currentLang = 'en';

    function getStoredLang() {
        try {
            return localStorage.getItem('aspmg_lang');
        } catch (e) {
            return null;
        }
    }

    function setStoredLang(lang) {
        try {
            localStorage.setItem('aspmg_lang', lang);
        } catch (e) { /* ignore */ }
    }

    function detectBrowserLang() {
        var lang = navigator.language || navigator.userLanguage || '';
        return lang.toLowerCase().startsWith('es') ? 'es' : 'en';
    }

    function applyTranslations(lang) {
        currentLang = lang;
        var dict = translations[lang];
        if (!dict) return;

        // Update all elements with data-i18n
        var els = document.querySelectorAll('[data-i18n]');
        els.forEach(function (el) {
            var key = el.getAttribute('data-i18n');
            if (dict[key] !== undefined) {
                el.innerHTML = dict[key];
            }
        });

        // Update placeholders
        var placeholders = document.querySelectorAll('[data-i18n-placeholder]');
        placeholders.forEach(function (el) {
            var key = el.getAttribute('data-i18n-placeholder');
            if (dict[key] !== undefined) {
                el.setAttribute('placeholder', dict[key]);
            }
        });

        // Update html lang attribute
        document.documentElement.setAttribute('lang', lang);

        // Update toggle buttons
        var toggles = document.querySelectorAll('.lang-toggle-text');
        toggles.forEach(function (t) {
            t.textContent = lang === 'en' ? 'ES' : 'EN';
        });
    }

    function toggleLanguage() {
        var newLang = currentLang === 'en' ? 'es' : 'en';
        setStoredLang(newLang);
        applyTranslations(newLang);
    }

    // Initialize
    function init() {
        // Determine language: stored > browser detection > default (en)
        var stored = getStoredLang();
        var lang = stored || detectBrowserLang();

        // Bind toggle buttons
        document.querySelectorAll('.lang-toggle').forEach(function (btn) {
            btn.addEventListener('click', toggleLanguage);
        });

        // Apply if not English (English is default in HTML)
        if (lang !== 'en') {
            applyTranslations(lang);
        } else {
            currentLang = 'en';
        }
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose for external use
    window.ASPMG_i18n = {
        setLanguage: function (lang) {
            setStoredLang(lang);
            applyTranslations(lang);
        },
        getCurrentLang: function () { return currentLang; }
    };
})();
