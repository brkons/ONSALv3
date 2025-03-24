// Varsayılan kategorileri ve alt kategorileri yükleme
document.addEventListener('DOMContentLoaded', function() {
    // Eğer kategoriler zaten tanımlanmışsa tekrar ekleme
    if (localStorage.getItem('categories') && JSON.parse(localStorage.getItem('categories')).length > 0) {
        console.log('Kategoriler zaten tanımlanmış, varsayılan kategoriler yüklenmedi.');
        return;
    }

    // Varsayılan kategoriler ve alt kategorileri
    const defaultCategories = [
        {
            id: '1',
            name: 'Televizyon',
            slug: 'tv',
            description: 'Tüm televizyon modelleri ve aksesuarları',
            status: 'active',
            order: 1,
            subcategories: [
                { name: 'LED TV', slug: 'led-tv' },
                { name: 'OLED TV', slug: 'oled-tv' },
                { name: 'Smart TV', slug: 'smart-tv' },
                { name: '4K TV', slug: '4k-tv' },
                { name: '8K TV', slug: '8k-tv' },
                { name: 'Küçük Ekran', slug: 'kucuk-ekran' }
            ]
        },
        {
            id: '2',
            name: 'Beyaz Eşya',
            slug: 'beyaz-esya',
            description: 'Buzdolabı, çamaşır makinesi ve diğer beyaz eşya ürünleri',
            status: 'active',
            order: 2,
            subcategories: [
                { name: 'Buzdolabı', slug: 'buzdolabi' },
                { name: 'Çamaşır Makinesi', slug: 'camasir-makinesi' },
                { name: 'Bulaşık Makinesi', slug: 'bulasik-makinesi' },
                { name: 'Fırın', slug: 'firin' },
                { name: 'Ocak', slug: 'ocak' },
                { name: 'Derin Dondurucu', slug: 'derin-dondurucu' }
            ]
        },
        {
            id: '3',
            name: 'Küçük Ev Aletleri',
            slug: 'kucuk-ev-aletleri',
            description: 'Mutfak robotları, ütüler ve diğer küçük ev aletleri',
            status: 'active',
            order: 3,
            subcategories: [
                { name: 'Ütü', slug: 'utu' },
                { name: 'Tost Makinesi', slug: 'tost-makinesi' },
                { name: 'Mikser', slug: 'mikser' },
                { name: 'Blender', slug: 'blender' },
                { name: 'Çay Makinesi', slug: 'cay-makinesi' },
                { name: 'Kahve Makinesi', slug: 'kahve-makinesi' },
                { name: 'Ekmek Kızartma', slug: 'ekmek-kizartma' }
            ]
        },
        {
            id: '4',
            name: 'Kişisel Bakım',
            slug: 'kisisel-bakim',
            description: 'Tıraş makineleri, saç kurutma makineleri ve diğer kişisel bakım ürünleri',
            status: 'active',
            order: 4,
            subcategories: [
                { name: 'Saç Kurutma', slug: 'sac-kurutma' },
                { name: 'Tıraş Makinesi', slug: 'tiras-makinesi' },
                { name: 'Epilasyon', slug: 'epilasyon' },
                { name: 'Saç Şekillendirici', slug: 'sac-sekillendirici' },
                { name: 'Diş Bakım', slug: 'dis-bakim' }
            ]
        }
    ];

    // LocalStorage'a kaydet
    localStorage.setItem('categories', JSON.stringify(defaultCategories));
    console.log('Varsayılan kategoriler başarıyla yüklendi.');
});
