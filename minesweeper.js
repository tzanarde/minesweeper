function newFloor(left, top) {
    const newFloor = document.createElement('div')
    newFloor.classList.add('space', 'floor');
    newFloor.style.left = left + '%';
    newFloor.style.top = top + '%';
    document.getElementById('minefield').appendChild(newFloor);
}

function newBomb(left, top) {
    const newBomb = document.createElement('div')
    const mine = document.createElement('h3');
    mine.innerHTML = 'B';
    newBomb.classList.add('space', 'bomb');
    newBomb.style.left = left + '%';
    newBomb.style.top = top + '%';
    newBomb.appendChild(mine);
    document.getElementById('minefield').appendChild(newBomb);
}

function newFloor(left, top) {
    const newNothing = document.createElement('div')
    newNothing.classList.add('space', 'nothing');
    newNothing.style.left = left + '%';
    newNothing.style.top = top + '%';
    document.getElementById('minefield').appendChild(newNothing);
}

function newNumber(left, top, value) {
    const newNumber = document.createElement('div')
    const number = document.createElement('h3');
    number.innerHTML = value;
    newNumber.classList.add('space', 'number');
    newNumber.style.left = left + '%';
    newNumber.style.top = top + '%';
    newNumber.appendChild(number);
    document.getElementById('minefield').appendChild(newNumber);
};

function distributeFloor() {
    for (let x = 5; x <= 95; x += 10) {
        for (let y = 5; y <= 95; y += 10) {
            newFloor(x, y);
        }
    }
}

plantBombs();
distributeNumbers();
distributeNothing();
distributeFloor();
