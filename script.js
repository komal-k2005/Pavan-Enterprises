// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.contains('hidden');
        if (isHidden) {
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('animate-slideDown');
        } else {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('animate-slideDown');
        }
    });

    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// Navbar scroll shadow effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 30) {
            navbar.classList.add('shadow-lg', 'bg-white/98');
            navbar.classList.remove('bg-white/95');
        } else {
            navbar.classList.remove('shadow-lg', 'bg-white/98');
            navbar.classList.add('bg-white/95');
        }
    }
});

// Interactive Service Chips in Booking Form
let selectedService = "Washing Machine Service";
let selectedTimeSlot = "Urgent (Within 2 Hours)";

const serviceChips = document.querySelectorAll('.service-chip');
serviceChips.forEach(chip => {
    chip.addEventListener('click', () => {
        serviceChips.forEach(c => c.classList.remove('active', 'border-blue-600', 'bg-blue-50'));
        chip.classList.add('active', 'border-blue-600', 'bg-blue-50');
        selectedService = chip.getAttribute('data-service') || "General Appliance Repair";
        updateWhatsAppPreview();
    });
});

// Time Slot Pills
const timePills = document.querySelectorAll('.time-pill');
timePills.forEach(pill => {
    pill.addEventListener('click', () => {
        timePills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        selectedTimeSlot = pill.getAttribute('data-slot') || "Anytime";
        updateWhatsAppPreview();
    });
});

// Live WhatsApp Preview Updater
const nameInput = document.getElementById('formName');
const phoneInput = document.getElementById('formPhone');
const localityInput = document.getElementById('formLocality');
const messageInput = document.getElementById('formMessage');
const previewBubble = document.getElementById('whatsappPreviewBubble');

function updateWhatsAppPreview() {
    if (!previewBubble) return;
    const name = nameInput?.value.trim() || "Customer";
    const locality = localityInput?.value.trim() || "Pune";
    const issue = messageInput?.value.trim() || "Need technician to inspect issue";

    previewBubble.innerHTML = `
        <div class="text-[11px] text-gray-500 font-bold mb-1">Message Preview for Pavan Enterprises:</div>
        <p class="text-xs text-gray-800 leading-relaxed font-sans">
            "Hello <strong>Pavan Enterprises</strong>, I need repair service.<br>
            • <strong>Name:</strong> ${name}<br>
            • <strong>Appliance:</strong> ${selectedService}<br>
            • <strong>Preferred Time:</strong> ${selectedTimeSlot}<br>
            • <strong>Area:</strong> ${locality}<br>
            • <strong>Issue:</strong> ${issue}"
        </p>
    `;
}

if (nameInput) nameInput.addEventListener('input', updateWhatsAppPreview);
if (localityInput) localityInput.addEventListener('input', updateWhatsAppPreview);
if (messageInput) messageInput.addEventListener('input', updateWhatsAppPreview);

// Contact Form Submit Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = nameInput?.value.trim() || 'Valued Customer';
        const phone = phoneInput?.value.trim() || '';
        const locality = localityInput?.value.trim() || 'Sinhgad Road / Pune';
        const message = messageInput?.value.trim() || 'Inspection required';

        const whatsappText = `Hello Pavan Enterprises,%0A%0A*Service Booking Request*%0A• Name: ${encodeURIComponent(name)}%0A• Phone: ${encodeURIComponent(phone)}%0A• Area / Locality: ${encodeURIComponent(locality)}%0A• Service: ${encodeURIComponent(selectedService)}%0A• Preferred Slot: ${encodeURIComponent(selectedTimeSlot)}%0A• Problem: ${encodeURIComponent(message)}%0A%0APlease confirm technician visit.`;

        // Direct WhatsApp API
        window.open(`https://wa.me/919604001387?text=${whatsappText}`, '_blank');
        contactForm.reset();
        updateWhatsAppPreview();
    });
}
