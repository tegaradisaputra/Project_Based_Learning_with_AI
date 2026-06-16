let inputElement = document.getElementById('inputElement');

let countersCharElement = document.getElementById('countersCharElement');

let countersWordElement = document.getElementById('countersWordElement');

let countersSentencesElement = document.getElementById('countersSentencesElement');

const uppercaseElement = document.getElementById('uppercaseElement');

const lowercaseElement = document.getElementById('lowercaseElement');

let notification = document.getElementById('notification');


const badWords = ['anjing', 'kontol', 'bangsat', 'fuck'];

function filteringBadWords(rawText) {
    let cleanText = rawText;
    let badWordsExists = false;

    
    badWords.forEach(bw => {
        
        if(cleanText.includes(bw)) {
            badWordsExists = true
            let stars = "*".repeat(bw.length);

            cleanText = cleanText.replaceAll(bw, stars);
        }
    })

    if(badWordsExists) {
            notification.classList.remove('hidden');
            notification.classList.add('flex');

        } else {
            notification.classList.remove("flex");
            notification.classList.add("hidden");
        }

    return cleanText;
}

inputElement.addEventListener('input', function(e) {
    let teks = e.target.value;

    let teksBersih = filteringBadWords(teks);

    let jumlahKarakter = teksBersih.length;
    let jumlahKata = teksBersih.length;

    countersCharElement.innerText = "Counters Character: " + " " +  jumlahKarakter;

    if(teksBersih.trim() === "") {
        jumlahKata = 0;
        jumlahKalimat = 0
        countersWordElement.innerText = "Counters Word: " + " " + jumlahKata;
        countersSentencesElement.innerText = "Counters Sentences: " + " " + jumlahKalimat;
    } else {

        jumlahKata = teksBersih.trim().split(" ").length
        countersWordElement.innerText = "Counters Word: " + " " + jumlahKata

        let hasilSplit = teksBersih.split(/(?<=[.!?])\s*/);
        let kalimatValid = hasilSplit.filter(s => s.trim() !== "");
        jumlahKalimat = kalimatValid.length
        countersSentencesElement.innerText = "Counters Sentences: " + " " + jumlahKalimat
    }

    inputElement.value = teksBersih


    // console.log(jumlahKarakter.length)
    // console.log(jumlahKata.length)

});

uppercaseElement.addEventListener('click', function(e) {
    let teks = inputElement.value;

    let teksUpper = teks.toUpperCase();
    inputElement.value = teksUpper;
});

lowercaseElement.addEventListener('click', function(e) {
    let teks = inputElement.value;

    let teksUpper = teks.toLowerCase();
    inputElement.value = teksUpper;
});