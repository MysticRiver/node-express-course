// 1. Import express module
const express = require('express')


// 2. Create the express app
const app = express()

// 3. Middleware
app.use(express.static('./public'))

// Import both products and people from data.js
const { products, people } = require('./data')

// Static files middleware - add this line
app.use(express.static('./methods-public'))

// json parser for API
app.use(express.json())

//created a middleware function called logger in app.js
const logger = (req, res, next) => {
  const time = new Date().toLocaleString()
  console.log(`${req.method} ${req.url} ${time}`)
  next()
}

app.get('/', logger, (req, res) => {
  res.send('Home Page')
})


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

// GET /api/v1/people - return all people
app.get('/api/v1/people', (req, res) => {
    res.json(people)
  })

// add middleware to parse this body into a Javascript object. 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
  
// POST /api/v1/people - add a new person
  app.post('/api/v1/people', (req, res) => {//check req.body to see if there is a req.body.name property. If not, it should return JSON for an error.
    const { name } = req.body
    if (!name) {
      return res.status(400).json({ success: false, message: 'Please provide a name' })
    }
    people.push({ id: people.length + 1, name: req.body.name });
    res.status(201).json({ success: true, name: req.body.name });
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
