// Core module file system
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// buat folder data jika belom ada
const dirPath = './data';
if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath)
}

// buat file contact baru jiika belum ada
const dataPath = './data/contacts.json';
if(!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}

const tulisPertanyaan = (pertanyaan) => {
    return new Promise((resolve)=>{
        rl.question(pertanyaan, (isi)=>{
            resolve(isi);
        });
    });
};

const simpanContact = (nama, email, noHp) => {

    const contact = { nama, email, noHp };
    const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(fileBuffer);

    // cek duplikat
    const duplikat = contacts.find((contact)=> contact.nama === nama);
    if(duplikat){
        console.log('Kontak sudah terdaftar gunakan nama lain');
        return false;
    }


    contacts.push(contact);

    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));

    console.log('Terimakasih sudah memasukan data');
    rl.close();
};

module.exports = {tulisPertanyaan,simpanContact};