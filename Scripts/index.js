function Main() {
  document.addEventListener('DOMContentLoaded', function () {
    var gameForm = document.getElementById('game-form');
    gameForm.addEventListener('submit', startGame);

    var gameTable = document.getElementById('game-table');
    gameTable.addEventListener('click', handleSlotClick);
  });

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

    generateGameTable(boardSize);
    generateBattleships(boardSize, ship2Count, ship3Count, ship4Count, ship5Count);
    var scoreCells = document.querySelectorAll('.score-table table td:nth-child(2)');
    scoreCells[0].textContent = ship2Count.toString();
    scoreCells[1].textContent = ship3Count.toString();
    scoreCells[2].textContent = ship4Count.toString();
    scoreCells[3].textContent = ship5Count.toString();
  }

  function handleSlotClick(event) {
    var slot = event.target;

    if (slot.classList.contains('battleship')) {
      var hits = 0;
      if (slot.style.backgroundColor !== 'orange') {
        slot.style.backgroundColor = 'orange';
        hits++;
        var shipSize = parseInt(slot.getAttribute('data-ship-size'));
        var shipId = 'score-ship-' + shipSize;
        var scoreCell = document.getElementById(shipId);
        if(hits === shipSize)
        {
          battleShipDown()
          hits=0;
        }
  
        if (scoreCell) {
          var currentScore = parseInt(scoreCell.textContent);


          if (currentScore > 0) {
            scoreCell.textContent = currentScore.toString();

              scoreCell.parentNode.classList.add('score-zero');
  
              // Reduce the score by one
              var score = parseInt(scoreCell.textContent);
              scoreCell.textContent = (score - 1).toString();

              // Check if all ships have been sunk
              var allShipsSunk = checkAllShipsSunk();
              
            
          }
        }
      }
    }
    else if (!slot.classList.contains('clicked')) {
      slot.style.backgroundColor = 'blue';
      slot.classList.add('clicked');
    }
  }
}



Main();
