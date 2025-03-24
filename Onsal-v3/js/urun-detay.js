document.addEventListener('DOMContentLoaded', function() {
    console.log("Ürün detay sayfası yükleniyor...");
    
    try {
        // URL'den ürün ID'sini al
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('urun');
        
        console.log("URL parametreleri:", urlParams.toString());
        console.log("Aranan ürün ID:", productId);
        
        if (!productId) {
            console.error("Ürün ID'si bulunamadı");
            document.getElementById('product-not-found').style.display = 'block';
            return;
        }
        
        // LocalStorage'daki verileri kontrol et
        console.log("LocalStorage içeriği:", DataManager.debug());
        
        // Tüm ürünleri yükle
        const products = DataManager.load('productsList');
        console.log("Yüklenen ürün sayısı:", products.length);
        
        // ID'ye göre ürünü bul
        const product = products.find(p => String(p.id) === String(productId));
        console.log("Bulunan ürün:", product);
        
        if (!product) {
            console.error("Ürün bulunamadı");
            document.getElementById('product-not-found').style.display = 'block';
            return;
        }
        
        // Ürün detaylarını sayfaya yerleştir
        document.title = product.name + " - Onsal Elektronik";
        
        // Gerekli DOM elemanlarının bulunduğunu kontrol et
        const mainImage = document.querySelector('.main-image');
        if (!mainImage) {
            console.error(".main-image elemanı bulunamadı");
        } else {
            console.log("Ana resim elemanı bulundu");
            if (product.images && product.images.length > 0) {
                const imageUrl = FilePreviewHelper.getImageUrl(product.images[0]);
                console.log("Yüklenecek görsel URL:", imageUrl);
                mainImage.src = imageUrl;
                mainImage.alt = product.name;
            } else {
                console.warn("Ürün görseli bulunamadı");
                mainImage.src = 'https://via.placeholder.com/600x400?text=Ürün+Resmi';
            }
        }
        
        // Ürün gallery
        const galleryContainer = document.querySelector('.gallery-thumbs');
        if (galleryContainer && product.images && product.images.length > 0) {
            galleryContainer.innerHTML = ''; // Clear existing content
            
            product.images.forEach((image, index) => {
                const thumb = document.createElement('div');
                thumb.className = 'gallery-thumb';
                if (index === 0) thumb.classList.add('active');
                
                const img = document.createElement('img');
                img.src = FilePreviewHelper.getImageUrl(image);
                img.alt = `${product.name} - Görsel ${index + 1}`;
                
                // Thumbnail tıklandığında ana resmi değiştir
                thumb.addEventListener('click', function() {
                    document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                    mainImage.src = img.src;
                });
                
                thumb.appendChild(img);
                galleryContainer.appendChild(thumb);
            });
        }
        
        // Diğer ürün bilgilerini güncelle
        const elements = {
            title: document.querySelector('.product-title'),
            code: document.querySelector('.product-code'),
            price: document.querySelector('.current-price-large'),
            oldPrice: document.querySelector('.old-price-large'),
            discount: document.querySelector('.discount-percent'),
            description: document.querySelector('.product-description')
        };
        
        // Her bir elemanın varlığını kontrol et
        for (const [key, elem] of Object.entries(elements)) {
            if (!elem) {
                console.error(`'.${key}' elemanı bulunamadı`);
            }
        }
        
        // Eleman değerlerini güncelle
        if (elements.title) elements.title.textContent = product.name;
        if (elements.code) elements.code.textContent = `Ürün Kodu: ${product.id}`;
        
        // İndirim hesaplama
        const discountPercent = product.discountPercent || Math.floor(Math.random() * 20) + 5;
        const price = parseFloat(product.price);
        const oldPrice = price * (100 / (100 - discountPercent));
        
        if (elements.price) elements.price.textContent = `${price.toFixed(2)} TL`;
        if (elements.oldPrice) elements.oldPrice.textContent = `${oldPrice.toFixed(2)} TL`;
        if (elements.discount) elements.discount.textContent = `%${discountPercent} İndirim`;
        
        // Ürün açıklaması
        if (elements.description) elements.description.innerHTML = product.description || product.shortDescription || 'Ürün açıklaması bulunmamaktadır.';
        
        // Ürün özellikleri (basit örnek)
        const specsList = document.querySelector('.product-specs-list');
        if (specsList) {
            // Özelliklerini ekle (örnek olarak)
            const specs = [
                { name: "Marka", value: product.brand || "Belirtilmemiş" },
                { name: "Kategori", value: product.category || "Belirtilmemiş" },
                { name: "Stok Durumu", value: product.stock > 0 ? "Stokta Var" : "Stokta Yok" }
            ];
            
            // Ürün özelliklerini ekle
            specs.forEach(spec => {
                const item = document.createElement('li');
                item.innerHTML = `<strong>${spec.name}:</strong> ${spec.value}`;
                specsList.appendChild(item);
            });
        }
        
        // WhatsApp paylaşım bağlantısı güncelleme
        const whatsappBtn = document.querySelector('.whatsapp-share');
        if (whatsappBtn) {
            const text = `${product.name} ürününe göz atmak ister misiniz? ${window.location.href}`;
            whatsappBtn.href = `https://wa.me/?text=${encodeURIComponent(text)}`;
        }
        
        // İlgili ürünleri yükleme
        loadRelatedProducts(product.category, product.id);
    } catch (error) {
        console.error("Ürün detay sayfasında hata:", error);
        document.getElementById('product-not-found').style.display = 'block';
    }
});

// İlgili ürünleri yükleme fonksiyonu
function loadRelatedProducts(category, currentProductId) {
    const relatedContainer = document.querySelector('.related-products-grid');
    if (!relatedContainer) return;
    
    // Aynı kategorideki diğer ürünleri getir
    const products = loadProducts(category);
    
    // Şu anki ürünü filtrele ve en fazla 4 ürün göster
    const relatedProducts = products
        .filter(p => p.id.toString() !== currentProductId.toString())
        .slice(0, 4);
    
    console.log("İlgili ürünler:", relatedProducts);
    
    if (relatedProducts.length === 0) {
        relatedContainer.innerHTML = '<p class="text-center">Bu kategoride başka ürün bulunamadı.</p>';
        return;
    }
    
    relatedContainer.innerHTML = '';
    
    // İlgili ürünleri listele
    relatedProducts.forEach(product => {
        const discountPercent = product.discountPercent || Math.floor(Math.random() * 20) + 5;
        const price = parseFloat(product.price);
        const oldPrice = price * (100 / (100 - discountPercent));
        
        const productHtml = `
            <div class="related-product-card">
                <a href="urun-detay.html?urun=${product.id}">
                    <div class="related-product-image">
                        <img src="${FilePreviewHelper.getImageUrl(product.images?.[0]) || 'https://via.placeholder.com/200x150?text=Ürün+Resmi'}" 
                             alt="${product.name}">
                    </div>
                    <h3>${product.name}</h3>
                    <div class="related-product-price">
                        <span class="current-price">${price.toFixed(2)} TL</span>
                        <span class="old-price">${oldPrice.toFixed(2)} TL</span>
                    </div>
                </a>
            </div>
        `;
        
        relatedContainer.innerHTML += productHtml;
    });
} 