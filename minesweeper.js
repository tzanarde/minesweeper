var minesweeper = [];

function hideFloor(floor) {
    floor.style.display = 'none';
    var left = (Number(floor.style.left.replace('%', '')) - 5) / 10
    var top = (Number(floor.style.top.replace('%', '')) - 5) / 10
    cave = document.getElementById('cave:' + left + '/' + top);
    var isBlank = null;
    var count = 1;
    if (cave.classList.contains('blank')) {

        // Up
        do {
            current_floor = document.getElementById('floor:' + left + '/' + (top - count));
            current_cave = document.getElementById('cave:' + left + '/' + (top - count));
            if ((top - count) >= 0) {
                count++;
                isBlank = true;
                current_floor.style.display = 'none';
            } else if (current_cave.classList.contains('number')) {
                count = 0;
                isBlank = false;
                current_floor.style.display = 'none';
            }
        } while (isBlank);

        isBlank = null;
        count = 1;

        // Down
        // do {
        //     current_floor = document.getElementById('floor:' + left + '/' + (top + count));
        //     current_cave = document.getElementById('cave:' + left + '/' + (top + count));
        //     console.log('A');
        //     if ((top + count) <= 9) {
        //         count++;
        //         isBlank = true;
        //     } else {
        //         count = 0;
        //         isBlank = false;
        //     }
        //     current_floor.style.display = 'none';
        // } while (isBlank);
    }
}

function toogleFlag(floor) {
    if (floor.innerHTML == 'F') {
        floor.innerHTML = '';
        floor.style.color = 'black';
        floor.onclick = function() { hideFloor(floor) };
    } else {
        floor.innerHTML = 'F';
        floor.style.color = 'blue';
        floor.onclick = function() {};
    }
}

function newFloor(left, top) {
    const floor = document.createElement('div')
    floor.classList.add('space', 'floor');
    floor.style.left = ((left * 10) + 5) + '%';
    floor.style.top = ((top * 10) + 5) + '%';
    floor.onclick = function() { hideFloor(floor) };
    floor.oncontextmenu = function() {
        toogleFlag(floor);
        return false;
    };
    floor.id = 'floor:' + left + '/' + top;
    document.getElementById('minefield').appendChild(floor);
}

function newBomb(left, top) {
    const bomb = document.createElement('div')
    const mine = document.createElement('h3');
    mine.innerHTML = 'B';
    bomb.classList.add('space', 'bomb');
    bomb.style.left = ((left * 10) + 5) + '%';
    bomb.style.top = ((top * 10) + 5) + '%';
    bomb.appendChild(mine);
    bomb.id = 'cave:' + left + '/' + top;
    document.getElementById('minefield').appendChild(bomb);
}

function newBlank(left, top) {
    const blank = document.createElement('div')
    blank.classList.add('space', 'blank');
    blank.style.left = ((left * 10) + 5) + '%';
    blank.style.top = ((top * 10) + 5) + '%';
    blank.id = 'cave:' + left + '/' + top;
    document.getElementById('minefield').appendChild(blank);
}

function newNumber(left, top, value) {
    const numberHint = document.createElement('div')
    const number = document.createElement('h3');
    number.innerHTML = value;
    numberHint.classList.add('space', 'number');
    numberHint.style.left = ((left * 10) + 5) + '%';
    numberHint.style.top = ((top * 10) + 5) + '%';
    numberHint.appendChild(number);
    numberHint.id = 'cave:' + left + '/' + top;
    document.getElementById('minefield').appendChild(numberHint);
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
            if (Math.random() > 0.99) {
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
                minesweeper[[x, y]] = 'N';
                newNumber(x, y, number);
            }
        }
    }
}

function setBlanks() {
    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
            if ((minesweeper[[x, y]] != 'B') && (minesweeper[[x, y]] != 'N')) {
                minesweeper[[x, y]] = '0';
                newBlank(x, y);
            }
        }
    }
}




plantBombs();
setNumbers();
setBlanks();
distributeFloor();

