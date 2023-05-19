
 function Manu() {
   var boardSize = parseInt(document.getElementById('board-size').value);
   var shipCounts = {
     2: parseInt(document.getElementById('ship-2').value),
     3: parseInt(document.getElementById('ship-3').value),
     4: parseInt(document.getElementById('ship-4').value),
     5: parseInt(document.getElementById('ship-5').value)
   };
 
   var totalShips = Object.values(shipCounts).reduce((total, count) => total + count, 0);
   var allShipsValid = Object.values(shipCounts).every(count => count >= 1);
 
   if (boardSize && totalShips > 0 && allShipsValid) {
     generateBoard();
     placeShips();
   } else {
     alert('Please provide all the required information and ensure all ships have a minimum inventory of 1, and choose which size you want to play.');
   }
 }