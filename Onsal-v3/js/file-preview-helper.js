/**
 * Yüklenen dosya önizlemeleri için yardımcı işlevler
 */
const FilePreviewHelper = {
    /**
     * Dosya yoluna göre resim URL'si döndürür
     * Localhost'ta test ederken mockup URL kullanır
     * @param {string} filePath - Dosya yolu
     * @returns {string} - Görüntülenecek URL
     */
    getImageUrl: function(filePath) {
        // Eğer filePath http:// veya https:// ile başlıyorsa, direkt döndür
        if (filePath && (filePath.startsWith('http://') || filePath.startsWith('https://'))) {
            return filePath;
        }
        
        // Eğer localhost'taysa ve filePath uploads/ ile başlıyorsa, mock URL kullan
        if ((window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') && 
            filePath && filePath.startsWith('/uploads/')) {
            
            const uploadedFiles = JSON.parse(localStorage.getItem('uploadedFiles') || '{}');
            return uploadedFiles[filePath] || filePath;
        }
        
        // Normal durumda dosya yolunu döndür
        return filePath;
    },
    
    /**
     * Bir ürünün tüm resim URL'lerini günceller
     * @param {Object} product - Ürün nesnesi
     * @returns {Object} - Güncellenen ürün nesnesi
     */
    updateProductImageUrls: function(product) {
        if (product && product.images && Array.isArray(product.images)) {
            product.images = product.images.map(img => this.getImageUrl(img));
        }
        return product;
    }
};
