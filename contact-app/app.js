const contacts = require('./contacts');

// const main = async () =>{
//     const nama = await contacts.tulisPertanyaan('masukakan nama anda: ');
//     const email = await contacts.tulisPertanyaan('masukakan email anda: ');
//     const noHp = await contacts.tulisPertanyaan('masukakan no HP anda: ');

//     contacts.simpanContact(nama, email, noHp);

// }

// main();
const yargs = require('yargs');
// console.log(yargs.argv);
yargs.command({
    command: 'add',
    describe: 'Menambahkan contact baru',
    builder: {
        nama: {
            describe: 'Nama lengkap',
            demandOption: true,
            type: 'string'
        },
        email: {
            describe: 'Email',
            demandOption: false,
            type: 'string'
        },
        noHp: {
            describe: 'Nomor Handphone',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        contacts.simpanContact(argv.nama,argv.email,argv.noHp);
    }
}).demandCommand();

// menampilkan daftar semua nama contact

yargs.command({
    command: 'list',
    describe: 'Menampilkan semua nama & nomor HP',
    handler(){
        contacts.listContact();
    }
});

yargs.command({
    command: 'detail',
    describe: 'Menampilkan detail sebuah kontak berdasarkan nama',
    builder: {
        nama: {
            describe: 'nama lengkap',
            demandCommand: true,
            type: 'string'
        }
    },
    handler(argv){
        contacts.detailContact(argv.nama);
    }
});


yargs.parse();
