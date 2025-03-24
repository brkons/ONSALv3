const UploadHandler = {
    /**
     * Dosya yükleme işlemini gerçekleştirir
     * @param {File} file - Yüklenecek dosya
     * @param {string} type - Yükleme türü: products, banners, categories
     * @returns {Promise<object>} - Yükleme sonucu
     */
    uploadFile: async function(file, type = 'products') {
        // Eğer backend yoksa, dosyaların önizlemesini göstermek için
        // base64 formatında LocalStorage'a kaydet
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            return this.mockUploadForLocalDevelopment(file, type);
        }
        
        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', type);
        
        try {
            const response = await fetch('/upload.php', {
                method: 'POST',
                body: formData
            });
            
            if (!response.ok) {
                throw new Error('Sunucu hatası: ' + response.status);
            }
            
            const result = await response.json();
            
            if (!result.success) {
                throw new Error(result.message || 'Dosya yüklenirken bir hata oluştu');
            }
            
            return {
                
# upload-handler.js dosyasını tamamla
cat > js/upload-handler.js << 'EOL'
const UploadHandler = {
    /**
     * Dosya yükleme işlemini gerçekleştirir
     * @param {File} file - Yüklenecek dosya
     * @param {string} type - Yükleme türü: products, banners, categories
     * @returns {Promise<object>} - Yükleme sonucu
     */
    uploadFile: async function(file, type = 'products') {
        // Eğer backend yoksa, dosyaların önizlemesini göstermek için
        // base64 formatında LocalStorage'a kaydet
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            return this.mockUploadForLocalDevelopment(file, type);
        }
        
        const formData = new FormData();
        formData.append('file', file);
        formData.append('type', type);
        
        try {
            const response = await fetch('/upload.php', {
                method: 'POST',
                body: formData
            });
            
            if (!response.ok) {
                throw new Error('Sunucu hatası: ' + response.status);
            }
            
            const result = await response.json();
            
            if (!result.success) {
                throw new Error(result.message || 'Dosya yüklenirken bir hata oluştu');
            }
            
            return {
                success: true,
                filePath: result.fileUrl,
                fileName: result.fileName
            };
        } catch (error) {
            console.error('Yükleme hatası:', error);
            return {
                success: false,
                error: error.message
            };
        }
    },
    
    /**
     * Yerel geliştirme için sahte yükleme işlemi
     * @private
     */
    mockUploadForLocalDevelopment: function(file, type) {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = function(e) {
                const base64Data = e.target.result;
                const fileName = 'mock_' + Date.now() + '_' + file.name;
                const mockFilePath = `/uploads/${type}/${fileName}`;
                
                // LocalStorage'a kaydet (sadece demo amaçlı)
                const uploadedFiles = JSON.parse(localStorage.getItem('uploadedFiles') || '{}');
                uploadedFiles[mockFilePath] = base64Data;
                localStorage.setItem('uploadedFiles', JSON.stringify(uploadedFiles));
                
                setTimeout(() => {
                    resolve({
                        success: true,
                        filePath: mockFilePath,
                        fileName: fileName
                    });
                }, 500); // Gerçek bir yükleme hissi vermek için 500ms gecikme
            };
            reader.readAsDataURL(file);
        });
    }
};
