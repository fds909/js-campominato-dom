/*
    Generare una griglia di gioco quadrata, simile a quella dello screenshot,
    in cui ogni cella contiene un numero tra 1 e 100.
    Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro.

    Bonus
    Permettere all'utente di indicare una difficoltà in base alla quale viene generato un numero variabile di celle:
    con difficoltà 1 => tra 1 e 100
    con difficoltà 2 => tra 1 e 81
    con difficoltà 3 => tra 1 e 49

*/

let grid = document.getElementById("grid");
let difficulty = document.getElementById("difficulty");
let play = document.getElementById("play");
let cellNumber;

play.addEventListener('click',
    function() {
        // reset iniziale delle celle
        grid.innerHTML = "";

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

        // generazione delle celle
        for (let i = 1; i <= cellNumber; i++) {
            const box = document.createElement('div');

            // scelta della dimensione delle celle in base al numero totale
            switch (difficulty.value) {
                case 'easy':
                    box.style.width = box.style.height = 'calc(100% / var(--column-easy))';
                    break;
                case 'normal':
                    box.style.width = box.style.height = 'calc(100% / var(--column-normal))';
                    break;
                case 'hard' :
                    box.style.width = box.style.height = 'calc(100% / var(--column-hard))';
                    break;
            }

            box.classList.add("box");
            box.innerHTML = i;
            grid.appendChild(box);

            box.addEventListener('click', 
                function () {
                    this.classList.add('clicked');
                }
            );
        }
    }
);