// Ürün yönetimi için localStorage yardımcı fonksiyonları
const ProductManager = {
    // Tüm ürünleri getir
    getAllProducts: function() {
        try {
            return JSON.parse(localStorage.getItem('products') || '[]');
        } catch (error) {
            console.error('Ürünler alınamadı:', error);
            return [];
        }
    },
    
    // Ürün ekle - Özellikler eklendi
    addProduct: function(product) {
        try {
            const products = this.getAllProducts();
            
            // Ürün ID'si oluştur
            product.id = Date.now().toString();
            
            // Özellik eklemeleri
            if (product.originalPrice && !product.oldPrice) {
                product.oldPrice = product.originalPrice;
            }
            
            // Garantiyi kontrol et
            if (!product.warranty) product.warranty = "2";
            
            // Ürünü ekle
            products.push(product);
            
            // Kaydet
            localStorage.setItem('products', JSON.stringify(products));
            
            return {
                success: true,
                message: 'Ürün başarıyla eklendi',
                product: product
            };
        } catch (error) {
            console.error('Ürün eklenemedi:', error);
            return {
                success: false,
                message: 'Ürün eklenirken bir hata oluştu: ' + error.message
            };
        }
    },
    
    // Ürün güncelle
    updateProduct: function(productId, updatedData) {
        try {
            const products = this.getAllProducts();
            
            // İlgili ürünü bul
            const index = products.findIndex(p => p.id === productId);
            
            if (index === -1) {
                return {
                    success: false,
                    message: 'Ürün bulunamadı'
                };
            }
            
            // Ürünü güncelle (ID'yi koru)
            const updatedProduct = { ...updatedData, id: productId };
            products[index] = updatedProduct;
            
            // Kaydet
            localStorage.setItem('products', JSON.stringify(products));
            
            return {
                success: true,
                message: 'Ürün başarıyla güncellendi',
                product: updatedProduct
            };
        } catch (error) {
            console.error('Ürün güncellenemedi:', error);
            return {
                success: false,
                message: 'Ürün güncellenirken bir hata oluştu: ' + error.message
            };
        }
    },
    
    // Ürün sil
    deleteProduct: function(productId) {
        try {
            const products = this.getAllProducts();
            
            // Ürünü filtrele (ID'si eşleşmeyen ürünleri tut)
            const filteredProducts = products.filter(p => p.id !== productId);
            
            // Eğer filtre işlemi ürünleri azaltmadıysa
            if (filteredProducts.length === products.length) {
                return {
                    success: false,
                    message: 'Ürün bulunamadı'
                };
            }
            
            // Kaydet
            localStorage.setItem('products', JSON.stringify(filteredProducts));
            
            return {
                success: true,
                message: 'Ürün başarıyla silindi'
            };
        } catch (error) {
            console.error('Ürün silinemedi:', error);
            return {
                success: false,
                message: 'Ürün silinirken bir hata oluştu: ' + error.message
            };
        }
    },
    
    // ID'ye göre ürün getir
    getProductById: function(productId) {
        try {
            const products = this.getAllProducts();
            return products.find(p => p.id === productId) || null;
        } catch (error) {
            console.error('Ürün bulunamadı:', error);
            return null;
        }
    },
    
    // Kategori ile ilgili ek metodlar
    getProductsByCategory: function(categoryId) {
        try {
            const products = this.getAllProducts();
            return products.filter(p => p.category === categoryId);
        } catch (error) {
            console.error('Kategoriye göre ürünler alınamadı:', error);
            return [];
        }
    },

    getCategoryProducts: function(categoryId, onlyActive = true) {
        try {
            const products = this.getAllProducts();
            return products.filter(p => {
                if (onlyActive && p.status !== 'active') return false;
                return p.category === categoryId;
            });
        } catch (error) {
            console.error('Kategori ürünleri alınamadı:', error);
            return [];
        }
    },

    // Alt kategoriye göre ürünleri almak için ek metod
    getProductsBySubcategory: function(categoryId, subcategory, onlyActive = true) {
        try {
            const products = this.getAllProducts();
            return products.filter(p => {
                if (onlyActive && p.status !== 'active') return false;
                return p.category === categoryId && p.subcategory === subcategory;
            });
        } catch (error) {
            console.error('Alt kategoriye göre ürünler alınamadı:', error);
            return [];
        }
    }
}; 