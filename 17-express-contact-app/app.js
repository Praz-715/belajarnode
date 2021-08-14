const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const { loadContact, findContact } = require('./utils/contacts');
const app = express();
const port = 3000;

// ngasih tau bahwak kita mau pakai templating engine EJS
app.set('view engine', 'ejs');

// Third party Middleware
app.use(expressLayouts);

// Built-in Middleware
app.use(express.static('public'));


app.get('/', (req, res) => {
    const produk = [{
                nama: 'Handphone',
                harga: 3000000
            },
            {
                nama: 'Charger vooc',
                harga: 350000
            },
            {
                nama: 'TV LED LG 30 inc',
                harga: 2000000
            },
        ]
        // Mengembalikan dari file yang ada
        // res.sendFile('./index.html', { root: __dirname });

    res.render('index', { layout: 'layouts/main-layout', nama: 'Teguh Ganteng', title: 'Halaman Home', produk });

})

app.get('/about', (req, res) => {
    res.render('about', { layout: 'layouts/main-layout', title: 'About' });
})

app.get('/contact', (req, res) => {
    const contacts = loadContact();
    res.render('contact', { layout: 'layouts/main-layout', title: 'Contact', contacts });
})

app.get('/contact/:nama', (req, res) => {
    const contact = findContact(req.params.nama);
    res.render('detail', { layout: 'layouts/main-layout', title: 'Detail Contact', contact });
})


app.use('/', (req, res) => {
    res.status(404);
    res.send('<h1>404</h1>');
})

app.listen(port, () => {
    console.log(`Server app listen at http://localhost:${port}`);
})