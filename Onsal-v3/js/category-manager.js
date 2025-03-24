// Kategori yönetimi için yardımcı fonksiyonlar
const CategoryManager = {
    // Tüm kategorileri getir
    getAllCategories: function() {
        try {
            return JSON.parse(localStorage.getItem('categories') || '[]');
        } catch (error) {
            console.error('Kategoriler alınamadı:', error);
            return [];
        }
    },
    
    // Kategori ekle
    addCategory: function(category) {
        try {
            const categories = this.getAllCategories();
            
            // Aynı ID'li kategori var mı kontrol et
            if (categories.some(c => c.id === category.id)) {
                return {
                    success: false,
                    message: 'Bu ID ile bir kategori zaten mevcut'
                };
            }
            
            // Kategoriyi ekle
            categories.push(category);
            
            // Kaydet
            localStorage.setItem('categories', JSON.stringify(categories));
            
            return {
                success: true,
                message: 'Kategori başarıyla eklendi',
                category: category
            };
        } catch (error) {
            console.error('Kategori eklenemedi:', error);
            return {
                success: false,
                message: 'Kategori eklenirken bir hata oluştu: ' + error.message
            };
        }
    },
    
    // Kategori güncelle
    updateCategory: function(categoryId, updatedCategory) {
        try {
            const categories = this.getAllCategories();
            
            // Kategoriyi bul
            const index = categories.findIndex(c => c.id === categoryId);
            
            if (index === -1) {
                return {
                    success: false,
                    message: 'Güncellenecek kategori bulunamadı'
                };
            }
            
            // ID değişiyor mu kontrol et
            if (categoryId !== updatedCategory.id) {
                // Yeni ID ile kategori var mı kontrol et
                if (categories.some(c => c.id === updatedCategory.id)) {
                    return {
                        success: false,
                        message: 'Bu ID ile bir kategori zaten mevcut'
                    };
                }
            }
            
            // Kategoriyi güncelle
            categories[index] = updatedCategory;
            
            // Kaydet
            localStorage.setItem('categories', JSON.stringify(categories));
            
            return {
                success: true,
                message: 'Kategori başarıyla güncellendi',
                category: updatedCategory
            };
        } catch (error) {
            console.error('Kategori güncellenemedi:', error);
            return {
                success: false,
                message: 'Kategori güncellenirken bir hata oluştu: ' + error.message
            };
        }
    },
    
    // Kategori sil
    deleteCategory: function(categoryId) {
        try {
            const categories = this.getAllCategories();
            
            // Filtreleme ile kategoriyi çıkar
            const filteredCategories = categories.filter(c => c.id !== categoryId);
            
            // Eğer herhangi bir değişiklik yoksa kategori bulunamadı demektir
            if (categories.length === filteredCategories.length) {
                return {
                    success: false,
                    message: 'Silinecek kategori bulunamadı'
                };
            }
            
            // Kaydet
            localStorage.setItem('categories', JSON.stringify(filteredCategories));
            
            return {
                success: true,
                message: 'Kategori başarıyla silindi'
            };
        } catch (error) {
            console.error('Kategori silinemedi:', error);
            return {
                success: false,
                message: 'Kategori silinirken bir hata oluştu: ' + error.message
            };
        }
    },
    
    // ID'ye göre kategori getir
    getCategoryById: function(categoryId) {
        try {
            const categories = this.getAllCategories();
            return categories.find(c => c.id === categoryId) || null;
        } catch (error) {
            console.error('Kategori bulunamadı:', error);
            return null;
        }
    },
    
    // Kategori adını getir 
    getCategoryName: function(categoryId) {
        const category = this.getCategoryById(categoryId);
        return category ? category.name : 'Bilinmeyen Kategori';
    },
    
    // Kategori ürünlerini sayma
    countCategoryProducts: function(categoryId) {
        try {
            if (typeof ProductManager === 'undefined') {
                return 0;
            }
            
            const products = ProductManager.getAllProducts();
            return products.filter(p => p.category === categoryId).length;
        } catch (error) {
            console.error('Kategori ürünleri sayılamadı:', error);
            return 0;
        }
    },
    
    // Varsayılan kategorileri oluştur
    createDefaultCategories: function() {
        const defaultCategories = [
            {
                id: 'tv',
                name: 'Televizyon',
                icon: 'fa-tv'
            },
            {
                id: 'beyaz-esya',
                name: 'Beyaz Eşya',
                icon: 'fa-snowflake'
            },
            {
                id: 'kucuk-ev-aletleri',
                name: 'Küçük Ev Aletleri',
                icon: 'fa-blender'
            },
            {
                id: 'kisisel-bakim',
                name: 'Kişisel Bakım',
                icon: 'fa-cut'
            }
        ];
        
        const categories = this.getAllCategories();
        
        if (categories.length === 0) {
            localStorage.setItem('categories', JSON.stringify(defaultCategories));
            console.log("Varsayılan kategoriler oluşturuldu.");
            return true;
        }
        
        return false;
    }
};

// Sayfa yüklendiğinde varsayılan kategorileri oluştur
document.addEventListener('DOMContentLoaded', function() {
    CategoryManager.createDefaultCategories();
}); 