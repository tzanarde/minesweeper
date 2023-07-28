var minesweeper = [];
const xElements = 10;
const yElements = 10;
const bombChances = 20;

function defineElements(xAxis, yAxis, bombChances) {
    for (let x = 0; x < xAxis; x++) {
        for (let y = 0; y < yAxis; y++) {
            if (Math.random() >= (1 - (1 / ((xAxis * yAxis) / bombChances)))) {
                minesweeper[[x, y]] = 'B';
            }
        }
    }
    for (let x = 0; x < xAxis; x++) {
        for (let y = 0; y < yAxis; y++) {
            let number = numberOfAdjacentBombs(x, y);
            if ((number > 0) && (minesweeper[[x, y]] != 'B')) {
                minesweeper[[x, y]] = String(number);
            }
        }
    }
    for (let x = 0; x < xAxis; x++) {
        for (let y = 0; y < yAxis; y++) {
            if (minesweeper[[x, y]] === undefined) {
                minesweeper[[x, y]] = '';
            }
        }
    }
}

function positionElements() {
    for (let x = 0; x < xElements; x++) {
        for (let y = 0; y < yElements; y++) {
            newElement(x, y, minesweeper[[x, y]]);
        }
    }
}

function newElement(left, top, value) {
    const element = document.createElement('div');
    const content = document.createElement('h3');
    content.innerHTML = value;
    if (value == 'B') {
        element.classList.add('space', 'bomb');
    } else if (value == '') {
        element.classList.add('space', 'blank');
    } else {
        element.classList.add('space', 'number');
    }
    element.classList.add('floor');
    element.onclick = function() { showElement(element) };
    element.oncontextmenu = function() {
        toogleFlag(element);
        return false;
    };
    content.style.display = 'none';
    element.style.left = ((left * 10) + 5) + '%';
    element.style.top = ((top * 10) + 5) + '%';
    if ((value !== null) && (value !== 'undefined')) { element.appendChild(content); };
    element.id = 'element:' + left + '/' + top;
    document.getElementById('minefield').appendChild(element);
}

function showElement(element) {
    element.classList.remove('floor');
    if (element.children.length > 0 ) { element.childNodes[0].style.display = 'inline'; };
}

function toogleFlag(element) {
    if (element.classList.contains('floor')) {
        if (element.innerHTML == 'F') {
            element.innerHTML = '';
            element.style.color = 'black';
            element.onclick = function() { showElement(element) };
        } else {
            element.innerHTML = 'F';
            element.style.color = 'blue';
            element.onclick = function() {};
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

defineElements(xElements, yElements, bombChances);
positionElements();
