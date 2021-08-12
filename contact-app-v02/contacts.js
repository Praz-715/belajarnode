// Core module file system
const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');
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


const simpanContact = (nama, email, noHp) => {

    const contact = { nama, email, noHp };
    const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(fileBuffer);

    // cek duplikat
    const duplikat = contacts.find((contact)=> contact.nama === nama);
    if(duplikat){
        console.log(chalk.red.inverse.bold('Contact sudah terdaftar gunakan nama lain'));
        return false;
    }

    // cek email
    if(email){
        if(!validator.isEmail(email)){
            console.log(chalk.red.inverse.bold('Email tidak valid'));
            return false;
        }
    }
    if(noHp){
        if(!validator.isMobilePhone(noHp, 'id-ID')){
            console.log(chalk.red.inverse.bold('Nomor hp tidak valid'));
            return false;
        }
    }


    contacts.push(contact);

    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));

    console.log(chalk.green.inverse.bold('Terimakasih telah memasukan data'));

};

module.exports = {simpanContact};