const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/belajarnode', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

// const Contact = mongoose.model('Contact', {
//     nama: { type: String, required: true },
//     noHp: { type: String, required: true },
//     email: { type: String }
// });


// // Menambah 1 data
// const contact1 = new Contact({
//     nama: 'Mas Praz',
//     noHp: '09898878999',
//     email: 'mas@mail.com'
// });


// // simpan ke collections
// contact1.save().then((contact) => console.log(contact))