let counterElement = document.getElementById("count");
const inc = document.getElementById("increment");
const dec = document.getElementById("decrement");
const undo = document.getElementById("undo");
const hist = document.getElementById("history");

let listHistory = [];

inc.addEventListener('click', function() {

    // let counterElement = document.getElementById("count");
    let counter = counterElement.innerText;

    let number = parseInt(counter);

    number++;

    counterElement.innerText = number;

    listHistory.push(number);

    console.log(listHistory)

    updateHistoryView();

});

dec.addEventListener('click', function() {

    // let counterElement = document.getElementById("count");
    let counter = counterElement.innerText;

    let number = parseInt(counter);

    number--;

    counterElement.innerText = number;

    listHistory.push(number);

    console.log(listHistory)

    updateHistoryView();

});

undo.addEventListener('click', function() {
    let counterElement = document.getElementById("count");
    
    let lastListHistory = listHistory.pop();

    if(listHistory.length === 0){
        counterElement.innerText = 0;
    } else {
        let lastValue = listHistory[listHistory.length - 1];
        counterElement.innerText = lastValue;
    }

    updateHistoryView();
})

function updateHistoryView() {

    hist.innerHTML = "History Counter: ";
    
    listHistory.forEach((angka) => {

        const list = document.createElement('div');
        list.innerText = angka;
        hist.appendChild(list);

    })
    
}