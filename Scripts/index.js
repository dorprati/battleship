function Main() {
  document.addEventListener('DOMContentLoaded', function () {
    var gameForm = document.getElementById('game-form');
    gameForm.addEventListener('submit', startGame);
  });
}

function startGame(event) {
  event.preventDefault();
  var boardSize = parseInt(document.getElementById('board-size').value);
  var ship2Count = parseInt(document.getElementById('ship-2').value);
  var ship3Count = parseInt(document.getElementById('ship-3').value);
  var ship4Count = parseInt(document.getElementById('ship-4').value);
  var ship5Count = parseInt(document.getElementById('ship-5').value);
  if (
    isNaN(boardSize) ||
    isNaN(ship2Count) ||
    isNaN(ship3Count) ||
    isNaN(ship4Count) ||
    isNaN(ship5Count)
  ) {
    alert('Please select all the required options');
    return;
  }
  showTable();
  generateGameTable(boardSize);
  generateBattleships(boardSize, ship2Count, ship3Count, ship4Count, ship5Count);
}

function showTable() {
  var gameTable = document.getElementById('game-container');
  gameTable.style.display = 'flex';
  gameTable.style.flexWrap = 'wrap';
  gameTable.innerHTML = '';
}

function generateGameTable(boardSize) {
  var gameContainer = document.getElementById('game-container');
  gameContainer.style.setProperty('--board-size', boardSize);
  var slotCount = boardSize * boardSize;
  for (var i = 0; i < slotCount; i++) {
    var slot = document.createElement('div');
    slot.className = 'slot';
    slot.addEventListener('click', handleSlotClick);
    gameContainer.appendChild(slot);
  }
}

function generateBattleships(boardSize, ship2Count, ship3Count, ship4Count, ship5Count) {
  var slots = document.getElementsByClassName('slot');
  var shipSizes = [];

  for (var i = 0; i < ship2Count; i++) {
    shipSizes.push(2);
  }
  for (var i = 0; i < ship3Count; i++) {
    shipSizes.push(3);
  }
  for (var i = 0; i < ship4Count; i++) {
    shipSizes.push(4);
  }
  for (var i = 0; i < ship5Count; i++) {
    shipSizes.push(5);
  }

  for (var i = 0; i < shipSizes.length; i++) {
    var shipSize = shipSizes[i];
    var randomIndex = Math.floor(Math.random() * slots.length);
    var shipSlots = [];

    if (randomIndex + shipSize <= slots.length) {
      for (var j = 0; j < shipSize; j++) {
        shipSlots.push(slots[randomIndex + j]);
      }
    } else {
      for (var j = 0; j < shipSize; j++) {
        shipSlots.push(slots[randomIndex - j]);
      }
    }

    shipSlots.forEach(function (slot) {
      slot.classList.add('battleship');
      slot.setAttribute('data-ship-size', shipSize);
    });
  }
}

function handleSlotClick(event) {
  var slot = event.target;

  if (slot.classList.contains('battleship')) {
    if (!slot.classList.contains('hit')) {
      slot.classList.add('hit');
      slot.style.backgroundColor = 'red';
      var shipSize = parseInt(slot.getAttribute('data-ship-size'));
      updateScore(shipSize);
      checkShipSunk(shipSize);
      var gameOver = checkAllShipsSunk(ship2Count, ship3Count, ship4Count, ship5Count);
      if(gameOver)
      {
        alert('Game Over');
        restartGame()
      }
    }
  } else if (!slot.classList.contains('clicked')) {
    slot.classList.add('clicked');
    slot.style.backgroundColor = 'gray';
  }
}

function updateScore(shipSize) {
  var scoreCell = document.getElementById('score-' + shipSize);
  var score = parseInt(scoreCell.textContent);
  scoreCell.textContent = score + 1;
}

function checkShipSunk(shipSize) {
  var scoreCell = document.getElementById('score-' + shipSize);
  var sunkCell = document.getElementById('sunk-' + shipSize);
  var score = parseInt(scoreCell.textContent);

  if (score === shipSize) {
    sunkCell.textContent = parseInt(sunkCell.textContent) + 1;
    scoreCell.textContent = 0;
    alert('Ship of size ' + shipSize + ' has been sunk!');
  }
}

function updateScoreTable(ship2Count, ship3Count, ship4Count, ship5Count) {
  var scoreCells = document.querySelectorAll('.score-table table td:nth-child(2)');
  var sunkCells = document.querySelectorAll('.score-table table td:nth-child(3)');
  scoreCells[0].textContent = '0';
  scoreCells[1].textContent = '0';
  scoreCells[2].textContent = '0';
  scoreCells[3].textContent = '0';
  sunkCells[0].textContent = '0';
  sunkCells[1].textContent = '0';
  sunkCells[2].textContent = '0';
  sunkCells[3].textContent = '0';
}
function checkAllShipsSunk(ship2Count, ship3Count, ship4Count, ship5Count) {
  var sumAllShips = parseInt(ship2Count + ship3Count + ship4Count + ship5Count);
  var sunkCells = document.querySelectorAll('.score-table table td:nth-child(3)');
  for (var i = 0; i < sunkCells.length; i++) {
    var currentScore = parseInt(sunkCells[i].textContent);
    alert(currentScore)
    alert(sumAllShips)
    if (currentScore != sumAllShips) {
      // At least one ship is not sunk
      return false;
    }
    if(currentScore === sumAllShips)
    {
        // All ships are sunk
  
  return true;
    }

  }
}

function restartGame() {
  // Clear the game board
  var gameTable = document.getElementById('game-table');
  gameTable.innerHTML = '';

    // Reset the score table
    var scoreCells = document.querySelectorAll('.score-table table td:nth-child(2)');
    for (var i = 0; i < scoreCells.length; i++) {
      scoreCells[i].textContent = '0';
      scoreCells[i].parentNode.classList.remove('score-zero');
    }
}

Main();
