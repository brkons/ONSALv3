// Admin paneli için ortak navigasyon fonksiyonları
document.addEventListener('DOMContentLoaded', function() {
    // localStorage kontrolü - ilk çalıştırmada gerekli depolamaları oluştur
    if (!localStorage.getItem('uploaded_files')) {
        localStorage.setItem('uploaded_files', JSON.stringify({}));
    }
    
    // Giriş kontrolü
    if (!localStorage.getItem('adminLoggedIn')) {
        localStorage.setItem('adminLoggedIn', 'true'); // Geliştirme aşamasında otomatik login
    }
    
    // Aktif menü öğesini işaretle
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
    document.querySelectorAll('.sidebar-menu-item').forEach(function(item) {
        const itemPage = item.getAttribute('data-page');
        if (itemPage === currentPage) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    // Sayfa geçişleri
    document.querySelectorAll('.sidebar-menu-item').forEach(function(item) {
        if (item.id === 'logout-button') {
            item.addEventListener('click', function() {
                localStorage.removeItem('adminLoggedIn');
                window.location.href = 'index.html';
            });
            return;
        }
        
        const page = item.getAttribute('data-page');
        if (page) {
            item.style.cursor = "pointer";
            item.addEventListener('click', function() {
                window.location.href = page + '.html';
            });
        }
    });
    
    // Mobil menü açma/kapama
    document.querySelector('.toggle-sidebar').addEventListener('click', function() {
        document.querySelector('.sidebar').classList.toggle('active');
    });
});

// Her sayfada çalışacak genel işlevler
function displayUploadedImage(imageElement, path) {
    if (!path) return;
    
    // Eğer uploads klasöründeyse ve localStorage'da varsa
    if (path.startsWith('uploads/')) {
        const dataUrl = UploadHandler.getUploadedFile(path);
        if (dataUrl) {
            imageElement.src = dataUrl;
            return;
        }
    }
    
    // Normal yolu kullan
    imageElement.src = FilePreviewHelper.getImageUrl(path);
} 