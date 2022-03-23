/*
    Generare una griglia di gioco quadrata, simile a quella dello screenshot,
    in cui ogni cella contiene un numero tra 1 e 100.
    Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro.

    Bonus
    Permettere all'utente di indicare una difficoltà in base alla quale viene generato un numero variabile di celle:
    con difficoltà 1 => tra 1 e 100
    con difficoltà 2 => tra 1 e 81
    con difficoltà 3 => tra 1 e 49

    Il computer deve generare 16 numeri casuali nel range dei numeri della griglia: le bombe.
    I numeri nella lista delle bombe non possono essere duplicati.
    In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
    La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
    Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una b.
    BONUS:
    1- quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
    2- quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste
    3- l'utente indica un livello di difficoltà in base al quale viene generato un numero variabile di celle:
    con difficoltà 1 => tra 1 e 100
    con difficoltà 2 => tra 1 e 81
    con difficoltà 3 => tra 1 e 49
    Le bombe dovranno essere generate nello stesso range delle caselle di gioco.

*/

let finalMessage = document.getElementById("finalMessage");

document.getElementById("play").addEventListener('click', play);

function play() {
    // reset iniziale delle celle
    document.querySelector("main").innerHTML = "";

    const attemps = [];
    let difficulty = document.getElementById("difficulty");
    const bombNumber = 16;

    let cellNumber;

    // selezione del numero di celle in base alla difficoltà
    switch (difficulty.value) {
        case 'easy':
            cellNumber = 100;
            break;
        case 'normal':
            cellNumber = 81;
            break;
        case 'hard' :
            cellNumber = 49;
            break;
    }

    // numero massimo di tentativi
    const maxAttemps = cellNumber - bombNumber;

    // generazione delle 16 bombe
    const bombs = generateBombs();

    function generateBombs() {
        const generatedBombs = [];

        while (generatedBombs.length < 16) {
            let bomb = getRandomNumber(1, cellNumber);

            if (!generatedBombs.includes(bomb)) {
                generatedBombs.push(bomb);
            }
        }

        // i numeri delle bombe vengono ordinati per maggiore leggibilità
        generatedBombs.sort((a, b) => a - b);

        console.log(`Il pacchetto di bombe generato è ${generatedBombs}`);

        return generatedBombs;
    }

    generateGrid();

    // Genera il campo di gioco con le celle
    function generateGrid() {
        let grid = document.createElement("div");
        grid.id = "grid";

        for (let i = 1; i <= cellNumber; i++) {
            const cell = createCell(i);

            // per ogni cella avremo un listener con una funzione non anonima
            // così da poterlo rimuovere in seguito
            cell.addEventListener('click', handleCellClick);
            grid.append(cell);
        }

        document.querySelector("main").append(grid);
    }

    function handleCellClick(event) {
        // prende il valore numerico dalla singola cella
        const cellValue = Number(this.querySelector("span").textContent);

        if (bombs.includes(cellValue)) {
            endGame();
        } else if (!attemps.includes(cellValue)) {
            this.classList.add("clicked");
            attemps.push(cellValue);

            // impedisce alla cella di essere ricliccata
            this.removeEventListener('click', handleCellClick);

            if (attemps.length === maxAttemps) {
                endGame();
            }
        }
    }
    
    function createCell(num) {
        const cell = document.createElement("div");
        cell.classList.add("box");

        switch (difficulty.value) {
            case 'easy' :
                cell.style.width = cell.style.height = 'calc(100% / var(--column-easy))';
                break;
            case 'normal' :
                cell.style.width = cell.style.height = 'calc(100% / var(--column-normal))';
                break;
            case 'hard' :
                cell.style.width = cell.style.height = 'calc(100% / var(--column-hard))';
                break;
        }

        cell.innerHTML = `<span>${num}</span>`;

        return cell;
    }

    function endGame() {
        const boxes = document.querySelectorAll(".box");
        for (let i = 1, boxesNum = boxes.length; i <= boxesNum; i++) {
            const box = boxes[i - 1];
            if (bombs.includes(i)) {
                box.classList.add("bomb");
            }

            // in questo modo non sarà più possibile cliccare sulla cella
            box.removeEventListener('click', handleCellClick);
        }

        let finalResult = document.createElement("p");
        finalResult.classList.add("result");
        let result = "";

        if (attemps.length < maxAttemps) {
            result = `Mi dispiace, hai perso. Tentativi indovinati: ${attemps.length}.`;
        } else {
            result = "Complimenti, hai vinto!";
        }

        finalResult.innerText = result;
        document.querySelector("main").append(finalResult);
    }
}

// ---------
// FUNCTIONS
// ---------

// Genera un numero casuale da min a max
const getRandomNumber = (min, max) => Math.floor(Math.random() * max) + min;