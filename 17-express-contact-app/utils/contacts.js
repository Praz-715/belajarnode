// Core module file system
const { json } = require('express');
const fs = require('fs');

// buat folder data jika belom ada
const dirPath = './data';
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath)
}

// buat file contact baru jiika belum ada
const dataPath = './data/contacts.json';
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}

// ambils semua data di json
const loadContact = () => {
    const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(fileBuffer);
    return contacts;
}


// ambil 1 contact di json
const findContact = (nama) => {
    const contacts = loadContact();
    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());
    return contact;
}

// menuliskan / menimpa file contact json dengan data baru
const saveContacts = (contacts) => {
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
}


// Menambah data contact baru
const addContact = (contact) => {
    const contacts = loadContact();
    contacts.push(contact);
    saveContacts(contacts);
}

// Cek duplikat
const cekDuplikat = (nama) => {
    const contacts = loadContact();
    return contacts.find((contact) => contact.nama === nama);
}

//Hapus contact
const deleteContact = (nama) => {
    const contacts = loadContact();
    const filterredContacts = contacts.filter((contact) => contact.nama !== nama);
    saveContacts(filterredContacts);
}

const updateContact = (contactBaru) => {
    const contacts = loadContact();
    // Hilangkan kontak lama yang namanya sama dengan old nama
    const filterredContacts = contacts.filter((contact) => contact.nama !== contactBaru.oldNama);
    // Hapus elemen old nama dari conact baru
    delete contactBaru.oldNama;
    filterredContacts.push(contactBaru);
    saveContacts(filterredContacts);

}

module.exports = { loadContact, findContact, addContact, cekDuplikat, deleteContact, updateContact };