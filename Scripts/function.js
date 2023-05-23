function generateGameTable(boardSize) {
    var gameTable = document.getElementById('game-table');
    gameTable.innerHTML = '';
    gameTable.classList.add('gray-board'); // Add gray-board class
  
    for (var i = 0; i < boardSize; i++) {
      var row = document.createElement('tr');
      for (var j = 0; j < boardSize; j++) {
        var cell = document.createElement('td');
        row.appendChild(cell);
      }
      gameTable.appendChild(row);
    }
  }
  
  function generateBattleships(boardSize, ship2Count, ship3Count, ship4Count, ship5Count) {
    var slots = document.querySelectorAll('#game-table td');
    slots.forEach(function (slot) {
      slot.classList.remove('battleship', 'clicked');
      slot.style.backgroundColor = '';
    });
  
    var battleshipCount = ship2Count + ship3Count + ship4Count + ship5Count;
    var battleshipLengths = [];
    for (var i = 0; i < ship2Count; i++) {
      battleshipLengths.push(2);
    }
    for (var i = 0; i < ship3Count; i++) {
      battleshipLengths.push(3);
    }
    for (var i = 0; i < ship4Count; i++) {
      battleshipLengths.push(4);
    }
    for (var i = 0; i < ship5Count; i++) {
      battleshipLengths.push(5);
    }
    var directions = ['horizontal', 'vertical'];

  battleshipLengths.forEach(function (length) {
    var direction = directions[Math.floor(Math.random() * directions.length)];
    var isPlaced = false;

    while (!isPlaced) {
      var randomIndex = Math.floor(Math.random() * slots.length);
      var startSlot = slots[randomIndex];
      var startRowIndex = Math.floor(randomIndex / boardSize);
      var startColIndex = randomIndex % boardSize;

      if (direction === 'horizontal') {
        if (startColIndex + length <= boardSize) {
          var validPlacement = true;
          for (var i = 0; i < length; i++) {
            var slotIndex = randomIndex + i;
            if (slots[slotIndex].classList.contains('battleship') ||
              (startRowIndex > 0 && slots[slotIndex - boardSize].classList.contains('battleship')) ||
              (startRowIndex < boardSize - 1 && slots[slotIndex + boardSize].classList.contains('battleship')) ||
              (startColIndex > 0 && slots[slotIndex - 1].classList.contains('battleship')) ||
              (startColIndex + length < boardSize && slots[slotIndex + 1].classList.contains('battleship'))) {
              validPlacement = false;
              break;
            }
          }
          if (validPlacement) {
            for (var i = 0; i < length; i++) {
              var slotIndex = randomIndex + i;
              slots[slotIndex].classList.add('battleship');
            }
            isPlaced = true;
          }
        }
      } else if (direction === 'vertical') {
        if (startRowIndex + length <= boardSize) {
          var validPlacement = true;
          for (var i = 0; i < length; i++) {
            var slotIndex = randomIndex + i * boardSize;
            if (slots[slotIndex].classList.contains('battleship') ||
              (startRowIndex > 0 && slots[slotIndex - boardSize].classList.contains('battleship')) ||
              (startRowIndex + length < boardSize && slots[slotIndex + boardSize].classList.contains('battleship')) ||
              (startColIndex > 0 && slots[slotIndex - 1].classList.contains('battleship')) ||
              (startColIndex < boardSize - 1 && slots[slotIndex + 1].classList.contains('battleship'))) {
              validPlacement = false;
              break;
            }
          }

          if (validPlacement) {
            for (var i = 0; i < length; i++) {
              var slotIndex = randomIndex + i * boardSize;
              slots[slotIndex].classList.add('battleship');
            }
            isPlaced = true;
          }
        }
      }
    }
  });
}