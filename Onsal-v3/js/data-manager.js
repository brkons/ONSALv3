const DataManager = {
  save: (key, data) => localStorage.setItem(key, JSON.stringify(data)),
  load: (key) => JSON.parse(localStorage.getItem(key)) || [],
  clear: (key) => localStorage.removeItem(key),

  // Debug amaçlı, depolanan verileri görüntülemek için
  debug: function() {
    const data = {};
    for(let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      try {
        data[key] = JSON.parse(localStorage.getItem(key));
      } catch {
        data[key] = localStorage.getItem(key);
      }
    }
    console.log("LocalStorage İçeriği:", data);
    return data;
  }
};

// Ürünleri localStorage'dan yükleme fonksiyonu
function loadProducts(category) {
    console.log("loadProducts fonksiyonu çağrıldı, aranan kategori:", category);
    
    // LocalStorage içeriğini kontrol et
    console.log("Mevcut localStorage içeriği:", DataManager.debug());
    
    const products = DataManager.load('productsList');
    console.log("Yüklenen ürünler:", products);
    
    // Kategori null ya da undefined ise tüm aktif ürünleri getir
    if (!category) {
        console.log("Kategori belirtilmemiş, tüm aktif ürünler getiriliyor");
        const activeProducts = products.filter(p => p.status === 1 || p.status === "1");
        console.log("Filtrelenmiş aktif ürünler:", activeProducts);
        return activeProducts;
    }
    
    // Kategori adını normalize et (boşlukları tire ile değiştir, küçük harfe çevir)
    const normalizedCategory = category.toLowerCase().replace(/\s+/g, '-');
    console.log("Normalize edilmiş kategori adı:", normalizedCategory);
    
    // Ürünlerin kategori değerlerini normalize et ve karşılaştır
    const filteredProducts = products.filter(p => {
        // Status kontrolü (hem string hem number olabilir)
        const isActive = p.status === 1 || p.status === "1";
        console.log(`Ürün ${p.id} durumu aktif mi:`, isActive, "Status değeri:", p.status);
        
        // Kategori kontrolü (farklı formatlarda gelebilir)
        const productCategory = p.category || "";
        const normalizedProductCategory = productCategory.toLowerCase().replace(/\s+/g, '-');
        console.log(`Ürün ${p.id} kategorisi:`, productCategory, "Normalize edilmiş hali:", normalizedProductCategory);
        
        // Hem kategori adlarını hem de kategori değerlerini kontrol et
        const categoryMatch = 
            normalizedProductCategory === normalizedCategory || 
            productCategory.includes(category) ||
            normalizedProductCategory.includes(normalizedCategory) ||
            category.toLowerCase().includes(productCategory.toLowerCase());
        
        console.log(`Ürün ${p.id} kategori eşleşmesi:`, categoryMatch);
        
        return isActive && categoryMatch;
    });
    
    console.log("Filtrelenmiş ürünler:", filteredProducts);
    return filteredProducts;
}
