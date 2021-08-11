// Core module file system
const fs = require('fs');


// menuliskan string ke file (syncrhonous)
// try {
//     fs.writeFileSync('data/test.txt', 'Hello World secara syncrhorous');
// } catch (e) {
//     console.log(e);
// }



// menuliskan string ke file (asyncrhonous)
// fs.writeFile('data/test.txt', 'Hello World secara Asyncrhonous', (e) => { console.log(e); });

// Membaca isi file secara Syncrhoronous
// const data = fs.readFileSync('data/test.txt', 'utf-8');
// console.log(data);


// Membaca isi file secara Asyncrhoronous
// fs.readFile('data/test.txt', 'utf-8', (err, data) => {
//     if (err) throw err;
//     console.log(data)
// })

// Readline

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Masukan nama anda: ', (nama) => {
    rl.question('Masukan nomor Hp anda: ', (noHp) => {
            const contact = { nama, noHp };
            const file = fs.readFileSync('data/contacts.json', 'utf-8');
            const contacts = JSON.parse(file);
            contacts.push(contact);
            fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));

            console.log(`Terimakasih sudah memasukan data`)
            rl.close();
        })
        // console.log(`Terimakasih ${nama}`);
});