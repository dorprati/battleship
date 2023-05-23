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
  }
  
  function handleSlotClick(event) {
    var slot = event.target;
    if (slot.classList.contains('battleship')) {
      slot.style.backgroundColor = 'orange';
      updateScore(slot);
    } else if (!slot.classList.contains('clicked')) {
      slot.style.backgroundColor = 'blue';
    slot.classList.add('clicked');
  } else if (slot.classList.contains('clicked')) {
    slot.style.backgroundColor = '';
    slot.classList.remove('clicked');
  }
}

function updateScore(slot) {
   var shipLength = slot.classList.length - 1; // Subtract 1 to exclude the 'battleship' class
   var shipId = 'ship-' + shipLength;
   var scoreCell = document.querySelector('.table1 .' + shipId + ' + td');
   var currentScore = parseInt(scoreCell.textContent);
   scoreCell.textContent = currentScore + 1;
 }