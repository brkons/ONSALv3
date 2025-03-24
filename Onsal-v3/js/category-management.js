// Kategori ve alt kategori yönetimi için script
document.addEventListener('DOMContentLoaded', function() {
    // Varsayılan kategoriler için betik yüklemesi
    const script = document.createElement('script');
    script.src = 'js/category-defaults.js';
    document.head.appendChild(script);
    
    // Kategori sayfalarında alt kategori filtrelemesini ayarla
    setupCategoryFiltering();
});

// Kategori filtreleme fonksiyonu
function setupCategoryFiltering() {
    const categoryIcons = document.querySelectorAll('.category-icon-item');
    if (!categoryIcons.length) return; // Eğer kategoriler yoksa çık
    
    // Mevcut sayfanın kategorisini belirle
    const currentPage = window.location.pathname;
    let currentCategory = '';
    
    if (currentPage.includes('kategori-televizyon')) {
        currentCategory = 'tv';
    } else if (currentPage.includes('kategori-beyaz-esya')) {
        currentCategory = 'beyaz-esya';
    } else if (currentPage.includes('kategori-kucuk-ev-aletleri')) {
        currentCategory = 'kucuk-ev-aletleri';
    } else if (currentPage.includes('kategori-kisisel-bakim')) {
        currentCategory = 'kisisel-bakim';
    }
    
    if (!currentCategory) return; // Kategori bulunamadıysa çık
    
    // LocalStorage'dan kategorileri al
    const categories = JSON.parse(localStorage.getItem('categories') || '[]');
    const currentCategoryData = categories.find(c => c.slug === currentCategory);
    
    if (!currentCategoryData || !currentCategoryData.subcategories || !currentCategoryData.subcategories.length) return;
    
    // Sayfa başlığını güncelle
    const titleElement = document.querySelector('.category-header h1');
    if (titleElement) {
        titleElement.textContent = currentCategoryData.name;
    }
    
    // Sayfa açıklamasını güncelle
    const descElement = document.querySelector('.category-header p');
    if (descElement && currentCategoryData.description) {
        descElement.textContent = currentCategoryData.description;
    }
    
    // Kategori ikonlarına tıklama işlevselliği ekle
    categoryIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Aktif sınıfını tüm ikonlardan kaldır
            categoryIcons.forEach(i => i.classList.remove('active'));
            
            // Bu ikona aktif sınıf ekle
            this.classList.add('active');
            
            // Ürünleri filtrele
            filterProductsBySubcategory(filter);
        });
    });
}

// Alt kategoriye göre ürünleri filtreleme
function filterProductsBySubcategory(subcategory) {
    console.log('Filtre uygulandı:', subcategory);
    
    // Burada ürünleri filtreleme mantığı olacak
    // Bu işlem var olan kategori sayfalarındaki JavaScript ile yapılıyor
}
