const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const { loadContact, findContact, addContact, cekDuplikat, deleteContact, updateContact } = require('./utils/contacts');
const { body, validationResult, check } = require('express-validator');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');


const app = express();
const port = 3000;

// ngasih tau bahwak kita mau pakai templating engine EJS
app.set('view engine', 'ejs');

// Third party Middleware
app.use(expressLayouts);
app.use(cookieParser('secret'));
app.use(session({
    cookie: { maxAge: 6000 },
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}));
app.use(flash());

// Built-in Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


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

// Halaman menampilkan data contact
app.get('/contact', (req, res) => {
    const contacts = loadContact();
    res.render('contact', { layout: 'layouts/main-layout', title: 'Contact', contacts, msg: req.flash('msg') });
})

// Halaman form tambah data contact
app.get('/contact/add', (req, res) => {
    res.render('contact-add', { layout: 'layouts/main-layout', title: 'Add Contact' });
})

// Proses data contact
app.post('/contact', [
    check('email', 'Email tidak valid').isEmail(),
    check('noHp', 'No HP tidak valid').isMobilePhone('id-ID'),
    body('nama').custom((value) => {
        const duplikat = cekDuplikat(value);
        if (duplikat) {
            throw new Error('Nama contact sudah terdaftar')
        }
        return true;
    })
], (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.render('contact-add', { title: 'Add Contact', layout: 'layouts/main-layout', errors: errors.array() })
            // return res.status(400).json({ errors: errors.array() });
    } else {
        addContact(req.body);
        // sebelum redirect kirim flash
        req.flash('msg', 'Data Contact berhasil ditambahkan');
        res.redirect('/contact');
    }




})

// Proses delete contact
app.get('/contact/delete/:nama', (req, res) => {

    const contact = findContact(req.params.nama);

    // jika kontak tidak ada
    if (!contact) {
        res.status(404).send('404');
    } else {
        deleteContact(req.params.nama);
        req.flash('msg', 'Data Contact berhasil dihapus');
        res.redirect('/contact')
    }


})

// Halaman form ubah data contact
app.get('/contact/edit/:nama', (req, res) => {
    const contact = findContact(req.params.nama);
    res.render('contact-edit', { layout: 'layouts/main-layout', title: 'Add Contact', contact });
})

app.post('/contact/update', [
    check('email', 'Email tidak valid').isEmail(),
    check('noHp', 'No HP tidak valid').isMobilePhone('id-ID'),
    body('nama').custom((value, { req }) => {
        const duplikat = cekDuplikat(value);
        if (value !== req.body.oldNama && duplikat) {
            throw new Error('Nama contact sudah terdaftar')
        }
        return true;
    })
], (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.render('contact-edit', { title: 'Add Contact', layout: 'layouts/main-layout', errors: errors.array(), contact: req.body })
            // return res.status(400).json({ errors: errors.array() });
    } else {
        updateContact(req.body);
        // sebelum redirect kirim flash
        req.flash('msg', 'Data Contact berhasil diubah');
        res.redirect('/contact');
    }




})


// Halaman detail contact
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