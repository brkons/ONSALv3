function filterProducts(filter) {
    const products = document.querySelectorAll('.product-item');
    products.forEach(product => {
        product.style.display = (filter === 'all' || product.dataset.category.includes(filter)) 
            ? 'block' 
            : 'none';
    });
}
