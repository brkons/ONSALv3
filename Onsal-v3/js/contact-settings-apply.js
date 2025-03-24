// İletişim sayfası için ayarları uygulama scripti
document.addEventListener('DOMContentLoaded', function() {
    try {
        const contactSettings = JSON.parse(localStorage.getItem('contactSettings') || '{}');
        console.log('Yüklenen iletişim ayarları:', contactSettings);
        
        // Form elemanları
        const addressElement = document.querySelector('.contact-item:nth-child(1) .contact-text p');
        const phoneElement = document.querySelector('.contact-item:nth-child(2) .contact-text p a');
        const whatsappElement = document.querySelector('.contact-item:nth-child(3) .contact-text p a');
        const emailElement = document.querySelector('.contact-item:nth-child(4) .contact-text p a');
        
        // Sosyal medya ikonları
        const instagramIcon = document.querySelector('.social-icons a[href*="instagram"]');
        const facebookIcon = document.querySelector('.social-icons a[href*="facebook"]');
        const twitterIcon = document.querySelector('.social-icons a[href*="twitter"]');
        const youtubeIcon = document.querySelector('.social-icons a[href*="youtube"]');
        
        // Çalışma saatleri
        const weekdaysHours = document.querySelector('.hours-item:nth-child(1) p');
        const saturdayHours = document.querySelector('.hours-item:nth-child(2) p');
        const sundayHours = document.querySelector('.hours-item:nth-child(3) p');
        
        // Değerleri güncelle
        if (addressElement && contactSettings.address) {
            addressElement.textContent = contactSettings.address;
        }
        
        if (phoneElement && contactSettings.phone) {
            phoneElement.href = `tel:${contactSettings.phone}`;
            phoneElement.textContent = contactSettings.phone;
        }
        
        if (whatsappElement && contactSettings.whatsapp) {
            whatsappElement.href = `https://wa.me/${contactSettings.whatsapp}`;
            whatsappElement.textContent = contactSettings.whatsapp;
        }
        
        if (emailElement && contactSettings.email) {
            emailElement.href = `mailto:${contactSettings.email}`;
            emailElement.textContent = contactSettings.email;
        }
        
        // Sosyal medya linkleri
        if (instagramIcon && contactSettings.instagram) {
            instagramIcon.href = contactSettings.instagram;
        }
        
        if (facebookIcon && contactSettings.facebook) {
            facebookIcon.href = contactSettings.facebook;
        }
        
        if (twitterIcon && contactSettings.twitter) {
            twitterIcon.href = contactSettings.twitter;
        }
        
        if (youtubeIcon && contactSettings.youtube) {
            youtubeIcon.href = contactSettings.youtube;
        }
        
        // Çalışma saatleri
        if (contactSettings.openingHours) {
            if (weekdaysHours && contactSettings.openingHours.weekdays) {
                weekdaysHours.textContent = contactSettings.openingHours.weekdays;
            }
            
            if (saturdayHours && contactSettings.openingHours.saturday) {
                saturdayHours.textContent = contactSettings.openingHours.saturday;
            }
            
            if (sundayHours && contactSettings.openingHours.sunday) {
                sundayHours.textContent = contactSettings.openingHours.sunday;
            }
        }
    } catch (error) {
        console.error('İletişim ayarları uygulanırken hata:', error);
    }
});
