const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const { body, validationResult, check } = require('express-validator');
const methodOverride = require('method-override');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');


require('./utils/db');
const Contact = require('./model/contact');

const app = express();
const port = 3000;

// SetUp mehtod override
app.use(methodOverride('_method'));

// SetUp EJS
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// SetUp Flash
app.use(cookieParser('secret'));
app.use(session({
    cookie: { maxAge: 6000 },
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}));
app.use(flash());


// Halaman Home
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

});

// Halama About
app.get('/about', (req, res) => {
    res.render('about', { layout: 'layouts/main-layout', title: 'About' });
});

// Halaman menampilkan data contact
app.get('/contact', async(req, res) => {
    const contacts = await Contact.find();
    res.render('contact', { layout: 'layouts/main-layout', title: 'Contact', contacts, msg: req.flash('msg') });
});

// Halaman form tambah data contact
app.get('/contact/add', (req, res) => {
    res.render('contact-add', { layout: 'layouts/main-layout', title: 'Add Contact' });
});

// Proses data contact
app.post('/contact', [
    check('email', 'Email tidak valid').isEmail(),
    check('noHp', 'No HP tidak valid').isMobilePhone('id-ID'),
    body('nama').custom(async(value) => {
        const duplikat = await Contact.findOne({ nama: value });
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
        Contact.insertMany(req.body, (error, result) => {
            // sebelum redirect kirim flash
            req.flash('msg', 'Data Contact berhasil ditambahkan');
            res.redirect('/contact');
        })
    }
});

// Proses delete contact
app.delete('/contact', (req, res) => {
    Contact.deleteOne({ nama: req.body.nama }).then((result) => {
        // res.send(result);
        req.flash('msg', 'Data Contact berhasil dihapus');
        res.redirect('/contact')
    });
});

// Halaman form ubah data contact
app.get('/contact/edit/:nama', async(req, res) => {
    const contact = await Contact.findOne({ nama: req.params.nama });
    res.render('contact-edit', { layout: 'layouts/main-layout', title: 'Add Contact', contact });
});

// Proses update data
app.put('/contact', [
    check('email', 'Email tidak valid').isEmail(),
    check('noHp', 'No HP tidak valid').isMobilePhone('id-ID'),
    body('nama').custom(async(value, { req }) => {
        const duplikat = await Contact.findOne({ nama: value });
        if (value !== req.body.oldNama && duplikat) {
            throw new Error('Nama contact sudah terdaftar')
        }
        return true;
    })
], (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.render('contact-edit', { title: 'Add Contact', layout: 'layouts/main-layout', errors: errors.array(), contact: req.body })
    } else {
        Contact.updateOne({ _id: req.body._id }, {
            $set: {
                nama: req.body.nama,
                email: req.body.email,
                noHp: req.body.noHp
            }
        }).then((result) => {
            // sebelum redirect kirim flash
            req.flash('msg', 'Data Contact berhasil diubah');
            res.redirect('/contact');
        });
    }
})


// Halaman detail contact
app.get('/contact/:nama', async(req, res) => {
    // const contact = findContact(req.params.nama);
    const contact = await Contact.findOne({ nama: req.params.nama });
    res.render('detail', { layout: 'layouts/main-layout', title: 'Detail Contact', contact });
});

app.listen(port, () => {
    console.log(`Mongo contact app listening on port ${port}`);
});

//Run app, then load http://localhost:port in a browser to see the output.