const { exit } = require('process');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const tulisPertanyaan = (pertanyaan) => {
    return new Promise((resolve) => {
        rl.question(pertanyaan, (isi) => {
            resolve(isi);
        });
    });
};

const main = async() => {
    const inputPendekarDanMonster = await tulisPertanyaan("Masukan jumlah Pendekar dan Monster : ");

    let sisikanan = [];
    for (let i = 0; i < parseInt(inputPendekarDanMonster); i++) {
        sisikanan.push(`P`, `M`);
    }
    console.log(sisikanan)
        // exit(1)

    let sisikiri = [],
        perahu = [];


    let perjalanan = 0;
    console.log({ perjalanan: "awal", sisikanan, sisikiri, perahu })
    while (sisikanan.length > 0) {

        if (sisikiri.length === 0) {
            perahu.push(sisikanan[0], sisikanan[1])
            sisikanan.splice(0, 2)
            perjalanan++;
            console.log({ perjalanan, sisikanan, sisikiri, perahu })
            if (perahu.includes('P')) {
                sisikiri.push(perahu[perahu.indexOf('P')])
                perahu.splice(perahu.indexOf('P'), 1)
            }
        } else {
            let panjangP = sisikanan.filter((el) => el === 'P').length;
            let panjangM = sisikanan.filter((el) => el === 'M').length;
            if (panjangP === panjangM) {
                perahu.push(sisikanan[sisikanan.indexOf('M')])
                sisikanan.splice(sisikanan.indexOf('M'), 1)
                perjalanan++;
                console.log({ perjalanan, sisikanan, sisikiri, perahu })
                sisikiri.push(perahu[perahu.indexOf('M')])
                perahu.splice(perahu.indexOf('M'), 1)
            } else if (panjangP > panjangM) {
                perahu.push(sisikanan[sisikanan.indexOf('P')])
                sisikanan.splice(sisikanan.indexOf('P'), 1)
                perjalanan++;
                console.log({ perjalanan, sisikanan, sisikiri, perahu })
                sisikiri.push(perahu[perahu.indexOf('P')])
                perahu.splice(perahu.indexOf('P'), 1)
            }
        }

        if (sisikanan.length === 0) {
            sisikiri.push(perahu[0])
            perahu.splice(0, 1)
            break
        }
        perjalanan++;
        console.log({ perjalanan, sisikanan, sisikiri, perahu })

    }

    console.log({ perjalanan: "akhir", sisikanan, sisikiri, perahu })

    exit(1);
}

main();