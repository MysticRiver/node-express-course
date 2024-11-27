// 1. Import express module
const express = require('express')
const { products } = require("./data");

// 2. Create the express app
const app = express()

// 3. Middleware
app.use(express.static('./public'))

// 4. Routes
app.get('/api/v1/test', (req, res) => {
    res.json({ message: "It worked!" })
})
app.get('/api/v1/products', (req, res) => {
    res.json(products)
})
app.get('/api/v1/products/:productID', (req, res) => {
    const idToFind = parseInt(req.params.productID)
    const product = products.find((p) => p.id === idToFind)
    if (!product) {
        return res.status(404).json({ message: "That product was not found." })
    }
    res.json(product)
})

// Route handler for /api/v1/query with search, regex and price filtering
app.get('/api/v1/query', (req, res) => {
    const { 
        search,         // simple text search
        regex,          // regex pattern search
        maxPrice,       // maximum price filter
        minPrice       // minimum price filter
    } = req.query;

    let filteredProducts = [...products];

    try {
        // Filter by search term if provided
        if (search) {
            filteredProducts = filteredProducts.filter(product => 
                product.name.toLowerCase().startsWith(search.toLowerCase())
            );
        }

        // Filter by regex if provided
        if (regex) {
            try {
                const regexPattern = new RegExp(regex, 'i');
                filteredProducts = filteredProducts.filter(product => 
                    regexPattern.test(product.name)
                );
            } catch (error) {
                return res.status(400).json({ message: "Invalid regular expression" });
            }
        }

        // Filter by price range
        if (maxPrice) {
            const max = parseFloat(maxPrice);
            if (!isNaN(max)) {
                filteredProducts = filteredProducts.filter(product => 
                    product.price <= max
                );
            }
        }

        if (minPrice) {
            const min = parseFloat(minPrice);
            if (!isNaN(min)) {
                filteredProducts = filteredProducts.filter(product => 
                    product.price >= min
                );
            }
        }

        // Return results with metadata
        res.json({
            count: filteredProducts.length,
            products: filteredProducts
        });

    } catch (error) {
        res.status(500).json({ message: "An error occurred while processing your request" });
    }
});
// 5. Handle 404 - Page not found
app.all('*', (req, res) => {
    res.status(404).send('Resource not found: 404 Error')
})

// 6. Start the server
app.listen(3000, () => {
    console.log('Server is listening on port 3000...')
})
