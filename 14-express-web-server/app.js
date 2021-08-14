const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    // Mengembalikan dari file yang ada
    res.sendFile('./index.html', { root: __dirname });

})

app.get('/about', (req, res) => {

    res.sendFile('./about.html', { root: __dirname });

})

app.get('/contact', (req, res) => {

    res.sendFile('./contact.html', { root: __dirname });

})

app.get('/produk/:id', (req, res) => {

    res.send(`Produk id : ${req.params.id} <br> Ketegori id : ${req.query.idKat}`)

})

app.use('/', (req, res) => {
    res.status(404);
    res.send('<h1>404</h1>');
})

app.listen(port, () => {
    console.log(`Server app listen at http://localhost:${port}`);
})