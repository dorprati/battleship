function generateBoard() {
    var previousTable = document.querySelector('table');
    if (previousTable) {
      previousTable.parentNode.removeChild(previousTable);
    }
  
    var boardSize = parseInt(document.getElementById('board-size').value);
    var board = [];
    var table = document.createElement('table');
    for (var i = 0; i < boardSize; i++) {
      var row = document.createElement('tr');
      var rowData = [];
      for (var j = 0; j < boardSize; j++) {
        var cell = document.createElement('td');
        cell.classList.add('empty');
        cell.addEventListener('click', handleCellClick);
        row.appendChild(cell);
        rowData.push(cell);
      }
      table.appendChild(row);
      board.push(rowData);
    }
    document.body.appendChild(table);
  }
  
  function placeShips() {
    var boardSize = parseInt(document.getElementById('board-size').value);
    var shipCounts = {
      2: parseInt(document.getElementById('ship-2').value),
      3: parseInt(document.getElementById('ship-3').value),
      4: parseInt(document.getElementById('ship-4').value),
      5: parseInt(document.getElementById('ship-5').value)
    };
  
    var board = document.getElementsByTagName('td');
    for (var size = 5; size >= 2; size--) {
      for (var count = 0; count < shipCounts[size]; count++) {
        var orientation = Math.random() < 0.5 ? 'horizontal' : 'vertical';
        var shipPlaced = false;
        while (!shipPlaced) {
          var startCell = getRandomCell();
          if (canPlaceShip(startCell, size, orientation, boardSize)) {
            placeShip(startCell, size, orientation, boardSize);
            shipPlaced = true;
          }
        }
      }
    }
  }
  
  function getRandomCell() {
    var board = document.getElementsByTagName('td');
    var randomIndex = Math.floor(Math.random() * board.length);
    return board[randomIndex];
  }
  
  function canPlaceShip(startCell, size, orientation, boardSize) {
    var board = document.getElementsByTagName('td');
    var startIndex = Array.prototype.indexOf.call(board, startCell);
    var endIndex;
  
    if (orientation === 'horizontal') {
      endIndex = startIndex + size - 1;
      if (endIndex % boardSize < startIndex % boardSize) {
        // Ship goes beyond the board boundary
        return false;
      }
    } else {
      endIndex = startIndex + (size - 1) * boardSize;
      if (endIndex >= board.length) {
        // Ship goes beyond the board boundary
        return false;
      }
    }
    for (var i = startIndex; i <= endIndex; i++) {
    if (board[i].classList.contains('occupied')) {
      // Overlapping with another ship
      return false;
    }
  }

  return true;
}

function placeShip(startCell, size, orientation, boardSize) {
  var board = document.getElementsByTagName('td');
  var startIndex = Array.prototype.indexOf.call(board, startCell);
  var endIndex;

  if (orientation === 'horizontal') {
    endIndex = startIndex + size - 1;
    for (var i = startIndex; i <= endIndex; i++) {
      board[i].classList.add('occupied');
    }
  } else {
    endIndex = startIndex + (size - 1) * boardSize;
    for (var i = startIndex; i <= endIndex; i += boardSize) {
      board[i].classList.add('occupied');
    }
  }
}

function handleCellClick(event) {
  var cell = event.target;
  if (cell.classList.contains('occupied')) {
    cell.classList.remove('occupied');
    cell.classList.add('hit');
  } else {
    cell.classList.add('miss');
  }
}