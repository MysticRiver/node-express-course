document.getElementById('fetchButton').addEventListener('click', () => {
    fetch('/api/v1/products')
        .then(response => response.json())
        .then(products => {
            const productsDiv = document.getElementById('productsDisplay');
            productsDiv.innerHTML = ''; // Clear previous content
            
            products.forEach(product => {
                productsDiv.innerHTML += `
                    <div class="product">
                        <h3>${product.name}</h3>
                        <p>Price: $${product.price}</p>
                        <p>ID: ${product.id}</p>
                    </div>
                `;
            });
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('productsDisplay').innerHTML = 
                'Error loading products';
        });
});
