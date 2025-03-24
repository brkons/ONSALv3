// Admin panel için yardımcı fonksiyonlar
const FilePreviewHelper = {
    getImageUrl: function(path) {
        if (!path) return '';
        if (path.startsWith('blob:')) return path;
        if (path.startsWith('data:')) return path;
        if (path.startsWith('http')) return path;
        if (path.startsWith('/')) return path;
        
        // Uploads klasörüne göre yolu düzenleme
        if (path.startsWith('uploads/')) {
            return '../' + path;
        }
        
        return '../' + path;
    }
};

const UploadHandler = {
    uploadFile: async function(file, folder) {
        console.log('Dosya yükleniyor:', file.name, 'klasör:', folder);
        
        return new Promise((resolve, reject) => {
            try {
                // Gerçek bir yükleme API olmadığından dosyayı işliyoruz
                // Gerçek uygulamada bu işlem sunucuya dosyayı gönderirdi
                
                // FileReader ile dosyayı işle
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    // Dosya adını oluştur - gerçek kullanımda sunucuda benzersiz ad oluşturulur
                    const timestamp = new Date().getTime();
                    const fileName = timestamp + '-' + file.name.replace(/\s+/g, '-').toLowerCase();
                    
                    // Sunucuya yükleme yapıldığında dönen yolu taklit ediyoruz
                    const filePath = 'uploads/' + folder + '/' + fileName;
                    
                    // Gerçek uygulamada bu dosya sunucuya yüklenirdi
                    // Şimdilik sadece tarayıcı önbelleğinde tutuyoruz
                    
                    // localStorage'a kaydedebiliriz (sınırlı boyutta)
                    try {
                        // Tüm uploads verisini al
                        const uploads = JSON.parse(localStorage.getItem('uploaded_files') || '{}');
                        
                        // Yeni dosya ekle
                        uploads[filePath] = e.target.result;
                        
                        // Kaydet
                        localStorage.setItem('uploaded_files', JSON.stringify(uploads));
                        
                        console.log('Dosya kaydedildi:', filePath);
                    } catch (error) {
                        console.warn('Dosya localStorage\'a kaydedilemedi, muhtemelen çok büyük:', error.message);
                    }
                    
                    // Başarılı sonuç döndür
                    resolve({
                        success: true,
                        filePath: filePath,
                        fileUrl: e.target.result // Önizleme için data URL
                    });
                };
                
                reader.onerror = function(error) {
                    reject({
                        success: false,
                        error: 'Dosya okunamadı: ' + error
                    });
                };
                
                // Dosyayı oku
                reader.readAsDataURL(file);
                
            } catch (error) {
                console.error('Dosya işleme hatası:', error);
                reject({
                    success: false,
                    error: 'Dosya işlenemedi: ' + error.message
                });
            }
        });
    },
    
    // Yüklenen dosyayı almak için yardımcı fonksiyon
    getUploadedFile: function(path) {
        if (!path || !path.startsWith('uploads/')) return null;
        
        try {
            const uploads = JSON.parse(localStorage.getItem('uploaded_files') || '{}');
            return uploads[path] || null;
        } catch (error) {
            console.error('Yüklenen dosya alınamadı:', error);
            return null;
        }
    }
}; 