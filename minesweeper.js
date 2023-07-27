var minesweeper = [];

function hideFloor(newFloor) {
    newFloor.style.display = 'none';
}

function toogleFlag(newFloor) {
    if (newFloor.innerHTML == 'F') {
        newFloor.innerHTML = '';
        newFloor.style.color = 'black';
        newFloor.onclick = function() { hideFloor(newFloor) };
    } else {
        newFloor.innerHTML = 'F';
        newFloor.style.color = 'blue';
        newFloor.onclick = function() {};
    }
}

function newFloor(left, top) {
    const newFloor = document.createElement('div')
    newFloor.classList.add('space', 'floor');
    newFloor.style.left = ((left * 10) + 5) + '%';
    newFloor.style.top = ((top * 10) + 5) + '%';
    newFloor.onclick = function() { hideFloor(newFloor) };
    newFloor.oncontextmenu = function() {
        toogleFlag(newFloor);
        return false;
    };
    document.getElementById('minefield').appendChild(newFloor);
}

function newBomb(left, top) {
    const newBomb = document.createElement('div')
    const mine = document.createElement('h3');
    mine.innerHTML = 'B';
    newBomb.classList.add('space', 'bomb');
    newBomb.style.left = ((left * 10) + 5) + '%';
    newBomb.style.top = ((top * 10) + 5) + '%';
    newBomb.appendChild(mine);
    document.getElementById('minefield').appendChild(newBomb);
}

function newNumber(left, top, value) {
    const newNumber = document.createElement('div')
    const number = document.createElement('h3');
    number.innerHTML = value;
    newNumber.classList.add('space', 'number');
    newNumber.style.left = ((left * 10) + 5) + '%';
    newNumber.style.top = ((top * 10) + 5) + '%';
    newNumber.appendChild(number);
    document.getElementById('minefield').appendChild(newNumber);
};

function distributeFloor() {
    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
            newFloor(x, y);
        }
    }
}

function numberOfAdjacentBombs(x, y) {
    let number = 0;
    for (let xi = (x - 1); xi <= (x + 1); xi++) {
        for (let yi = (y - 1); yi <= (y + 1); yi++) {
            if ((xi >= 0) && (yi >= 0) && (minesweeper[[xi, yi]] == 'B')) {
                number++;
            }
        }
    }
    return number;
}

function plantBombs() {
    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
            if (Math.random() > 0.8) {
                minesweeper[[x, y]] = 'B';
                newBomb(x, y);
            }
        }
    }
}

function setNumbers() {
    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
            let number = numberOfAdjacentBombs(x, y);
            if ((number > 0) && (minesweeper[[x, y]] != 'B')) {
                newNumber(x, y, number);
            }
        }
    }
}




plantBombs();
setNumbers();
distributeFloor();

